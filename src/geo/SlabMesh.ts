import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import { MaterialLibrary, MaterialNames } from "./MaterialLibrary";
import { cleanPoints } from "./utils";
import { SceneManager } from "../SceneManager";

const SLAB_THICKNESS = 0.5;
const COLUMN_DIAMETER = 1.0;

export default class SlabMesh {
  private _points: BABYLON.Vector3[];
  private _uvs: BABYLON.Vector4[];
  private _mesh: BABYLON.Mesh;
  private _scene: BABYLON.Scene;
  private _mat: BABYLON.StandardMaterial;
  private _yPos: number;
  private _columns: BABYLON.Mesh[] = [];
  private _center: BABYLON.Vector3;

  static readonly objMetadata = {
    type: "slab",
    isTerrain: false,
  };

  constructor(points: BABYLON.Vector3[]) {
    this._scene = SceneManager.mainScene;
    this._yPos = 0;

    this._uvs = [
      new BABYLON.Vector4(0, 0, 2, 2), // top face
      new BABYLON.Vector4(0, 0, 2, 0.125), // sides
      new BABYLON.Vector4(0, 0, 1, 1), // bottom face
    ];

    this._mat = MaterialLibrary.getMaterial(
      MaterialNames.Concrete,
    ) as BABYLON.StandardMaterial;

    this.updatePoints(points);
  }

  private _cleanPoints() {
    cleanPoints(this._points);
    this._yPos = Math.max(...this._points.map((p) => p.y)) + SLAB_THICKNESS;
  }

  public updatePoints(points: BABYLON.Vector3[]) {
    if (this._mesh) {
      this._mesh.dispose();
    }

    this._columns.forEach((col) => col.dispose());
    this._columns = [];

    this._points = points;
    this._center = this._points
      .reduce((acc, p) => acc.add(p), new BABYLON.Vector3(0, 0, 0))
      .scale(1 / this._points.length);

    this._cleanPoints();
    this._generateMesh();
    this._addColumns();
  }

  private _generateMesh() {
    const zeroYPoints = this._points.map(
      (p) => new BABYLON.Vector3(p.x, 0, p.z),
    );

    this._mesh = BABYLON.MeshBuilder.ExtrudePolygon(
      "polygon",
      {
        shape: zeroYPoints,
        depth: 1,
        faceUV: this._uvs,
      },
      SceneManager.mainScene,
      earcut,
    );
    this._mesh.material = this._mat;
    this._mesh.position.y = this._yPos;
    this._mesh.metadata = SlabMesh.objMetadata;
  }

  private _addColumns() {
    this._points.forEach((point, idx) => {
      const colHeight = this._yPos - point.y;
      const offset = this._center.subtract(point);
      offset._y = 0;
      offset.normalize().scale(COLUMN_DIAMETER * 0.7);

      const column = BABYLON.MeshBuilder.CreateCylinder(
        `column_${idx}`,
        { diameter: 1, height: colHeight - 0.1 },
        this._scene,
      );
      column.position = new BABYLON.Vector3(
        point.x + offset.x,
        point.y + colHeight / 2,
        point.z + offset.z,
      );
      column.material = MaterialLibrary.getMaterial(
        MaterialNames.ConcreteSmooth,
      );
      column.metadata = SlabMesh.objMetadata;
      this._columns.push(column);
    });
  }

  public get yPos(): number {
    return this._yPos;
  }

  public get geo(): BABYLON.Mesh {
    return this._mesh;
  }
}

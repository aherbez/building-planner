import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import { MaterialLibrary, MaterialNames } from "./MaterialLibrary";
import { cleanPoints } from "./utils";

const SLAB_THICKNESS = 0.5;

export default class SlabMesh {
  private _points: BABYLON.Vector3[];
  private _uvs: BABYLON.Vector4[];
  private _mesh: BABYLON.Mesh;
  private _scene: BABYLON.Scene;
  private _mat: BABYLON.StandardMaterial;
  private _yPos: number;

  constructor(scene: BABYLON.Scene) {
    this._scene = scene;
    this._yPos = 0;
    this._points = [
      new BABYLON.Vector3(0, 0, 0),
      new BABYLON.Vector3(1, 0, 0),
      new BABYLON.Vector3(1, 0, 1),
      new BABYLON.Vector3(0, 0, 1),
    ];

    this._uvs = [
      new BABYLON.Vector4(0, 0, 2, 2), // top face
      new BABYLON.Vector4(0, 0, 2, 0.125), // sides
      new BABYLON.Vector4(0, 0, 1, 1), // bottom face
    ];

    this._mat = MaterialLibrary.getMaterial(MaterialNames.Concrete);

    this._generateMesh();
  }

  private _cleanPoints() {
    cleanPoints(this._points);
    this._yPos = Math.max(...this._points.map((p) => p.y)) + SLAB_THICKNESS;
  }

  public updatePoints(points: BABYLON.Vector3[]) {
    if (this._mesh) {
      this._mesh.dispose();
    }

    this._points = points;
    this._cleanPoints();
    console.log("updating points");
    console.group();
    this._points.forEach((p) => console.log(p));
    console.groupEnd();

    console.log(this._points);
    this._generateMesh();
  }

  private _generateMesh() {
    this._mesh = BABYLON.MeshBuilder.ExtrudePolygon(
      "polygon",
      {
        shape: this._points,
        depth: 1,
        faceUV: this._uvs,
      },
      this._scene,
      earcut,
    );
    this._mesh.material = this._mat;
    this._mesh.position.y = this._yPos;
  }

  public get yPos(): number {
    return this._yPos;
  }

  public get geo(): BABYLON.Mesh {
    return this._mesh;
  }
}

import {
  Mesh,
  MeshBuilder,
  Vector4,
  Vector3,
  Scene,
  StandardMaterial,
  Color3,
  Texture,
} from "@babylonjs/core";
import earcut from "earcut";

class ProcMesh {
  private _points: Vector3[];
  private _uvs: Vector4[];
  private _mesh: Mesh;
  private _scene: Scene;
  private _mat: StandardMaterial;
  private _yPos: number;

  constructor(scene: Scene) {
    this._scene = scene;
    this._yPos = 0;
    this._points = [
      new Vector3(0, 0, 0),
      new Vector3(1, 0, 0),
      new Vector3(1, 0, 1),
      new Vector3(0, 0, 1),
    ];

    this._uvs = [
      new Vector4(0, 0, 2, 2), // top face
      new Vector4(0, 0, 2, 0.125), // sides
      new Vector4(0, 0, 1, 1), // bottom face
    ];

    this._mat = new StandardMaterial("mat", scene);
    this._mat.diffuseTexture = new Texture("/textures/checker.jpg", scene);

    this._generateMesh();
  }

  private _cleanPoints() {
    let maxY = -Infinity;
    let minY = Infinity;
    this._points.forEach((p) => {
      if (p.y > maxY) {
        maxY = p.y;
      }
      if (p.y < minY) {
        minY = p.y;
      }
    });

    this._points.forEach((p) => {
      // p.y = maxY - 5;
      p.y = 0;
    });

    // Sort points into counter-clockwise order around the centroid in the XZ plane
    const cx =
      this._points.reduce((sum, p) => sum + p.x, 0) / this._points.length;
    const cz =
      this._points.reduce((sum, p) => sum + p.z, 0) / this._points.length;

    this._points.sort((a, b) => {
      return Math.atan2(a.z - cz, a.x - cx) - Math.atan2(b.z - cz, b.x - cx);
    });

    // Verify winding is counter-clockwise; reverse if not
    let signedArea = 0;
    for (let i = 0; i < this._points.length; i++) {
      const curr = this._points[i];
      const next = this._points[(i + 1) % this._points.length];
      signedArea += (next.x - curr.x) * (next.z + curr.z);
    }
    if (signedArea > 0) {
      this._points.reverse();
    }

    this._yPos = maxY + 0.5;
  }

  public updatePoints(points: Vector3[]) {
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
    this._mesh = MeshBuilder.ExtrudePolygon(
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
    // console.log(this._mesh);
  }

  public get yPos(): number {
    return this._yPos;
  }

  public get geo(): Mesh {
    return this._mesh;
  }
}

export default ProcMesh;

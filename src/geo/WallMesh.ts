import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import { SceneManager } from "../SceneManager";
import { MaterialLibrary, MaterialNames } from "./MaterialLibrary";

const WALL_HEIGHT = 2.5;
const WALL_THICKNESS = 0.2;

export class WallMesh {
  private _points: BABYLON.Vector3[] = [];
  private _mesh: BABYLON.Mesh;
  private _yPos: number;

  static readonly objMetadata = {
    type: "wall",
    isTerrain: false,
  };

  constructor(points: BABYLON.Vector3[]) {
    if (points.length < 2) {
      throw new Error("WallMesh requires at least 2 points");
    }
    this._points = points;
    this._generateMesh();
  }

  private _generateMesh() {
    if (this._mesh) {
      this._mesh.dispose();
    }

    this._yPos = Math.max(...this._points.map((p) => p.y));

    for (let i = 0; i < this._points.length - 1; i++) {
      const p1 = this._points[i];
      const p2 = this._points[i + 1];

      const basisX = p2.subtract(p1);
      basisX.y = 0; // project onto XZ plane
      const basisY = new BABYLON.Vector3(-basisX.z, 0, basisX.x).normalize(); // perpendicular in XZ plane

      const uvLength = basisX.length();

      const uvs = [
        new BABYLON.Vector4(0, 0, 2, 2), // top face
        new BABYLON.Vector4(0, 0, uvLength, 1), // sides
        new BABYLON.Vector4(0, 0, 1, 1), // bottom face
      ];

      const pA = p1.add(basisY.scale(WALL_THICKNESS / 2));
      const pB = p1.subtract(basisY.scale(WALL_THICKNESS / 2));
      const pC = p2.subtract(basisY.scale(WALL_THICKNESS / 2));
      const pD = p2.add(basisY.scale(WALL_THICKNESS / 2));

      const wallSegment = BABYLON.MeshBuilder.ExtrudePolygon(
        `wallSegment_${i}`,
        {
          shape: [pA, pB, pC, pD],
          depth: WALL_HEIGHT,
          faceUV: uvs,
        },
        SceneManager.mainScene,
        earcut,
      );
      wallSegment.material = MaterialLibrary.getMaterial(MaterialNames.Brick);
      wallSegment.position.y = this._yPos + WALL_HEIGHT / 2;
      wallSegment.metadata = WallMesh.objMetadata;

      /*
      const wallSegment = BABYLON.MeshBuilder.CreateRibbon(
        `wallSegment_${i}`,
        {
          pathArray: [
            [pA, pB],
            [pD, pC],
          ],
          closeArray: false,
          closePath: false,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        },
        SceneManager.mainScene,
      );
      wallSegment.material = MaterialLibrary.getMaterial(
        MaterialNames.Concrete,
      );
      wallSegment.position.y = WALL_HEIGHT / 2;
      */
    }
  }
}

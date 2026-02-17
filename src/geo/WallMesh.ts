import * as BABYLON from "@babylonjs/core";
import { SceneManager } from "../SceneManager";
import { MaterialLibrary } from "./MaterialLibrary";

const WALL_HEIGHT = 2.5;
const WALL_THICKNESS = 0.2;

export class WallMesh {
  private _points: BABYLON.Vector3[] = [];
  private _mesh: BABYLON.Mesh;

  static readonly objMetadata = {
    type: "wall",
    isTerrain: false,
  };

  constructor() {}
}

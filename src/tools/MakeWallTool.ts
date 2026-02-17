import * as BABYLON from "@babylonjs/core";
import { Tools } from "./ToolBase";
import { PlacementTool } from "./PlacementTool";
import { WallMesh } from "../geo/WallMesh";

export class MakeWallTool extends PlacementTool {
  public readonly kind: Tools = Tools.Wall;

  private _wallPoints: BABYLON.Vector3[] = [];

  isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    return mesh?.metadata?.isTerrain === false;
  }

  finializeTool(): void {
    const walls = new WallMesh(this._targetPoints);
    this._toolManager.popTool();
  }
}

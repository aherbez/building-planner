import * as BABYLON from "@babylonjs/core";
import { Tools, ToolBase } from "./ToolBase";
import { PlacementTool } from "./PlacementTool";
import { ToolManager } from "./ToolManager";

export class MakeWallTool extends PlacementTool {
  public readonly kind: Tools = Tools.Wall;

  private _wallPoints: BABYLON.Vector3[] = [];

  isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    return mesh?.metadata?.isTerrain === false;
  }

  finializeTool(): void {
    console.log("finalize wall tool", this._targetPoints);
  }
}

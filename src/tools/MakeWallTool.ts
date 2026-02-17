import * as BABYLON from "@babylonjs/core";
import { Tools, ToolBase } from "./ToolBase";
import { PlacementTool } from "./PlacementTool";
import { ToolManager } from "./ToolManager";

export class MakeWallTool extends PlacementTool {
  public readonly kind: Tools = Tools.Wall;

  private _wallPoints: BABYLON.Vector3[] = [];

  protected isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    console.log(mesh?.metadata);
    return mesh?.metadata?.isTerrain === false;
  }

  onPickEvent(event: BABYLON.PointerInfo, pickInfo: any): void {
    console.log("pick event - CREATE WALL", event, pickInfo);
  }
}

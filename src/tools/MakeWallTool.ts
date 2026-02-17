import * as BABYLON from "@babylonjs/core";
import { Tools } from "./ToolBase";
import { PlacementTool } from "./PlacementTool";
import { WallMesh } from "../geo/WallMesh";

export class MakeWallTool extends PlacementTool {
  public readonly kind: Tools = Tools.Wall;

  isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    const { isTerrain, type } = mesh?.metadata || {};
    return !isTerrain && type === "slab";
  }

  finializeTool(): void {
    const walls = new WallMesh(this._targetPoints);
    this._toolManager.popTool();
  }
}

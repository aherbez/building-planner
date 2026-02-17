import { MaterialLibrary, MaterialNames } from "../geo/MaterialLibrary";
import SlabMesh from "../geo/SlabMesh";
import { Tools, ToolBase } from "./ToolBase";
import { PlacementTool } from "./PlacementTool";
import * as BABYLON from "@babylonjs/core/";

export class MakeSlabTool extends PlacementTool {
  public readonly kind: Tools = Tools.Slab;

  constructor(toolManager: any) {
    super(toolManager);

    this._instructions = [
      "Click to place slab vertices",
      "Press backspace to undo last vertex",
      "Press enter to finalize slab",
    ];
  }

  protected isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    return mesh?.metadata?.isTerrain;
  }

  finializeTool() {
    console.log("finalize slab tool", this._targetPoints);

    const slabMesh = new SlabMesh(this._targetPoints);
    this._toolManager.popTool();
  }
}

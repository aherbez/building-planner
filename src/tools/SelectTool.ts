import { PointerInfo } from "@babylonjs/core";
import { Tools, ToolBase } from "./ToolBase";
import { ToolManager } from "./ToolManager";

export class SelectTool extends ToolBase {
  public readonly kind: Tools = Tools.Select;

  constructor(toolManager: ToolManager) {
    super(toolManager);
  }

  activate() {
    console.log("select tool activated");
  }

  deactivate() {
    console.log("select tool deactivated");
  }

  onPointerDown(event: PointerInfo) {
    console.log("pointer down - SELECT");
  }

  onPointerUp(event: PointerInfo) {
    console.log("pointer up");
  }
}

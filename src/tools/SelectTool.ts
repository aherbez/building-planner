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

  onPointerDown(event: PointerEvent) {
    console.log("pointer down - SELECT");
  }

  onPointerUp(event: PointerEvent) {
    console.log("pointer up");
  }
}

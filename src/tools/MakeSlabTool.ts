import {Tools, ToolBase} from "./ToolBase";

export class MakeSlabTool extends ToolBase {
  public readonly kind: Tools = Tools.Slab;

  constructor() {
    super();
  }

  activate() {
    console.log("make slab tool activated");
  }

  deactivate() {
    console.log("make slab tool deactivated");
  }

  onPointerDown() {
    console.log("pointer down");
  }

  onPointerUp() {
    console.log("pointer up");
  }

  onPointerMove() {
    console.log("pointer move");
  }
}

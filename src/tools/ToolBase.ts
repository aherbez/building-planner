import { IPointerEvent } from "@babylonjs/core/Events/deviceInputEvents";
import { ToolManager } from "./ToolManager";
import { PointerInfo } from "@babylonjs/core/Events/pointerEvents";

export enum Tools {
  None,
  Select,
  Slab,
  Wall,
}

export const ToolNames = {
  [Tools.None]: "None",
  [Tools.Select]: "Select",
  [Tools.Slab]: "Create Slab",
  [Tools.Wall]: "Create Wall",
};

export class ToolBase {
  public readonly kind: Tools = Tools.None;
  protected _toolManager: ToolManager | null = null;

  constructor(toolManager: ToolManager) {
    this._toolManager = toolManager;
  }

  onActivate() {}

  onDeactivate() {}

  onPointerDown(event: PointerInfo) {}

  onPointerUp(event: PointerInfo) {}

  onPointerMove(event: PointerInfo, pickInfo: any) {}

  onPickEvent(event: PointerInfo, pickInfo: any) {}

  finializeTool() {}

  onBackspace() {}
}

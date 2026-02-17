import { IPointerEvent } from "@babylonjs/core/Events/deviceInputEvents";
import { ToolManager } from "./ToolManager";

export enum Tools {
  None,
  Select,
  Slab,
}

export const ToolNames = {
  [Tools.None]: "None",
  [Tools.Select]: "Select",
  [Tools.Slab]: "Create Slab",
};

export class ToolBase {
  public readonly kind: Tools = Tools.None;
  protected _toolManager: ToolManager | null = null;

  constructor(toolManager: ToolManager) {
    this._toolManager = toolManager;
  }

  activate() {}

  deactivate() {}

  onPointerDown(event: PointerEvent) {}

  onPointerUp(event: PointerEvent) {}

  onPointerMove(event: PointerEvent) {}

  onPickEvent(event: IPointerEvent, pickInfo: any) {}

  finializeTool() {}
}

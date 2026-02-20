import { PointerInfo } from "@babylonjs/core";
import { Tools, ToolBase } from "./ToolBase";
import { ToolManager } from "./ToolManager";

export class SelectTool extends ToolBase {
  public readonly kind: Tools = Tools.Select;

  constructor(toolManager: ToolManager) {
    super(toolManager);

    this._instructions = [
      'Use "s" to create slabs',
      'Use "w" to create walls',
      'Use "c" to set camera location',
    ];
  }
}

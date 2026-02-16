import { Tools, ToolBase } from "./ToolBase";
import { MakeSlabTool } from "./MakeSlabTool";
import { Scene } from "@babylonjs/core/scene";

export class ToolManager {
  private _tools: Map<Tools, ToolBase>;
  private _scene: Scene;

  constructor() {
    this._tools = new Map<Tools, ToolBase>();
    this._tools.set(Tools.Slab, new MakeSlabTool());
  }

  init(scene: Scene) {
    this._scene = scene;
  }
}

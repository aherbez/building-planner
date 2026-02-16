import { Tools, ToolBase } from "./ToolBase";
import { MakeSlabTool } from "./MakeSlabTool";
import { Scene } from "@babylonjs/core/scene";

export class ToolManager {
  private _tools: Map<Tools, ToolBase>;
  private _scene: Scene;
  private _activeTool: ToolBase | null = null;

  constructor(scene: Scene) {
    this._scene = scene;
    this._tools = new Map<Tools, ToolBase>();
    this._tools.set(Tools.Slab, new MakeSlabTool());

    window.addEventListener("pointerdown", (event) => {
      console.log("pointer down event received in tool manager");
      if (this._activeTool) {
        this._activeTool.onPointerDown(event);
      }
    });

    window.addEventListener("keydown", (event) => {
      console.log("keydown event received in tool manager", event);
      if (event.key === "s") {
        // this.activateTool(Tools.Slab);
      }
    });
  }

  public get activeTool(): ToolBase | null {
    return this._activeTool;
  }
}

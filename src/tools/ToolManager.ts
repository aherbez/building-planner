import { Tools, ToolBase, ToolNames } from "./ToolBase";
import { MakeSlabTool } from "./MakeSlabTool";
import { Scene } from "@babylonjs/core/scene";
import { SelectTool } from "./SelectTool";
import * as BABYLON from "@babylonjs/core/";

export enum ToolEvents {
  ToolActivated = "toolActivated",
  ToolDeactivated = "toolDeactivated",
  ToolChanged = "toolChanged",
}

export class ToolManager {
  private _tools: Map<Tools, ToolBase>;
  private _scene: Scene;

  private _selectedObjects: BABYLON.Mesh[] = [];
  private _toolStack: ToolBase[] = [];

  constructor(scene: Scene) {
    this._scene = scene;
    this._tools = new Map<Tools, ToolBase>();
    this._tools.set(Tools.Slab, new MakeSlabTool(this));
    this._tools.set(Tools.Select, new SelectTool(this));

    this.setTool(Tools.Select);

    window.addEventListener("pointerdown", (event) => {
      if (this.activeTool) {
        this.activeTool.onPointerDown(event);
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.popTool();
      }
      if (event.key === "s") {
        this.setTool(Tools.Slab);
      }
      if (event.key === "Enter") {
        this.activeTool.finializeTool();
      }
    });

    this._scene.onPointerDown = (evt, pickInfo) => {
      this.activeTool?.onPickEvent(evt, pickInfo);
    };
  }

  public replaceSelection(objects: BABYLON.Mesh[]) {
    this._selectedObjects.forEach((obj) => {
      obj.material = null;
    });
    this._selectedObjects = objects;
    this._selectedObjects.forEach((obj) => {
      obj.material = new BABYLON.StandardMaterial("selected", this._scene);
      (obj.material as BABYLON.StandardMaterial).diffuseColor =
        new BABYLON.Color3(1, 0, 0);
    });
  }

  public get mainScene(): Scene {
    return this._scene;
  }

  public get activeTool(): ToolBase | null {
    return this._toolStack[this._toolStack.length - 1] || null;
  }

  public get activeToolName(): string {
    const activeTool = this.activeTool;
    if (activeTool) {
      return ToolNames[activeTool.kind];
    }
    return "None";
  }

  public popTool() {
    // always maintain the select tool as the bottom of the stack
    if (this._toolStack.length < 2) {
      return;
    }

    if (this.activeTool) {
      this.activeTool.deactivate();
    }

    const previousTool = this._toolStack.pop();
    this.activateTool(this.activeTool);
  }

  public setTool(toolKind: Tools) {
    const tool = this._tools.get(toolKind);
    if (tool) {
      this.activateTool(tool);
    }
  }

  public activateTool(tool?: ToolBase) {
    if (!tool) {
      return;
    }

    if (this.activeTool) {
      this.activeTool.deactivate();
    }
    this._toolStack.push(tool);
    // this.activeTool = tool;
    if (this.activeTool) {
      this.activeTool.activate();
    }

    // emit tool changed event
    window.dispatchEvent(
      new CustomEvent(ToolEvents.ToolChanged, { detail: { tool } }),
    );
  }
}

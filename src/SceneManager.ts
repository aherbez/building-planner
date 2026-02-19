import * as BABYLON from "@babylonjs/core";
import { ToolManager } from "./tools/ToolManager";
import { Controls } from "./controls/Controls";

export class SceneManager {
  private static _instance: SceneManager;

  private _scene: BABYLON.Scene;
  private _engine: BABYLON.Engine;
  private _toolManager: ToolManager;
  private _controls: Controls;

  public static instance(): SceneManager {
    if (!SceneManager._instance) {
      SceneManager._instance = new SceneManager();
    }
    return SceneManager._instance;
  }

  public static get mainScene(): BABYLON.Scene {
    if (!SceneManager._instance) {
      throw new Error("Scene not initialized");
    }
    return SceneManager.instance()._scene;
  }

  public static set mainScene(scene: BABYLON.Scene) {
    SceneManager.instance()._scene = scene;
  }

  public static get engine(): BABYLON.Engine {
    if (!SceneManager._instance) {
      throw new Error("Engine not initialized");
    }
    return SceneManager.instance()._engine;
  }

  public static set engine(engine: BABYLON.Engine) {
    SceneManager.instance()._engine = engine;
  }

  public static get toolManager(): ToolManager {
    return SceneManager.instance()._toolManager;
  }

  public static set toolManager(toolManager: ToolManager) {
    SceneManager.instance()._toolManager = toolManager;
  }

  public static get controls(): Controls {
    return SceneManager.instance()._controls;
  }

  public static set controls(controls: Controls) {
    SceneManager.instance()._controls = controls;
  }
}

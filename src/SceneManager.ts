import * as BABYLON from "@babylonjs/core";

export class SceneManager {
  private static _instance: SceneManager;

  private _scene: BABYLON.Scene;

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
}

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

  public get mainScene(): BABYLON.Scene {
    if (!this._scene) {
      throw new Error("Scene not initialized");
    }
    return this._scene;
  }

  public set mainScene(scene: BABYLON.Scene) {
    this._scene = scene;
  }
}

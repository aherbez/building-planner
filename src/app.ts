import * as BABYLON from "@babylonjs/core/";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import "@babylonjs/core/Debug/debugLayer";
import { ToolManager } from "./tools/ToolManager";
import { Controls } from "./controls/controls";
import { MaterialLibrary } from "./geo/MaterialLibrary";

class App {
  private _toolManager: ToolManager;
  private _controls: Controls;
  private _scene: BABYLON.Scene;

  constructor() {
    const canvas = document.createElement("canvas");
    canvas.style.width = "75%";
    canvas.style.height = "100%";
    document.body.appendChild(canvas);

    // init babylon engine
    const engine = new BABYLON.Engine(canvas, true);
    this._scene = new BABYLON.Scene(engine);
    this._toolManager = new ToolManager(this._scene);

    this._controls = new Controls({
      toolManager: this._toolManager,
    });

    this.setupCamera(canvas);
    this.setupLights();
    this.setupMaterials();

    window.addEventListener("keydown", (event) => {
      if (
        event.shiftKey &&
        event.ctrlKey &&
        event.altKey &&
        (event.key === "I" || event.key === "i")
      ) {
        if (this._scene.debugLayer.isVisible()) {
          this._scene.debugLayer.hide();
        } else {
          this._scene.debugLayer.show();
        }
      }
    });

    this.loadModels(this._scene);

    window.addEventListener("resize", () => {
      engine.resize();
    });

    engine.runRenderLoop(() => {
      this._scene.render();
    });
  }

  private setupCamera(canvas: HTMLCanvasElement) {
    const camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      3,
      new BABYLON.Vector3(0, 0.7, 0),
      this._scene,
    );
    camera.minZ = 0.01;
    camera.attachControl(canvas, true);
  }

  private setupLights() {
    const light1: BABYLON.HemisphericLight = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(1, 1, 0),
      this._scene,
    );
    const light2: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
      "light2",
      new BABYLON.Vector3(-1, -2, -1),
      this._scene,
    );
  }

  private loadModels = async (scene: BABYLON.Scene) => {
    const model = await BABYLON.ImportMeshAsync("/models/hills_v2.glb", scene);
    console.log(model);
  };

  private setupMaterials() {
    // MaterialLibrary.registerMaterial("checker", checkerMat);
  }
}

new App();

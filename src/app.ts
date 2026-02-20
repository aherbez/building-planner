import "@babylonjs/core/Engines/Extensions/engine.textureSelector";
import "@babylonjs/core/Materials/Textures/Loaders/ktxTextureLoader";

import * as BABYLON from "@babylonjs/core/";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import "@babylonjs/core/Debug/debugLayer";
import { ToolManager } from "./tools/ToolManager";
import { Controls } from "./controls/Controls";
import { MaterialLibrary, MaterialNames } from "./geo/MaterialLibrary";
import { SceneManager } from "./SceneManager";
import { Terrain } from "./terrain/Terrain";

class App {
  private _toolManager: ToolManager;
  private _controls: Controls;
  private _scene: BABYLON.Scene;
  private _terrain: Terrain;

  constructor() {
    const canvas = document.createElement("canvas");
    canvas.style.width = "75%";
    canvas.style.height = "100%";
    document.body.appendChild(canvas);

    // init babylon engine
    const engine = new BABYLON.Engine(canvas, true);
    this._scene = new BABYLON.Scene(engine);
    this._toolManager = new ToolManager(this._scene);
    SceneManager.mainScene = this._scene;
    SceneManager.engine = engine;
    SceneManager.toolManager = this._toolManager;
    SceneManager.controls = new Controls();

    this._terrain = new Terrain();

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

    window.addEventListener("resize", () => {
      engine.resize();
    });

    engine.runRenderLoop(() => {
      this._scene.render();
      SceneManager.controls.updatePerformanceDisplay(engine.getFps());
    });
  }

  private setupCamera(canvas: HTMLCanvasElement) {
    const camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera(
      "Camera",
      0,
      Math.PI / 4,
      10,
      new BABYLON.Vector3(25, 65, 0),
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
    light1.intensity = 0.2;
    const light2: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
      "light2",
      new BABYLON.Vector3(-1, -2, -1),
      this._scene,
    );
    light2.intensity = 2;
  }

  private setupMaterials() {
    // PBR materials need an environment texture for IBL; without it they render black
    const envTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      "https://assets.babylonjs.com/environments/environmentSpecular.env",
      this._scene,
    );
    this._scene.environmentTexture = envTexture;
    this._scene.environmentIntensity = 1.0;

    MaterialLibrary.createAndRegisterMaterial(MaterialNames.Concrete, {
      diffuseTexture: "/textures/concrete.jpg",
      // normalTexture: "/textures/concrete_normal.jpg",
    });

    MaterialLibrary.createAndRegisterMaterial(MaterialNames.Marker, {
      diffuseColor: new BABYLON.Color3(1, 1, 0),
      emissiveColor: new BABYLON.Color3(1, 1, 0),
    });

    MaterialLibrary.createAndRegisterMaterial(MaterialNames.Cursor, {
      diffuseColor: new BABYLON.Color3(1, 0, 0),
      emissiveColor: new BABYLON.Color3(1, 0, 0),
    });

    MaterialLibrary.createAndRegisterMaterial(MaterialNames.Brick, {
      diffuseTexture: "/textures/brick_bright_red.jpg",
    });

    MaterialLibrary.createAndRegisterPBRMaterial(MaterialNames.Bluffs, {
      albedoTexture: "/textures/bluffs/albedo_4K.ktx2",
      reflectivityTexture: "/textures/bluffs/specular_4K.ktx2",
      ambientTexture: "/textures/bluffs/occlusion_4K.ktx2",
    });
  }
}

new App();

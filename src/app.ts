import {
  MeshBuilder,
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Mesh,
  Scene,
  Vector3,
  AppendSceneAsync,
  TransformNode,
  SceneLoader,
  ImportMeshAsync,
  DirectionalLight,
} from "@babylonjs/core/";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import "@babylonjs/core/Debug/debugLayer";
import ProcMesh from "./geo/ProcMesh";
import { Tools, ToolBase } from "./tools/ToolBase";
import { ToolManager } from "./tools/ToolManager";
import { Controls } from "./controls/controls";

const slabPoints: Vector3[] = [];
const markers: Mesh[] = [];

const tools: ToolBase[] = [];
const activeTool: ToolBase | null = null;

let toolManger: ToolManager | null = null;

class App {
  private _toolManager: ToolManager;
  private _controls: Controls;

  constructor() {
    this._controls = new Controls();

    const canvas = document.createElement("canvas");
    canvas.style.width = "75%";
    canvas.style.height = "100%";
    document.body.appendChild(canvas);

    // init babylon engine
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    this._toolManager = new ToolManager(scene);

    const camera: ArcRotateCamera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      3,
      new Vector3(0, 0.7, 0),
      scene,
    );
    camera.minZ = 0.01;
    camera.attachControl(canvas, true);
    const light1: HemisphericLight = new HemisphericLight(
      "light1",
      new Vector3(1, 1, 0),
      scene,
    );
    const light2: DirectionalLight = new DirectionalLight(
      "light2",
      new Vector3(-1, -2, -1),
      scene,
    );

    const sphere: Mesh = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.5 },
      scene,
    );

    window.addEventListener("keydown", (event) => {
      if (
        event.shiftKey &&
        event.ctrlKey &&
        event.altKey &&
        (event.key === "I" || event.key === "i")
      ) {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });

    this.loadModels(scene);

    const procMesh = new ProcMesh(scene);
    console.log(procMesh.geo);
    // procMesh.geo.parent = scene;

    window.addEventListener("resize", () => {
      engine.resize();
    });

    scene.onPointerDown = (evt, pickInfo) => {
      if (pickInfo?.hit) {
        // console.log(pickInfo, pickInfo.pickedMesh);
        const point = pickInfo.pickedPoint;
        sphere.position = point;

        slabPoints.push(point);

        const marker = MeshBuilder.CreateBox("marker", { size: 0.1 }, scene);
        marker.position = point;
        markers.push(marker);

        /*
        if (slabPoints.length === 4) {
          procMesh.updatePoints(slabPoints);
          slabPoints.length = 0;
        }
        */
      }
    };

    engine.runRenderLoop(() => {
      scene.render();
    });
  }

  private loadModels = async (scene: Scene) => {
    // const model = await AppendSceneAsync("models/hills.glb", scene);
    const model = await ImportMeshAsync("/models/hills_v2.glb", scene);
    console.log(model);
  };
}

new App();

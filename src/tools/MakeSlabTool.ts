import ProcMesh from "../geo/ProcMesh";
import { Tools, ToolBase } from "./ToolBase";
import { ToolManager } from "./ToolManager";
import * as BABYLON from "@babylonjs/core/";

export class MakeSlabTool extends ToolBase {
  public readonly kind: Tools = Tools.Slab;

  private _slabPoints: BABYLON.Vector3[] = [];
  private _markers: BABYLON.Mesh[] = [];

  constructor(toolManager: ToolManager) {
    super(toolManager);
  }

  activate() {
    console.log("make slab tool activated");
  }

  deactivate() {
    console.log("make slab tool deactivated");
  }

  onPointerDown(event: PointerEvent) {
    console.log("pointer down - CREATE SLAB");
  }

  onPointerUp(event: PointerEvent) {
    console.log("pointer up");
  }

  onPointerMove(event: PointerEvent) {
    console.log("pointer move");
  }

  onPickEvent(event: PointerEvent, pickInfo: any): void {
    console.log("pick event - CREATE SLAB", event, pickInfo);

    if (pickInfo?.hit) {
      //TODO: only add point if it's a terrain mesh

      const point = pickInfo.pickedPoint;
      this._slabPoints.push(point);

      const marker = BABYLON.MeshBuilder.CreateBox(
        "marker",
        { size: 0.1, height: 50 },
        this._toolManager.mainScene,
      );
      marker.position = new BABYLON.Vector3(point.x, point.y + 25, point.z);
      this._markers.push(marker);
    }
  }

  finializeTool() {
    console.log("finalize slab tool", this._slabPoints);

    const slabMesh = new ProcMesh(this._toolManager.mainScene);
    slabMesh.updatePoints(this._slabPoints);

    // clear markers and points
    this._markers.forEach((marker) => marker.dispose());
    this._markers = [];
    this._slabPoints = [];

    this._toolManager.popTool();
  }
}

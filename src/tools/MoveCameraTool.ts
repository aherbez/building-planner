import * as BABYLON from "@babylonjs/core";
import { Tools } from "./ToolBase";
import { PlacementTool } from "./PlacementTool";
import { SceneManager } from "../SceneManager";

export class MoveCameraTool extends PlacementTool {
  public readonly kind: Tools = Tools.MoveCamera;
  protected _maxPoints: number = 1;
  private readonly OFFSET = new BABYLON.Vector3(0, 20, -20);

  constructor(toolManager: any) {
    super(toolManager);

    this._instructions = ["Click to move the camera to the clicked location."];
  }

  isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    return true;
  }

  addMarkerAtPoint(point: BABYLON.Vector3) {
    const targetPoint = point.clone();
    SceneManager.camera.setTarget(targetPoint);
    SceneManager.camera.position = targetPoint.add(this.OFFSET);
  }
}

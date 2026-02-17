import { MaterialLibrary, MaterialNames } from "../geo/MaterialLibrary";
import { ToolBase } from "./ToolBase";
import * as BABYLON from "@babylonjs/core";

export class PlacementTool extends ToolBase {
  protected _markers: BABYLON.Mesh[] = [];
  protected _cursor: BABYLON.Mesh | null = null;
  protected _targetPoints: BABYLON.Vector3[] = [];

  protected isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    return true;
  }

  protected clearMarkers() {
    this._markers.forEach((marker) => marker.dispose());
    this._markers = [];
  }

  addMarkerAtPoint(point: BABYLON.Vector3) {
    const marker = BABYLON.MeshBuilder.CreateBox(
      "marker",
      { size: 0.2, height: 50 },
      this._toolManager.mainScene,
    );
    marker.material = MaterialLibrary.getMaterial(MaterialNames.Marker);
    marker.position = new BABYLON.Vector3(point.x, point.y + 25, point.z);
    this._markers.push(marker);
  }

  onPickEvent(event: BABYLON.PointerInfo, pickInfo: any): void {
    console.log("pick event - CREATE SLAB", event, pickInfo);

    if (!this.isValidTargetMesh(pickInfo?.pickedMesh)) {
      return;
    }

    if (pickInfo?.hit) {
      const point = pickInfo.pickedPoint;
      this._targetPoints.push(point);
      this.addMarkerAtPoint(point);
    }
  }

  onActivate() {
    // add a marker to show where the user is pointing
    this._cursor = BABYLON.MeshBuilder.CreateBox(
      "cursor",
      { size: 0.3, height: 50 },
      this._toolManager.mainScene,
    );
    this._cursor.material = new BABYLON.StandardMaterial(
      "cursorMat",
      this._toolManager.mainScene,
    );
    this._cursor.material = MaterialLibrary.getMaterial(MaterialNames.Cursor);
    this._cursor.isPickable = false;
  }

  onDeactivate() {
    this._targetPoints = [];
    this.clearMarkers();
    if (this._cursor) {
      this._cursor.dispose();
      this._cursor = null;
    }
  }

  onPointerMove(event: BABYLON.PointerInfo, pickInfo: any) {
    if (this._cursor) {
      if (pickInfo?.hit && this.isValidTargetMesh(pickInfo?.pickedMesh)) {
        this._cursor.position = new BABYLON.Vector3(
          pickInfo.pickedPoint.x,
          pickInfo.pickedPoint.y + 25,
          pickInfo.pickedPoint.z,
        );
        this._cursor.isVisible = true;
      } else {
        this._cursor.isVisible = false;
      }
    }
  }
}

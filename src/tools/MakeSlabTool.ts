import { MaterialLibrary, MaterialNames } from "../geo/MaterialLibrary";
import SlabMesh from "../geo/SlabMesh";
import { Tools, ToolBase } from "./ToolBase";
import { PlacementTool } from "./PlacementTool";
import * as BABYLON from "@babylonjs/core/";

export class MakeSlabTool extends PlacementTool {
  public readonly kind: Tools = Tools.Slab;

  private _slabPoints: BABYLON.Vector3[] = [];

  protected isValidTargetMesh(mesh: BABYLON.AbstractMesh): boolean {
    return mesh?.metadata?.isTerrain;
  }

  onPickEvent(event: BABYLON.PointerInfo, pickInfo: any): void {
    console.log("pick event - CREATE SLAB", event, pickInfo);

    if (!this.isValidTargetMesh(pickInfo?.pickedMesh)) {
      return;
    }

    if (pickInfo?.hit) {
      //TODO: only add point if it's a terrain mesh

      const point = pickInfo.pickedPoint;
      this._slabPoints.push(point);

      const marker = BABYLON.MeshBuilder.CreateBox(
        "marker",
        { size: 0.2, height: 50 },
        this._toolManager.mainScene,
      );
      marker.material = MaterialLibrary.getMaterial(MaterialNames.Marker);
      marker.position = new BABYLON.Vector3(point.x, point.y + 25, point.z);
      this._markers.push(marker);
    }
  }

  finializeTool() {
    console.log("finalize slab tool", this._slabPoints);

    const slabMesh = new SlabMesh(this._toolManager.mainScene);
    slabMesh.updatePoints(this._slabPoints);

    // clear markers and points
    this._markers.forEach((marker) => marker.dispose());
    this._markers = [];
    this._slabPoints = [];

    this._toolManager.popTool();
  }
}

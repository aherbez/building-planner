import * as BABYLON from "@babylonjs/core";
import { SceneManager } from "../SceneManager";
import { MaterialLibrary, MaterialNames } from "../geo/MaterialLibrary";

const CHUNK_SIZE = [54.084177017211914, 51.02438735961914];

const CLOUDFLARE_BUCKET_URL =
  "https://pub-8ccc6a81589a4dffa880b41a3d3517ca.r2.dev";

export class Terrain {
  constructor() {
    this.loadModels(SceneManager.mainScene);
  }

  private loadTestChunk = async (
    scene: BABYLON.Scene,
    x: number,
    z: number,
  ) => {
    try {
      const model = await BABYLON.ImportMeshAsync(
        `${CLOUDFLARE_BUCKET_URL}/chunks_v2/chunk_${x}_${z}.glb`,
        scene,
      );
      model.meshes.forEach((mesh) => {
        mesh.metadata = {
          isTerrain: true,
        };
        mesh.material = MaterialLibrary.getMaterial(MaterialNames.Bluffs);
      });
    } catch (e) {
      // console.log(`Failed to load chunk at ${x}, ${z}`, e);
    }
  };

  private loadChunk = async (scene: BABYLON.Scene, x: number, z: number) => {
    try {
      const model = await BABYLON.ImportMeshAsync(
        `/models/chunks/chunk_${x}_${z}.glb`,
        scene,
      );
      model.meshes.forEach((mesh) => {
        mesh.metadata = {
          isTerrain: true,
        };
      });
    } catch (e) {}
  };

  private loadModels = async (scene: BABYLON.Scene) => {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 16; y++) {
        await this.loadTestChunk(scene, x, y);
      }
    }
  };
}

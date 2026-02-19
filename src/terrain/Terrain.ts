import * as BABYLON from "@babylonjs/core";
import { SceneManager } from "../SceneManager";

const CHUNK_SIZE = [54.084177017211914, 51.02438735961914];

export class Terrain {
  constructor() {
    this.loadModels(SceneManager.mainScene);
  }

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
        await this.loadChunk(scene, x, y);
      }
    }

    /*
    const model = await BABYLON.ImportMeshAsync(
      "/models/chunks/chunk_4_8.glb",
      scene,
    );
    model.meshes.forEach((mesh) => {
      mesh.metadata = {
        isTerrain: true,
      };
    });
    console.log(model);
    */
  };
}

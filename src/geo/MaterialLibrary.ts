import * as BABYLON from "@babylonjs/core";
import { SceneManager } from "../SceneManager";

export enum MaterialNames {
  Concrete = "concrete",
  ConcreteSmooth = "concrete_smooth",
  Marker = "marker",
  Cursor = "cursor",
  Brick = "brick",
  Bluffs = "bluffs",
}

export interface MaterialOptions {
  diffuseTexture?: string;
  diffuseColor?: BABYLON.Color3;
  specularColor?: BABYLON.Color3;
  emissiveColor?: BABYLON.Color3;
  ambientColor?: BABYLON.Color3;
}

export interface PBRMaterialOptions {
  albedoTexture?: string;
  albedoColor?: BABYLON.Color3;
  reflectivityColor?: BABYLON.Color3;
  reflectivityTexture?: string;
  ambientTexture?: string;
}

export class MaterialLibrary {
  private static _instance: MaterialLibrary;

  private _materials: Map<
    string,
    BABYLON.StandardMaterial | BABYLON.PBRMaterial
  > = new Map();
  private _defaultMaterial: BABYLON.StandardMaterial;

  constructor() {
    console.log("KTX2 decoder available:", !!BABYLON.KhronosTextureContainer2);
    this._defaultMaterial = new BABYLON.StandardMaterial("default", null);
    this._defaultMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    this._defaultMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    this._defaultMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
    this._defaultMaterial.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);
  }

  public static instance(): MaterialLibrary {
    if (!MaterialLibrary._instance) {
      MaterialLibrary._instance = new MaterialLibrary();
    }
    return MaterialLibrary._instance;
  }

  public static getMaterial(
    name: string,
  ): BABYLON.StandardMaterial | BABYLON.PBRMaterial {
    return (
      MaterialLibrary.instance()._materials.get(name) ||
      MaterialLibrary.instance()._defaultMaterial
    );
  }

  public static createAndRegisterMaterial(
    name: string,
    options: MaterialOptions,
  ): void {
    const mat = new BABYLON.StandardMaterial(name, SceneManager.mainScene);

    if (options.diffuseTexture) {
      mat.diffuseTexture = new BABYLON.Texture(
        options.diffuseTexture,
        SceneManager.mainScene,
      );
    }
    if (options.diffuseColor) {
      mat.diffuseColor = options.diffuseColor ?? new BABYLON.Color3(1, 1, 1);
    }
    if (options.specularColor) {
      mat.specularColor = options.specularColor ?? new BABYLON.Color3(0, 0, 0);
    }
    if (options.emissiveColor) {
      mat.emissiveColor = options.emissiveColor ?? new BABYLON.Color3(0, 0, 0);
    }
    if (options.ambientColor) {
      mat.ambientColor = options.ambientColor ?? new BABYLON.Color3(0, 0, 0);
    }

    MaterialLibrary.registerMaterial(name, mat);
  }

  public static createAndRegisterPBRMaterial(
    name: string,
    options: PBRMaterialOptions,
  ): void {
    const mat = new BABYLON.PBRMaterial(name, SceneManager.mainScene);
    mat.metallic = 0;
    mat.roughness = 0.8;

    if (options.albedoTexture) {
      const tex = new BABYLON.Texture(
        options.albedoTexture,
        SceneManager.mainScene,
        {
          invertY: false,
        },
      );
      mat.albedoTexture = tex;
    }
    if (options.reflectivityTexture) {
      mat.reflectivityTexture = new BABYLON.Texture(
        options.reflectivityTexture,
        SceneManager.mainScene,
        {
          invertY: false,
        },
      );
    }
    if (options.ambientTexture) {
      mat.ambientTexture = new BABYLON.Texture(
        options.ambientTexture,
        SceneManager.mainScene,
        {
          invertY: false,
        },
      );
    }
    MaterialLibrary.registerMaterial(name, mat);
  }

  public static registerMaterial(
    name: string,
    material: BABYLON.StandardMaterial | BABYLON.PBRMaterial,
  ): void {
    MaterialLibrary.instance()._materials.set(name, material);
  }
}

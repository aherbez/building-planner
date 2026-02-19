import * as BABYLON from "@babylonjs/core";

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
    // const mat = new BABYLON.PBRMaterial(name, null);
    const mat = new BABYLON.StandardMaterial(name, null);

    if (options.diffuseTexture) {
      mat.diffuseTexture = new BABYLON.Texture(options.diffuseTexture, null);
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
    const mat = new BABYLON.PBRMaterial(name, null);
    // const mat = new BABYLON.StandardMaterial(name, null);

    if (options.albedoTexture) {
      mat.albedoTexture = new BABYLON.Texture(options.albedoTexture, null);
    }
    if (options.albedoColor) {
      mat.albedoColor = options.albedoColor ?? new BABYLON.Color3(1, 1, 1);
    }
    if (options.reflectivityColor) {
      mat.reflectivityColor = options.reflectivityColor;
    }
    if (options.reflectivityTexture) {
      mat.reflectivityTexture = new BABYLON.Texture(
        options.reflectivityTexture,
        null,
      );
    }
    if (options.ambientTexture) {
      mat.ambientTexture = new BABYLON.Texture(options.ambientTexture, null);
    }
    /*
    if (options.specularColor) {
      mat.specularIntensity= options.specularColor ?? new BABYLON.Color3(0, 0, 0);
    }
    if (options.emissiveColor) {
      mat.emissiveColor = options.emissiveColor ?? new BABYLON.Color3(0, 0, 0);
    }
    if (options.ambientColor) {
      mat.ambientColor = options.ambientColor ?? new BABYLON.Color3(0, 0, 0);
    }
    */

    MaterialLibrary.registerMaterial(name, mat);
  }

  public static registerMaterial(
    name: string,
    material: BABYLON.StandardMaterial | BABYLON.PBRMaterial,
  ): void {
    MaterialLibrary.instance()._materials.set(name, material);
  }
}

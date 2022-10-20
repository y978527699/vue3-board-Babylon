import { Mesh, Scene } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";

export class partStore {
  scene;
  constructor(scene: Scene) {
    this.scene = scene;
  }

  pipePart(height: number = 400, diameter: number = 60) {
    let cylinder = BABYLON.MeshBuilder.CreateCylinder(
      "cylinder",
      { height, diameter },
      this.scene
    );
    const cylMaterial = new BABYLON.StandardMaterial("cylMaterial", this.scene);
    cylMaterial.diffuseTexture = new BABYLON.Texture(
      "https://img2.baidu.com/it/u=3167412554,2425619194&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=497",
      this.scene
    );
    cylinder.material = cylMaterial;

    let partHole = BABYLON.MeshBuilder.CreateCylinder(
      "partHole",
      { height: 15, diameter: 8 },
      this.scene
    );
    partHole.position.y = -height / 2 + 7.5;
    partHole.setParent(cylinder);
    let margin = diameter / 4;
    let partHole1 = partHole.clone("partHole1");
    let partHole2 = partHole.clone("partHole2");
    partHole.position.x -= margin;
    partHole.position.z = margin;
    partHole1.position.x += margin;
    partHole1.position.z = margin;
    partHole2.position.x = 0;
    partHole2.position.z -= margin;

    cylinder.setEnabled(false)
    let boxCSG = BABYLON.CSG.FromMesh(cylinder);
    let holeCSG = BABYLON.CSG.FromMesh(partHole);
    let holeCSG1 = BABYLON.CSG.FromMesh(partHole1);
    let holeCSG2 = BABYLON.CSG.FromMesh(partHole2);
    boxCSG = boxCSG.subtract(holeCSG);
    boxCSG = boxCSG.subtract(holeCSG1);
    boxCSG = boxCSG.subtract(holeCSG2);
    cylinder = boxCSG.toMesh("csgBox");

    return cylinder as Mesh;
  }
}

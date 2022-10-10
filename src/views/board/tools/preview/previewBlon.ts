import { Engine, Scene } from "@babylonjs/core";
import * as BABYLON from '@babylonjs/core'

export class previewBlon {
    canvas
    engine
    scene
    camera
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(){
    const scene = new Scene(this.engine)

    let camera = new BABYLON.ArcRotateCamera(
        "cmera",
        -Math.PI / 2,
        Math.PI / 2,
        500,
        new BABYLON.Vector3(200, 150, 100),
        this.scene
      );
    //   camera.setTarget(BABYLON.Vector3.Zero());
      camera.attachControl(this.canvas, true);
  
    //   this.camera = camera;
  
    //   //灯光
    //   new BABYLON.HemisphericLight(
    //     "light1",
    //     new BABYLON.Vector3(800, 2, 0),
    //     scene
    //   );
  
    //   var light = new BABYLON.PointLight(
    //     "pointLight",
    //     new BABYLON.Vector3(-100, 1500, 300),
    //     scene
    //   );
    //   light.intensity = 0.7;

      let box1 = BABYLON.MeshBuilder.CreateBox('box1',{width: 600,height: 100,depth: 100},scene)

    return scene
  }
}

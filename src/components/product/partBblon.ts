import { Engine, Scene } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { partStore } from "@/views/board/core/partStore";

export class partBblon {
  partCan;
  partScene;
  engine;
  pipe;
  constructor(partCan: HTMLCanvasElement) {
    this.partCan = partCan;
    this.engine = new Engine(this.partCan, true);
    this.partScene = this.CreateScene();
    this.engine.runRenderLoop(() => {
      this.partScene.render();
    });

    let part = new partStore(this.partScene);
    let pipe = part.pipePart();
    pipe.rotation.z = 45;
    this.pipe = pipe;
  }

  camera;
  CreateScene() {
    const partScene = new Scene(this.engine);
    partScene.clearColor = new BABYLON.Color4(0, 0, 0, 0.1);
    let camera = new BABYLON.ArcRotateCamera(
      "cmera",
      -Math.PI / 2,
      Math.PI / 2,
      500,
      new BABYLON.Vector3(200, 150, 100),
      this.partScene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this.partCan, true);
    //修改滚轮敏感
    camera.wheelPrecision = 0.3;
    //修改平滑敏感
    camera.panningSensibility = 5;

    camera.useAutoRotationBehavior = true;
    camera.autoRotationBehavior.idleRotationSpeed += 0.5;

    this.camera = camera;

    partScene.onPointerObservable.add((info) => {
      // console.log(info);
    });

    //灯光
    new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(800, 2, 0),
      partScene
    );

    var light = new BABYLON.PointLight(
      "pointLight",
      new BABYLON.Vector3(-100, 1500, 300),
      partScene
    );
    light.intensity = 0.5;

    return partScene;
  }
}

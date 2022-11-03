import { Engine, Mesh, Scene } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import {
  AdvancedDynamicTexture,
  Control,
  InputText,
  StackPanel,
} from "@babylonjs/gui";

export default class cabBblon {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  camera;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  selectBoard;
  CreateScene() {
    const scene = new Scene(this.engine);

    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.1);

    const localAxes = new BABYLON.AxesViewer(scene, 200);
    const camera = this.createCamera();
    const light = this.createLight();

    this.createCab();

    let hiLight = new BABYLON.HighlightLayer("hl", scene);

    scene.onPointerObservable.add((pointerInfo) => {
      let pickMesh = pointerInfo.pickInfo
        ? pointerInfo.pickInfo.pickedMesh
        : null;
      if (pointerInfo.type == 64) {
        hiLight.removeAllMeshes();
        pointerInfo.pickInfo.pickedMesh.material.alpha = 0.5;
        hiLight.addMesh(pickMesh as Mesh, new BABYLON.Color3(0, 255, 0));

        // this.createCabGUI(pickMesh);
      }

      if (pointerInfo.type == 1) {
        if (pickMesh == null) {
          hiLight.removeAllMeshes();
        }
      }
    });

    return scene;
  }

  board(name: string, width: number, height: number, depth: number) {
    const corners = new BABYLON.Path2(0, 0);
    corners.addLineTo(width, 0);
    corners.addLineTo(width, depth);
    corners.addLineTo(0, depth);
    const poly_Box = new BABYLON.PolygonMeshBuilder(
      name,
      corners,
      this.scene,
      earcut
    );
    let board = poly_Box.build(true, height);
    let material = new BABYLON.StandardMaterial("boartMat", this.scene);
    material.diffuseTexture = new BABYLON.Texture(
      "https://img0.baidu.com/it/u=3722085479,542006090&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=600",
      this.scene
    );
    board.material = material;

    return board;
  }

  // board(name: string, width: number, height: number, depth: number) {
  //   const corners = [
  //     new BABYLON.Vector2(0, 0),
  //     new BABYLON.Vector2(width, 0),
  //     new BABYLON.Vector2(width, depth),
  //     new BABYLON.Vector2(0, depth),
  //   ];

  //   //创建多边形网格
  //   const poly = new BABYLON.PolygonMeshBuilder(
  //     "poly",
  //     corners,
  //     this.scene,
  //     earcut
  //   );
  //   const polygon = poly.build(true, height);
  //   return polygon;
  // }

  botBoard: Mesh;
  leftBoard: Mesh;
  rightBoard: Mesh;
  topBoard: Mesh;
  backBoard: Mesh;
  Cab: Mesh[] = [];
  hard: Mesh[] = [];
  width = 1200;
  depth = 800;
  createCab() {
    let btW: number = 1200;
    let btD: number = 800;
    let btH: number = 18;
    let lrW: number = 2400;
    let lrD: number = 800;
    let lrH: number = 18;
    let backW: number = 1200;
    let backH: number = 18;
    let backD: number = 2400;
    let botBoard = this.board("botBoard", btW, btH, btD);
    let topBoard = botBoard.clone("topBoard");
    topBoard.setParent(botBoard);
    topBoard.position.y += lrW;
    let leftBoard = this.board("leftBoard", lrW, lrH, lrD);
    leftBoard.setParent(botBoard);
    leftBoard.rotation.z = Math.PI / 2;
    let rightBoard = leftBoard.clone("rightBoard");
    rightBoard.setParent(botBoard);
    rightBoard.rotation.z = Math.PI / 2;
    rightBoard.position.x = btW - lrH;
    let backBoard = this.board("backBoard", backW, backH, backD);
    backBoard.rotation.x = Math.PI / 2;
    backBoard.position.y = lrW;
    backBoard.position.z = btD;

    this.botBoard = botBoard;
    this.leftBoard = leftBoard;
    this.rightBoard = rightBoard;
    this.topBoard = topBoard;
    this.backBoard = backBoard;
    this.Cab.push(botBoard, leftBoard, rightBoard, topBoard, backBoard);
    this.hard.push(botBoard, topBoard);
  }

  createCamera() {
    let camera = new BABYLON.ArcRotateCamera(
      "cmera",
      -Math.PI / 2,
      Math.PI / 2,
      2400,
      new BABYLON.Vector3(1500, 3000, 0),
      this.scene
    );
    camera.setTarget(new BABYLON.Vector3(600, 1200, 400));
    camera.attachControl(this.canvas, true);
    camera.wheelPrecision = 0.3;
    camera.panningSensibility = 5;

    this.camera = camera;
  }

  createLight() {
    //灯光
    new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(800, 2, 0),
      this.scene
    );

    var light = new BABYLON.PointLight(
      "pointLight",
      new BABYLON.Vector3(-100, 1500, 300),
      this.scene
    );
    light.intensity = 0.7;
  }

  addHardware() {
    this.Cab.forEach((item) => {
      item.material.alpha = 0.5;
    });
    this.hard.forEach((item) => {
      let hardL1 = BABYLON.MeshBuilder.CreateCylinder(
        "hardL1",
        { diameter: 15, height: 50 },
        this.scene
      );
      let hardMat = new BABYLON.StandardMaterial("hardMat", this.scene);
      hardMat.diffuseColor = new BABYLON.Color3(255, 255, 0);
      hardMat.alpha = 0.5;
      hardL1.material = hardMat;
      hardL1.setParent(item);
      hardL1.rotation.z = Math.PI / 2;
      hardL1.position = new BABYLON.Vector3(25, -9, this.depth / 3);

      let hardR1 = hardL1.clone("hardR");
      hardR1.position.x = this.width - 32;
      let hardL2 = hardL1.clone("hardL2");
      hardL2.position.z = this.depth / 1.5;
      let hardR2 = hardR1.clone("hardR2");
      hardR2.position.z = this.depth / 1.5;
    });
  }

  advancedTexture;
  createCabGUI(mesh) {
    // let width = mesh.getWorldMatrix().m[14];
    // let depth = mesh.getWorldMatrix().m[12];
    // let height = mesh.getWorldMatrix().m[13];
    var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new StackPanel();
    panel.width = "150px";
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

    const widthInp = new InputText();
    widthInp.width = "150px";
    widthInp.height = "50px";
    widthInp.text = "长度: 1200";
    widthInp.color = "white";
    widthInp.focusedBackground = "orange";
    widthInp.background = "chocolate ";
    // widthInp.onBlurObservable.add((itemInp1) => {
    //   width = Number(itemInp1.text.slice(7));
    //   ground.scaling = new BABYLON.Vector3(width / 40, 1, height / 30);
    //   widthInp.text = `width: ${itemInp1.text.slice(7)}`;
    // });
    panel.addControl(widthInp);

    const depthInp = new InputText();
    depthInp.width = "150px";
    depthInp.height = "50px";
    depthInp.text = "宽度: 800";
    depthInp.color = "white";
    depthInp.focusedBackground = "orange";
    depthInp.background = "chocolate";
    // heightInp.onBlurObservable.add((itemInp2) => {
    //   height = Number(itemInp2.text.slice(7));
    //   ground.scaling = new BABYLON.Vector3(width / 40, 1, height / 30);
    //   heightInp.text = `height:${itemInp2.text.slice(7)}`;
    // });
    panel.addControl(depthInp);

    const heightInp = new InputText();
    heightInp.width = "150px";
    heightInp.height = "50px";
    heightInp.text = "厚度: 18";
    heightInp.color = "white";
    heightInp.focusedBackground = "orange";
    heightInp.background = "chocolate";
    // heightInp.onBlurObservable.add((itemInp2) => {
    //   height = Number(itemInp2.text.slice(7));
    //   ground.scaling = new BABYLON.Vector3(width / 40, 1, height / 30);
    //   heightInp.text = `height:${itemInp2.text.slice(7)}`;
    // });
    panel.addControl(heightInp);

    advancedTexture.addControl(panel);
    this.advancedTexture = advancedTexture;
  }
}

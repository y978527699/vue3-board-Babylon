import {
  Scene,
  Engine,
  Mesh,
  ArcRotateCamera,
  VertexData,
  PolygonMeshBuilder,
  Vector3,
  HighlightLayer,
} from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Rectangle,
  StackPanel,
  Ellipse,
  Line,
  InputText,
} from "@babylonjs/gui";
import earcut from "earcut";
import { ElMessage, ElMessageBox } from "element-plus";
export class BabylonHandle {
  scene: Scene;
  engine: Engine;
  width: number;
  height: number;
  depth: number;
  box: Mesh;
  // matPath: string = "http://localhost:8080/src/assets/images/mat1.png";
  boxMaterial;
  newMesh;
  camera: ArcRotateCamera;
  editBox: Mesh;
  editHoleBox: Mesh;
  canvas: HTMLCanvasElement;
  holeWidth;
  holeHeight;
  holeDepth;
  x: number;
  mesxInp;
  mesyInp;
  holeMesh: String;
  holeArr: Mesh[] = [];
  hl: HighlightLayer;
  selectMesh: Mesh[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    // const localAxes = new BABYLON.AxesViewer(scene, 50);

    let camera = new BABYLON.ArcRotateCamera(
      "cmera",
      -Math.PI / 2,
      Math.PI / 2,
      500,
      new BABYLON.Vector3(200, 150, 100),
      this.scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this.canvas, true);

    this.camera = camera;

    //灯光
    new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(800, 2, 0),
      scene
    );

    var light = new BABYLON.PointLight(
      "pointLight",
      new BABYLON.Vector3(-100, 1500, 300),
      scene
    );
    light.intensity = 0.7;

    let boxMaterial = new BABYLON.StandardMaterial("boxMaterial", this.scene);
    // boxMaterial.diffuseTexture = new BABYLON.Texture(this.matPath, this.scene);
    boxMaterial.diffuseTexture = new BABYLON.Texture(
      "https://img0.baidu.com/it/u=3722085479,542006090&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=600",
      this.scene
    );
    this.boxMaterial = boxMaterial;

    scene.onPointerPick = function(e, p) {
      //案件e.inputIndex 值为2（左键） 值为4（右键）
      // if (e.inputIndex == 4) {
      // }
    };

    scene.onKeyboardObservable.add((keyBoardInfo) => {
      if (keyBoardInfo.event.key == "Control") {
        if (keyBoardInfo.type == 1) {
          scene.onPointerDown = (e, pickInfo) => {
            if (this.hl) {
              this.hl.addMesh(
                pickInfo.pickedMesh as Mesh,
                BABYLON.Color3.Green()
              );
              let ind = this.selectMesh.indexOf(pickInfo.pickedMesh as Mesh);
              if (ind == -1) {
                this.selectMesh.push(pickInfo.pickedMesh as Mesh);
              } else {
                this.selectMesh.splice(ind, 1);
                this.hl.removeMesh(pickInfo.pickedMesh as Mesh)
              }
              console.log(this.selectMesh);
            }
          };
        } else {
          scene.onPointerDown = null;
        }
      }
    });

    //监听鼠标点击事件
    scene.onPointerObservable.add((pointerInfo) => {
      let pickMesh = pointerInfo.pickInfo.pickedMesh as Mesh;
      
      if (
        pickMesh != null &&
        pointerInfo.type == 64 &&
        pickMesh?.name !== "editBox" &&
        pickMesh?.name !== "box"
      ) {
        this.hl && this.hl.removeAllMeshes();
        //选中高光
        this.hl = new BABYLON.HighlightLayer("hl", scene);
        this.hl.addMesh(pickMesh, BABYLON.Color3.Green());
        this.selectMesh[0] = pickMesh;
        this.selectMesh.splice(1, this.selectMesh.length);
      }

      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:

          if (
            (pointerInfo.pickInfo!.hit && pickMesh?.name == "poly") ||
            pickMesh?.name == "cylinder"
          ) {
            if(this.selectMesh.length > 1){
              this.currentParent && this.clearChild(this.currentParent)
              let ind = this.selectMesh.indexOf(pickMesh)
              
              this.currentParent = ind
              // this.addSeleChild(ind)
              this.pointerDown(pickMesh)
            }else{
              this.pointerDown(pickMesh);
            }
          }
          if (pickMesh == null || pickMesh?.name == "editBox") {
            this.hl && this.hl.removeAllMeshes();
            this.selectMesh = [];
          }

          break;
        case BABYLON.PointerEventTypes.POINTERUP:
          this.pointerUp();
          break;
        case BABYLON.PointerEventTypes.POINTERMOVE:
          this.pointerMove();
          break;
      }
    });
    return scene;
  }

  currentParent
  clearChild(ind){
    let arr = this.selectMesh[ind].getChildMeshes()
    arr.forEach(item => {
      this.selectMesh[ind].removeChild(item)
    })
    console.log(this.selectMesh[ind].getChildMeshes())
  }
  addSeleChild(ind){
    for(let i = 0; i < this.selectMesh.length; i++){
      if(ind == i){continue}
      this.selectMesh[ind].addChild(this.selectMesh[i])
    }
  }

  //创建初始板材
  createInitialBox(width: number, height: number, depth: number): Mesh {
    this.width = Number(width);
    this.height = Number(height);
    this.depth = Number(depth);
    let box = BABYLON.MeshBuilder.CreateBox(
      "box",
      { width, height, depth },
      this.scene
    );
    this.box = box;
    this.box.material = this.boxMaterial;

    //根据板材修改camera
    let maxData = Math.max(this.width, this.height, this.depth);
    this.camera.radius = maxData * 2;
    this.camera.wheelPrecision = 0.3;
    this.camera.panningSensibility = 5;

    return box;
  }

  //改变视角
  changeView({ alpha, beta }) {
    //判断是改变alpha还是beta
    if (alpha !== -1) {
      this.camera.alpha = alpha;
    }
    if (beta !== -1) {
      this.camera.beta = beta;
    }
  }

  //编辑模式下的视图
  editPatterm() {
    if (this.editBox && this.editHoleBox) {
      this.editBox.isVisible = true;
      this.editHoleBox.isVisible = true;
      this.box.isVisible = false;
      this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
      this.getBoxPosition();
      this.createBoxMesLine();
      this.createHoleGUI(this.editHoleBox);
      return;
    }
    let editBox = this.box.clone("editBox");
    this.editBox = editBox;

    this.box.setEnabled(false);

    //创建槽BOX
    this.createHole(400, 400, 18, "矩形");

    //创建可输入面板
    this.createHoleGUI(this.editHoleBox);

    //创建标注系统
    // this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth);
    this.createBoxMesLine();
  }

  startingPoint;
  currentMesh: Mesh;
  startPosition;
  //拖动行为方法
  getBoxPosition() {
    var pickinfo = this.scene.pick(
      this.scene.pointerX,
      this.scene.pointerY,
      (mesh) => {
        return mesh == this.editBox;
      }
    );
    if(this.currentMesh == this.editHoleBox){
      this.holeDisArr = this.createGrooMeasureLine(this.currentMesh,this.holeWidth,this.holeDepth,this.holeDisArr)
    }else if(this.currentMesh == this.part){
      this.partDisArr = this.createGrooMeasureLine(this.currentMesh,this.partWidth,this.parDepth,this.partDisArr)
    }

    //变更前更改测试线
    // this.partDisArr = this.createGrooMeasureLine(this.part as Mesh,60,60,this.partDisArr)
    // //根据拖动位置修改测试盒子的位置、大小
    // //调整X
    // let newXLength =
    //   this.editHoleBox.getWorldMatrix().m[12] + Number(this.width) / 2;
    // this.mesXBox.scaling = new BABYLON.Vector3(
    //   (newXLength - this.holeWidth / 2) / this.xBoxLength,
    //   1,
    //   1
    // );
    // let xboxLength = newXLength - this.holeWidth / 2;
    // this.mesXBox.position.x = -(xboxLength / 2 + this.holeWidth / 2);
    // //修改侧方标注数据
    // this.mesxInp.text = `${Math.ceil(newXLength - this.holeWidth / 2)}`;

    // //调整Y
    // let newYLength =
    //   this.editHoleBox.getWorldMatrix().m[14] + Number(this.depth) / 2;
    // this.mesYBox.scaling = new BABYLON.Vector3(
    //   1,
    //   1,
    //   (newYLength - this.holeDepth / 2) / this.yBoxLength
    // );
    // let yboxLength = newYLength - this.holeDepth / 2;
    // this.mesYBox.position.z = -(yboxLength / 2 + this.holeDepth / 2);
    // this.yboxLength = yboxLength;
    // this.xboxLength = xboxLength;
    // //修改下方标注数据
    // this.mesyInp.text = `${Math.ceil(newYLength - this.holeDepth / 2)}`;

    if (pickinfo?.hit) {
      return pickinfo?.pickedPoint;
    }

    return null;
  }
  yboxLength;
  xboxLength;

  pointerDown(mesh) {
    this.currentMesh = mesh;
    this.startingPoint = this.getBoxPosition();

    if (this.startingPoint) {
      // we need to disconnect camera from canvas
      setTimeout(() => {
        // this.camera.detachControl(this.canvas);
        // this.scene.detachControl()
        this.camera.detachControl();
      }, 0);
    }
    // if (
    //   this.yboxLength >= 0 &&
    //   this.xboxLength >= 0 &&
    //   this.yboxLength <= this.depth - this.holeDepth &&
    //   this.xboxLength <= this.width - this.holeWidth
    // ) {
    //   this.startPosition = {
    //     x: this.currentMesh.position.x,
    //     y: this.currentMesh.position.y,
    //     z: this.currentMesh.position.z,
    //   };
    // }
  }

  pointerUp() {
    if (this.startingPoint) {
      // if (
      //   this.yboxLength < 0 ||
      //   this.xboxLength < 0 ||
      //   this.yboxLength > this.depth - this.holeDepth ||
      //   this.xboxLength > this.width - this.holeWidth
      // ) {
      //   this.currentMesh.position.x = this.startPosition.x;
      //   this.currentMesh.position.z = this.startPosition.z;
      //   this.currentMesh.position.y = this.startPosition.y;
      //   this.createGrooMeasureLine();
      //   ElMessageBox.confirm("不可超过板材大小", "提示", {
      //     confirmButtonText: "确认",
      //     type: "warning",
      //   }).then(() => {
      //     this.getBoxPosition();
      //     ElMessage({
      //       type: "warning",
      //       message: "移动失败",
      //     });
      //   });
      // }

      this.camera.attachControl(this.canvas, true);
      this.startingPoint = null;
      this.startPosition = null;
      return;
    }
  }

  pointerMove() {
    if (!this.startingPoint) {
      return;
    }
    var current = this.getBoxPosition();
    if (!current) {
      return;
    }
    var diff = current.subtract(this.startingPoint);

    this.currentMesh.position.addInPlace(diff);

    this.startingPoint = current;
  }

  panelAdvancedTexture: AdvancedDynamicTexture;
  //创建用户交互槽
  createHoleGUI(mesh) {
    this.panelAdvancedTexture && this.panelAdvancedTexture.dispose();
    var panelAdvancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const oriWidth = this.holeWidth;
    const oriDepth = this.holeDepth;
    const oriHeight = this.holeHeight;
    let y2 = 75;

    // 可输入面板
    var panel = new StackPanel();
    var line = new Line();
    var target = new Ellipse();

    panel.width = "150px";

    if (this.holeMesh == "圆形") {
      y2 = 50;
      //半径
      const radiusInp = new InputText();
      radiusInp.width = "150px";
      radiusInp.height = "50px";
      radiusInp.text = `半径: ${this.holeWidth / 2}`;
      radiusInp.color = "white";
      radiusInp.focusedBackground = "#3f3f3f";
      radiusInp.background = "#808080 ";

      radiusInp.onBlurObservable.add((itemInp1) => {
        let inpWidth = Number(itemInp1.text.slice(3)) * 2;
        let mesh = this.createHole(
          inpWidth,
          inpWidth,
          this.holeHeight,
          this.holeMesh
        );
        target.linkWithMesh(mesh);
        panel.linkWithMesh(mesh);
        line.linkWithMesh(mesh);
        this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
      });
      panel.addControl(radiusInp);
    } else {
      //槽长
      const widthInp = new InputText();
      widthInp.width = "150px";
      widthInp.height = "50px";
      widthInp.text = `长度: ${this.holeWidth}`;
      widthInp.color = "white";
      widthInp.focusedBackground = "#3f3f3f";
      widthInp.background = "#808080 ";

      widthInp.onBlurObservable.add((itemInp1) => {
        let inpWidth = Number(itemInp1.text.slice(3));
        let mesh = this.createHole(
          inpWidth,
          this.holeDepth,
          this.holeHeight,
          this.holeMesh
        );
        target.linkWithMesh(mesh);
        panel.linkWithMesh(mesh);
        line.linkWithMesh(mesh);
        this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
      });
      panel.addControl(widthInp);

      //槽宽
      const depthtInp = new InputText();
      depthtInp.width = "150px";
      depthtInp.height = "50px";
      depthtInp.text = `宽度: ${this.holeDepth}`;
      depthtInp.color = "white";
      depthtInp.focusedBackground = "#3f3f3f";
      depthtInp.background = "#808080";

      depthtInp.onBlurObservable.add((itemInp2) => {
        let inpDepth = Number(itemInp2.text.slice(3));
        let mesh = this.createHole(
          this.holeWidth,
          inpDepth,
          this.holeHeight,
          this.holeMesh
        );
        target.linkWithMesh(mesh);
        panel.linkWithMesh(mesh);
        line.linkWithMesh(mesh);
        this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
      });
      panel.addControl(depthtInp);
    }

    //槽厚
    const heightInp = new InputText();
    heightInp.width = "150px";
    heightInp.height = "50px";
    heightInp.text = `厚度: ${oriHeight}`;
    heightInp.color = "white";
    heightInp.focusedBackground = "#3f3f3f";
    heightInp.background = "#808080 ";

    heightInp.onBlurObservable.add((itemInp1) => {
      let inpHeight = Number(itemInp1.text.slice(3));
      let mesh = this.createHole(
        this.holeWidth,
        this.holeDepth,
        inpHeight,
        this.holeMesh
      );
      target.linkWithMesh(mesh);
      panel.linkWithMesh(mesh);
      line.linkWithMesh(mesh);
      this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
    });
    panel.addControl(heightInp);

    let panelOffY = -150;
    let panelOffX = 0;

    panelAdvancedTexture.addControl(panel);
    panel.linkWithMesh(mesh);
    panel.linkOffsetY = panelOffY;
    panel.linkOffsetX = panelOffX;
    panel.alpha = 0.5;

    //标注点
    target.width = "10px";
    target.height = "5px";
    target.background = "Orange";
    panelAdvancedTexture.addControl(target);
    target.linkWithMesh(mesh);

    //连接线
    line.lineWidth = 4;
    line.color = "Orange";
    line.y2 = y2;
    // line.linkOffsetY = -10;
    line.alpha = 0.5;
    panelAdvancedTexture.addControl(line);
    line.linkWithMesh(mesh);
    line.connectedControl = panel;

    this.panelAdvancedTexture = panelAdvancedTexture;
  }

  // mesXBox: Mesh;
  // mesYBox: Mesh;
  // xBoxLength: number;
  // yBoxLength: number;
  // mesAdvancedTexture: AdvancedDynamicTexture;
  // //创建槽标注线
  // createGrooMeasureLine() {
  //   if (this.mesAdvancedTexture) {
  //     this.mesAdvancedTexture.dispose();
  //     this.mesXBox.dispose();
  //     this.mesYBox.dispose();
  //   }
  //   //侧面假量尺
  //   let xBoxLength = (this.width - this.holeWidth) / 2;
  //   let mesXBox = BABYLON.MeshBuilder.CreateBox(
  //     "mesXBox",
  //     { width: xBoxLength, height: 5, depth: 5 },
  //     this.scene
  //   );

  //   mesXBox.setParent(this.editHoleBox);
  //   mesXBox.position = new BABYLON.Vector3(
  //     -xBoxLength / 2 - this.holeWidth / 2,
  //     10,
  //     0
  //   );

  //   this.mesXBox = mesXBox;
  //   this.xBoxLength = xBoxLength;
  //   this.createPun(mesXBox, xBoxLength, 0, 0);

  //   //底部假量尺
  //   let yBoxLength = (Number(this.depth) - Number(this.holeDepth)) / 2;
  //   let mesYBox = BABYLON.MeshBuilder.CreateBox("mesYBox", {
  //     width: 5,
  //     height: 5,
  //     depth: yBoxLength,
  //   });
  //   mesYBox.setParent(this.editHoleBox);
  //   mesYBox.position = new BABYLON.Vector3(
  //     0,
  //     10,
  //     -yBoxLength / 2 - this.holeDepth / 2
  //   );
  //   this.mesYBox = mesYBox;
  //   this.yBoxLength = yBoxLength;
  //   this.createPun(mesYBox, 0, 0, yBoxLength);

  //   //创建可输入槽距数据展示
  //   let mesAdvancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
  //     "mesAdvancedTexture"
  //   );

  //   let rectx = new Rectangle();
  //   rectx.width = "50px";
  //   rectx.height = "20px";
  //   rectx.cornerRadius = 20;
  //   rectx.background = "#808080";
  //   rectx.alpha = 0.5;
  //   mesAdvancedTexture.addControl(rectx);
  //   rectx.linkWithMesh(mesXBox);
  //   rectx.linkOffsetY = -15;

  //   let mesxInp = new InputText();
  //   mesxInp.text = `${xBoxLength}`;
  //   mesxInp.color = "white";
  //   mesxInp.focusedBackground = "#3f3f3f";
  //   mesxInp.background = "#808080 ";
  //   mesxInp.thickness = 0;
  //   mesxInp.onBlurObservable.add((mesXItem) => {
  //     let newXLength = Number(mesXItem.text);
  //     this.mesXBox.scaling = new BABYLON.Vector3(
  //       newXLength / this.xBoxLength,
  //       1,
  //       1
  //     );
  //     this.editHoleBox.position.x =
  //       newXLength + this.holeWidth / 2 - Number(this.width) / 2;

  //     this.mesXBox.position.x = -(newXLength / 2 + this.holeWidth / 2);
  //     // mesxInp.text = mesXItem.text
  //   });
  //   rectx.addControl(mesxInp);
  //   this.mesxInp = mesxInp;

  //   let recty = new Rectangle();
  //   recty.width = "50px";
  //   recty.height = "20px";
  //   recty.cornerRadius = 20;
  //   recty.background = "#808080";
  //   recty.alpha = 0.5;
  //   mesAdvancedTexture.addControl(recty);
  //   recty.linkWithMesh(mesYBox);
  //   recty.linkOffsetX = 30;

  //   let mesyInp = new InputText();
  //   mesyInp.text = `${yBoxLength}`;
  //   mesyInp.color = "white";
  //   mesyInp.focusedBackground = "#3f3f3f";
  //   mesyInp.background = "#808080 ";
  //   mesyInp.thickness = 0;
  //   mesyInp.onBlurObservable.add((mesYItem) => {
  //     let newYLength = Number(mesYItem.text);
  //     this.mesYBox.scaling = new BABYLON.Vector3(
  //       1,
  //       1,
  //       newYLength / this.yBoxLength
  //     );
  //     this.editHoleBox.position.z =
  //       newYLength + this.holeDepth / 2 - Number(this.depth) / 2;

  //     this.mesYBox.position.z = -(newYLength / 2 + this.holeDepth / 2);
  //     // mesyInp.text = mesYItem.text
  //   });
  //   recty.addControl(mesyInp);
  //   this.mesyInp = mesyInp;
  //   this.mesAdvancedTexture = mesAdvancedTexture;
  // }

  updateVertex(mesh: Mesh, size, direction) {
    //   let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind) as any[]

    //   let vertices: Vector3[] = []
    //   for(let n = 0; n < positions!.length; n += 3){
    //     vertices.push(BABYLON.Vector3.FromArray(positions,n))
    //   }
    //   const cornerCount = vertices.length / 3

    //   const sets: any[] = []
    //   for(let n = 0; n < cornerCount; n++){
    //     const set = [n];
    //     for(let n2 = 10; n2 < vertices.length; n2++){
    //         if(vertices[n].equals(vertices[n2]))
    //             set.push(n2);
    //     }
    //     sets.push(set)
    // }
    // console.log(vertices);
    // switch(direction){
    //   case 'width':
    //   [0,1,2,3].map(tl => sets[tl]).flat().forEach(tl => vertices[tl].x -= size)
    //   console.log(vertices);

    //     break;
    //   case 'height': break;
    //   case 'depth': break;
    // }

    // vertices.forEach((v,n) => v.toArray(positions, n*3))

    let positions = this.editBox.getVerticesData(
      BABYLON.VertexBuffer.PositionKind
    ) as any[];

    let vertices: Vector3[] = [];
    for (let n = 0; n < positions!.length; n += 3) {
      vertices.push(BABYLON.Vector3.FromArray(positions, n));
    }
    const cornerCount = vertices.length / 3;

    const sets: any[] = [];
    for (let n = 0; n < cornerCount; n++) {
      const set = [n];
      for (let n2 = 10; n2 < vertices.length; n2++) {
        if (vertices[n].equals(vertices[n2])) set.push(n2);
      }
      sets.push(set);
    }
    console.log(vertices);
    [0, 1, 2, 3]
      .map((tl) => sets[tl])
      .flat()
      .forEach((tl) => (vertices[tl].x -= 100));
    vertices.forEach((v, n) => v.toArray(positions, n * 3));
    this.editBox.updateVerticesData(
      BABYLON.VertexBuffer.PositionKind,
      positions
    );
  }

  //创建盒子标注线与输入框
  xLine;
  yLine;
  zLine;
  mesBoxAdvancedTexture;
  createBoxMesLine() {
    this.mesBoxAdvancedTexture && this.mesBoxAdvancedTexture.dispose();
    const oriWidth = this.width;
    const oriHeight = this.height;
    const oriDepth = this.depth;

    let mesBoxAdvancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
      "mesBoxAdvancedTexture"
    );

    //x
    let xBox = this.width;
    let xLine = BABYLON.MeshBuilder.CreateBox(
      "xLine",
      { width: xBox, height: 5, depth: 5 },
      this.scene
    );
    xLine.setParent(this.editBox);
    xLine.position = new BABYLON.Vector3(
      0,
      -this.height / 2,
      -this.depth / 2 - 10
    );
    this.createPun(xLine, xBox, 0, 0);

    let rectx = new Rectangle();
    rectx.width = "70px";
    rectx.height = "20px";
    rectx.cornerRadius = 20;
    rectx.alpha = 0.5;
    rectx.linkOffsetY = 20;
    rectx.background = "#0066ff";
    mesBoxAdvancedTexture.addControl(rectx);
    rectx.linkWithMesh(xLine);

    let xBoxInp = new InputText();
    xBoxInp.text = `${xBox}`;
    xBoxInp.color = "white";
    xBoxInp.focusedBackground = "#3f3f3f";
    xBoxInp.background = "#0066ff";
    xBoxInp.thickness = 0;
    let inpXText = "";
    xBoxInp.onBlurObservable.add((xBoxItem) => {
      if (xBoxItem.text == inpXText) {
        return;
      }
      if (xBoxItem.text < this.holeWidth) {
        alert("不可小于槽大小");
        xBoxInp.text = `${xBox}`;
        return;
      }
      inpXText = xBoxItem.text;

      // this.updateVertex(this.editBox,xBox,'width')
      // this.updateVertex(this.editBox, xBox, "width");

      xBox = Number(xBoxItem.text);
      this.editBox.dispose();
      this.editBox = BABYLON.MeshBuilder.CreateBox(
        "editBox",
        { width: xBox, height: this.height, depth: this.depth },
        this.scene
      );
      this.editBox.material = this.boxMaterial;
      this.width = xBox;
      this.createBoxMesLine();
      // this.editBox.scaling.x = xBox / oriWidth;
      this.createHole(
        this.holeWidth,
        this.holeDepth,
        this.holeHeight,
        this.holeMesh
      );
      this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
    });
    rectx.addControl(xBoxInp);

    //y
    let yBox = this.height;
    let yLine = BABYLON.MeshBuilder.CreateBox(
      "yLine",
      { width: 5, height: yBox, depth: 5 },
      this.scene
    );
    yLine.setParent(this.editBox);
    yLine.position = new BABYLON.Vector3(
      this.width / 2 + 10,
      0,
      -this.depth / 2
    );
    this.createPun(yLine, 0, yBox, 0);

    let recty = new Rectangle();
    recty.width = "70px";
    recty.height = "20px";
    recty.cornerRadius = 20;
    recty.alpha = 0.5;
    recty.linkOffsetX = 30;
    recty.background = "#0066ff";
    mesBoxAdvancedTexture.addControl(recty);
    recty.linkWithMesh(yLine);

    let yBoxInp = new InputText();
    yBoxInp.text = `${yBox}`;
    yBoxInp.color = "white";
    yBoxInp.focusedBackground = "#3f3f3f";
    yBoxInp.background = "#0066ff";
    yBoxInp.thickness = 0;
    let inpYText = "";
    yBoxInp.onBlurObservable.add((yBoxItem) => {
      if (yBoxItem.text == inpYText) {
        return;
      }
      inpYText = yBoxItem.text;

      yBox = Number(yBoxItem.text);
      this.editBox.dispose();
      this.editBox = BABYLON.MeshBuilder.CreateBox(
        "editBox",
        { width: xBox, height: yBox, depth: this.depth },
        this.scene
      );
      this.editBox.material = this.boxMaterial;
      this.height = yBox;
      this.createBoxMesLine();
      this.createHole(
        this.holeWidth,
        this.holeDepth,
        this.holeHeight,
        this.holeMesh
      );
      this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
    });
    recty.addControl(yBoxInp);

    //z
    let zBox = this.depth;
    let zLine = BABYLON.MeshBuilder.CreateBox(
      "zLine",
      { width: 5, height: 5, depth: zBox },
      this.scene
    );
    zLine.setParent(this.editBox);
    zLine.position = new BABYLON.Vector3(
      this.width / 2 + 10,
      -this.height / 2,
      0
    );
    this.createPun(zLine, 0, 0, zBox);

    let rectz = new Rectangle();
    rectz.width = "70px";
    rectz.height = "20px";
    rectz.cornerRadius = 20;
    rectz.alpha = 0.5;
    rectz.linkOffsetY = 20;
    rectz.background = "#0066ff";
    mesBoxAdvancedTexture.addControl(rectz);
    rectz.linkWithMesh(zLine);

    let zBoxInp = new InputText();
    zBoxInp.text = `${zBox}`;
    zBoxInp.color = "white";
    zBoxInp.focusedBackground = "#3f3f3f";
    zBoxInp.background = "#0066ff";
    zBoxInp.thickness = 0;
    let inpZText = "";
    zBoxInp.onBlurObservable.add((zBoxItem) => {
      if (zBoxItem.text == inpZText) {
        return;
      }
      if (zBoxItem.text < this.holeDepth) {
        alert("不可小于槽大小");
        zBoxInp.text = `${zBox}`;
        return;
      }
      inpZText = zBoxItem.text;

      zBox = Number(zBoxItem.text);
      this.editBox.dispose();
      this.editBox = BABYLON.MeshBuilder.CreateBox(
        "editBox",
        { width: xBox, height: this.height, depth: zBox },
        this.scene
      );
      this.editBox.material = this.boxMaterial;
      this.depth = zBox;
      this.createBoxMesLine();
      this.createHole(
        this.holeWidth,
        this.holeDepth,
        this.holeHeight,
        this.holeMesh
      );
      this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);
    });
    rectz.addControl(zBoxInp);

    this.xLine = xLine;
    this.yLine = yLine;
    this.zLine = zLine;
    this.mesBoxAdvancedTexture = mesBoxAdvancedTexture;
  }

  //创建标注点
  createPun(mesh, width, height, depth) {
    let dot = BABYLON.MeshBuilder.CreateSphere(
      "dot",
      { diameter: 15 },
      this.scene
    );
    let material = new BABYLON.StandardMaterial("material", this.scene);
    material.diffuseColor = new BABYLON.Color3(255, 255, 0);
    dot.material = material;
    let copyDot = dot.clone("copyDot");
    dot.parent = mesh;
    copyDot.parent = mesh;
    if (width > 0) {
      dot.position.x = width / 2;
      copyDot.position.x = -width / 2;
    } else if (height > 0) {
      dot.position.y = height / 2;
      copyDot.position.y = -height / 2;
    } else {
      dot.position.z = depth / 2;
      copyDot.position.z = -depth / 2;
    }
    return dot
  }

  //创建槽
  holeDisArr
  createHole(width, depth, height, mesh, isAdd: boolean = false) {
    this.holeMesh = mesh;

    if (this.editHoleBox) {
      this.editHoleBox.dispose();
    }

    let corners;

    if (mesh == "圆形") {
      corners = new BABYLON.Path2(width / 2, 0);
      corners.addArcTo(0, width / 2, -width / 2, 0, 100);
      corners.addArcTo(0, -width / 2, width / 2, 0, 100);

      this.holeWidth = width;
      this.holeDepth = depth;
      this.holeHeight = height;
    } else {
      //开矩形槽
      corners = [
        new BABYLON.Vector2(width / 2, -depth / 2),
        new BABYLON.Vector2(width / 2, depth / 2),
        new BABYLON.Vector2(-width / 2, depth / 2),
        new BABYLON.Vector2(-width / 2, -depth / 2),
      ];

      this.holeWidth = width;
      this.holeHeight = height;
      this.holeDepth = depth;
    }

    //槽
    const poly = new PolygonMeshBuilder("poly", corners, this.scene, earcut);

    const polygon = poly.build(true, height + 0.5);

    polygon.parent = this.editBox;
    polygon.position.y = this.height / 2 + 0.5;
    let holeMaterial = new BABYLON.StandardMaterial("holeMaterial", this.scene);
    holeMaterial.diffuseColor = new BABYLON.Color3(255, 255, 0);
    holeMaterial.alpha = 0.5;
    polygon.material = holeMaterial;
    this.editHoleBox = polygon;
    this.holeDisArr = this.createGrooMeasureLine(this.editHoleBox,this.holeWidth,this.holeDepth,this.holeDisArr);

    this.createHoleGUI(this.editHoleBox);

    let ind = this.holeArr.indexOf(this.editHoleBox);
    if (ind != -1) {
      this.holeArr.splice(ind, 1);
      this.holeArr.push(this.editHoleBox);
    } else {
      this.holeArr.push(this.editHoleBox);
    }

    return polygon;
  }

  //开槽
  createCSG() {
    console.log(this.holeArr);
    let boxCSG = BABYLON.CSG.FromMesh(this.editBox);
    for (let i = 0; i < this.holeArr.length; i++) {
      let holeCSG = BABYLON.CSG.FromMesh(this.holeArr[i]);
      boxCSG = boxCSG.subtract(holeCSG);
    }
    this.box = boxCSG.toMesh("csgBox", this.boxMaterial, this.scene);

    this.part.dispose();
    this.clearMes();
  }

  //转实体清除所有标识
  clearMes() {
    this.editBox.isVisible = false;
    this.editHoleBox.isVisible = false;
    // this.mesAdvancedTexture.dispose();
    this.panelAdvancedTexture.dispose();
    this.mesBoxAdvancedTexture.dispose();
    // this.mesXBox.dispose();
    // this.mesYBox.dispose();
    this.xLine.dispose();
    this.yLine.dispose();
    this.zLine.dispose();
    this.incPlaneLeft.isVisible = false;
    this.incPlaneRight.isVisible = false;
    this.insideHole.isVisible = false;
  }

  //创建圆角
  createFillet1() {
    const outline = [
      new BABYLON.Vector3(-this.width / 2, 0, -this.depth / 2),
      new BABYLON.Vector3(this.width / 2, 0, -this.depth / 2),
    ];
    for (let i = 0; i < 100; i++) {
      outline.push(
        new BABYLON.Vector3(
          this.width / 2 - (100 - 100 * Math.cos((i * Math.PI) / 40)),
          0,
          this.depth / 2 - (100 - 100 * Math.sin((i * Math.PI) / 40))
        )
      );
    }
    outline.push(new BABYLON.Vector3(this.width / 2 - 100, 0, this.depth / 2));
    outline.push(new BABYLON.Vector3(-this.width / 2, 0, this.depth / 2));

    let a = BABYLON.MeshBuilder.ExtrudePolygon(
      "car",
      {
        shape: outline,
        depth: 18,
        updatable: true,
      },
      this.scene,
      earcut
    );

    let vertexData = VertexData.ExtractFromMesh(a).positions;
    console.log(vertexData);

    const outline1 = [
      -this.width / 2,
      0,
      -this.depth / 2,
      this.width / 2,
      0,
      -this.depth / 2,
    ];
    for (let i = 0; i < 100; i++) {
      outline1.push(
        this.width / 2 - (300 - 300 * Math.cos((i * Math.PI) / 40))
      );
      outline1.push(0),
        outline1.push(
          this.depth / 2 - (300 - 300 * Math.sin((i * Math.PI) / 40))
        );
      // vertexData[i] = this.width / 2 - (100 - 100 * Math.cos((i * Math.PI) / 40))
      // outline.push(
      //   new BABYLON.Vector3(
      //     this.width / 2 - (100 - 100 * Math.cos((i * Math.PI) / 40)),
      //     0,
      //     this.depth / 2 - (100 - 100 * Math.sin((i * Math.PI) / 40))
      //   )
      // );
    }
    outline1.push(
      this.width / 2 - 300,
      0,
      this.depth / 2,
      -this.width / 2,
      0,
      this.depth / 2
    );
    a.updateVerticesData(BABYLON.VertexBuffer.PositionKind, outline1);
  }

  incMaterial;
  incPlaneLeft;
  incPlaneRight;
  //创建斜面
  createIncPlane(
    direction: String,
    shape: String,
    x: number = 30,
    y: number = 18
  ) {
    let incMaterial = new BABYLON.StandardMaterial("holeMaterial", this.scene);
    incMaterial.diffuseColor = new BABYLON.Color3(0, 0, 255);
    incMaterial.alpha = 0.5;
    this.incMaterial = incMaterial;

    let incX = x;
    let incY = y;
    if (shape == "long") {
      incX *= 2;
    } else if (shape == "trape") {
      incY -= 8;
    }

    let incConers = [
      new BABYLON.Vector2(0, 0),
      new BABYLON.Vector2(incX, 0),
      new BABYLON.Vector2(0, incY),
    ];

    let incPoly = new BABYLON.PolygonMeshBuilder(
      "incMesh",
      incConers,
      this.scene,
      earcut
    );
    let incMesh = incPoly.build(false, this.depth);
    incMesh.parent = this.editBox;

    if (direction == "left") {
      incMesh.rotation.x = Math.PI / 2;
      incMesh.position = new BABYLON.Vector3(
        -this.width / 2,
        this.height / 2,
        this.depth / 2
      );
      incMesh.material = this.incMaterial;
      this.incPlaneLeft && this.incPlaneLeft.dispose();
      this.incPlaneLeft = incMesh;

      let ind = this.holeArr.indexOf(this.incPlaneLeft);
      if (ind != -1) {
        this.holeArr.splice(ind, 1);
        this.holeArr.push(this.incPlaneLeft);
      } else {
        this.holeArr.push(this.incPlaneLeft);
      }
    } else if (direction == "right") {
      incMesh.rotation.y = Math.PI;
      incMesh.rotation.x = Math.PI / 2;
      incMesh.position = new BABYLON.Vector3(
        this.width / 2,
        this.height / 2,
        -this.depth / 2
      );
      incMesh.material = this.incMaterial;
      this.incPlaneRight && this.incPlaneRight.dispose();
      this.incPlaneRight = incMesh;

      let ind = this.holeArr.indexOf(this.incPlaneRight);
      if (ind != -1) {
        this.holeArr.splice(ind, 1);
        this.holeArr.push(this.incPlaneRight);
      } else {
        this.holeArr.push(this.incPlaneRight);
      }
    }
  }

  insideHole;
  //创建内槽
  createInsideHole(
    width: number = this.width,
    height: number = this.height / 2,
    depth: number = 50
  ) {
    let insideHole = BABYLON.MeshBuilder.CreateBox(
      "insideHole",
      { width, height, depth },
      this.scene
    );
    insideHole.parent = this.editBox;
    insideHole.position = new BABYLON.Vector3(
      0,
      this.height / 2 - height / 2,
      -this.depth / 2 + depth / 2
    );
    let incMaterial = new BABYLON.StandardMaterial("holeMaterial", this.scene);
    incMaterial.diffuseColor = new BABYLON.Color3(0, 0, 255);
    incMaterial.alpha = 0.5;
    insideHole.material = incMaterial;
    this.insideHole = insideHole;

    let ind = this.holeArr.indexOf(this.insideHole);
    if (ind != -1) {
      this.holeArr.splice(ind, 1);
      this.holeArr.push(this.insideHole);
    } else {
      this.holeArr.push(this.insideHole);
    }
  }

  radius0: number = 50;
  radius1: number = 50;
  radius2: number = 50;
  radius3: number = 50;
  sort: number = 15;
  //创建圆角
  createFillet() {
    const corners = new BABYLON.Path2(-this.width / 2, 0);

    corners.addLineTo(-this.width / 2, -this.depth / 2 + this.radius0);
    corners.addArcTo(
      -this.width / 2 + this.sort,
      -this.depth / 2 + this.sort,
      -this.width / 2 + this.radius0,
      -this.depth / 2,
      20
    );
    corners.addLineTo(-this.width / 2 + this.radius0, -this.depth / 2);

    corners.addLineTo(this.width / 2 - this.radius1, -this.depth / 2);
    corners.addArcTo(
      this.width / 2 - this.sort,
      -this.depth / 2 + this.sort,
      this.width / 2,
      -this.depth / 2 + this.radius1,
      20
    );
    corners.addLineTo(this.width / 2, -this.depth / 2 + this.radius1);

    corners.addLineTo(this.width / 2, this.depth / 2 - this.radius2);
    corners.addArcTo(
      this.width / 2 - this.sort,
      this.depth / 2 - this.sort,
      this.width / 2 - this.radius2,
      this.depth / 2,
      20
    );
    corners.addLineTo(this.width / 2 - this.radius2, this.depth / 2);

    corners.addLineTo(-this.width / 2 + this.radius3, this.depth / 2);
    corners.addArcTo(
      -this.width / 2 + this.sort,
      this.depth / 2 - this.sort,
      -this.width / 2,
      this.depth / 2 - this.radius3,
      20
    );
    corners.addLineTo(-this.width / 2, this.depth / 2 - this.radius3);

    const poly_Box = new BABYLON.PolygonMeshBuilder(
      "polyBox",
      corners,
      this.scene,
      earcut
    );
    let filletMesh = poly_Box.build(true, this.height);
    filletMesh.material = this.boxMaterial;
    filletMesh.position.y = this.height / 9;
    this.editBox.dispose();
    this.editBox = filletMesh;
    this.createHole(
      this.holeWidth,
      this.holeDepth,
      this.holeHeight,
      this.editBox
    );
    this.createHoleGUI(this.editHoleBox);
    this.createBoxMesLine();
    this.createTarget();
  }

  createTarget() {
    let dragDot = BABYLON.MeshBuilder.CreateSphere(
      "dragDot",
      { diameter: 20 },
      this.scene
    );
    dragDot.parent = this.editBox;
    dragDot.position = new BABYLON.Vector3(
      this.width / 2 - this.sort,
      0,
      this.depth / 2 - this.sort
    );
    let dotMat = new BABYLON.StandardMaterial("dotMat", this.scene);
    dotMat.diffuseColor = new BABYLON.Color3(255, 0, 0);
    dragDot.material = dotMat;
  }

  //创建配件
  part;
  partDisArr
  partWidth
  parDepth
  createPart(height: number = 400, diameter: number = 60) {
    const cylinder = BABYLON.MeshBuilder.CreateCylinder(
      "cylinder",
      { height, diameter },
      this.scene
    );
    cylinder.isPickable = true;
    const cylMaterial = new BABYLON.StandardMaterial("cylMaterial", this.scene);
    cylMaterial.diffuseTexture = new BABYLON.Texture(
      "https://img2.baidu.com/it/u=3167412554,2425619194&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=497",
      this.scene
    );
    cylinder.material = cylMaterial;
    cylinder.setParent(this.editBox);
    cylinder.position.y = height / 2 + this.height / 2;

    let margin = diameter / 4;
    let partHole = BABYLON.MeshBuilder.CreateCylinder(
      "partHole",
      { height: this.height, diameter: 5 },
      this.scene
    );
    let partHoleM = new BABYLON.StandardMaterial("partHoleM", this.scene);
    partHoleM.diffuseColor = BABYLON.Color3.Red();
    partHoleM.alpha = 0.5;
    partHole.material = partHoleM;
    partHole.setParent(cylinder);
    let partHole1 = partHole.clone("partHole1");
    let partHole2 = partHole.clone("partHole2");
    partHole.position.x -= margin;
    partHole.position.z = margin;
    partHole1.position.x += margin;
    partHole1.position.z = margin;
    partHole2.position.x = 0;
    partHole2.position.z -= margin;

    this.partWidth = diameter / 2
    this.parDepth = diameter / 2
    this.holeArr.push(partHole, partHole1, partHole2);
    this.part = cylinder;
    this.partDisArr = this.createGrooMeasureLine(cylinder,30,30,this.partDisArr)
  }

  //创建槽标注线
  createGrooMeasureLine(mesh: Mesh,width,depth,disArr) {
    if(disArr){
      for(let i = 0; i < disArr.length - 2; i++){
        disArr[i].dispose()
      }
    }
    //侧面假量尺
    let matX = mesh.getWorldMatrix().m[12]
    let xBoxLength = this.width / 2 + matX - width / 2;
    let mesXBox = BABYLON.MeshBuilder.CreateBox(
      "mesXBox",
      { width: xBoxLength, height: 5, depth: 5 },
      this.scene
    );

    mesXBox.setParent(mesh);
    mesXBox.position = new BABYLON.Vector3(
      -xBoxLength / 2 - width / 2,
      10,
      0
    );

    let dotX = this.createPun(mesXBox, xBoxLength, 0, 0);

    //底部假量尺
    let matZ = mesh.getWorldMatrix().m[14]
    let yBoxLength = this.depth / 2 + matZ - depth / 2;
    let mesYBox = BABYLON.MeshBuilder.CreateBox("mesYBox", {
      width: 5,
      height: 5,
      depth: yBoxLength,
    });
    mesYBox.setParent(mesh);
    mesYBox.position = new BABYLON.Vector3(
      0,
      10,
      -yBoxLength / 2 - depth / 2
    );
    let dotY = this.createPun(mesYBox, 0, 0, yBoxLength);

    //创建可输入槽距数据展示
    let mesAdvancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
      "mesAdvancedTexture"
    );

    let rectx = new Rectangle();
    rectx.width = "50px";
    rectx.height = "20px";
    rectx.cornerRadius = 20;
    rectx.background = "#808080";
    rectx.alpha = 0.5;
    mesAdvancedTexture.addControl(rectx);
    rectx.linkWithMesh(mesXBox);
    rectx.linkOffsetY = -15;

    let mesxInp = new InputText();
    mesxInp.text = `${xBoxLength}`;
    mesxInp.color = "white";
    mesxInp.focusedBackground = "#3f3f3f";
    mesxInp.background = "#808080 ";
    mesxInp.thickness = 0;
    mesxInp.onBlurObservable.add((mesXItem) => {
      // let newXLength = Number(mesXItem.text);
      // this.mesXBox.scaling = new BABYLON.Vector3(
      //   newXLength / this.xBoxLength,
      //   1,
      //   1
      // );
      // this.editHoleBox.position.x =
      //   newXLength + this.holeWidth / 2 - Number(this.width) / 2;

      // this.mesXBox.position.x = -(newXLength / 2 + this.holeWidth / 2);
      // mesxInp.text = mesXItem.text
    });
    rectx.addControl(mesxInp);

    let recty = new Rectangle();
    recty.width = "50px";
    recty.height = "20px";
    recty.cornerRadius = 20;
    recty.background = "#808080";
    recty.alpha = 0.5;
    mesAdvancedTexture.addControl(recty);
    recty.linkWithMesh(mesYBox);
    recty.linkOffsetX = 30;

    let mesyInp = new InputText();
    mesyInp.text = `${yBoxLength}`;
    mesyInp.color = "white";
    mesyInp.focusedBackground = "#3f3f3f";
    mesyInp.background = "#808080 ";
    mesyInp.thickness = 0;
    mesyInp.onBlurObservable.add((mesYItem) => {
      // let newYLength = Number(mesYItem.text);
      // this.mesYBox.scaling = new BABYLON.Vector3(
      //   1,
      //   1,
      //   newYLength / this.yBoxLength
      // );
      // this.editHoleBox.position.z =
      //   newYLength + this.holeDepth / 2 - Number(this.depth) / 2;

      // this.mesYBox.position.z = -(newYLength / 2 + this.holeDepth / 2);
      // mesyInp.text = mesYItem.text
    });
    recty.addControl(mesyInp);

    return [mesXBox,mesYBox,mesAdvancedTexture,dotX,dotY]
  }
}

function canvas(canvas: any) {
  throw new Error("Function not implemented.");
}

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, watch } from "vue";
import { BabylonHandle } from "./core/BabylonHandle";
import { directive } from "vue3-menus";
import bus from "./utils/bus";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  name: "BabylonOne",
  directives: {
    menus: directive,
  },
  components: {},
  setup() {
    const menus = shallowRef({
      menus: [
        {
          label: "切换槽型",
          // tip: 'Alt+向左箭头',
          // click: () => {
          //   window.history.back(-1);
          // }
          children: [
            {
              label: "矩形",
              click: (e) => {
                isEdit() && bbScene.createHole(400, 400, 18, "矩形");
              },
            },
            {
              label: "圆形",
              click: (e) => {
                isEdit() && bbScene.createHole(400, 400, 18, "圆形");
              },
            },
          ],
        },
        {
          label: "端面",
          children: [
            {
              label: "添加斜面",
              children: [
                {
                  label: "左斜面",
                  click: () => {
                    isEdit() && bbScene.createIncPlane("left", "normal");
                  },
                },
                {
                  label: "左斜面梯形",
                  click: () => {
                    isEdit() && bbScene.createIncPlane("left", "trape");
                  },
                },
                {
                  label: "左斜面长形",
                  click: () => {
                    isEdit() && bbScene.createIncPlane("left", "long");
                  },
                },
                {
                  label: "右斜面",
                  click: () => {
                    isEdit() && bbScene.createIncPlane("right", "normal");
                  },
                },
                {
                  label: "右斜面梯形",
                  click: () => {
                    isEdit() && bbScene.createIncPlane("right", "trape");
                  },
                },
                {
                  label: "右斜面长形",
                  click: () => {
                    isEdit() && bbScene.createIncPlane("right", "long");
                  },
                },
              ],
            },
            {
              label: "添加内槽",
              children: [
                {
                  label: "前内槽",
                  click: () => {
                    isEdit() && bbScene.createInsideHole();
                  },
                },
              ],
            },
          ],
        },
        {
          label: "开圆角",
          click: () => {
            isEdit() && bbScene.createFillet();
          },
        },
        {
          label: "编辑参数",
          click: () => {
            if (isEdit()) {
              panelShow.value = !panelShow.value;
              bus.emit("plane", panelShow.value);
            }
          },
        },
        {
          label: "添加配件",
          click: () => {
            if (isEdit()) {
              partShow.value = !partShow.value;
              bus.emit("part", partShow.value);
            }
          },
        },
        {
          label: "替换配件",
          click: () => {
            isEdit() && replacePart();
          },
        },
      ],
    });
    let partShow = ref(false);
    let panelShow = ref(false);
    let isCreate = ref<boolean>(false);
    let view = ref<string>("");
    let patterm = ref<string>("");
    let canSave = ref<boolean>(false);
    let bbScene;
    let replaceShow = ref(true);
    let replacePart = () => {
      if (bbScene.selectMesh.length == 0) {
        ElMessage({
          message: "未选择被替换配件，请双击选择需替换配件！",
          type: "warning",
        });
        return;
      }
      bus.emit("replaceShow", replaceShow.value);
    };
    onMounted(() => {
      const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
      let obj = new BabylonHandle(canvas);
      bbScene = obj;

      bus.on("boxSize", (res: any) => {
        getSizes(res);
      });

      bus.on("view", (res: any) => {
        sendView(res);
      });
      bus.on("patterm", (res: any) => {
        changePat(res);
      });
      bus.on("createPart", () => {
        bbScene.createPipe();
      });

      bus.on("closePart", (value) => {
        partShow.value = !partShow.value;
      });

      bus.on("applyPart", (value) => {
        if (value == "102") {
          bbScene.createPipe();
        } else {
          bbScene.createbbqBox(560, 450, 550);
        }
      });

      bus.on("replacePart", (value) => {
        bbScene.createPipe();
      });
    });

    //获取长、宽、高
    function getSizes(val) {
      let { width, height, depth } = { ...val } as any;
      let box = bbScene.createInitialBox(width, height, depth);
      isCreate.value = true;
    }

    let entityPar = ref(false);

    // function changeBSize() {
    //   let { width, height, depth, material, hole } = formData as any;
    //   if (material != "") {
    //     // let mat = getAssetsImages(material) + ".png";
    //     // bbScene.changeBox(width, height, depth, mat);
    //   }
    //   //   bbScene.changeBox(width, height, depth);

    //   let { hWidth, hDepth, x, y } = hole;
    //   if (hole.hDepth != "") {
    //     // bbScene.createCSG(hWidth, hDepth, x, y);
    //   }

    //   holeData = hole;

    //   return true;
    // }

    // function getAssetsImages(name: any) {
    //   return new URL(`/src/assets/images/${name}`, import.meta.url).href;
    // }

    function sendView(val: any) {
      let alpha = -1;
      let beta = -1;
      // let sendview = view
      switch (val) {
        case "俯视":
          beta = 0;
          break;
        case "正视":
          beta = Math.PI / 2;
          break;
        case "左侧":
          alpha = Math.PI;
          break;
        case "右侧":
          alpha = 0;
          break;
        case "背部":
          alpha = Math.PI / 2;
          break;
        case "底部":
          beta = Math.PI;
          break;
      }
      bbScene.changeView({ alpha, beta });
    }

    const isEdit = () => {
      if (entityPar.value == false) {
        ElMessage({
          message: "当前为实体模式，请先进入编辑模式",
          type: "warning",
        });
        return false;
      }
      return true;
    };

    function changePat(val) {
      if (val == "编辑模式") {
        bbScene.editPatterm();
        entityPar.value = true;
      }
      if (val == "实体模式") {
        ElMessageBox.confirm("是否切换为实体模式？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            ElMessage({
              type: "success",
              message: "切换成功",
            });
            canSave.value = !canSave.value;
            setTimeout(() => {
              bbScene.createCSG();
            }, 0);
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消切换",
            });
            patterm.value = "编辑模式";
          });
      }
    }

    return {
      canSave,
      getSizes,
      // changeBSize,
      view,
      sendView,
      changePat,
      isCreate,
      patterm,
      menus,
      entityPar,
      isEdit,
    };
  },
});
</script>

<template>
  <!-- <el-radio-group
    v-model="patterm"
    class="radioBox"
    @change="changePat"
    v-if="isCreate"
  >
    <el-row class="w100">
      <el-col :span="12"> <el-radio-button label="编辑模式" /></el-col>
      <el-col :span="12"
        ><el-radio-button label="实体模式" v-if="entityPar"
      /></el-col>
    </el-row>
  </el-radio-group> -->
  <el-radio-group
    v-model="patterm"
    class="radioBox"
    @change="changePat"
    v-if="isCreate"
  >
    <el-radio-button label="编辑模式" />
    <el-radio-button label="实体模式" v-if="entityPar" />
  </el-radio-group>
  <canvas id="canvas1" ref="bjsCanvas" v-menus:right="menus"></canvas>
</template>

<style>
/* .el-radio-group {
  position: absolute;
  top: -45px;
  right: 45%;
  z-index: 9999;
} */
/* .el-radio-button__inner {
  margin-right: 15px;
} */

.radioBox {
  /* width: 50px; */
  position: absolute;
  z-index: 1;
  margin: 10px 20px;
}

canvas {
  width: 100%;
  height: calc(100vh - 54px);
  position: relative;
}
.patterm {
  margin-left: 15px;
  margin-right: 15px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.rightMenu {
  position: absolute;
  width: 300px;
  height: 300px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
}
.el-message-box {
  margin-top: -100px;
}
</style>

<template>
  <div class="menuWrap">
    <!-- 查看当前参数小卡片 -->
    <!-- <el-popover placement="left" :width="250" trigger="click">
        <el-row type="flex" align="middle">
          <el-col :span="16"><h2>当前参数</h2></el-col>
          <el-col :span="8" v-if="!formData.hole.hDepth"
            ><el-tag class="ml-2" type="info">无开槽</el-tag></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            ><ul>
              <span>尺寸</span>
              <li>长度：{{ formData.depth }}</li>
              <li>宽度：{{ formData.width }}</li>
              <li>厚度：{{ formData.height }}</li>
            </ul></el-col
          >
          <el-col :span="12"
            ><ul v-if="formData.hole.hDepth !== ''">
              <span>开槽</span>
              <li>长度：{{ formData.hole.hDepth }}</li>
              <li>宽度：{{ formData.hole.hWidth }}</li>
              <li>X：{{ formData.hole.x }}</li>
              <li>Y：{{ formData.hole.y }}</li>
            </ul>
          </el-col>
        </el-row>
        <template #reference>
          <el-button style="margin-right: 16px" class="dataBtn"
            >查看参数</el-button
          >
        </template>
      </el-popover> -->

    <el-drawer
      v-model="drawer"
      size="30%"
      :show-close="false"
      :open="(isEdit = false)"
    >
      <template #header>
        <el-row type="flex" :gutter="16" class="rowFlex">
          <el-col :span="7">
            <el-image style="width: 100%" :src="boardImg"></el-image>
          </el-col>
          <el-col><h1 class="namePos">板材1</h1></el-col>
        </el-row>
      </template>
      <div class="contentWrap">
        <!-- <el-button
          type="text"
          class="editBtn"
          @click="editData"
          v-show="!isEdit"
          >编辑</el-button
        > -->
        <el-tabs v-model="tableName">
          <el-tab-pane label="参数" name="parameter">
            <el-collapse v-model="collName" accordion>
              <el-collapse-item title="常用" name="1">
                <div>
                  <el-input v-model="formData.depth">
                    <template #prepend>长度</template>
                  </el-input>
                  <el-input v-model="formData.width">
                    <template #prepend>宽度</template>
                  </el-input>
                  <el-input v-model="formData.height">
                    <template #prepend>厚度</template>
                  </el-input>
                </div>
              </el-collapse-item>
              <el-collapse-item title="开槽" name="2">
                <div class="holeWrap">
                  <el-tabs
                    v-model="holeActive"
                    type="border-card"
                    class="demo-tabs"
                  >
                    <el-tab-pane label="尺寸" name="first">
                      <el-form :model="formData.hole" label-width="120px">
                        <el-input v-model="formData.hole.hDepth">
                          <template #prepend>长度</template>
                        </el-input>
                        <el-input v-model="formData.hole.hDepth">
                          <template #prepend>宽度</template>
                        </el-input>
                      </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="位置" name="second">
                      <el-form :model="formData.hole" label-width="120px">
                        <el-form-item label="x">
                          <el-input v-model="formData.hole.x" />
                        </el-form-item>
                        <el-form-item label="y">
                          <el-input v-model="formData.hole.y" />
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-collapse-item>
              <el-collapse-item title="旋转" name="3"> </el-collapse-item>
              <el-collapse-item title="材料" name="4"> </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="产品" name="product">产品类别</el-tab-pane>
          <el-tab-pane label="封边" name="edgeBanding">封边类别</el-tab-pane>
          <el-tab-pane label="材料" name="material" id="material">
            <div class="matCard">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  :src="matArr[0]"
                  class="image"
                  style="width: 65px; height: 90px"
                />
                <div style="padding: 20px 0 20px 35px">
                  <span style="font: bold 15px 微软雅黑">材料1</span>
                  <div class="bottom">
                    <span style="font: 10px 微软雅黑">该材质型号为001</span>
                  </div>
                  <el-button
                    type="primary"
                    class="materialBtn"
                    plain
                    v-show="checkCard !== 1"
                    :disabled="!isEdit"
                    @click="changeCheck(1, 'mat1')"
                    >设置材质</el-button
                  >
                  <el-button
                    type="success"
                    class="materialBtn"
                    v-show="checkCard == 1"
                    text
                    >已选择</el-button
                  >
                </div>
              </el-card>
              <el-card :body-style="{ padding: '0px' }">
                <img
                  :src="matArr[1]"
                  class="image"
                  style="width: 65px; height: 90px"
                />
                <div style="padding: 20px 0 20px 35px">
                  <span style="font: bold 15px 微软雅黑">材料2</span>
                  <div class="bottom">
                    <span style="font: 10px 微软雅黑">该材质型号为002</span>
                  </div>
                  <el-button
                    type="primary"
                    class="materialBtn"
                    plain
                    :disabled="!isEdit"
                    v-show="checkCard !== 2"
                    @click="changeCheck(2, 'mat2')"
                    >设置材质</el-button
                  >
                  <el-button
                    type="success"
                    text
                    class="materialBtn"
                    v-show="checkCard == 2"
                    >已选择</el-button
                  >
                </div>
              </el-card>
              <el-card :body-style="{ padding: '0px' }">
                <img
                  :src="matArr[2]"
                  class="image"
                  style="width: 65px; height: 90px"
                />
                <div style="padding: 20px 0 20px 35px">
                  <span style="font: bold 15px 微软雅黑">材料3</span>
                  <div class="bottom">
                    <span style="font: 10px 微软雅黑">该材质型号为003</span>
                  </div>
                  <el-button
                    type="primary"
                    class="materialBtn"
                    plain
                    :disabled="!isEdit"
                    v-show="checkCard !== 3"
                    @click="changeCheck(3, 'mat3')"
                    >设置材质</el-button
                  >
                  <el-button
                    type="success"
                    text
                    class="materialBtn"
                    v-show="checkCard == 3"
                    >已选择</el-button
                  >
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配件" name="parts" id="parts">
            <el-card :body-style="{ padding: '0px' }">
              <el-image
                style="width: 100px; height: 120px"
                :src="url"
                fit="cover"
                @click="imgClick"
              />
              <div style="padding: 35px 0px 20px 15px">
                <span style="font: bold 15px 微软雅黑">配件管1</span>
                <div class="bottom">
                  <span style="font: 10px 微软雅黑">该材质型号为001</span>
                </div>
                <el-button
                  type="primary"
                  class="materialBtn"
                  plain
                  v-show="!partCheck"
                  @click="createPart()"
                  >应用配件</el-button
                >
                <el-button
                  type="success"
                  class="materialBtn"
                  v-show="partCheck"
                  text
                  >已选择</el-button
                >
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="btn">
        <el-button
          type="info"
          round
          plain
          class="panelBtn"
          @click="drawer = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          round
          plain
          class="panelBtn"
          @click="changeSize"
          >应用</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import bus from "../utils/bus";
import Preview from "./preview/preview.vue";
export default defineComponent({
  components: { Preview },
  setup() {
    // let isPreview = ref<boolean>(false)
    let boardImg = require("@/static/images/mat1.png");
    let matArr = [
      require("@/static/images/mat1.png"),
      require("@/static/images/mat2.png"),
      require("@/static/images/mat3.png"),
    ];
    let partCheck = ref<boolean>(false);
    let url = require("@/static/images/partPipe.jpg");
    let holeActive = ref<string>("first");
    let checkCard = ref<number>(0);
    let isEdit = ref<boolean>(false);
    let drawer = ref<boolean>(false); //抽屉
    let applyBtn = ref<boolean>(true);
    const collName = ref(["1"]); //折叠面板
    const tableName = ref("parameter"); //tabs切换
    const form = reactive({});
    const formData = reactive({
      height: 18,
      width: 1200,
      depth: 800,
      material: "",
      hole: {
        // hHeight: "",
        hWidth: "",
        hDepth: "",
        x: 0,
        y: 0,
      },
    });

    function createPart() {
      bus.emit("createPart");
    }

    function imgClick() {
      // isPreview.value = !isPreview.value
    }

    function editData() {
      isEdit.value = true;
      applyBtn.value = false;
    }

    // function getAssetsImages(url) {
    //   return require(url);
    // }

    function changeCheck(order, img) {
      checkCard.value = order;
      formData.material = img;
    }

    function changeSize() {
      console.log("111");
    }

    onMounted(() => {
      bus.on("plane", (val: any) => {
        drawer.value = !drawer.value;
      });
    });

    return {
      // isPreview,
      createPart,
      imgClick,
      partCheck,
      url,
      isEdit,
      drawer,
      applyBtn,
      collName,
      tableName,
      form,
      formData,
      editData,
      checkCard,
      changeCheck,
      holeActive,
      changeSize,
      boardImg,
      // getAssetsImages,
      matArr,
    };
  },
});
</script>
<style>
.menuWrap {
  position: relative;
  right: 0;
}
.btn {
  position: fixed;
  display: flex;
  justify-content: space-around;
}
.el-button {
  line-height: 0.4 !important;
  border-radius: 13px !important;
}
.collDiv {
  margin-left: 10px;
  display: flex;
}
.el-input__inner {
  height: 30px !important;
  width: 50% !important;
}
.contentWrap {
  padding: 20px;
  position: relative;
}
.el-drawer__header {
  margin-bottom: 0 !important;
}
.el-collapse {
  border-top: 0 !important;
  border-bottom: 0 !important;
}
.el-tabs__header {
  margin-bottom: 0 !important;
}
.collBox {
  background: #f0f0f0;
  padding: 10px;
}
.editBtn {
  position: absolute;
  right: 20px;
  top: 24px;
  z-index: 999;
}
.btn {
  position: fixed;
  bottom: 20px;
  width: 30%;
  padding: 0 50px;
}
.panelBtn {
  padding: 10px 40px !important;
}
.openBtn {
  position: fixed;
  right: 30px;
  top: 30px;
  border-radius: 5px;
}

.el-drawer__body {
  padding: 0 10px !important;
}
.el-row {
  flex-wrap: nowrap !important;
}
.namePos {
  margin: 55px 10px;
}

.btnWrap {
  width: 100%;
  padding-top: 20px;
  text-align: center;
}

.el-form-item__content {
  flex: 0.5 !important;
}
.el-form-item {
  margin-bottom: 5px !important;
}
#material .el-card__body {
  display: flex;
  padding: 8px;
}
.materialBtn {
  position: absolute;
  right: 10px;
  top: 35%;
  font-size: 10px;
}
.matCard {
  position: relative;
  margin-top: 5px;
}
.matCard .el-card {
  margin-top: 3px !important;
  position: relative !important;
}
.holeWrap .el-tabs__item {
  padding: 0 10px !important;
}
.dataBtn {
  position: fixed;
  top: 75px;
  right: 15px;
  border-radius: 5px;
}
.boxData .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#parts .el-card__body {
  display: flex;
  margin-top: 5px;
}
</style>

<template>
    <div class="wrap">
      <div class="buildWrap" v-if="isBuild">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>创建板材</span>
            </div>
          </template>
          <div>
            <el-form :model="formData" label-width="130px">
              <el-form-item label="长度">
                <el-input v-model="formData.width" />
              </el-form-item>
              <el-form-item label="宽度">
                <el-input v-model="formData.depth" />
              </el-form-item>
              <el-form-item label="高度">
                <el-input v-model="formData.height" />
              </el-form-item>
            </el-form>
          </div>
          <div class="btnWrap">
            <el-button type="primary" class="buildBtn" @click="buildBox(formData)"
              >点击创建</el-button
            >
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive, toRaw } from "vue";
  import BabylonScene from "../BabylonScene.vue";
  import { ElMessage } from "element-plus";
  import bus from "../utils/bus";
  export default defineComponent({
    components: {
      BabylonScene,
  },
    setup() {
      let holeActive = ref<string>("first");
      let checkCard = ref<number>(0);
      let ischeck = ref<boolean>(false);
      let isBuild = ref<boolean>(true);
      let isEdit = ref<boolean>(false);
      let drawer = ref<boolean>(false); //抽屉
      let applyBtn = ref<boolean>(true);
      const collName = ref(["1"]); //折叠面板
      const tableName = ref("first"); //tabs切换
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
      function editData() {
        isEdit.value = true;
        applyBtn.value = false;
      }
  
    //   function getAssetsImages(name) {
    //     return new URL(`/src/assets/images/${name}`, import.meta.url).href;
    //   }
  
    //   function changeCheck(order, img) {
    //     checkCard.value = order;
    //     formData.material = img;
    //   }

    function buildBox(val){
      bus.emit('boxSize',val)
      isBuild.value = false
    }
  
      return {
        isBuild,
        isEdit,
        drawer,
        applyBtn,
        collName,
        tableName,
        form,
        formData,
        editData,
        // getAssetsImages,
        ischeck,
        checkCard,
        // changeCheck,
        holeActive,
        buildBox
      };
    },
  });
  </script>
  <style>
  .wrap {
    /* display: flex; 
    flex-wrap: nowrap; */
    position: relative;
  }
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
    height: 25px !important;
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
  .rowFlex {
    /* display: flex;
      justify-content: space-around; */
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
  .buildWrap {
    width: 360px;
    position: absolute;
    top: 50%;
    left: 50%; 
     margin: -180px 0 0 -180px;
  }
  .btnWrap {
    width: 100%;
    padding-top: 20px;
    text-align: center;
  }
  .buildBtn {
    width: 130px;
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
  </style>
  
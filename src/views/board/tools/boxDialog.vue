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
import { defineComponent, ref, reactive } from "vue";
import BabylonScene from "../BabylonScene.vue";
import bus from "../utils/bus";
export default defineComponent({
  components: {
    BabylonScene,
},
  setup() {
    let isBuild = ref<boolean>(true);
    const formData = reactive({
      height:18,
      width:1200,
      depth:800
    });

  function buildBox(val){
    bus.emit('boxSize',val)
    isBuild.value = false
  }

    return {
      isBuild,
      formData,
      buildBox
    };
  },
});
</script>
<style>
.wrap {
  position: relative;
}

.el-button {
  line-height: 0.4 !important;
  border-radius: 13px !important;
}

.el-input__inner {
  height: 25px !important;
  width: 50% !important;
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
</style>

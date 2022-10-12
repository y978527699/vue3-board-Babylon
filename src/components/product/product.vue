<template>
  <el-button text @click="dialogVisible = true">点</el-button>

  <el-dialog v-model="dialogVisible" width="80%">
    <template #title>
      <el-image class="dialogImg" style="width: 50px; height: 50px;" :src="url" />
    </template>
    <div class="mt-4 searchBox">
      <el-input
        v-model="searchVal"
        placeholder="请输入配件"
        class="input-with-select"
      >
        <template #prepend>
          有屋配件库
        <!-- <el-button :icon="Search" /> -->
      </template>
      </el-input>
    </div>
    <el-row>
      <el-col :span="9">
        <el-cascader-panel
          ref="menuList"
          :options="menuList"
          @change="changeHandle"
          model-value="0010101"
        />
      </el-col>
      <el-col :span="15">123</el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, ref } from "vue";
import { menuList, productsList } from "./publicData";
// import { Search } from '@element-plus/icons-vue'
export default {
  setup() {
    const url = require('../../static/images/partPipe.jpg')
    const searchVal = ref<string>("");
    const { proxy } = getCurrentInstance() as any;
    const dialogVisible = ref(false);
    const cascader = reactive({});
    // 产品列表
    let list = ref([]);
    // 菜单节点改变
    let changeHandle = () => {
      let nodesInfo = proxy.$refs["menuList"].getCheckedNodes()[0];
      console.log(nodesInfo.data, "节点发生改变触发");
      let { value } = nodesInfo.data;
      let filterList = productsList.filter((item) => item.pId == value);
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");
    };
    return { menuList, dialogVisible, cascader, changeHandle, searchVal, url };
  },
};
</script>

<style>
.el-cascader-panel.is-bordered {
  border: none;
}
.el-cascader-menu {
  min-width: 20px;
}
.el-dialog__body {
  padding: 0 0 20px 0;
}
.el-dialog__header {
  padding: 0;
}
.el-cascader-node {
  padding: 0 15px 0 0;
}
.searchWrap {
  display: flex;
  width: 300px;
  height: 40px;
  margin: 0 auto;
}
.searchBox {
  text-align: center;
  padding: 15px 0;
}
.searchBox .el-input__inner {
  width: 300px !important;
}
.searchBox .el-input-group__append, .el-input-group__prepend{
  background: none;
  border: none;
  padding: 0 10px;
}
.dialogImg{
  border-radius: 30px;
  margin: 10px;
}
</style>

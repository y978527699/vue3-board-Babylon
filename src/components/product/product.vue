<template>
  <!-- <el-button text @click="outerVisible = true">open the outer Dialog</el-button> -->
  <el-dialog v-model="outerVisible" width="80%" top="8vh" @close="handleClose">
    <template #title>
      <el-image
        class="dialogImg"
        style="width: 20px; height: 20px;"
        :src="logoUrl"
      />
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
    </template>
    <template #default>
      <el-row class="recWrap">
        <el-col
          :span="24 / lineImgs.length"
          v-for="(item, index) in lineImgs"
          :key="index"
        >
          <el-image class="lineImg" :src="item.img" @click="openDetails(item.id)" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-cascader-panel
            ref="menuList"
            :options="menuList"
            @change="changeHandle"
            model-value="0010101"
          />
        </el-col>
        <el-col :span="18">
        <ul class="ulBox" v-if="list.length > 0">
          <li class="liSty" v-for="item in list" :key="item.id" @click="openDetails(item.id)">
            <el-image style="height: 120px" :src="item.src" fit="scale-down" />
            <div class="nameSty">{{ item.name }}</div>
            <el-popover
              v-if="item.introduce.length > 30"
              placement="top-start"
              :width="200"
              trigger="hover"
              :content="item.introduce"
            >
              <template #reference>
                <span class="hiddenText">{{ ellipsis(item.introduce) }}</span>
              </template>
            </el-popover>
            <span class="hiddenText" v-else>{{ item.introduce }}</span>
            <!-- <a :title="item.introduce" class="hiddenText">{{
              item.introduce
            }}</a> -->
          </li>
        </ul>
        <el-empty v-else description="暂无数据" :image-size="200" />
      </el-col>
      </el-row>
      <!-- 产品详情 -->
      <ShowDialog
        v-model:innerVisible="innerVisible"
        :currentId="currentId"
        @changeInnerVisible="changeInnerVisible"
      />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import bus from "@/views/board/utils/bus";
import { defineComponent, ref, reactive, getCurrentInstance,onMounted } from "vue";
import { menuList, productsList,lineImgs } from "./publicData"; // 数据
import ShowDialog from "./showDialog.vue";
export default defineComponent({
  setup(props) {
    const { proxy } = getCurrentInstance() as any;
    const outerVisible = ref(false); // 最外层弹框
    const innerVisible = ref(false); // 产品详情弹框
    const logoUrl = require("../../static/images/dialogImg.png"); // 标题logo图标
    const searchVal = ref<string>(""); // 顶部查询字段
    // 产品列表
    let list = ref([]);
    // 当前查询详情的数据id
    let currentId = ref("");
    // 菜单节点改变
    let changeHandle = () => {
      let nodesInfo = proxy.$refs["menuList"].getCheckedNodes()[0];
      console.log(nodesInfo.data, "节点发生改变触发");
      let { value } = nodesInfo.data;
      let filterList = productsList.filter((item) => item.pId == value);
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");
    };
    // 显示产品弹框
    let openDetails = (id) => {
      currentId.value = id
      innerVisible.value = true
      console.log(innerVisible.value)
    };
    // 隐藏产品弹框
    let changeInnerVisible = () => {
      currentId.value = ""
      innerVisible.value = false;
    };
    //关闭对话框
    let handleClose = () => {
      bus.emit('closePart',!outerVisible.value)
    };
    // 格式化溢出文本
    const ellipsis = (value) => {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    };
    onMounted(() => {
      let filterList = productsList.filter((item) => item.pId == "0010101");
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");

      bus.on('part',value => {
        outerVisible.value = value as boolean
      })
    });
    return {
      handleClose,
      outerVisible,
      innerVisible,
      logoUrl,
      searchVal,
      lineImgs,
      menuList,
      list,
      changeHandle,
      openDetails,
      changeInnerVisible,
      ellipsis,
      currentId
    };
  },
  components: {
    ShowDialog,
  },
});
</script>
<style>
.el-cascader-panel.is-bordered {
  border: none;
  height: 420px;
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
.searchBox {
  text-align: center;
  padding-bottom: 15px;
}
.searchBox .el-input__inner {
  width: 300px !important;
  border-radius: 7px;
}
.searchBox .el-input-group__append,
.el-input-group__prepend {
  background: none;
  border: none;
  padding: 0 10px;
}
.dialogImg {
  border-radius: 30px;
  margin: 10px;
}
.el-input-group__prepend {
  font-size: 18px;
  margin-top: 3px;
}
.recWrap .el-col {
  height: 150px;
  padding: 10px 10px;
}
.ulBox {
  height: 420px;
  overflow-y: scroll;
}
.ulBox::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.ulBox::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}
.hiddenText {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
  color: #999;
  font-size: 13px;
}
.nameSty {
  text-align: left;
  line-height: 30px;
  font-size: 15px;
}
.liSty {
  width: 190px;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  padding: 15px;
  text-align: center;
  cursor: pointer;
}
.liSty:hover {
  border-color: #409eff;
}
.lineImg {
  width: 100%;
  height: 100%;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}
.lineImg:hover {
  border: 1px solid #409eff;
}
</style>

<template>
  <el-button text @click="outerVisible = true" v-show="false"
    >open the outer Dialog</el-button
  >
  <el-dialog
    v-model="outerVisible"
    id="partStore"
    width="80%"
    top="3vh"
    @close="handleClose"
    :close-on-press-escape="false"
    class="partSDia"
  >
    <template #title>
      <div class="mt-4 searchBox">
        <el-image
          class="dialogImg"
          style="width: 35px; height: 35px"
          :src="logoUrl"
        />

        <el-input
          v-model="searchVal"
          placeholder="请输入配件"
          class="input-with-select"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
          <template #prepend> 有屋配件库 </template>
        </el-input>
      </div>
    </template>

    <template #default>
      <!-- <el-row class="recWrap">
        <el-col
          :span="24 / lineImgs.length"
          v-for="(item, index) in lineImgs"
          :key="index"
        >
          <el-image
            class="lineImg"
            :src="item.img"
            @click="openDetails(item.id)"
          />
        </el-col>
      </el-row> -->

      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
        indicator-position="none"
      >
        <el-carousel-item v-for="item in lineImgs" :key="item">
          <el-image
            class="lineImg"
            :src="item.img"
            @click="openDetails(item.id)"
          />
        </el-carousel-item>
      </el-carousel>

      <el-row>
        <el-col :span="6">
          <el-cascader-panel
            ref="menuList"
            :options="menuList"
            @change="changeHandle"
            model-value="0010101"
            class="mt5"
          />
        </el-col>

        <el-col :span="18">
          <ul class="ulBox mt5" v-if="list.length > 0">
            <li
              class="liSty"
              v-for="item in list"
              :key="item.id"
              @click="openDetails(item.id)"
            >
              <el-image
                style="height: 120px"
                :src="item.src"
                fit="scale-down"
              />

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
            </li>

            <li class="liSty" @click="uploadHandle">
              <el-icon><Plus /></el-icon>
            </li>
          </ul>

          <el-empty v-else description="暂无数据" :image-size="200" />
        </el-col>
      </el-row>

      <ShowDialog
        v-if="innerVisible"
        :currentId="currentId"
        @changeInnerVisible="changeInnerVisible"
      ></ShowDialog>

      <!-- 上传 -->

      <UploadDia
        v-if="uploadShow"
        @changeDiaVisible="uploadHandle"
        :pId="pId"
      ></UploadDia>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import ShowDialog from "./showDialog.vue";
import UploadDia from "./uploadDia.vue";
import { menuList, productsList, lineImgs } from "./publicData";
import bus from "@/views/board/utils/bus";
import { Plus, Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const outerVisible = ref(false);
    const innerVisible = ref(false);
    const searchVal = ref<string>("");
    const logoUrl = require("../../static/images/dialogImg.png");
    let currentId = ref<string>("");
    let uploadShow = ref<boolean>(false);
    let list = ref([]);
    let pId = ref("");
    const openDetails = (id) => {
      currentId.value = id;
      innerVisible.value = true;
    };
    const ellipsis = (value) => {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    };
    const changeInnerVisible = (val) => {
      currentId.value = "";
      innerVisible.value = false;
      val && (outerVisible.value = false);
    };
    const uploadHandle = () => {
      uploadShow.value = !uploadShow.value;
      let newList = JSON.parse(localStorage.getItem("productsList"));
      let filterList = newList.filter((item) => item.pId == pId.value);
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");
    };
    const changeHandle = () => {
      let nodesInfo = proxy.$refs["menuList"].getCheckedNodes()[0];
      pId.value = nodesInfo.data.value;
      console.log(nodesInfo.data, "节点发生改变触发");
      let { value } = nodesInfo.data;
      let filterList = productsList.filter((item) => item.pId == value);
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");
    };
    const handleClose = () => {
      bus.emit("closePart", !outerVisible.value);
    };

    onMounted(() => {
      pId.value = "0010101";
      // let filterList = productsList.filter((item) => item.pId == pId.value);
      // list.value = filterList[0] ? filterList[0].content : [];
      // console.log(list.value, "获取对应产品列表");
      let dataList = JSON.parse(localStorage.getItem("productsList"))
        ? JSON.parse(localStorage.getItem("productsList"))
        : productsList;
      let filterList = dataList.filter((item) => item.pId == pId.value);
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");

      bus.on("part", (value) => {
        outerVisible.value = true;
      });
    });

    return {
      outerVisible,
      innerVisible,
      handleClose,
      logoUrl,
      searchVal,
      lineImgs,
      openDetails,
      menuList,
      productsList,
      changeHandle,
      list,
      uploadHandle,
      ellipsis,
      uploadShow,
      currentId,
      changeInnerVisible,
      pId,
    };
  },
  components: { ShowDialog, UploadDia, Plus, Search },
};
</script>

<style>
.el-image {
  position: unset;
}
.partSDia {
  height: 90%;
  overflow: hidden;
}

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

.el-cascader-node {
  padding: 0 15px 0 0;
}

.searchBox {
  text-align: center;
  padding-bottom: 15px;
}

.searchBox .el-input__inner {
  width: 400px !important;
  border-radius: 7px;
  /* height: 45px !important; */
}

.searchBox .el-input {
  width: 500px;
}

.searchBox .el-input-group__append,
.el-input-group__prepend {
  background: none;
  border: none;
  padding: 0 12px;
}

.searchBox .el-input-group--prepend > .el-input__wrapper {
  border-radius: 30px;
  height: 35px;
}

.dialogImg {
  border-radius: 30px;
  position: relative;
  top: 10px;
}

.el-input-group__prepend {
  font-size: 23px;
  line-height: 5px;
}

.recWrap .el-col {
  height: 150px;
  padding: 10px 10px;
}

.ulBox {
  margin-top: 5px;
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

.mt5 {
  margin-top: 5px;
}

.nameSty {
  text-align: left;
  line-height: 30px;
  font-size: 15px;
}

.liSty {
  width: 190px;
  height: 220px;
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

li .el-icon-plus {
  font-size: 70px;
  line-height: 180px;
}

.liSty .el-icon {
  font-size: 70px;
  margin-top: 50px;
}

.el-input-group__prepend {
  box-shadow: none;
}

.partStore .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.partStore .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.partStore .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>


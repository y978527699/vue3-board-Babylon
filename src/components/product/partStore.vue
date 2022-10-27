<template>
  <div class="partStoreWrap">
    <el-button text @click="outerVisible = true" v-show="false"
      >open the outer Dialog</el-button
    >
    <el-dialog
      v-model="outerVisible"
      id="partStore"
      width="80%"
      top="1vh"
      @close="handleClose"
      :close-on-press-escape="false"
      class="partSDia"
    >
      <!-- 搜索框 -->
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
        <!-- 添加商品按钮 -->
        <el-button type="primary" circle class="addBtn" @click="uploadHandle">
          <el-icon><Plus /></el-icon>
        </el-button>

        <!-- 轮播图 -->
        <el-carousel
          :interval="4000"
          type="card"
          height="200px"
          indicator-position="none"
          class="bannerCar"
          @change="handleBannerChange"
        >
          <el-carousel-item v-for="(item, indx) in lineImgs" :key="indx">
            <el-image
              class="lineImg"
              :src="item.img"
              @click="openDetails(item.id)"
            />
            <div class="bannerName" v-if="bannerInd == indx">
              {{ item.name }}
            </div>
          </el-carousel-item>
        </el-carousel>

        <el-divider border-style="double" class="hrSty" />
        <el-row>
          <!-- 商品分类 -->
          <el-col :span="6">
            <el-cascader-panel
              ref="menuList"
              :options="menuList"
              @change="changeHandle"
              model-value="0010101"
              class="mt5"
            />
          </el-col>

          <!-- 对应商品 -->
          <el-col :span="18">
            <ul class="ulBox mt5" v-if="list.length > 0">
              <!-- <li class="liSty" @click="uploadHandle">
                <el-icon><Plus /></el-icon>
              </li> -->
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
                    <span class="hiddenText">{{
                      ellipsis(item.introduce)
                    }}</span>
                  </template>
                </el-popover>

                <span class="hiddenText" v-else>{{ item.introduce }}</span>
              </li>
              <!-- <el-button type="primary" circle class="addBtn">
                <el-icon><Plus /></el-icon>
              </el-button> -->
            </ul>

            <el-empty v-else description="暂无数据" :image-size="200" />
          </el-col>
        </el-row>

        <ShowDialog
          v-if="innerVisible"
          :currentId="currentId"
          @changeInnerVisible="changeInnerVisible"
        ></ShowDialog>

        <upload-view
          v-if="uploadShow"
          @changeDiaVisible="uploadHandle"
          :pId="pId"
        ></upload-view>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import ShowDialog from "./showDialog.vue";
import { menuList, productsList, lineImgs } from "./publicData";
import bus from "@/views/board/utils/bus";
import { Plus, Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import UploadView from "./uploadView.vue";

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
    const changeHandle = (val) => {
      let dataList = JSON.parse(localStorage.getItem("productsList"));
      console.log(val[2]);
      pId.value = val[2];
      let filterList = dataList.filter((item) => item.pId == pId.value);
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");
    };
    const handleClose = () => {
      bus.emit("closePart", !outerVisible.value);
    };

    //获取当前轮播索引
    let bannerInd = ref(0);
    const handleBannerChange = (ind) => {
      bannerInd.value = ind;
    };

    onMounted(() => {
      pId.value = "0010101";
      let dataList = JSON.parse(localStorage.getItem("productsList"))
        ? JSON.parse(localStorage.getItem("productsList"))
        : productsList;
      console.log(dataList, "获取全部产品列表");

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
      handleBannerChange,
      bannerInd,
    };
  },
  components: { ShowDialog, Plus, Search, UploadView },
};
</script>

<style>
.el-image {
  position: unset;
}
.partSDia {
  height: 97%;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
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

.ulBox {
  margin-top: 5px;
  height: 420px;
  overflow-y: scroll;
}

.partSDia .addBtn {
  font-size: 25px !important;
  z-index: 1;
}

.partSDia .addBtn {
  width: 60px;
  height: 60px;
  position: absolute;
  right: 25px;
  bottom: 25px;
  border-radius: 60px !important;
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
  position: relative;
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

.bannerCar {
  margin: 0 5px;
}

.bannerCar .el-image__inner {
  border-radius: 15px;
}

.bannerName {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 40px;
  font-size: 22px;
  text-align: center;
  bottom: 0;
  border-bottom-left-radius: 15px;
  line-height: 40px;
  color: white;
  border-bottom-right-radius: 15px;
}

.hrSty {
  margin-bottom: 5px;
  margin-top: 10px;
}

.partStoreWrap .el-overlay-dialog {
  overflow: hidden;
}
</style>
<template>
  <el-dialog
    custom-class="detailsBox"
    v-model="visible"
    append-to-body
    @close="handleClose"
    width="50%"
    top="2vh"
    :destroy-on-close="true"
    :show-close="false"
  >
    <el-backtop :right="300" :bottom="50" target=".detailsBox" />
    <div class="bannerWrap">
      <!-- <el-row style="height:250px" v-show="isCanShow"> -->
      <el-row style="height: 250px">
        <el-col :span="12"
          ><el-carousel trigger="click" height="250px" :autoplay="false">
            <el-carousel-item>
              <video
                class="video"
                v-if="goodsData?.video"
                controls
                autoplay
                muted
                loop
              >
                <source :src="goodsData?.video" type="video/mp4" />
              </video>
            </el-carousel-item>
            <el-carousel-item v-for="item in goodsData?.bannerImgs" :key="item">
              <img style="width: 100%; height: 100%" :src="item" />
            </el-carousel-item> </el-carousel
        ></el-col>
        <el-col :span="12" id="canCol">
          <canvas id="partCanvas" style="height: 100%"></canvas>
        </el-col>
      </el-row>
      <div class="goodName">{{ goodsData?.name }}</div>
    </div>
    <div class="core">
      <div class="container">
        <div>
          <div class="goodInfo">
            <span class="goodInt">{{ goodsData?.introduce }}</span>
            <el-button
              @click="previewVisible = true"
              v-if="goodsData?.draw != ''"
              >预览图纸</el-button
            >
            <el-dialog v-model="previewVisible" class="previewImg" top="2vh">
              <img w-full :src="goodsData?.draw" alt="预览图纸" />
            </el-dialog>
          </div>
          <el-divider />
          <div class="specs">
            <div class="specsTip">可选规格：</div>
            <el-button v-for="item in goodsData?.specs" :key="item.sid">{{
              item.sname
            }}</el-button>
          </div>
          <div class="appBtn">
            <!-- <el-button type="info" @click="replace">替换</el-button> -->
            <el-button type="primary" @click="application">应用</el-button>
          </div>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane name="evaluate">
            <template #label>
              <div @click="handleJump('evaluate')" id="evaluate">评价</div>
            </template>
          </el-tab-pane>
          <el-tab-pane name="details">
            <template #label>
              <div @click="handleJump('details')">详情</div>
            </template>
          </el-tab-pane>
          <el-tab-pane label="商家" name="storeAddress">
            <template #label>
              <div @click="handleJump('storeAddress')">商家</div>
            </template>
          </el-tab-pane>
        </el-tabs>

        <div class="evaluate">
          <el-card class="box-card">
            <template #header>
              <el-row class="row-bg" justify="space-between" align="middle">
                <el-col :span="12"
                  >配件评价({{
                    goodsData?.evaluate && goodsData?.evaluate.length
                  }})</el-col
                >
                <el-col :span="12" style="text-align: right">
                  <el-link :underline="false" type="warning" href="javascript:;"
                    >查看全部 ></el-link
                  >
                </el-col>
              </el-row>
            </template>
            <template
              v-for="(item, index) in goodsData?.evaluate"
              :key="item.uid"
              class="text item"
            >
              <div class="userEva" v-if="index < 2">
                <el-row align="middle">
                  <el-col :span="2"
                    ><el-image :src="item.headImg"></el-image
                  ></el-col>
                  <el-col :span="12">
                    <div class="uname">{{ item.uname }}</div>
                    <div class="evaDate">{{ item.date }}</div>
                  </el-col>
                </el-row>
                <div class="evaCon">
                  {{ item.content }}
                </div>
              </div>
            </template>
          </el-card>
        </div>
        <div class="lineBox" id="details">
          <el-divider>配件详情</el-divider>
        </div>
        <div class="content">
          <div class="details">
            <div class="videoWrap">
              <el-button
                :icon="CaretRight"
                circle
                @click="playVideo"
                v-if="!isControl"
              />
              <video
                id="goodVideo"
                class="video"
                :controls="isControl"
                v-if="goodsData?.video"
              >
                <source :src="goodsData?.video" type="video/mp4" />
              </video>
            </div>
            <el-image
              v-for="(item, index) in goodsData?.introImgs"
              :key="index"
              :src="item"
            ></el-image>
          </div>
        </div>
        <div class="lineBox" id="storeAddress">
          <el-divider>商家</el-divider>
        </div>
        <div>
          <!-- 商家信息 -->
          <div v-if="merchantData">
            <div class="merName">{{ merchantData.name }}</div>
            <el-image
              v-for="(item, index) in merchantData.merImg"
              :key="index"
              :src="item"
            ></el-image>
          </div>
          <!-- 地图 -->
          <CustomMap
            :width="598"
            :height="346"
            :longitude="113.621058"
            :latitude="22.931429"
          ></CustomMap>
          <!-- <Baidu></Baidu> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { CaretRight } from "@element-plus/icons-vue";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  VideoHTMLAttributes,
  watch,
} from "vue";
import { goods } from "./publicData";
import CustomMap from "../customMap/index.vue";
import Baidu from "../../views/map/baidu.vue";
import bus from "@/views/board/utils/bus";
import { partBblon } from "./partBblon";
import Video from "wangeditor/dist/menus/video";
export default defineComponent({
  components: { CustomMap, Baidu },
  props: ["innerVisible", "currentId"],
  setup(props, context) {
    let isControl = ref(false);
    let previewVisible = ref(false);
    let handleCan = () => {
      let partCan = document.getElementById("partCanvas") as HTMLCanvasElement;
      let partBb = new partBblon(partCan);
    };
    let visible = true;
    let goodsData = ref({});
    let goodsId = ref("");
    let merchantData = ref({});
    const activeName = ref<string>("evaluate");
    const getData = () => {
      let goodsInfo = JSON.parse(localStorage.getItem("goodsInfo"))
        ? JSON.parse(localStorage.getItem("goodsInfo"))
        : goods;
      let filterData = goodsInfo.find((item) => {
        return item.id == goodsId.value;
      });
      goodsData.value = filterData ? filterData : {};
      console.log(goodsData, "goodsData");
      //商家信息
      let merchantInfo = JSON.parse(localStorage.getItem("merchantList"));
      console.log(merchantInfo, "商家列表");

      let merchantFilter = merchantInfo.find((item) => {
        item.id = filterData.merId;
        return item;
      });
      console.log(merchantFilter, "商家数据");

      merchantData.value = merchantFilter ? merchantFilter : {};
    };
    const handleJump = (id) => {
      //counter1是绑定的点击事件名称
      const returnEle = document.querySelector("#" + id); //productId是将要跳转区域的id
      if (!!returnEle) {
        returnEle.scrollIntoView(true); // true 是默认的
      }
      document.querySelector("handleJump").scrollIntoView(true); //这里的counter1是将要返回地方的id
    };
    onMounted(() => {
      setTimeout(() => {
        handleCan();
      }, 1);
    });
    watch(
      () => props.currentId,
      (newVal, oldVal) => {
        console.log(newVal, "newValnewValnewVal");
        goodsId.value = newVal;
        getData();
      },
      { immediate: true }
    );
    let handleClose = () => {
      context.emit("changeInnerVisible");
      // isCanShow.value = false;
    };
    // const replace = () => {};
    const application = () => {
      bus.emit("applyPart", goodsId.value);
      context.emit("changeInnerVisible", true);
    };
    let playVideo = () => {
      isControl.value = true;
      let play = document.getElementById("goodVideo") as HTMLVideoElement;
      play.play();
      // play.play()
    };
    return {
      visible,
      goodsData,
      activeName,
      handleClose,
      // replace,
      application,
      handleJump,
      handleCan,
      // isCanShow,
      previewVisible,
      isControl,
      CaretRight,
      playVideo,
      merchantData,
    };
  },
});
</script>
<style>
.detailsBox {
  height: 95% !important;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 20px;
}
.detailsBox::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.detailsBox::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}
.evaluate .el-card__body {
  padding-bottom: 0 !important;
}
.detailsBox .el-dialog__header {
  padding: 0;
}
.el-backtop__icon {
  font-size: 30px;
}

.goodInfo .el-dialog__body {
  padding: 0;
}

.bannerWrap .el-carousel__button {
  width: 7px;
  height: 7px;
  border-radius: 20px;
}

.videoWrap {
  position: relative;
}

.videoWrap .el-button {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -35px;
  margin-left: -35px;
  border-color: black;
  width: 70px;
  height: 70px;
  font-size: 55px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 500px !important;
  color: #a2a2a2;
  z-index: 1;
}
</style>
<style scoped>
.core {
  padding: 0 20px;
  position: relative;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.goodInfo .goodName {
  font-size: 22px;
  padding: 15px 0 15px 0;
}
.goodInfo .goodInt {
  color: #b7b7b7;
  width: 550px;
  display: inline-block;
  /* padding-left: 15px; */
}
.lineBox {
  height: 50px;
  padding-top: 25px;
}
.lineBox .el-divider--horizontal {
  width: 50%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
}
.specsTip {
  padding: 15px 0 15px 0;
  font-size: 15px;
}
.specs .el-button {
  min-height: 30px;
}
.container {
  margin-top: 15px;
}

.video {
  width: 100%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.evaluate .box-card {
  border-radius: 20px;
  width: 100%;
  margin: 20px 0;
  margin-bottom: 0;
}
.userEva .el-image {
  height: 40px;
  border-radius: 20px;
}
.userEva .evaDate {
  color: #999;
  font-size: 13px;
}
.userEva .evaCon {
  margin-top: 10px;
  line-height: 22px;
}
.userEva .uname {
  font-size: 14px;
  line-height: 20px;
}
.userEva {
  margin-bottom: 20px;
}

.specs {
  margin-bottom: 20px;
}
.evaluate .el-button {
  border: none;
  color: rgb(198, 136, 0);
}
.appBtn {
  width: 100%;
  text-align: center;
}
.appBtn .el-button {
  min-height: 20px;
  padding: 12px 50px;
}

.showCan {
  position: absolute;
  right: 0;
  top: -15px;
}

.bannerWrap {
  position: relative;
}

.goodName {
  position: absolute;
  top: 0px;
  background-color: rgb(0 0 0 / 40%);
  z-index: 11;
  width: 180px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  color: white;
  font-size: 25px;
}
.previewImg img {
  width: 100%;
  height: 100%;
}

.el-backtop {
  right: 310px;
  width: 60px;
  height: 60px;
  bottom: 60px;
}

.merName {
  margin: 0 auto;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 25px;
}
</style>

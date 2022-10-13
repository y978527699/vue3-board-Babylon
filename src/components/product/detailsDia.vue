<template>
  <el-dialog
    custom-class="detailsBox"
    v-model="dialogShow"
    width="50%"
    top="8vh"
  >
  <el-backtop :right="310" :bottom="60" target=".detailsBox" />

    <div>
      <!-- {{goodsData}} -->
      <el-carousel trigger="click" height="250px">
        <el-carousel-item v-for="item in goodsData.bannerImgs" :key="item">
          <img style="width:100%;height: 100%;" :src="item" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="core">
      <div>
        <div class="goodInfo">
          <h1 class="goodName">{{ goodsData.name }}</h1>
          <span class="goodInt">{{ goodsData.introduce }}</span>
        </div>
        <el-divider />
        <div class="specs">
          <div class="specsTip">可选规格：</div>
          <el-button v-for="item in goodsData.specs" :key="item.sid" round>{{
            item.sname
          }}</el-button>
        </div>
      </div>

      <div class="container">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="详情" name="details"></el-tab-pane>
          <el-tab-pane label="评价" name="evaluate"></el-tab-pane>
          <el-tab-pane label="商家地址" name="storeAddress"
            ></el-tab-pane
          >
        </el-tabs>
        <div class="content">
          <div class="details">
            <video class="video" controls>
              <source :src="goodsData.video" type="video/mp4" />
            </video>
            <el-image v-for="(item,index) in goodsData.introImgs" :key="index" :src="item"></el-image>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { goods } from "./publicData";
export default defineComponent({
  props: ["isShow", "data"],
  setup(props) {
    const activeName = ref<string>('details');
    const goodsId = ref("101");
    let goodsData = ref({});
    const getData = () => {
      let filterData = goods.filter((item) => {
        return item.id == goodsId.value;
      });
      goodsData.value = filterData ? filterData[0] : {};
      console.log(goodsData, "goodsData");
    };
    onMounted(() => {
      getData();
    });
    const dialogVisible = ref(false);
    // const dialogShow = props.isShow
    const dialogShow = true;

    return { dialogVisible, dialogShow, goodsData,activeName };
  },
});
</script>

<style>
.detailsBox {
  height: 680px !important;
  overflow: scroll;
}
.detailsBox::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.detailsBox::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}
</style>
<style scoped>
.core {
  padding: 0 20px;
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
  /* padding-left: 15px; */
}
.el-divider--horizontal {
  margin: 10px 0;
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
</style>

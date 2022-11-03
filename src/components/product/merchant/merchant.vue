<template>
  <div class="merchantWrap">
    <el-dialog
      custom-class="merchantBox"
      v-model="visible"
      append-to-body
      :before-close="handleClose"
      width="60%"
      top="1vh"
      :destroy-on-close="true"
      :show-close="false"
    >
      <div class="merNameWrap">
        <span class="merName">{{ merchantData.name }}</span>
      </div>
      <div class="merBanner">
        <el-carousel trigger="click" height="300px" :autoplay="true">
          <el-carousel-item v-for="item in merchantData.merImg" :key="item">
            <img style="width: 100%; height: 100%" :src="item" />
          </el-carousel-item>
        </el-carousel>
        <!-- <div class="goodName">{{ goodsData?.name }}</div> -->
      </div>
      <div class="core">
        <div class="container">
          <el-tabs
            v-model="tabActive"
            class="demo-tabs"
            @tab-change="tabChange"
          >
            <el-tab-pane label="所有商品" name="allGoods">
              <div>
                <ul class="merUlBox">
                  <li class="merLiSty" @click="uploadHandle">
                    <el-icon><Plus /></el-icon>
                  </li>
                  <li
                    class="merLiSty"
                    v-for="item in goodsList"
                    :key="item.id"
                    @click="goodDetails(item.id)"
                  >
                    <el-image
                      style="height: 120px"
                      :src="item.src"
                      fit="scale-down"
                    />

                    <div class="nameSty">{{ item.name }}</div>

                    <!-- <el-popover
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
                </el-popover> -->

                    <!-- <span class="hiddenText" v-else>{{ item.introduce }}</span> -->
                    <span class="hiddenText">{{ item.introduce }}</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商家" name="merchant">
              <div class="merInfo">
                <span class="merIntro">{{ merchantData.introduce }}</span>
              </div>
              <div id="allmap"></div>
            </el-tab-pane>
            <map-handle v-if="mapShow"></map-handle>
          </el-tabs>
        </div>
      </div>
      <mer-upload
        v-if="uploadShow"
        @changeDiaVisible="uploadHandle"
      ></mer-upload>
    </el-dialog>
  </div>
</template>

<script>
import { nextTick, onMounted, reactive, ref } from "vue-demi";
import { Plus } from "@element-plus/icons-vue";
import merUpload from "./merUpload.vue";
import mapHandle from "@/components/map/mapHandle.vue";
export default {
  components: { Plus, merUpload, mapHandle },
  props: ["merId"],
  setup(props, context) {
    let mapShow = ref(false);
    let tabActive = ref("allGoods");
    let visible = true;
    let merchantData = ref({});
    let handleClose = () => {
      context.emit("changeDiaVisible");
    };
    let goodsList = ref([]);
    let goodDetails = () => {};

    //上传窗口
    let uploadShow = ref(false);
    const uploadHandle = () => {
      uploadShow.value = !uploadShow.value;
      goodsList.value = [];
      let goodsData = JSON.parse(localStorage.getItem("productsList"));
      goodsData.forEach((item) => {
        item.content.forEach((goods) => {
          console.log(goods);
          if (goods.merId == props.merId) {
            goodsList.value.push(goods);
          }
        });
      });
      console.log(goodsList.value, "新列表");
    };
    let changeDiaVisible = () => {
      uploadShow.value = !uploadShow.value;
    };

    let tabChange = (value) => {
      if (value == "merchant") {
        setTimeout(() => {
          mapShow.value = true;
        }, 100);
      }
    };

    onMounted(() => {
      let merList = JSON.parse(localStorage.getItem("merchantList"));
      merchantData.value = merList.find((item) => {
        return (item.id = props.merId);
      });
      console.log(merchantData.value, "商铺数据");

      let goodsData = JSON.parse(localStorage.getItem("productsList"));
      goodsData.forEach((item) => {
        item.content.forEach((goods) => {
          if (goods.merId == props.merId) {
            goodsList.value.push(goods);
          }
        });
      });
      console.log(goodsList, "商家商品");
    });

    return {
      merchantData,
      visible,
      handleClose,
      uploadHandle,
      goodsList,
      goodDetails,
      tabActive,
      uploadShow,
      changeDiaVisible,
      tabChange,
      mapShow,
    };
  },
};
</script>

<style>
.merchantBox {
  height: 95% !important;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 20px;
}
.merchantBox > .el-dialog__header {
  padding: 0;
}
.merchantBox::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.merchantBox::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}
.detailsBox .el-dialog__header {
  padding: 0;
}

.core {
  padding: 0 20px;
  position: relative;
}
.container {
  margin-top: 15px;
}
.merInfo .merIntro {
  margin: 5px 0;
  width: 100%;
  display: inline-block;
  font-size: 15px;
  /* padding-left: 15px; */
}
.merBanner {
  position: relative;
}
.merBanner .el-carousel__button {
  width: 7px;
  height: 7px;
  border-radius: 20px;
}
.merName {
}
.merUlBox {
  margin-top: 5px;
}
.merLiSty {
  width: 180px;
  height: 220px;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  padding: 15px;
  text-align: center;
  cursor: pointer;
}

.merLiSty:hover {
  border-color: #409eff;
}
.merLiSty .el-icon {
  font-size: 70px;
  margin-top: 50px;
}
</style>
<style scoped>
#allmap {
  width: 100%;
  height: 400px;
}
.merNameWrap {
  background-color: #bdced9;
  background-image: linear-gradient(21deg, #bdced9 0%, #d8d8e3 100%);
}
.merNameWrap .merName {
  margin-left: 30px;
  font-size: 20px;
  line-height: 50px;
  color: white;
}
</style>
<!-- <style scoped>
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

.detailsBox .el-dialog__header {
  padding: 0;
}

.core {
  padding: 0 20px;
  position: relative;
}

.container {
  margin-top: 15px;
}

.merInfo .merIntro {
  color: #b7b7b7;
  width: 550px;
  display: inline-block;
  /* padding-left: 15px; */
}
</style> -->
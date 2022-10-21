<template>
  <el-button text @click="outerVisible = true" v-show="false"
    >open the outer Dialog</el-button
  >
  <el-dialog
    v-model="outerVisible"
    id="partStore"
    width="80%"
    top="8vh"
    @close="handleClose"
    :close-on-press-escape="false"
  >
    <template #title>
      <div class="mt-4 searchBox">
        <el-image
          class="dialogImg"
          style="width: 30px; height: 30px"
          :src="logoUrl"
        />

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
          <el-image
            class="lineImg"
            :src="item.img"
            @click="openDetails(item.id)"
          />
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

      <UploadDia v-if="uploadShow" @changeDiaVisible="uploadHandle"></UploadDia>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import ShowDialog from "./showDialog.vue";
import UploadDia from "./uploadDia.vue";
import { menuList, productsList, lineImgs } from "./publicData";
import bus from "@/views/board/utils/bus";
import { Plus } from "@element-plus/icons-vue";

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
    };
    const changeHandle = () => {
      let nodesInfo = proxy.$refs["menuList"].getCheckedNodes()[0];
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
      let filterList = productsList.filter((item) => item.pId == "0010101");
      list.value = filterList[0] ? filterList[0].content : [];
      console.log(list.value, "获取对应产品列表");

      bus.on("part", (value) => {
        console.log(value, "111");

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
    };
  },
  components: { ShowDialog, UploadDia, Plus },
};
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

.searchBox .el-input-group__append,
.el-input-group__prepend {
  background: none;
  border: none;
  padding: 0 12px;
}

.dialogImg {
  border-radius: 30px;
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
</style>


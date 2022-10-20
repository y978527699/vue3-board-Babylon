<template>
  <div class="replaceWrap">
    <el-dialog
      v-model="replaceShow"
      title="替换配件"
      :draggable="true"
      width="18%"
      top="25vh"
    >
      <ul class="ulBox" v-if="list.length > 0">
        <li
          class="liSty"
          v-for="item in list"
          :key="item.id"
          @click="replacePart(item.name)"
        >
          <el-image style="height: 120px" :src="item.src" fit="scale-down" />
          <div class="nameSty">{{ item.name }}</div>
          <!-- <el-button type="primary" plain>替换</el-button> -->
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { productsList } from "../publicData";
import { ElMessage, ElMessageBox } from "element-plus";
import bus from "@/views/board/utils/bus";
export default {
  setup() {
    let replaceShow = ref(false);
    let list = productsList[0].content;
    let replacePart = (name) => {
      ElMessageBox.confirm("是否切换为" + name + "配件", "切换", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "切换成功",
          });
          bus.emit("replacePart", name);
          replaceShow.value = false;
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消切换",
          });
        });
    };
    onMounted(() => {
      bus.on("replaceShow", (value) => {
        replaceShow.value = !replaceShow.value;
      });
    });
    return {
      replaceShow,
      list,
      replacePart,
    };
  },
};
</script>

<style>
.replaceWrap .el-button {
  min-height: 0;
  font-size: 12px;
}
.replaceWrap .el-dialog__title {
  line-height: 30px;
  font-size: 15px;
  color: #b3b3b3;
  padding-left: 15px;
}
.replaceWrap .el-dialog {
  margin: 0;
  margin-right: 80px;
  float: right;
  height: 400px;
  overflow: hidden;
}
.replaceWrap .el-overlay {
  background-color: rgba(0, 0, 0, 0);
}
.replaceWrap .el-dialog__headerbtn {
  top: 7px;
  right: 15px;
}
.replaceWrap .el-dialog__header {
  padding: 10px 20px 5px 0px
}
</style>
<style lang="scss" scoped>
.ulBox {
  height: 100%;
  max-height: 356px;
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
  text-align: center;
  line-height: 20px;
  font-size: 13px;
}

.liSty {
  width: 120px;
  height: 165px;
  float: left;
  margin-left: 5px;
  margin-bottom: 5px;
  border: 1px solid #f2f2f2;
  text-align: center;
  cursor: pointer;
}

.el-dialog__headerbtn {
  top: 7px;
  right: 15px;
}
</style>

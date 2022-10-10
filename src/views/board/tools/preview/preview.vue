<template>
  <div>
    <el-button text @click="show">open the outer Dialog</el-button>
    <el-dialog v-model="outerVisible" title="Outer Dialog">
    </el-dialog>
    <div>
        <canvas id="canvas2" v-show="outerVisible"></canvas>

    </div>
</div>
</template>

<script>
import { onMounted, ref } from "vue";
import { previewBlon } from "./previewBlon";
export default {
  setup() {
    const outerVisible = ref(false);
    const innerVisible = ref(false);

    function show() {
        console.log(document.querySelectorAll("canvas"));
      const canvas2 = document.getElementById("canvas2");
      let obj = new previewBlon(canvas2);
      outerVisible.value = true;
    }
    return { outerVisible, innerVisible, show };
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

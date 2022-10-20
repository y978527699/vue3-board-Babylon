<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="上传商品"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :close="closeDia"
    >
      <el-form
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="商品名">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDia">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >上传</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    let dialogVisible = true;
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: "",
    });

    let handleClose = () => {
      context.emit("changeDiaVisible");
    };
    let closeDia = () => {
      context.emit("changeDiaVisible");
    };
    return {
      dialogVisible,
      handleClose,
      closeDia,
      formLabelAlign
    };
  },
});
</script>

<style scoped></style>

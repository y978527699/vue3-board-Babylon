<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="上传商品"
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :close="closeDia"
      status-icon
    >
      <el-form
        label-width="100px"
        :model="uploadForm"
        ref="ruleFormRef"
        :rules="rules"
        class="uploadForm"
      >
        <el-form-item label="商品名" prop="name">
          <el-input v-model="uploadForm.name" />
        </el-form-item>
        <el-form-item label="规格" prop="specs">
          <el-tag
            v-for="tag in uploadForm.specs"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="specsClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="specsInpShow"
            ref="specsRef"
            v-model="specsValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleSpecsConfirm"
            @blur="handleSpecsConfirm"
          />
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            @click="handleSpecsInp"
          >
            + New Tag
          </el-button>
        </el-form-item>
        <el-form-item label="展示图片" prop="bannerImgs">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            v-model:file-list="uploadForm.bannerImgs"
          >
            <el-icon><Plus /></el-icon>

            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>

          <el-dialog v-model="imgDiaVisible" class="previewImg">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="详情图片"></el-form-item>
        <el-form-item label="视频"> </el-form-item>
        <el-form-item label="详情图片"></el-form-item>
        <el-form-item label="预览图纸"></el-form-item>
        <el-form-item label="商品描述" prop="introduce">
          <el-input v-model="uploadForm.introduce" type="textarea" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >上传</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElInput, FormInstance, FormRules } from "element-plus";
import { defineComponent, nextTick, reactive, ref } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { Plus, Delete, ZoomIn } from "@element-plus/icons-vue";

export default defineComponent({
  components: { Plus, Delete, ZoomIn },
  setup(props, context) {
    let dialogVisible = true;
    let ruleFormRef = ref<FormInstance>();
    let handleClose = () => {
      context.emit("changeDiaVisible");
    };
    let closeDia = () => {
      context.emit("changeDiaVisible");
    };

    //表格内容
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!", fields);
        }
      });
      console.log(uploadForm);
    };
    const resetForm = (ruleFormRef) => {
      if (!ruleFormRef) return;
      ruleFormRef.resetFields();
    };
    const uploadForm = reactive({
      name: "",
      introduce: "",
      bannerImgs: [],
      specs: ["银色三孔", "黑色三孔"],
      introImgs: [],
      video: "",
      draw: "",
    });
    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: "商品名不能为空",
          trigger: "blur",
        },
        // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
      specs: [
        {
          required: true,
          message: "商品规格不能为空",
          trigger: "blur",
        },
      ],
    });

    //规格方法
    let specsInpShow = ref<boolean>(false);
    let specsValue = ref<string>("");
    const specsRef = ref<InstanceType<typeof ElInput>>();
    let handleSpecsConfirm = () => {
      if (specsValue.value) {
        uploadForm.specs.push(specsValue.value);
      }
      specsInpShow.value = false;
      specsValue.value = "";
    };
    const specsClose = (value) => {
      uploadForm.specs.splice(uploadForm.specs.indexOf(value), 1);
    };
    const handleSpecsInp = () => {
      specsInpShow.value = true;
      nextTick(() => {
        specsRef.value!.input!.focus();
      });
    };

    //banner图片
    const dialogImageUrl = ref("");
    const imgDiaVisible = ref(false);
    const handleRemove: UploadProps["onRemove"] = (uploadFile) => {
      console.log(uploadFile);
    };
    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url!;
      imgDiaVisible.value = true;
    };

    return {
      dialogVisible,
      handleClose,
      closeDia,
      uploadForm,
      rules,
      submitForm,
      ruleFormRef,
      resetForm,
      imgDiaVisible,
      handleRemove,
      handlePictureCardPreview,
      dialogImageUrl,
      specsClose,
      specsInpShow,
      specsValue,
      handleSpecsConfirm,
      handleSpecsInp,
      specsRef,
    };
  },
});
</script>

<style>
.uploadForm .el-textarea__inner {
  min-height: 150px !important;
  width: 80%;
}
.uploadForm .el-form-item__content {
  flex: 1 !important;
}
.uploadForm .el-form-item__label {
  margin-right: 20px;
}
.uploadForm .el-form-item {
  margin-bottom: 20px !important;
}
</style>
<style scoped>
.previewImg img {
  width: 100%;
  height: 100%;
}
</style>

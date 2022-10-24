<template>
  <div id="uploadWrap">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      title="上传商品"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :close="closeDia"
      status-icon
      top="3vh"
      class="uploadDialog"
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
            :key="tag.sid"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="specsClose(tag.sname)"
          >
            {{ tag.sname }}
          </el-tag>
          <el-input
            v-if="specsInpShow"
            ref="specsRef"
            v-model="specsValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleSpecsConfirm"
            @blur="handleSpecsConfirm"
            placeholder="回车或离焦添加规格"
          />
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            @click="handleSpecsInp"
          >
            添加规格
          </el-button>
        </el-form-item>
        <el-form-item label="展示图片" prop="bannerImgs">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            v-model:file-list="uploadForm.bannerImgs"
            :multiple="true"
            :accept="'.jpg'"
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
        <el-form-item label="视频" prop="video" class="video">
          <el-upload
            ref="upVideo"
            class="upload-demo"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :v-model:file-list="uploadForm.video"
            :accept="'.mp4'"
            :on-success="handleChange"
          >
            <template #trigger>
              <el-button type="primary">选择视频</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="详情图片" prop="introImgs">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            v-model:file-list="uploadForm.introImgs"
            :multiple="true"
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
        </el-form-item> -->
        <el-form-item label="预览图纸" prop="draw">
          <el-upload
            v-model:file-list="uploadForm.draw"
            list-type="picture-card"
            :on-preview="handleDrawPreview"
            :on-remove="DrawRemove"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="DrawDiaVisible" class="previewImg">
            <img w-full :src="DrawUrl" alt="预览图纸" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述" prop="introduce">
          <el-input v-model="uploadForm.introduce" type="textarea" />
          <div class="mgb20" ref="editorRef"></div>
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
import {
  ElInput,
  ElMessage,
  FormInstance,
  FormRules,
  genFileId,
  UploadInstance,
  UploadRawFile,
} from "element-plus";
import { defineComponent, nextTick, reactive, ref, onMounted } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import { Plus, Delete, ZoomIn } from "@element-plus/icons-vue";
import { goods, productsList } from "./publicData";

export default defineComponent({
  components: { Plus, Delete, ZoomIn },
  props: ["pId"],
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
          uploadForm.id = "103";

          let productData = JSON.parse(localStorage.getItem("productsList"))
            ? JSON.parse(localStorage.getItem("productsList"))
            : productsList;
          productData.forEach((item) => {
            if (item.pId == props.pId) {
              item.content.push({
                id: uploadForm.id,
                name: uploadForm.name,
                src: uploadForm.bannerImgs[0].url,
                introduce: uploadForm.introduce,
              });
            }
          });
          localStorage.setItem("productsList", JSON.stringify(productData));

          uploadForm.bannerImgs = uploadForm.bannerImgs.map((item) => {
            return item.url;
          });
          uploadForm.introImgs = uploadForm.bannerImgs;
          goods.push(uploadForm);

          localStorage.setItem("goodsInfo", JSON.stringify(goods));
          closeDia();
          ElMessage({
            message: "Congrats, this is a success message.",
            type: "success",
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const resetForm = (ruleFormRef) => {
      if (!ruleFormRef) return;
      ruleFormRef.resetFields();
    };
    const uploadForm = reactive({
      id: "",
      name: "",
      introduce: "",
      bannerImgs: [],
      specs: [],
      introImgs: [],
      video: "",
      draw: "",
      evaluate: [
        {
          uid: 0,
          uname: "张三",
          headImg:
            "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
          star: 4,
          date: "2022/10/1",
          content: "配件很好，很不错！我不是水军，我是火军",
        },
        {
          uid: 1,
          uname: "弟弟",
          headImg:
            "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
          star: 2,
          date: "2022/10/1",
          content:
            "我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军",
        },
        {
          uid: 1,
          uname: "弟弟",
          headImg:
            "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
          star: 2,
          date: "2022/10/1",
          content:
            "我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军",
        },
      ],
    });
    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: "商品名不能为空",
          trigger: "blur",
        },
        // { min: 3, max: 5, message: "字符长度", trigger: "blur" },
      ],
      specs: [
        {
          required: true,
          message: "商品规格不能为空",
          trigger: "blur",
        },
      ],
      bannerImgs: [
        {
          required: true,
          message: "展示图片不能为空",
          trigger: "blur",
        },
      ],
    });

    //规格方法
    let sid = ref(0);
    let specsInpShow = ref<boolean>(false);
    let specsValue = ref<string>("");
    const specsRef = ref<InstanceType<typeof ElInput>>();
    let handleSpecsConfirm = () => {
      if (specsValue.value) {
        uploadForm.specs.push({ sid: sid.value++, sname: specsValue.value });
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

    //上传视频
    const upVideo = ref<UploadInstance>();
    const handleExceed: UploadProps["onExceed"] = (files) => {
      console.log(files);

      upVideo.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      upVideo.value!.handleStart(file);
      console.log(upVideo.value);
    };
    const handleChange = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles, "uploadFile, uploadFiles");
    };
    //预览图纸
    let DrawDiaVisible = ref(false);
    const DrawUrl = ref("");
    let handleDrawPreview: UploadProps["onPreview"] = (uploadFile) => {
      DrawUrl.value = uploadFile.url!;
      DrawDiaVisible.value = true;
    };
    let DrawRemove: UploadProps["onRemove"] = (uploadFile) => {
      console.log(uploadFile);
    };

    //富文本
    onMounted(() => {});

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
      handleExceed,
      handleChange,
      upVideo,
      handleDrawPreview,
      DrawDiaVisible,
      DrawUrl,
      DrawRemove,
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
.uploadForm .el-tag.is-closable {
  margin-right: 5px;
}
.uploadForm .el-upload {
  width: 100px;
  height: 100px;
}
.uploadForm .video .el-upload {
  height: 0;
}
.uploadForm .video .el-button {
  font-size: 10px;
  margin-left: -20px;
}
#uploadWrap .uploadDialog {
  height: 90%;
  overflow: scroll;
}
.uploadDialog::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.uploadDialog::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}
</style>
<style scoped>
.previewImg img {
  width: 100%;
  height: 100%;
}
</style>

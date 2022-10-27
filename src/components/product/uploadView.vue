<template>
  <div id="uploadWrap">
    <el-dialog
      v-model="dialogVisible"
      width="70%"
      title="上传商品"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :close="closeDia"
      status-icon
      top="4vh"
      class="uploadDialog"
    >
      <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="商品信息">
          <el-form
            label-width="100px"
            :model="uploadForm"
            ref="ruleFormRef"
            :rules="rules"
            class="uploadForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名" prop="name">
                  <el-input
                    v-model="uploadForm.name"
                    placeholder="请输入商品名"
                  />
                </el-form-item>

                <el-form-item label="封面" prop="cover">
                  <el-upload
                    v-model:file-list="uploadForm.cover"
                    list-type="picture-card"
                    :on-preview="handleCoverPreview"
                    :on-remove="coverRemove"
                    :auto-upload="false"
                    :accept="'.jpg,.png'"
                    :class="{ coverHide: hideCoverUpload }"
                    :on-change="handleCoverChange"
                  >
                    <el-icon><Camera /></el-icon>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        仅可上传一张封面，需要替换请先触摸图片删除
                      </div>
                    </template>
                  </el-upload>

                  <el-dialog v-model="coverDiaVisible" class="previewImg">
                    <img w-full :src="coverUrl" alt="封面" />
                  </el-dialog>
                </el-form-item>

                <el-form-item
                  label="详情图片"
                  prop="introImgs"
                  class="introImgs"
                >
                  <el-upload
                    list-type="picture-card"
                    :auto-upload="false"
                    v-model:file-list="uploadForm.introImgs"
                    :multiple="true"
                    :on-change="introChange"
                    :accept="'.jpg,.png'"
                  >
                    <el-icon><Camera /></el-icon>

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
                            @click="handleIntroPreview(file)"
                          >
                            <el-icon><zoom-in /></el-icon>
                          </span>
                          <span
                            class="el-upload-list__item-delete"
                            @click="handleIntroRemove(file, uploadFiles)"
                          >
                            <el-icon><Delete /></el-icon>
                          </span>
                        </span>
                      </div>
                    </template>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        可多选文件进行上传
                      </div>
                    </template>
                  </el-upload>

                  <el-dialog v-model="introVisible" class="previewImg">
                    <img w-full :src="introImageUrl" alt="Preview Image" />
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
                    :on-change="handleChange"
                  >
                    <template #trigger>
                      <el-button type="primary">选择视频</el-button>
                    </template>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        仅可上传一个视频，超出将替换原视频
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="规格" prop="specs" class="specs">
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
                    ref="specsRef"
                    v-model="specsValue"
                    class="ml-1 w-25"
                    size="small"
                    @keyup.enter="handleSpecsConfirm"
                    @blur="specsValue = ''"
                    placeholder="回车添加规格"
                  >
                    <template #suffix>
                      <span>{{ uploadForm.specs.length }}/10</span>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item label="预览图纸" prop="draw">
                  <el-upload
                    v-model:file-list="uploadForm.draw"
                    list-type="picture-card"
                    :on-preview="handleDrawPreview"
                    :on-remove="DrawRemove"
                    :auto-upload="false"
                    :accept="'.jpg,.png'"
                    :class="{ hide: hideDrawUpload }"
                    :on-change="handleDrawChange"
                  >
                    <el-icon><Camera /></el-icon>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        仅可上传一张预览图纸，需要替换请先触摸图片删除
                      </div>
                    </template>
                  </el-upload>

                  <el-dialog v-model="DrawDiaVisible" class="previewImg">
                    <img w-full :src="DrawUrl" alt="预览图纸" />
                  </el-dialog>
                </el-form-item>

                <el-form-item
                  label="轮播展示图"
                  prop="bannerImgs"
                  class="bannerImgs"
                >
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    v-model:file-list="uploadForm.bannerImgs"
                    :multiple="true"
                    :accept="'.jpg,.png'"
                    :on-change="bannerChange"
                  >
                    <el-icon><Camera /></el-icon>

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
                            @click="handleRemove(file, uploadFiles)"
                          >
                            <el-icon><Delete /></el-icon>
                          </span>
                        </span>
                      </div>
                    </template>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        可多选文件进行上传
                      </div>
                    </template>
                  </el-upload>

                  <el-dialog v-model="imgDiaVisible" class="previewImg">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                  </el-dialog>
                </el-form-item>

                <el-form-item
                  label="商品描述"
                  prop="introduce"
                  class="introduce"
                >
                  <el-input
                    v-model="uploadForm.introduce"
                    :rows="2"
                    type="textarea"
                    placeholder="请输入商品描述"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="技术信息">
          <el-form
            label-width="100px"
            :model="uploadForm"
            ref="ruleTecFormRef"
            :rules="rules"
            class="uploadForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品长度" prop="width">
                  <el-input
                    v-model="uploadForm.tec.width"
                    placeholder="请输入商品长度"
                  />
                </el-form-item>
                <el-form-item label="商品宽度" prop="depth">
                  <el-input
                    v-model="uploadForm.tec.depth"
                    placeholder="请输入商品宽度"
                  />
                </el-form-item>
                <el-form-item label="安装步骤图" prop="introImgs">
                  <el-upload
                    list-type="picture-card"
                    :auto-upload="false"
                    v-model:file-list="uploadForm.tec.installDraw"
                    :multiple="true"
                    :accept="'.jpg,.png'"
                  >
                    <el-icon><Camera /></el-icon>

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
                            @click="handleTecIntroPreview(file)"
                          >
                            <el-icon><zoom-in /></el-icon>
                          </span>
                          <span
                            class="el-upload-list__item-delete"
                            @click="handleTecIntroRemove(file, uploadFiles)"
                          >
                            <el-icon><Delete /></el-icon>
                          </span>
                        </span>
                      </div>
                    </template>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        可多选文件进行上传
                      </div>
                    </template>
                  </el-upload>

                  <el-dialog v-model="introVisible" class="previewImg">
                    <img w-full :src="introImageUrl" alt="Preview Image" />
                  </el-dialog>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品高度" prop="height">
                  <el-input
                    v-model="uploadForm.tec.width"
                    placeholder="请输入商品高度"
                  />
                </el-form-item>
                <el-form-item label="视频" prop="video" class="video">
                  <el-upload
                    ref="upTecVideo"
                    class="upload-demo"
                    :limit="1"
                    :on-exceed="handleTecExceed"
                    :auto-upload="false"
                    :v-model:file-list="uploadForm.tec.installVideo"
                    :accept="'.mp4'"
                    :on-change="handleTecChange"
                  >
                    <template #trigger>
                      <el-button type="primary">选择视频</el-button>
                    </template>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        仅可上传一个视频，超出将替换原视频
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="企业主页">主页维护</el-tab-pane>
      </el-tabs>

      <template #footer>
        <span class="dialog-footer footBtn">
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
import type { UploadProps } from "element-plus";
import { Plus, Delete, ZoomIn, Camera } from "@element-plus/icons-vue";
import { goods, productsList } from "./publicData";

export default defineComponent({
  components: { Plus, Delete, ZoomIn, Camera },
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
    let uploadCategory = ref("商品信息");

    //表格内容
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
          let id = Math.floor(Math.random() * 1000).toString();

          let productData = JSON.parse(localStorage.getItem("productsList"))
            ? JSON.parse(localStorage.getItem("productsList"))
            : productsList;

          productData.forEach((item) => {
            if (item.pId == props.pId) {
              item.content.push({
                id,
                name: uploadForm.name,
                src: require("@/static/images/partImg/" +
                  uploadForm.cover[0].name),
                introduce: uploadForm.introduce,
              });
            }
          });

          localStorage.setItem("productsList", JSON.stringify(productData));

          let bannerImgs = uploadForm.bannerImgs.map((item, index) => {
            return require("@/static/images/partImg/" + item.name);
          });
          let introImgs = [];
          if (uploadForm.introImgs.length != 0) {
            introImgs = uploadForm.introImgs.map((item, index) => {
              return require("@/static/images/partImg/" + item.name);
            });
          }
          let draw = "";
          if (uploadForm.draw.length != 0) {
            draw = require("@/static/images/partImg/" +
              uploadForm.draw[0].name);
          }
          let setList = {
            id,
            name: uploadForm.name,
            introduce: uploadForm.introduce,
            bannerImgs,
            specs: uploadForm.specs,
            introImgs,
            video: uploadForm.video,
            draw,
            evaluate: uploadForm.evaluate,
            cover: require("@/static/images/partImg/" +
              uploadForm.cover[0].name),
          };

          goods.push(setList);

          localStorage.setItem("goodsInfo", JSON.stringify(goods));
          closeDia();
          ElMessage({
            message: "上传成功",
            type: "success",
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const resetForm = (ruleFormRef) => {
      if (!ruleFormRef && ruleTecFormRef) return;
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
      draw: [],
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
      cover: [],
      tec: {
        width: 0,
        heigh: 0,
        depth: 0,
        holes: 0,
        installDraw: [],
        installVideo: "",
      },
    });
    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: "商品名不能为空",
          trigger: "blur",
        },
        { min: 1, max: 10, message: "名字数量在1~10之间", trigger: "blur" },
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
          message: "轮播展示图不能为空",
          trigger: "blur",
        },
      ],
      cover: [
        {
          required: true,
          message: "封面图片不能为空",
        },
      ],
    });

    //banner图片
    const dialogImageUrl = ref("");
    const imgDiaVisible = ref(false);
    const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
      uploadForm.bannerImgs.splice(
        uploadForm.bannerImgs.indexOf(uploadFile),
        1
      );
    };
    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url!;
      imgDiaVisible.value = true;
    };
    const bannerChange = () => {
      let target = document.querySelector(".bannerImgs");
      target.children[1].scrollTop = target.children[1].scrollHeight;
    };

    //规格方法
    let sid = ref(0);
    let specsInpShow = ref<boolean>(false);
    let specsValue = ref<string>("");
    const specsRef = ref<InstanceType<typeof ElInput>>();
    let handleSpecsConfirm = () => {
      let isSpecs = uploadForm.specs.find((item) => {
        if (item.sname == specsValue.value) {
          return true;
        }
      });
      if (isSpecs) {
        specsValue.value = "";
        ElMessage({
          message: "规格重复!",
          type: "warning",
        });
        return;
      }
      if (uploadForm.specs.length > 9) {
        specsValue.value = "";
        ElMessage({
          message: "不可超过10个规格!",
          type: "error",
        });
        return;
      }
      if (specsValue.value) {
        uploadForm.specs.push({ sid: sid.value++, sname: specsValue.value });
      }
      console.log(specsValue.value, uploadForm.specs);
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

    //封面
    // let cover = ref();
    let hideCoverUpload = ref(false);
    let coverDiaVisible = ref(false);
    const coverUrl = ref("");
    let handleCoverPreview: UploadProps["onPreview"] = (uploadFile) => {
      coverUrl.value = uploadFile.url!;
      coverDiaVisible.value = true;
    };
    let coverRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
      uploadFiles.splice(0, 1);
      hideCoverUpload.value = false;
    };
    let handleCoverChange = (uploadFile, uploadFiles) => {
      hideCoverUpload.value = uploadFiles.length >= 1;
      uploadForm.cover = uploadFile;
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
    let handleChange = (file, fileLists) => {
      uploadForm.video = require("@/static/images/partImg/" + file.name);
    };

    //详情图片
    const introImageUrl = ref("");
    const introVisible = ref(false);
    const handleIntroRemove: UploadProps["onRemove"] = (
      uploadFile,
      uploadFiles
    ) => {
      uploadForm.introImgs.splice(uploadForm.introImgs.indexOf(uploadFile), 1);
    };
    const handleIntroPreview: UploadProps["onPreview"] = (uploadFile) => {
      introImageUrl.value = uploadFile.url!;
      introVisible.value = true;
    };
    const introChange = () => {
      let target = document.querySelector(".introImgs");
      target.children[1].scrollTop = target.children[1].scrollHeight;
    };

    //预览图纸
    let hideDrawUpload = ref(false);
    let DrawDiaVisible = ref(false);
    const DrawUrl = ref("");
    let handleDrawPreview: UploadProps["onPreview"] = (uploadFile) => {
      DrawUrl.value = uploadFile.url!;
      DrawDiaVisible.value = !DrawDiaVisible.value;
    };
    let DrawRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
      uploadFiles.splice(0, 1);
      hideDrawUpload.value = false;
    };
    let handleDrawChange = (uploadFile, uploadFiles) => {
      hideDrawUpload.value = uploadFiles.length >= 1;
    };

    //技术信息
    let ruleTecFormRef = ref<FormInstance>();
    //上传视频
    const upTecVideo = ref<UploadInstance>();
    const handleTecExceed: UploadProps["onExceed"] = (files) => {
      console.log(files);
      upTecVideo.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      upTecVideo.value!.handleStart(file);
      console.log(upTecVideo.value);
    };
    let handleTecChange = (file, fileLists) => {
      uploadForm.tec.installVideo = require("@/static/images/partImg/" +
        file.name);
    };

    //安装步骤图
    const introTecImageUrl = ref("");
    const tecImgVisible = ref(false);
    const handleTecIntroRemove: UploadProps["onRemove"] = (
      uploadFile,
      uploadFiles
    ) => {
      uploadForm.tec.installDraw.splice(
        uploadForm.tec.installDraw.indexOf(uploadFile),
        1
      );
    };
    const handleTecIntroPreview: UploadProps["onPreview"] = (uploadFile) => {
      introTecImageUrl.value = uploadFile.url!;
      tecImgVisible.value = true;
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
      handleExceed,
      handleChange,
      upVideo,
      handleDrawPreview,
      DrawDiaVisible,
      DrawUrl,
      DrawRemove,
      hideDrawUpload,
      handleDrawChange,
      hideCoverUpload,
      coverDiaVisible,
      handleCoverPreview,
      coverRemove,
      handleCoverChange,
      handleIntroPreview,
      handleIntroRemove,
      introVisible,
      introImageUrl,
      coverUrl,
      bannerChange,
      introChange,
      uploadCategory,

      //技术信息
      upTecVideo,
      handleTecExceed,
      handleTecChange,
      handleTecIntroPreview,
      handleTecIntroRemove,
      ruleTecFormRef,
    };
  },
});
</script>

<style>
.uploadForm .el-textarea__inner {
  min-height: 80px !important;
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
.uploadDialog .bannerImgs .el-form-item__content {
  height: 196px;
  overflow: auto;
  overflow-x: hidden;
}

.bannerImgs .el-form-item__content::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.bannerImgs .el-form-item__content::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}
.uploadDialog .introImgs .el-form-item__content {
  height: 196px;
  overflow: auto;
  overflow-x: hidden;
}

.introImgs .el-form-item__content::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.introImgs .el-form-item__content::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}

#uploadWrap .uploadDialog {
  height: 90%;
  overflow: auto;
  overflow-x: hidden;
  border-radius: 15px;
}

.uploadDialog::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.uploadDialog::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}

.uploadDialog .el-upload-list__item {
  width: 100px;
  height: 100px;
}

.specs .el-input-group__append {
  box-shadow: none;
  background-color: white;
  padding: 0 5px;
}

.el-upload--picture-card i {
  font-size: 20px;
}

.hide .el-upload--picture-card {
  display: none;
}

.coverHide .el-upload--picture-card {
  display: none;
}

.introduce .el-textarea__inner::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.introduce .el-textarea__inner::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 6px;
}

.uploadDialog .el-upload-list__item > div {
  margin: 0 auto;
}

.uploadDialog .el-dialog__footer {
  position: absolute;
  left: 35%;
  bottom: 0;
  text-align: center;
  padding-top: 20px;
}

.uploadDialog .el-dialog__footer .el-button {
  margin-left: 5px;
  font-size: 15px;
  width: 120px;
}
.uploadDialog .video .el-upload-list__item {
  width: 200px;
  height: 30px;
}
</style>
<style scoped>
.previewImg img {
  width: 100%;
  height: 100%;
}
</style>

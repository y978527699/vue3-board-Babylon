<template>
    <div>
        <!-- 需要生成的元素 -->
        <div id="canvas">
            <div class="theme-all canvas-title">需要生成的标题</div>
            <img src="../../assets/img/vue-img.jpg" alt="需要生成的图片" />
        </div>

        <!-- ----------------------------------------------------------- -->
        <hr style="margin-top:50px" />
        <button class="theme-all sub" @click="startEvent">
            点击我生成图片
        </button>
        <hr style="margin-top:50px" />
        <div class="canvas-res">
            <div>生成后的结果（图片）：</div>
            <img :src="state.url" alt="生成后的图片" />
        </div>

        <hr style="margin-top:50px" />
        <div style="text-align: center;">
            <a
                href="http://html2canvas.hertzen.com/"
                target="_blank"
                rel="noopener noreferrer"
                >html2canvas插件官网地址</a
            >
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
// @ts-ignore;
import { canvasEvent } from "@/utils/canvas.ts";
import { ElLoading, ElMessage } from "element-plus";
export default defineComponent({
    setup() {
        let state: any = reactive({
            url: "",
        });
        let startEvent = async () => {
            const loading = ElLoading.service({
                lock: true,
                text: "正在生成....",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            try {
                // 第一个参数为需要合成的父元素元素id，第二个参数为生成的背景颜色；
                let url = await canvasEvent("#canvas", "#fff");
                state.url = url;
                loading.close();
            } catch (err) {
                loading.close();
                ElMessage.error("生成失败！");
            }
        };
        return {
            state,
            startEvent,
        };
    },
});
</script>
<style scoped lang="scss">
#canvas {
    text-align: center;
    .canvas-title {
        font-size: 40px;
        width: fit-content;
        margin: 10px auto;
        padding: 10px 50px;
        border-radius: 5px;
    }
    img {
        width: 500px;
    }
}
.sub {
    padding: 10px 30px;
    display: block;
    margin: 20px auto;
    cursor: pointer;
}
.canvas-res {
    text-align: center;
    div {
        font-size: 30px;
    }
    img {
        width: 800px;
        margin-top: 20px;
    }
}
</style>

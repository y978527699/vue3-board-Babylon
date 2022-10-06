<template>
    <div class="code-box">
        <div id="code"></div>
        <el-button class="theme-bg code-btn" type="primary" @click="codeEvent"
            >点击生成二维码</el-button
        >
        <div class="code-hint">属性说明（摘自：web技术栈）</div>
        <div style="text-align: center;">
            <a
                href="https://www.npmjs.com/package/qrcode"
                target="_blank"
                rel="noopener noreferrer"
                >qrcanvas插件官网地址</a
            >
        </div>
        <img
            class="code-hint-img"
            src="../../assets/img/code-hint.png"
            alt=""
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore;
import { qrcanvas } from "qrcanvas";
export default defineComponent({
    setup() {
        const codeEvent = () => {
            let img = new Image();
            img.src =
                "https://360-1300783623.cos.ap-guangzhou.myqcloud.com/logo/logo.png";
            img.onload = function() {
                const canvas = qrcanvas({
                    data: "https://gitee.com/MMinter/vue3.0-ts-admin",
                    size: 300,
                    logo: {
                        image: img,
                    },
                });
                // @ts-ignore;
                document.getElementById("code").appendChild(canvas);
            };
        };
        return {
            codeEvent,
        };
    },
});
</script>
<style scoped>
.code-box {
    text-align: center;
}
#code {
    margin: 10px auto;
    height: 300px;
}
.code-btn {
    display: block;

    margin: 50px auto;
}
.code-hint {
    margin-bottom: 10px;
    font-size: 28px;
    font-weight: 600;
}
</style>

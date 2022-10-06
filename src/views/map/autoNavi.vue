<template>
    <div>
        <div id="map"></div>
 

        <div style=" text-align: center;color:red">注意：请先在/public/index.html 中修改成你的key(密钥)，即可显示</div>
        <div class="code-editor"><codeEditor value='<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=你的密钥"></script> '></codeEditor></div>
        <a href="https://lbs.amap.com/api/javascript-api/guide/abc/prepare" target="_blank" rel="noopener noreferrer"><div style=" text-align: center;">更多文档（获取密钥）说明：点击进入</div></a> 
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import codeEditor from '@/components/codeEditor/codeEditor.vue';
export default defineComponent({
    setup() {
        onMounted(() => {
            try{
            // @ts-ignore
                new AMap.Map('map', {
                    zoom:11,//级别
                    center: [113.27, 23.13],//中心点坐标
                });
            }catch(err){console.log("请先设置密钥")}
        });
    },
    components: {
        codeEditor
    },
});
</script>
<style scoped>
#map {
    width: 1000px;
    height: 500px;
    margin: 20px auto;
}
.code-editor{
    width: 1000px;
    height: 50px;
    overflow: hidden;
    margin: 10px auto;
   
}
</style>

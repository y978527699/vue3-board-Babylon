<template>
    <div>
        <div id="map"></div>
    
    
        <div style=" text-align: center;color:red">注意：请先在/public/index.html 中修改成你的ak(密钥)，即可显示</div>
        <div class="code-editor"><codeEditor value='<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=你的密钥"></script>'></codeEditor></div>
        <a href="https://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/getkey" target="_blank" rel="noopener noreferrer"><div style=" text-align: center;">更多文档（获取密钥）说明：点击进入</div></a> 
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import codeEditor from '@/components/codeEditor/codeEditor.vue';
export default defineComponent({
    setup() {
        onMounted(() => {
            try{
                // @ts-ignore //忽略提示
                let map = new BMap.Map("map"); // 创建地图实例
                // @ts-ignore //忽略提示
                let point = new BMap.Point(113.27, 23.13); // 创建点坐标
                map.centerAndZoom(point, 15);
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

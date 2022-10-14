<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import codeEditor from "@/components/codeEditor/codeEditor.vue";
export default defineComponent({
  setup() {
    onMounted(() => {
      try {
        // @ts-ignore //忽略提示
        let map = new BMap.Map("map"); // 创建地图实例
        // @ts-ignore //忽略提示
        let point = new BMap.Point(113.622325, 22.93348); // 创建点坐标
        map.centerAndZoom(point, 15);
      } catch (err) {
        console.log("请先设置密钥");
      }
    });
  },
  components: {
    codeEditor,
  },
});
</script>
<style scoped>
#map {
  width: 100%;
  height: 500px;
  margin: 20px auto;
}
</style>

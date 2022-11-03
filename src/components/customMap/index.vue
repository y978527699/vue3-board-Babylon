<template>
  <div id="map" :style="{ width: width + 'px', height: height + 'px' }"></div>
</template>
   
  <script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  props: {
    // 传入需要定位的经纬度
    longitude: {
      type: Number,
      default: () => {
        return 113.621058;
      },
    },
    latitude: {
      type: Number,
      default: () => {
        return 22.931429;
      },
    },
    width: {
      type: Number,
      default: 598,
    },
    height: {
      type: Number,
      default: 346,
    },
  },
  setup(props, { emit }) {
    const BMap = (window as any).BMap;

    onMounted(() => {
      var map = new BMap.Map("map");
      var point = new BMap.Point(props.longitude, props.latitude);
      //   var point = new BMap.Point(116.46, 39.92)
      console.log(props.latitude);
      console.log(props.longitude);
      //   console.log(point)

      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      map.addEventListener("click", function (e: any) {
        //   let a = JSON.parse(e)
        console.log("点击的经纬度：" + e.point.lng + "," + e.point.lat); //
        emit("update:longitude", e.point.lng);
        emit("update:latitude", e.point.lat);
      });
    });
  },
});
</script>

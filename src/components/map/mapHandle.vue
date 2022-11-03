<template></template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
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
  },
  setup(props) {
    onMounted(() => {
      let aa = document.getElementById("allmap");
      var map = new BMapGL.Map(aa); // 创建Map实例
      var point = new BMapGL.Point(props.longitude, props.latitude);
      map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      var marker = new BMapGL.Marker(point);
      map.addOverlay(marker);
      var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
      map.addControl(zoomCtrl);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
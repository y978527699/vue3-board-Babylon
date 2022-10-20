<template>
  <div class="wrap">
    <PartStore></PartStore>
    <MiniProduct></MiniProduct>
    <!-- <Preview></Preview> -->
    <BoxDialog class="BoxDialog"></BoxDialog>
    <BabylonScene></BabylonScene>
    <PanelHandle></PanelHandle>
  </div>
</template>

<script>
import MiniProduct from "../../components/product/miniProduct/miniProduct.vue";
import BoxDialog from "./tools/boxDialog.vue";
import BabylonScene from "./BabylonScene.vue";
import PanelHandle from "./tools/panelHandle";
import Preview from "./tools/preview/preview.vue";
import PartStore from "../../components/product/partStore.vue";
export default {
  components: {
    BoxDialog,
    BabylonScene,
    PanelHandle,
    Preview,
    MiniProduct,
    PartStore,
  },
  setup() {
    return {};
  },
};
</script>

<style>
.wrap {
  position: relative;
}
.BoxDialog {
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

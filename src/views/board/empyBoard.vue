<template>
  <div class="wrap">
    <Product></Product>
    <!-- <Preview></Preview> -->
    <BoxDialog class="BoxDialog"></BoxDialog>
    <BabylonScene></BabylonScene>
    <PanelHandle></PanelHandle>
  </div>
</template>

<script>
import BoxDialog from "./tools/boxDialog.vue";
import BabylonScene from "./BabylonScene.vue";
import PanelHandle from './tools/panelHandle'
import Preview from './tools/preview/preview.vue'
import Product from '../../components/product/product.vue'
export default {
  components: { BoxDialog, BabylonScene,PanelHandle,Preview,Product },
  setup(){
    return {
    }
  }
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

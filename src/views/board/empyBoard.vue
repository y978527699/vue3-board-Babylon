<template>
  <div class="wrap">
    <BoxDialog class="BoxDialog"></BoxDialog>
    <BabylonScene></BabylonScene>
    <PanelHandle></PanelHandle>
  </div>
</template>

<script>
import BoxDialog from "./tools/boxDialog.vue";
import BabylonScene from "./BabylonScene.vue";
import PanelHandle from './tools/panelHandle'
export default {
  components: { BoxDialog, BabylonScene,PanelHandle },
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

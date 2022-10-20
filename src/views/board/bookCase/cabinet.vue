<template>
  <div>
    <canvas id="cabCanvas" v-menus:right="menus"></canvas>
  </div>
</template>

<script>
import { onMounted, shallowRef } from "vue-demi";
import cabBblon from "./cabBblon";
import { directive } from "vue3-menus";
export default {
  directives: {
    menus: directive,
  },
  setup() {
    let cab;
    const menus = shallowRef({
      menus: [
        {
          label: "添加五金",
          children: [
            {
              label: "克在",
              click: () => {
                cab.addHardware();
              },
            },
          ],
        },
      ],
    });
    onMounted(() => {
      setTimeout(() => {
        let cabCanvas = document.getElementById("cabCanvas");
        cab = new cabBblon(cabCanvas);
      }, 1);
    });
    return {
      menus,
    };
  },
};
</script>

<style lang="scss" scoped>
#cabCanvas {
  width: 100%;
  height: calc(100vh - 54px);
  position: relative;
}
</style>
<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  setup(props) {
    let theme = window.localStorage.getItem("theme");
    theme && window.document.documentElement.setAttribute("data-ming", theme);
  },
  components: {},
});
</script>

<style lang="scss">
* {
  margin: 0;
}
</style>

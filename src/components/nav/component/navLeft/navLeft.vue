<template>
  <div>
    <!-- <div> -->
    <el-menu
      :collapse="state.isSidebarNavCollapse"
      text-color="#eee"
      active-text-color="#4dbcff"
      :default-active="state.currentMenu"
      class="theme-bg"
      id="menu"
      :unique-opened="true"
      @mouseenter="handleOpenMenu"
      @mouseleave="handleCloseMenu"
    >
      <MENU :menuList="state.sidebarMenu"></MENU>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, reactive, computed, ref, onMounted } from "vue";
import MENU from "./menu.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    let state = reactive({
      sidebarMenu: computed(() => store.getters.GET_MENU),
      currentMenu: computed(() => store.getters.GET_CURRENTMENU),
      isSidebarNavCollapse: computed(
        () => store.getters.getIsSidebarNavCollapse
      ),
    });
    let handleOpenMenu = () => {
      setTimeout(() => {
        store.commit("openCollapse");
      }, 100);
    };
    let handleCloseMenu = () => {
      setTimeout(() => {
        store.commit("closeCollapse");
      }, 500);
    };
    return {
      state,
      handleOpenMenu,
      handleCloseMenu,
    };
  },
  components: {
    MENU,
  },
});
</script>

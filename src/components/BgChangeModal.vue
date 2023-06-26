<!--
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-20 18:13:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-25 17:24:47
-->
<template>
  <div class="bg" :class="{bg_dark: theme === 1}"></div>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Basic Drawer"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useTheme from "@/utils/hooks/theme";

const { theme } = useTheme();
// import startPagesDB from "@/modules/indexedDB";

const visible = ref<boolean>(false);

const afterVisibleChange = (bool: boolean) => {
  console.log("visible", bool);
};

// const showDrawer = () => {
//   visible.value = true;
// };
</script>

<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  transition: background-color 0.2s ease-in-out;
  background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
}

.bg_dark {
  mix-blend-mode: difference;
}
</style>

<!--
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-20 18:13:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-26 19:54:50
-->
<template>
  <div class="bg" :class="{bg_dark: theme === 1}" :style="{ backgroundImage: config.bg }"></div>
</template>

<script setup lang="ts">
import useTheme from "@/utils/hooks/theme";
import configStore from "@/store/config";

const { config } = configStore;

const { theme } = useTheme();
// import startPagesDB from "@/modules/indexedDB";

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
  transition: 0.2s ease-in-out;
}

.bg_dark {
  mix-blend-mode: difference;
}
</style>

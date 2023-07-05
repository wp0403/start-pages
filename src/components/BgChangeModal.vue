<!--
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-20 18:13:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-05 15:51:17
-->
<template>
  <div
    class="bg_box"
    :class="{ bg_dark: !config.theme && config.bgType !== 'image' }"
  >
    <div class="bg" :style="{ backgroundImage: config.bg }"></div>
    <div class="cover" v-if="config.isBgDarkFilter"></div>
  </div>
</template>

<script setup lang="ts">
import configStore from "@/store/config";

const { config } = configStore;
</script>

<style scoped>
.bg_box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -3;
}
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -3;
  transition: 0.2s ease-in-out;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.cover {
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-b-10);
  filter: blur(10px);
  transition: 0.25s;
}

.dark .cover {
  background-image: radial-gradient(
      rgba(50, 50, 50, 0) 0,
      rgba(50, 50, 50, 0.3) 100%
    ),
    radial-gradient(rgba(50, 50, 50, 0) 33%, rgba(50, 50, 50, 0.3) 166%);
}
</style>

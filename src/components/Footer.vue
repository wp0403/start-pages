<!--
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-26 11:55:35
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-29 18:59:06
-->
<template>
  <div class="footer" :class="{ footer_light: config.bgType === 'image' }">
    <div class="ian" v-if="config.isIan">「 {{ ian.vhan }} 」</div>
    <div class="footer_info">
      <div class="item">© {{ new Date().getFullYear() }} Shimmer🌈</div>
      <span class="item_dian" />
      <a class="item" rel="" target="_blank" href="https://wp-boke.work">
        shimmer
      </a>
      <span class="item_dian" />
      <a
        class="item"
        rel="nofollow noopener noreferrer"
        target="_blank"
        href="https://beian.miit.gov.cn"
      >
        京ICP备2022004838号-1
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getIan } from "@/services/hotSearch";
import configStore from "@/store/config";

const { config } = configStore;

const ian = ref<any>({});
getIan().then((res) => {
  ian.value = res;
});
</script>

<style scoped>
.footer {
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;
}

.footer_light .ian,.footer_light .item{
  color: var(--bg-w-235) !important;
}

.footer_light .item_dian{
  background-color: var(--bg-w-235) !important;
}

.ian {
  padding: 24px 0 48px;
  font-size: 14px;
  color: var(--b-alpha);
  text-align: center;
}

.footer_info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  font-size: 12px;
  color: var(--b-alpha-80);
  white-space: nowrap;
}

.item_dian {
  width: 4px;
  height: 4px;
  margin: 0 12px;
  border-radius: 50%;
  background-color: var(--b-alpha);
}
</style>

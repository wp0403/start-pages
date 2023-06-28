<!--
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-25 19:00:58
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-28 20:48:11
-->
<template>
  <div class="content">
    <div
      class="hot_search"
      :class="{ hot_search_active: config.contentType === 1 }"
      v-if="config.isHotSearch"
    >
      <a
        class="hot_item"
        v-for="item in hotList.slice(0, 20)"
        :key="item.hot"
        :href="item.url"
        target="_blank"
      >
        <div class="hot_item_title">
          {{ item.title }}
        </div>
        <div class="hot_item_right" v-if="item.hot">
          <SysIcon type="icon-w_hot" />
          <span class="hot_item_number">{{ item.hot }}</span>
        </div>
      </a>
    </div>
    <Bookmark :class="{ hot_search_active: config.contentType === 2 || !config.isHotSearch }" />
    <div class="btn_box">
      <div
        class="btn_item"
        :class="{ btn_item_active: config.contentType === 1 }"
        v-if="config.isHotSearch"
        @click="changeCurrent(1)"
      />
      <div
        class="btn_item"
        :class="{
          btn_item_active: config.contentType === 2 || !config.isHotSearch,
        }"
        @click="changeCurrent(2)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SysIcon from "@/components/SysIcon.vue";
import Bookmark from "@/components/Bookmark.vue";
import { getHotSearchList } from "@/services/hotSearch";
import configStore from "@/store/config";

const { config, changeConfig } = configStore;

const hotList = ref<any[]>([]);
const loading = ref<boolean>(false);

loading.value = true;

const getHotSearch = async () => {
  const current = config.hotSearchList.find(
    (v) => v.id === config.currentHotSearch
  );
  await getHotSearchList(current.url).then((res) => {
    loading.value = false;
    hotList.value = res;
  });
};
getHotSearch();
watch(config, async () => {
  await getHotSearch();
});

const changeCurrent = (v) => {
  changeConfig("contentType", v);
};
</script>

<style scoped>
.content {
  flex: 1;
  display: flex;
  position: relative;
  width: 60%;
  margin: 0 auto;
}

.hot_search {
  position: absolute;
  left: 100%;
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  width: 100%;
  max-height: 100%;
  background-color: var(--w-alpha-30);
  overflow-y: auto;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  transition: all 0.4s;
}

.hot_search_active {
  left: 0;
  z-index: 1;
  opacity: 1;
  transition: all 0.4s;
}

.hot_item {
  width: 50%;
  padding: 4px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.2s;
}

.hot_item:hover {
  background-color: var(--w-alpha-30);
  border-radius: 8px;
}

.hot_item:hover .hot_item_number {
  color: var(--b-alpha-70);
}

.hot_item:hover .hot_item_title {
  color: var(--color-blue-hover);
}

.hot_item_title {
  flex: 1;
  color: var(--b-alpha-70);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 12px;
  font-weight: 500;
}

.hot_item_right {
  display: flex;
  align-items: center;
}

.hot_item_number {
  padding-left: 4px;
  color: var(--b-alpha-60);
  font-size: 12px;
}

.btn_box {
  position: absolute;
  bottom: -24px;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn_item {
  width: 30px;
  height: 6px;
  background-color: var(--w-alpha-30);
  border-radius: 2px;
  margin: 0 4px;
  cursor: pointer;
}

.btn_item_active {
  width: 40px;
  height: 6px;
  border-radius: 3px;
  background-color: var(--w-alpha-60);
}

@media screen and (max-width: 800px) {
  .content {
    width: 90%;
  }

  .hot_item {
    width: 100%;
    padding: 4px 8px;
  }
}
</style>

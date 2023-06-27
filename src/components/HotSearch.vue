<!--
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-25 19:00:58
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-27 18:07:03
-->
<template>
  <div class="content">
    <div class="hot_search" :class="{ hot_search_active: config.contentType === 1 }">
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
    <div class="bookmark" :class="{ hot_search_active: config.contentType === 2 }">
      <div class="bookmark_item" v-for="item in config.bookmark" :key="item.id">
        <a class="bookmark_item_url" :href="item.url" target="_blank">
          <img
            class="bookmark_item_icon"
            :src="item.icon || `https://api.vvhan.com/api/ico?url=${item.url}`"
            alt=""
          />
        </a>
        <div class="bookmark_item_title">{{ item.title }}</div>
      </div>
      <a class="bookmark_item bookmark_item_last">
        <SysIcon
          class="bookmark_item_url bookmark_item_add"
          type="icon-RectangleCopy17"
        />
      </a>
    </div>
    <div class="btn_box">
      <div
        class="btn_item"
        :class="{ btn_item_active: config.contentType === 1 }"
        @click="changeCurrent(1)"
      />
      <div
        class="btn_item"
        :class="{ btn_item_active: config.contentType === 2 }"
        @click="changeCurrent(2)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SysIcon from "@/components/SysIcon.vue";
import { getHotWeiBoSearchList } from "@/services/hotSearch";
import configStore from "@/store/config";

const { config, changeConfig } = configStore;

const hotList = ref<any[]>([]);
const loading = ref<boolean>(false);

loading.value = true;
getHotWeiBoSearchList().then((res) => {
  loading.value = false;
  hotList.value = res?.filter((v) => v.hot)?.sort((a, b) => b.hot - a.hot);
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

.bookmark {
  position: absolute;
  left: 100%;
  z-index: -1;
  opacity: 0;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 24px 72px;
  border-radius: 12px;
  transition: all 0.4s;
  display: grid;
  grid-template-columns: repeat(5, calc(20%));
  grid-template-rows: repeat(1, auto);
}

.bookmark_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 16px;
}

.bookmark_item_url {
  padding: 24px;
  background-color: var(--w-alpha-30);
  border-radius: 12px;
  transition: all 0.25s;
}
.bookmark_item_url:hover {
  background-color: var(--b-alpha-60);
  box-shadow: 0 0 10px 1px var(--b-alpha-60);
}
.bookmark_item_icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.bookmark_item_title {
  padding-top: 8px;
  color: var(--b-alpha-60);
  font-weight: 500;
  white-space: nowrap;
}

.bookmark_item_last {
  padding-bottom: 42px;
}

.hot_search {
  position: absolute;
  left: 100%;
  z-index: -1;
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

.bookmark_item_add {
  font-size: 36px;
  color: var(--color-blue);
}
@media screen and (max-width: 800px) {
  .content {
    width: 90%;
  }

  .hot_item {
    width: 100%;
  }
}

@media screen and (max-width: 1200px) {
  .bookmark {
    grid-template-columns: repeat(4, calc(25%));
    padding: 24px 36px;
  }
}

@media screen and (max-width: 1000px) {
  .bookmark {
    grid-template-columns: repeat(4, calc(25%));
    padding: 24px 12px;
  }
}

@media screen and (max-width: 600px) {
  .bookmark {
    grid-template-columns: repeat(3, calc(33.3%));
    padding: 24px 0;
  }
}
</style>

<template>
  <div class="bookmark" :class="props.class">
    <a-carousel class="bookmark-carousel" dots-class="slick-dots">
      <div
        class="carousel_item"
        v-for="pageItem in bookmarkList"
        :key="pageItem.page"
      >
        <div class="item" v-for="item in pageItem.data.filter(v => v)" :key="item.id">
          <a class="item_url" :href="item.url" target="_blank">
            <img
              class="item_icon"
              :src="
                item.icon || `https://api.vvhan.com/api/ico?url=${item.url}`
              "
              alt=""
            />
          </a>
          <div class="item_title">{{ item.title }}</div>
        </div>
        <a class="item item_last" v-if="bookmarkList.length === pageItem.page">
          <SysIcon class="item_url item_add" type="icon-RectangleCopy17" />
        </a>
      </div>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import configStore from "@/store/config";
import { splitArray } from "@/utils/utils";

const props = defineProps(["class"]);
const { config } = configStore;

const bookmarkNumber = ref<number>(5);
const bookmarkList = ref(splitArray(config.bookmark, bookmarkNumber.value * 2));

// 处理窗口大小变化
const handleResize = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 1200) {
    bookmarkNumber.value = 5;
  }
  if (windowWidth <= 1200 && windowWidth > 600) {
    bookmarkNumber.value = 4;
  }
  if (windowWidth <= 600) {
    bookmarkNumber.value = 3;
  }
  bookmarkList.value = splitArray(config.bookmark, bookmarkNumber.value * 2);
  
};

// 初始化时添加事件监听器
onMounted(() => {
  handleResize(); // 设置初始宽度
  window.addEventListener("resize", handleResize);
});

// 组件销毁前移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.hot_search_active {
  left: 0;
  z-index: 1;
  opacity: 1;
  transition: all 0.4s;
}
.bookmark {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: -1;
  opacity: 0;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  border-radius: 12px;
}

.bookmark-carousel {
  width: 100%;
  max-height: 100%;
}

.carousel_item {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  border-radius: 12px;
  transition: all 0.4s;
  display: grid !important;
  grid-template-columns: repeat(5, calc(20%));
  grid-template-rows: repeat(1, auto);
}

.carousel_item .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 16px;
}

.carousel_item .item_url {
  padding: 24px;
  background-color: var(--w-alpha-30);
  border-radius: 12px;
  transition: all 0.25s;
}
.carousel_item .item_url:hover {
  background-color: var(--b-alpha-60);
  box-shadow: 0 0 10px 1px var(--b-alpha-60);
}
.carousel_item .item_icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.carousel_item .item_title {
  padding-top: 8px;
  color: var(--b-alpha-60);
  font-weight: 500;
  white-space: nowrap;
}

.carousel_item .item_last {
  padding-bottom: 42px;
}

.carousel_item .item_add {
  font-size: 36px;
  color: var(--color-blue);
}

.carousel-dots {
  display: flex;
  align-items: center;
  z-index: 10;
  justify-content: center;
  margin: 0 auto;
  border-radius: 2px;
  padding: 12px;
}

.bookmark .ant-carousel :deep(.slick-dots) {
  position: relative;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bookmark .ant-carousel :deep(.slick-dots) li{
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0;
}

.bookmark .ant-carousel :deep(.slick-dots) li button{
  width: 12px;
  height: 12px;
  background-color: var(--w-alpha-30);
  margin: 0 8px;
  border-radius: 50%;
  cursor: pointer;
}

.bookmark .ant-carousel :deep(.slick-dots) .slick-active button{
  width: 16px;
  height: 16px;
  background-color: var(--w-alpha-80);
}

@media screen and (max-width: 1200px) {
  .carousel_item {
    grid-template-columns: repeat(4, calc(25%));
  }
}

@media screen and (max-width: 1000px) {
  .carousel_item {
    grid-template-columns: repeat(4, calc(25%));
  }
}

@media screen and (max-width: 600px) {
  .carousel_item {
    grid-template-columns: repeat(3, calc(33.3%));
  }
}
</style>

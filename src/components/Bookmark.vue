<template>
  <div class="bookmark" :class="props.class">
    <a-carousel class="bookmark-carousel" dots-class="slick-dots">
      <div
        class="carousel_item"
        v-for="pageItem in bookmarkList"
        :key="pageItem.page"
      >
        <div
          class="item"
          v-for="item in pageItem.data.filter((v) => v)"
          :key="item.id"
        >
          <a
            class="item_url"
            :class="{ item_url_edit: editBookmark }"
            :href="item.url"
            target="_blank"
          >
            <img
              class="item_icon"
              :src="
                item.icon || `https://api.vvhan.com/api/ico?url=${item.url}`
              "
              alt=""
            />
          </a>
          <div
            class="item_title"
            :class="{ item_title_light: config.bgType === 'image' }"
            v-if="!editBookmark"
          >
            {{ item.title }}
          </div>
          <div class="item_title" v-if="editBookmark">
            <SysIcon
              @click="
                () => {
                  newBookmarkObj = item;
                  addBookmarkModal = true;
                }
              "
              class="item_btn"
              type="icon-bianji"
            />
            <SysIcon
              @click="removeBookmarkFunc(item)"
              class="item_btn"
              type="icon-RectangleCopy27"
            />
          </div>
        </div>
        <a class="item item_last" v-if="bookmarkList.length === pageItem.page">
          <SysIcon
            @click="editBookmark = !editBookmark"
            class="item_url item_add"
            :type="editBookmark ? 'icon-RectangleCopy19' : 'icon-bianji'"
          />
        </a>
        <a class="item item_last" v-if="bookmarkList.length === pageItem.page">
          <SysIcon
            @click="addBookmarkModal = true"
            class="item_url item_add"
            type="icon-RectangleCopy17"
          />
        </a>
      </div>
    </a-carousel>
    <a-modal
      v-model:visible="addBookmarkModal"
      centered
      :footer="null"
      :bodyStyle="{ paddingTop: '42px' }"
      @ok="addBookmarkModal = false"
    >
      <div class="form_item">
        <div class="form_item_title">标题：</div>
        <a-input
          v-model:value="newBookmarkObj.title"
          placeholder="请输入网站标题"
          :bordered="false"
        />
      </div>
      <div class="form_item">
        <div class="form_item_title">链接：</div>
        <a-input
          v-model:value="newBookmarkObj.url"
          placeholder="请输入网站链接"
          :bordered="false"
        />
      </div>
      <div class="form_item">
        <div class="form_item_title">图标：</div>
        <a-input
          v-model:value="newBookmarkObj.icon"
          placeholder="请输入网站图标链接"
          :bordered="false"
        />
      </div>
      <div class="form_item">
        <a-button type="primary" @click="addBookmark">提交</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import configStore from "@/store/config";
import { splitArray } from "@/utils/utils";

const props = defineProps(["class"]);
const { config, changeConfig } = configStore;
const editBookmark = ref<boolean>(false);
const addBookmarkModal = ref<boolean>(false);
const newBookmarkObj = ref<any>({
  id: +new Date(),
});

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

const addBookmark = () => {
  if (!newBookmarkObj.value.title || !newBookmarkObj.value.url) {
    addBookmarkModal.value = false;
    return;
  }
  const list = config.bookmark;
  const ind = list.findIndex((val) => val.id === newBookmarkObj.value.id);
  if (ind >= 0) {
    list[ind] = newBookmarkObj.value;
    changeConfig("bookmark", list);
  } else {
    changeConfig("bookmark", [...list, newBookmarkObj.value]);
  }
  newBookmarkObj.value = {
    id: +new Date(),
  };
  addBookmarkModal.value = false;
};

const removeBookmarkFunc = (v) => {
  changeConfig(
    "bookmark",
    config.bookmark.filter((val) => val.id !== v.id)
  );
};

watchEffect(() => {
  console.log(config.bookmark);
  bookmarkList.value = splitArray(config.bookmark, bookmarkNumber.value * 2);
});

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
  border-radius: 12px;
}

.bookmark-carousel {
  width: 100%;
  max-height: 100%;
}

.carousel_item {
  width: 100%;
  max-height: 100%;
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
  backdrop-filter: blur(5px);
  border-radius: 12px;
  transition: all 0.25s;
}
.carousel_item .item_url:hover {
  background-color: var(--b-alpha-60);
  box-shadow: 0 0 10px 1px var(--b-alpha-60);
}

.carousel_item .item_url.item_url_edit {
  animation: shakeRotate 1.8s infinite;
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
  display: flex;
  align-items: center;
  height: 24px;
}

.carousel_item .item_title .item_btn {
  margin: 0 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--b-alpha-60);
  color: var(--w-alpha);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel_item .item_title.item_title_light {
  color: var(--txt-w-pure);
  position: relative;
}

.carousel_item .item_title.item_title_light::after {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: -1;
  content: "";
  transform: translate(-50%, -30%);
  width: 100%;
  height: 60%;
  background-color: var(--w-alpha-20);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: 0 -10px 30px 1px var(--w-alpha-50);
}

.carousel_item .item_last {
  padding-bottom: 38px;
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

.bookmark .ant-carousel :deep(.slick-dots) li {
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0;
}

.bookmark .ant-carousel :deep(.slick-dots) li button {
  width: 12px;
  height: 12px;
  background-color: var(--w-alpha-60);
  margin: 0 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 1;
}

.bookmark .ant-carousel :deep(.slick-dots) .slick-active button {
  width: 16px;
  height: 16px;
  background-color: var(--w-alpha-80);
}

.form_item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  justify-content: center;
}

.form_item .form_item_title {
  white-space: nowrap;
  color: var(--b-alpha-80);
}

/* 定义关键帧动画 */
@keyframes shakeRotate {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px) rotate(-5deg);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px) rotate(5deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
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

<template>
  <div class="search_box">
    <div class="search_input">
      <input
        class="input"
        type="text"
        placeholder="搜索"
        v-model="searchValue"
        @keyup.enter="goSearch"
      />
      <a-button class="btn" type="primary" @click="goSearch">
        <SysIcon type="icon-RectangleCopy2" />
      </a-button>
      <div class="search_list_box" v-if="associationalWordList.length">
        <div
          class="search_item"
          v-for="item in associationalWordList"
          :key="item"
          @click="
            () => {
              searchValue = item;
              goSearch();
            }
          "
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="search_engines">
      <div
        v-for="item in config.searchList.filter((v) => v.regular)"
        :key="item.id"
        :class="
          config.enginesId === item.id ? 'engines_item_active' : 'engines_item'
        "
        @click="changeConfig('enginesId', item.id)"
      >
        {{ item.title }}
      </div>
      <SysIcon
        class="engines_item_btn"
        :type="isEnginesList ? 'icon-shouqi' : 'icon-xiayibu'"
        @click="clickEnginesList(!isEnginesList)"
      />
      <div class="search_engines_list" v-if="isEnginesList">
        <div
          v-for="item in list"
          :key="item.id"
          class="engines_list_item"
          :class="{
            engines_list_item_disable:
              list.filter((v) => v.regular).length >= 3 && !item.regular,
          }"
          @click="clickEnginesListItem(item)"
        >
          {{ item.title }}
          <SysIcon class="" type="icon-tuding" v-show="item.regular" />
        </div>
      </div>
    </div>
  </div>
  <div
    class="mask"
    v-if="isEnginesList"
    @click="clickEnginesList(!isEnginesList)"
  ></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import SysIcon from "@/components/SysIcon.vue";
import configStore from "@/store/config";

const { config, changeConfig } = configStore;

const list = ref<any[]>(config.searchList);
// 当前搜索的内容
const searchValue = ref<string>("");
// 当前搜索引擎列表框是否展示
const isEnginesList = ref<boolean>(false);
// 当前选中的搜索引擎
const enginesActive = ref<any>(
  config.searchList.find((v) => v.id === config.enginesId)
);
// 当前的联想词列表
const associationalWordList = ref<string[]>([]);

const clickEnginesList = (v) => {
  isEnginesList.value = v;
};

// 设置当前固定的搜索引擎
const clickEnginesListItem = (v) => {
  if (list.value.filter((v1) => v1.regular).length <= 1 && v.regular) return;
  if (list.value.filter((v1) => v1.regular).length >= 3 && !v.regular) return;
  list.value = list.value.map((item) => {
    if (item.id === v.id) {
      return {
        ...v,
        regular: !v.regular,
      };
    }
    return item;
  });
  changeConfig("searchList", list.value);
};

// 获取联想词
const getSearchList = () => {
  (window as any).associationalWord = (res) => {
    associationalWordList.value = res.s;
  };
  if (!searchValue.value) {
    associationalWordList.value = [];
    return;
  }
  const script = document.createElement("script");
  script.src = `https://suggestion.baidu.com/su?wd=${searchValue.value}&cb=associationalWord`;
  script.async = true;
  document.body.appendChild(script);
};

// 跳转搜索
const goSearch = () => {
  if (config.isClearSearch) {
    searchValue.value = "";
    associationalWordList.value = [];
  }
  const flag = list.value
    .filter((v) => v.regular)
    .find((v) => v.id === enginesActive.value.id);
  if (flag) {
    window.open(`${enginesActive.value.url}${searchValue.value}`);
  } else {
    const current = list.value.filter((v) => v.regular)[0];
    changeConfig("enginesId", current.id)
    window.open(`${current.url}${searchValue.value}`);
  }
};

watchEffect(() => {
  getSearchList();
});
</script>

<style scoped>
.search_box {
  width: 100%;
  padding: 80px 24px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search_input {
  width: 500px;
  height: 46px;
  display: flex;
  align-items: center;
  border-radius: 23px;
  position: relative;
}

.input {
  flex: 1;
  height: 100%;
  border: none;
  outline-color: var(--color-blue-border-hover);
  padding: 0 24px;
  border-radius: 23px 0 0 23px;
  overflow: hidden;
}

.input:focus {
  border-color: transparent;
}

.btn {
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: none;
  border-radius: 0 23px 23px 0;
  background-color: var(--color-blue-hover);
  overflow: hidden;
}

.input:focus~.search_list_box{
  display: block;
}

.search_list_box:hover{
  display: block;
}

.search_list_box {
  display: none;
  position: absolute;
  left: 0;
  top: calc(100% + 12px);
  z-index: 10;
  width: 100%;
  background-color: var(--w-alpha-70);
  border-radius: 23px;
  box-shadow: 0 3px 10px 3px var(--w-alpha-50);
  backdrop-filter: blur(8px);
  padding: 24px 12px;
  overflow-y: auto;
}
.search_list_box .search_item {
  padding: 8px 12px;
  color: var(--b-alpha-90);
  font-size: 14px;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 16px;
}

.search_list_box .search_item:hover {
  padding-left: 24px;
  background-color: var(--w-alpha-90);
  font-weight: 700;
}

.search_engines {
  width: 500px;
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;
  justify-content: center;
  z-index: 9;
}

.engines_item {
  height: 30px;
  margin: 0 8px;
  padding: 4px 16px;
  border-radius: 16px;
  background-color: var(--color-blue-bg-hover);
  color: var(--b-alpha);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.engines_item_active {
  height: 30px;
  margin: 0 8px;
  padding: 4px 16px;
  border-radius: 16px;
  background-color: var(--color-blue-border-hover);
  color: var(--b-alpha);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.engines_item_btn {
  width: 30px;
  height: 30px;
  margin: 0 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-blue-bg-hover);
  color: var(--b-alpha);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  flex-shrink: 0;
}

.engines_item_btn:hover {
  background-color: var(--color-blue-border-hover);
  color: var(--b-alpha);
}

.search_engines_list {
  position: absolute;
  left: 0;
  top: 62px;
  width: 100%;
  max-height: 300px;
  background-color: var(--w-alpha-90);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 3px 20px 1px var(--w-alpha-30);
  z-index: 9;
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: var(--b-alpha-60);
  backdrop-filter: blur(5px);
}

.engines_list_item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: var(--b-alpha-80);
  font-size: 13px;
}

.engines_list_item:hover {
  background-color: var(--w-alpha-30);
}

.engines_list_item_disable {
  cursor: no-drop;
}

@media screen and (max-width: 1000px) {
  .search_box {
    padding: 60px 24px 12px;
  }
}

@media screen and (max-width: 800px) {
  .search_input,
  .search_engines {
    width: 90%;
  }

  .btn {
    width: 70px;
  }

  .search_box {
    padding: 60px 24px 0;
  }
}

@media screen and (max-width: 600px) {
  .search_box {
    padding: 24px 24px 0;
  }

  .search_input {
    height: 36px;
  }

  .search_list_box{
    display: none !important;
  }
}
</style>

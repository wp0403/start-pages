<template>
  <div class="search_box">
    <div class="search_input">
      <input
        class="input"
        type="text"
        placeholder="搜索"
        v-model="searchValue"
      />
      <a-button class="btn" type="primary" @click="goSearch">
        <SysIcon type="icon-RectangleCopy2" />
      </a-button>
    </div>
    <div class="search_engines">
      <div
        v-for="item in list.filter((v) => v.regular)"
        :key="item.id"
        :class="
          enginesActive.id === item.id ? 'engines_item_active' : 'engines_item'
        "
        @click="changeEngines(item)"
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
import { ref } from "vue";
import SysIcon from "@/components/SysIcon.vue";
import { searchList } from "@/utils/dict";

const list = ref<any[]>(searchList);
// 当前搜索的内容
const searchValue = ref<string>("");
// 当前搜索引擎列表框是否展示
const isEnginesList = ref<boolean>(false);
// 当前选中的搜索引擎
const enginesActive = ref<any>({
  id: 1,
  title: "百度",
  icon: "",
  url: "https://www.baidu.com/s?ie=utf-8&word=",
});

// 切换搜索引擎
const changeEngines = (v) => {
  enginesActive.value = v;
};

const clickEnginesList = (v) => {
  isEnginesList.value = v;
};

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
};

// 跳转搜索
const goSearch = () => {
  const flag = list.value
    .filter((v) => v.regular)
    .find((v) => v.id === enginesActive.value.id);
  if (flag) {
    window.open(`${enginesActive.value.url}${searchValue.value}`);
  } else {
    const current = list.value.filter((v) => v.regular)[0];
    changeEngines(current);
    window.open(`${current.url}${searchValue.value}`);
  }
};
</script>

<style scoped>
.search_box {
  width: 100%;
  padding: 100px 24px 12px;
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
  overflow: hidden;
}

.input {
  flex: 1;
  height: 100%;
  border: none;
  outline-color: var(--color-blue-border-hover);
  padding: 0 24px;
  border-radius: 23px 0 0 23px;
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
  border-radius: 0;
  background-color: var(--color-blue-hover);
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
  background-color: var(--w-alpha-60);
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

@media screen and (max-width: 800px) {
  .search_input,
  .search_engines {
    width: 90%;
  }

  .btn {
    width: 70px;
  }
}
</style>

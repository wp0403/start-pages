<template>
  <div class="head">
    <div class="left">
      <img class="logo" v-if="theme === 1" :src="logo_white" />
      <img class="logo" v-if="theme === 2" :src="logo_black" />
    </div>
    <div class="right">
      <div class="theme_change_btn" @click="themeSwitch('click')">
        <SysIcon
          class="theme_change_btn_icon"
          :type="theme === 2 ? 'icon-taiyangtianqi' : 'icon-yueliang'"
        />
      </div>
      <div class="theme_change_btn" @click="clickSetUp(true)">
        <SysIcon class="theme_change_btn_icon" type="icon-RectangleCopy15" />
      </div>
    </div>
  </div>
  <a-drawer
    class="config"
    v-model:visible="visible"
    title="常规设置"
    placement="right"
    @after-visible-change="clickSetUp"
  >
    <div class="config_title">搜索</div>
    <div class="config_box">
      <div class="config_item">
        <div class="config_item_title">自动清空搜索栏</div>
        <a-switch
          size="small"
          v-model:checked="configObj.isClearSearch"
          @change="changeConfig('isClearSearch', configObj.isClearSearch)"
        />
      </div>
      <div class="config_item">
        <div class="config_item_title">保存历史记录</div>
        <a-switch
          size="small"
          v-model:checked="configObj.isSaveHistory"
          @change="changeConfig('isSaveHistory', configObj.isSaveHistory)"
        />
      </div>
      <div class="config_item">
        <div class="config_item_title">默认热搜选择</div>
        <a-select
          ref="select"
          v-model:value="config.currentHotSearch"
          style="min-width: 80px"
          size="small"
          @change="handleChange"
        >
          <a-select-option :value="item.id" v-for="item in config.hotSearchList" :key="item.id">{{ item.title }}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="config_title">导航</div>
    <div class="config_box">
      <div class="config_item">
        <div class="config_item_title">重置默认导航</div>
        <div class="config_reset">重置</div>
      </div>
    </div>
    <div class="config_title">初始化</div>
    <div class="config_box">
      <div class="config_item">
        <div class="config_item_title">背景自定义</div>
        <a-popover placement="bottomRight" trigger="click">
          <template #content>
            <div class="bg_box">
              <div
                class="bg_item"
                v-for="item in config.bgList"
                :key="item.id"
                :style="{ backgroundImage: item.background }"
                @click="changeBg(item.background)"
              ></div>
            </div>
          </template>
          <div
            class="config_bg"
            :style="{ backgroundImage: configObj.bg }"
          ></div>
        </a-popover>
      </div>
    </div>
    <div class="config_title">重置</div>
    <div class="config_box">
      <div class="config_item">
        <div class="config_item_title">重置全部设置</div>
        <div class="config_reset" @click="resetConfig">重置</div>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useTheme from "@/utils/hooks/theme";
import logo_black from "@/assets/images/logo_black.png";
import logo_white from "@/assets/images/logo_white.png";
import SysIcon from "@/components/SysIcon.vue";
import configStore from "@/store/config";

const { config, changeConfig, resetConfig } = configStore;

const { theme, themeSwitch } = useTheme();
const visible = ref<boolean>(false);
const configObj = ref<any>(config);

const clickSetUp = (v) => {
  visible.value = v;
};

const changeBg = (v) => {
  changeConfig("bg", v);
};

const handleChange = (v) => {
  changeConfig("currentHotSearch", v);
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
}

.left,
.right {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo {
  height: 100%;
  width: auto;
}

.theme_change_btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-w-245);
  border: 1px solid var(--b-alpha-10);
  cursor: pointer;
  margin: 0 4px;
}

.theme_change_btn:hover {
  background-color: var(--b-alpha-70);
}

.theme_change_btn:hover .theme_change_btn_icon {
  color: var(--w-alpha);
}

.theme_change_btn_icon {
  color: var(--b-alpha);
}

.config {
}

.config_title {
  font-size: 16px;
  font-weight: 500;
  height: 32px;
  display: flex;
  align-items: center;
  padding-top: 12px;
  color: var(--b-alpha-90);
}

.config_box {
  margin: 8px 0;
  padding: 12px;
  background-color: var(--w-alpha-70);
  border-radius: 12px;
}

.dark .config_box {
  background-color: rgb(40, 40, 40);
}

.config_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}

.config_item_title {
  color: var(--b-alpha-90);
  font-size: 14px;
}

.config_reset {
  border-radius: 4px;
  padding: 4px 12px;
  background-color: var(--b-alpha-10);
  color: var(--b-alpha-90);
  cursor: pointer;
}

.config_bg {
  width: 30px;
  height: 16px;
  cursor: pointer;
}

.bg_box {
  display: flex;
  flex-wrap: wrap;
}

.bg_item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
}

.dark .bg_item {
  mix-blend-mode: difference;
}

.dark .config_bg {
  mix-blend-mode: difference;
}

@media screen and (max-width: 700px) {
  .head {
    padding: 0 24px;
  }
}
</style>

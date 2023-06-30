<template>
  <div class="head">
    <div class="left">
      <img class="logo" :src="config.theme ? logo_black : logo_white" />
    </div>
    <div class="right">
      <div class="theme_change_btn" @click="themeSwitch('click')">
        <SysIcon
          class="theme_change_btn_icon"
          :type="config.theme ? 'icon-taiyangtianqi' : 'icon-yueliang'"
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
    :width="drawerWidth"
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
          v-model:checked="config.isClearSearch"
          @change="changeConfig('isClearSearch', config.isClearSearch)"
        />
      </div>
      <div class="config_item">
        <div class="config_item_title">保存历史记录</div>
        <a-switch
          size="small"
          v-model:checked="config.isSaveHistory"
          @change="changeConfig('isSaveHistory', config.isSaveHistory)"
        />
      </div>
    </div>
    <div class="config_title">功能</div>
    <div class="config_box">
      <div class="config_item">
        <div class="config_item_title">是否展示热搜</div>
        <a-switch
          size="small"
          v-model:checked="config.isHotSearch"
          @change="changeConfig('isHotSearch', config.isHotSearch)"
        />
      </div>
      <div class="config_item" v-if="config.isHotSearch">
        <div class="config_item_title">默认热搜选择</div>
        <a-select
          ref="select"
          v-model:value="config.currentHotSearch"
          style="min-width: 80px"
          size="small"
          @change="handleChangeCurrentHotSearch"
        >
          <a-select-option
            :value="item.id"
            v-for="item in config.hotSearchList"
            :key="item.id"
            >{{ item.title }}</a-select-option
          >
        </a-select>
      </div>
      <div class="config_item">
        <div class="config_item_title">是否展示一言</div>
        <a-switch
          size="small"
          v-model:checked="config.isIan"
          @change="changeConfig('isIan', config.isIan)"
        />
      </div>
    </div>
    <div class="config_title">导航</div>
    <div class="config_box">
      <div class="config_item">
        <div class="config_item_title">重置默认导航</div>
        <div class="config_reset">重置</div>
      </div>
    </div>
    <div class="config_title">主题背景</div>
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
          <div class="config_bg" :style="{ backgroundImage: config.bg }"></div>
        </a-popover>
      </div>
      <div class="config_item">
        <div class="config_item_title">浅色主题</div>
        <a-switch
          size="small"
          v-model:checked="config.theme"
          @change="
            () => {
              changeConfig('theme', config.theme);
              themeSwitch('click');
            }
          "
        />
      </div>
      <div class="config_item">
        <div class="config_item_title">自动切换主题</div>
        <a-switch
          size="small"
          v-model:checked="config.isAutoChangeTheme"
          @change="changeConfig('isAutoChangeTheme', config.isAutoChangeTheme)"
        />
      </div>
      <div class="config_item">
        <div class="config_item_title">背景暗色滤镜</div>
        <a-switch
          size="small"
          v-model:checked="config.isBgDarkFilter"
          @change="changeConfig('isBgDarkFilter', config.isBgDarkFilter)"
        />
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
import { onBeforeUnmount, onMounted, ref } from "vue";
import useTheme from "@/utils/hooks/theme";
import logo_black from "@/assets/images/logo_black.png";
import logo_white from "@/assets/images/logo_white.png";
import SysIcon from "@/components/SysIcon.vue";
import configStore from "@/store/config";

const { config, changeConfig, resetConfig } = configStore;

const { themeSwitch } = useTheme();
const visible = ref<boolean>(false);
const drawerWidth = ref<number | string>(378);

const clickSetUp = (v) => {
  visible.value = v;
};

const changeBg = (v) => {
  changeConfig("bg", v);
};

const handleChangeCurrentHotSearch = (v) => {
  changeConfig("currentHotSearch", v);
};

// 处理窗口大小变化
const handleResize = () => {
  if (window.innerWidth < 600) {
    drawerWidth.value = "100%";
  } else {
    drawerWidth.value = 378;
  }
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

@media screen and (max-width: 700px) {
  .head {
    padding: 0 24px;
  }
}
</style>

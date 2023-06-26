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
  <a-modal
    v-model:visible="visible"
    @ok="clickSetUp(false)"
    :footer="null"
  >
    <div class="setup_title">

    </div>
    <div class="setup_item"></div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useTheme from "@/utils/hooks/theme";
import logo_black from "@/assets/images/logo_black.png";
import logo_white from "@/assets/images/logo_white.png";
import SysIcon from "@/components/SysIcon.vue";

const { theme, themeSwitch } = useTheme();
const visible = ref<boolean>(false);

const clickSetUp = (v) => {
  visible.value = v;
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

@media screen and (max-width: 700px) {
  .head{
    padding: 0 24px;
  }
}
</style>

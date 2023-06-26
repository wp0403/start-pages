<template>
  <HeadCom />
  <SearchCom />
  <HotSearch />
  <BgChangeModal />
  <Footer />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import HeadCom from "@/components/Head.vue";
import SearchCom from "@/components/Search.vue";
import BgChangeModal from "@/components/BgChangeModal.vue";
import HotSearch from "@/components/HotSearch.vue";
import Footer from "@/components/Footer.vue";
import useTheme from "@/utils/hooks/theme";

const { init, addMediaQuery, removeMediaQuery } = useTheme();

onMounted(() => {
  addMediaQuery();
  init();
});

onUnmounted(() => {
  removeMediaQuery();
});
</script>

<style scoped></style>

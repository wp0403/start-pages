<template>
  <icon-font :class="props.class" :type="props.type" />
</template>
<script setup lang="ts">
import { createFromIconfontCN } from "@ant-design/icons-vue";

const props = defineProps<{
    type: string;
    class?: string;
}>()

const IconFont = createFromIconfontCN({
  scriptUrl: "/font_4132078_xz50zzj6bjs/iconfont.js",
});
</script>

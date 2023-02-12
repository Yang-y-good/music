<template>
  <el-scrollbar @scroll="onscroll" class="singer" ref="elRef">
    <singer-home class="lessen" />
  </el-scrollbar>
</template>

<script setup>
import singerHome from "./children/singerHome.vue";
import { useScrollPostion } from "@/hook/useScrollPostion";
import { ref } from "@vue/reactivity";
const props = defineProps({});
const emit = defineEmits();
const elRef = ref();
// 记录当前页面滚动的位置
const onscroll = useScrollPostion(elRef);
</script>

<style lang="less" scoped>
.singer {
  height: calc(100vh - 200px);
  overflow-x: hidden;
  // margin-top: 40px;
  box-sizing: border-box;
}
</style> 
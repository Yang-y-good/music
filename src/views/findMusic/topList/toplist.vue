<template>
  <el-scrollbar @scroll="onscroll" class="top_list" ref="elRef">
    <official-top class="lessen" />
    <global-top :songlist="songlist" class="lessen">
      <template #title>
        <p class="title">全球榜</p>
      </template>
    </global-top>
  </el-scrollbar>
</template>

<script setup>
import officialTop from "./officialTop.vue";
import globalTop from "./globalTop.vue";

import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
import { useScrollPostion } from "@/hook/useScrollPostion";

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const songlist = computed(() =>
  store.state.recommend.toplist.officialtop.slice(4)
);
const elRef = ref();
// 记录当前页面滚动的位置
const onscroll = useScrollPostion(elRef)
// const onscroll = ({ scrollLeft, scrollTop }) => {
//   // console.log(scrollTop);
//   store.commit("setkeepAliveViewsScrollPostion", {
//     routeName: "findmusic",
//     list: [{ el: elRef, top: scrollTop }],
//   });
// };
</script>

<style lang="less" scoped>
.top_list {
  height: 100vh;
  overflow-x: hidden;
}
</style>
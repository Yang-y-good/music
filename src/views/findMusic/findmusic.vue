<template>
  <div class="findmusic" @scroll="onscroll">
    <main-nav :title="title" :isfixed="true" @tabIndex="handleTabIndex">
      <template #0>
        <recommend class="margin_top" />
      </template>
      <!-- <template #1>
        <customization class="margin_top" />
      </template> -->

      <template #1>
        <keep-alive>
          <suspense v-if="tbaIndex === 1">
            <!-- 具有深层异步依赖的组件 -->
            <song-menu class="margin_top" />
            <!-- 在 #fallback 插槽中显示 “正在加载中” -->
            <template #fallback>
              <loading />
            </template>
          </suspense>
        </keep-alive>
      </template>

      <template #2>
        <top-list class="margin_top" />
      </template>
      <template #3>
        <singer class="margin_top" />
      </template>
      <template #4>
        <newmusic class="margin_top" />
      </template>
    </main-nav>
    <el-backtop
      :right="50"
      :bottom="110"
      :visibility-height="500"
      target=".el-scrollbar__wrap"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import mainNav from "@/components/main-nav.vue";
import recommend from "@/views/findMusic/recommend/recommend.vue";
import customization from "@/views/findMusic/customization/customization.vue";
import topList from "./topList/toplist.vue";
import singer from "./singer/singer.vue";
import newmusic from "./newMusic/newmusic.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import loading from "@/components/loading.vue";
const songMenu = defineAsyncComponent(() =>
  import("./songMenu/songMenu.vue" /* webpackChunkName: "tabMenu" */)
);

const route = useRoute();
const store = useStore();

const tbaIndex = ref(0);

const handleTabIndex = (index) => {
  // console.log(index);
  tbaIndex.value = index;
};

const title = ref([
  "个人推荐",
  // "专属定制",
  "歌单",
  "排行榜",
  "歌手",
  "最新音乐",
]);
</script> 

<style lang="less" scoped>
.findmusic {
  height: 100vh;
  overflow: hidden;
  .margin_top {
    height: calc(100vh - 190px);
    overflow: hidden;
    padding: 0 20px;
    // @bottom: 1.4815rem;
    // @bottom: 100px;
    // height: calc(~"100vh - @{bottom}");
  }
}
</style>

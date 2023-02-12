<template>
  <div class="findmusic" @scroll="onscroll">
    <!-- 动态组件 -->
    <tabs-component
      :title="title"
      :tabsComponent="tabs"
      @changeTbas="watchTabs"
    >
      <template #comp>
        <keep-alive>
          <component :is="tabs[currentIndex]" class="margin_top"></component>
        </keep-alive>
      </template>
    </tabs-component>

    <el-backtop
      :right="50"
      :bottom="110"
      :visibility-height="1000"
      target=".el-scrollbar__wrap"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import mainNav from "@/components/main-nav.vue";
import recommend from "@/views/findMusic/recommend/recommend.vue";
import tabsComponent from "@/components/tabs-Component.vue";
import newmusic from "./newMusic/newmusic.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import loading from "@/components/loading.vue";

const singer = defineAsyncComponent(() =>
  import(/* webpackChunkName: "singer" */ "./singer/singer.vue")
);

const songMenu = defineAsyncComponent(() =>
  import(/* webpackChunkName: "tabMenu" */ "./songMenu/songMenu.vue")
);

const topList = defineAsyncComponent(() =>
  import(/* webpackChunkName: "topList" */ "./topList/toplist.vue")
);
const route = useRoute();
const store = useStore();
const currentTab = ref("recommend");
const tabs = [recommend, songMenu, topList, singer, newmusic];
const title = ref(["个人推荐", "歌单", "排行榜", "歌手", "最新音乐"]);

const currentIndex = ref(0);
const watchTabs = (item) => {
  currentIndex.value = item;
};
</script> 

<style lang="less" scoped>
.findmusic {
  // height: 100vh;

  overflow: hidden;
  // .margin_top {
  //   // height: calc(100vh - 190px);
  //   height: 100%;
  //   padding: 0 20px;
  // }
}
</style>

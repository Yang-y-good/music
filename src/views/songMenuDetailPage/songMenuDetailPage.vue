<template>
  <!-- 歌单详情页 -->
  <el-scrollbar class="song_menu_detail" ref="songMenuRef" @scroll="onscroll">
    <el-skeleton animated :loading="isSongMenuInfo">
      <template #template>
        <skeleton-song-menu-info />
      </template>
      <template #default>
        <!-- 歌单信息 -->
        <song-menu-detail
          :songmenuinfo="songMenuInfo"
          ref="songMenuDetailRef"
        />
      </template>
    </el-skeleton>
    <!-- tabs标签页 -->
    <main-nav :title="tabs" class="tabs" @tabIndex="indexHandel">
      <template #0>
        <!-- 歌曲列表 -->
        <suspense v-if="currentIndex === 0">
          <menu-song-list :songMenuId="songMenuId"/>
          <!-- 在 #fallback 插槽中显示 “正在加载中” -->
          <template #fallback> <loading /> </template>
        </suspense>
      </template>
      <!-- 评论 -->
      <template #1>
        <publish-comment />
        <suspense v-if="currentIndex === 1">
          <!-- 具有深层异步依赖的组件 -->
          <comment :id="songMenuId" @onClickPlgination="onclick" />
          <!-- 在 #fallback 插槽中显示 “正在加载中” -->
          <template #fallback> <loading /> </template>
        </suspense>
      </template>
      <!-- 收藏者 -->
      <template #2>
        <subscri-bers :id="songMenuId" />
      </template>
    </main-nav>
  </el-scrollbar>
  <el-backtop
    :right="50"
    :bottom="110"
    :visibility-height="1000"
    target=".el-scrollbar__wrap"
  />
</template>

<script setup>
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  watch,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  nextTick,
} from "vue";
import menuSongList from "./songlist/menuSongList.vue";
import songMenuDetail from "@/components/song-menu-detail.vue";
import mainNav from "@/components/main-nav.vue";
import subscriBers from "./subscribers/subscribers.vue";
import comment from "./comment.vue";
import pbulishComment from "@/components/publishComment.vue";

import loading from "@/components/loading.vue";
import skeletonSongMenuInfo from "./comment/skeleton-songMenuInfo.vue";

import { useScrollPostion } from "@/hook/useScrollPostion";

import { useRoute } from "vue-router";
import { useStore } from "vuex";

const drawer = ref(false);
const route = useRoute();
const store = useStore();
// 歌单id
const songMenuId = ref();
// 歌单详情骨架屏
const isSongMenuInfo = ref(true);
// 歌单信息
const songMenuInfo = ref({});
// tabs切换
const tabs = ref(["歌曲列表", "评论", "收藏者"]);

watch(
  () => route.query.id,
  (value, oldValue) => {
    // 判断是否为当前路由
    if (route.name == "songMenuDetailPage") {
      // 拿到歌单id
      songMenuId.value = parseInt(value);
      // 请求歌单信息
      store.dispatch("songMenu/getSongMenuDetail", value);
    }
  },
  {
    immediate: true,
  }
);

// 获取歌单信息
watch(
  () => store.state.songMenu.playlist,
  (value) => {
    tabs.value[1] = `评论(${value.commentCount})`;
    songMenuInfo.value = value;
    if (songMenuInfo.value.length != 0) {
      isSongMenuInfo.value = false;
    }
  }
);

// 歌单元素
const songMenuRef = ref();
// 歌单信息元素
const songMenuDetailRef = ref();

// 分页的点击
const onclick = (position) => {
  // 重新定位到最新评论
  // 最新评论距离最顶部位置 = 歌单信息 + 最新评论到tabs栏的距离
  console.log(position);
  songMenuRef.value.setScrollTop(
    position + songMenuDetailRef.value.headerRef.clientHeight + 50
  );
};

// 当前选中tab
const currentIndex = ref(0);
const indexHandel = (index) => {
  console.log(index);
  currentIndex.value = index;
};

// 保存滚动的位置
const onscroll = useScrollPostion(songMenuRef);

onMounted(() => {
  nextTick(() => {
    songMenuRef.value.setScrollTop(500)
  });
})


</script>

<style lang="less" scoped>
.song_menu_detail {
  height: calc(100vh - 150px);
  overflow: hidden;
  padding: 0 20px;
  // .tabs {
  //   margin-top: -0.1481rem;
  // }
}
</style>


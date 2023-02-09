<template>
  <el-scrollbar class="search_page" ref="searchPageRef">
    <span ref="searchTitle">搜索 {{ route.query.value }}</span>
    <div class="total">共找到 {{ songCount }}单曲</div>
    <song-list
      :songList="songsList"
      class="songs_list"
      ref="paginationRef"
      @onhandleClick="onhandleClick"
    >
      <!-- 歌手 -->
      <template #author="scoped">
        <span
          @click="singerClick(scoped.row.author[0].id)"
          class="cursorHover"
          >{{ scoped.row.author[0].name }}</span
        >

        <span
          v-if="scoped.row.author[1]"
          @click="singerClick(scoped.row.author[1].id)"
          class="cursorHover"
        >
          <span> / </span>
          {{ scoped.row.author[1].name }}</span
        >
      </template>
      <!-- 专辑 -->
      <template #album="scoped">
        <span
          @click="albumClick(scoped.row.songsInfo.id)"
          class="cursorHover"
          >{{ scoped.row.album }}</span
        >
      </template>

      <template v-if="isPagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="songCount"
          v-model:currentPage="pageInfo.offset"
          v-model:page-size="pageInfo.limit"
          class="pageination"
        />
      </template>
    </song-list>
  </el-scrollbar>
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "@vue/runtime-core";
import { formatSongTime } from "@/utils/formatSongTime";
import songlist from "@/components/song-List.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const router = useRouter();
const pageInfo = ref({ limit: 30, offset: 1 });
// 获取页面元素
const searchPageRef = ref();

// 请求搜索的歌曲
const reqSearchSongs = (offset) => {
  store.dispatch("search/getSearchList", {
    keyword: route.query.value,
    limit: pageInfo.value.limit,
    offset: offset * pageInfo.value.limit,
  });
};
watch(
  () => route.query.value,
  () => {
    reqSearchSongs(0);
  }
);

reqSearchSongs(0);

// 拿到搜索的歌曲
const songsList = computed(() => store.state.search.songsList);
// 是否显示分页
const isPagination = ref(false);

// 将搜索的歌曲提交到songsList
watch(
  () => songsList.value,
  (value) => {
    store.commit("songMenu/changePrivileges", value);
    // 等到请求结果有数据了在显示
    if (value.length != 0) {
      isPagination.value = true;
    }
  }
);
// 监听分页的点击
watch(
  () => pageInfo.value.offset,
  (value) => {
    console.log(value);
    // 隐藏分页
    isPagination.value = false;
    // 清空歌曲
    store.state.search.songsList = [];
    // offsetTop 元素到顶部的距离
    // scrollTop元素距离顶部滚动的距离
    searchPageRef.value.scrollTop = 0;
    reqSearchSongs(value - 1);
  }
);

// 拿到搜索歌曲的总数
const songCount = computed(() => store.state.search.songCount);

// 歌曲点击事件
const onhandleClick = (row) => {
  store.dispatch("playMusic/dispatchMusicInfo", row);
  // 将搜索的歌曲添加到播放列表
  store.commit("songMenu/CurrentMenuList", songsList.value);
};

// 跳转到歌手界面
const singerClick = (id) => {
  console.log(id);
  router.push({
    path: "/singerDetailPage",
    query: {
      id,
    },
  });
};
// 跳转到专辑页面
const albumClick = (id) => {
  console.log(id);
  router.push({
    path: "/albumDetailPage",
    query: {
      ids: id,
    },
  });
};
</script>

<style lang="less" scoped>
.search_page {
  margin-top: 10px;
  height: calc(100vh - 150px);
  overflow: hidden;
  padding: 0 20px;
}
.pageination {
  margin-top: 15px;
  // margin-bottom: 1.1111rem;
  display: flex;
  justify-content: center;
}
.songs_list {
  margin-top: 15px;
}

.total {
  margin-top: 10px;
  font-weight: 300;
  font-size: 12px;
}
.cursorHover > span {
  font-weight: 400;
}
.cursorHover:hover {
  cursor: pointer;
  font-weight: 550;
}
</style>
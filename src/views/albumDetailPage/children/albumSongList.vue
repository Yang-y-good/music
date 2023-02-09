<template>
  <div class="album_song_list">
    <song-list
      :songList="albumSons"
      class="song_list"
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
    </song-list>
  </div>
</template>

<script setup>
import songList from "@/components/song-List.vue";
import { computed, onMounted, onUnmounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import { usePlayMusic } from "@/hook/playMusic";
const store = useStore();
const route = useRoute();
const router = useRouter()
// 拿到专辑歌曲
const albumSons = computed(() => store.state.recommend.singer.albumSons);

// 歌曲点击事件
const onhandleClick = (row) => {
  // usePlayMusic(row.id);
    // 发送歌曲信息播放歌曲
  store.dispatch("playMusic/dispatchMusicInfo", row);

  // 将歌单所有歌曲添加到播放列表
  store.commit("songMenu/CurrentMenuList", albumSons.value);
};

//  跳转到歌手界面
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



onMounted(() => {
  console.log("object");
  // 请求专辑信息
  store.dispatch("recommend/singer/getAlbumContent", route.query.ids);
});

// 清除歌曲
onUnmounted(() => {
  console.log("exit");
  store.state.recommend.singer.albumSons = [];
});
</script>

<style lang="less" scoped>
.cursorHover > span {
  font-weight: 400;
}
.cursorHover:hover {
  cursor: pointer;
  font-weight: 550;
}
</style>
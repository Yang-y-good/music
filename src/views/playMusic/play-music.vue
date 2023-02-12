<template>
  <div class="play-music">
    <!-- 歌曲信息 -->
    <songs-info :musicInfo="musicInfo" @OpenDrawer='OpenDrawer' class="songs_info"/>
    <!-- 播放器 -->
    <player :url="url" />

    <!-- 歌曲列表 -->
    <songs-list :musicInfo="musicInfo" :isShow='isShow' class="songs_list"/>
  </div>
</template>

<script setup>
import { computed, defineComponent, provide, ref, watch } from "vue";

import songsInfo from "./playList/songsInfo.vue";
import player from "./playList/player.vue";
import songsList from "./playList/songsList.vue";


import { useStore } from "vuex";
const isShow = ref(true);
const OpenDrawer = (flag) => {
  isShow.value = !flag;
};

const store = useStore();
// 歌曲url
const url = ref();
watch(
  () => store.state.playMusic.musicUrl,
  (newUrl) => {
    url.value = newUrl;
  }
);

// 获取歌曲信息
const musicInfo = computed(() => store.state.playMusic.musicInfo)
</script>

<style lang="less" scoped>

.play-music {
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  // position: absolute;
  position: fixed;
  z-index: 999;
  bottom: 0;
  width: 100%;
  height: 100px;
  align-items: center;
  border-top: 2px #eee solid;
  background-color: white;
}

@media only screen and (max-width: 1000px) {
  .songs_info, 
  .songs_list{
    display: none;
  }
}
</style>

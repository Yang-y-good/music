<template>
  <div class="Album_list" v-for="[key, value] of albumlist" :key="key">
    <div class="left">
      <img
        :src="`${key.picUrl}?param=300y300`"
        alt="top50"
        @click="handleClick(key.id)"
      />
      <span>{{ DateTimeFormat(key.publishTime) }}</span>
    </div>
    <div class="right">
      <div class="header">
        <span style="font-weight: 700">{{ key.name }}</span>
      </div>

      <song-list
        :songList="value"
        :show-header="false"
        :isAlbumShow="false"
        @onhandleClick="onhandleClick"
        :propList="propList"
      >
      </song-list>
    </div>
  </div>
</template>

<script setup>
import songList from "@/components/song-List.vue";
import { DateTimeFormat } from "@/utils/date-format";

import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({
  img: {
    typeof: String,
    default: "",
  },
  albumlist: {
    typeof: Object,
    default: () => {},
  },
});

const propList = [
  { prop: "time", label: "时间", headerAlign: "center", align: "center" },
];

const store = useStore();
const router = useRouter();

// 歌曲点击事件
const onhandleClick = (row, songlist) => {
  // 发送歌曲信息播放歌曲
  store.dispatch("playMusic/dispatchMusicInfo", row);
  // 将歌单所有歌曲添加到播放列表
  store.commit("songMenu/CurrentMenuList", songlist);
};

// 专辑点击事件
const handleClick = (id) => {
  console.log("object", id);
  router.push({
    path: "/albumDetailPage",
    query: {
      ids: id,
    },
  });
};
</script>

<style lang="less" scoped>
.Album_list {
  display: flex;
  margin-bottom: 20px;
  .left {
    display: flex;
    flex-direction: column;
    width: 160px;
    text-align: center;
    margin-right: 20px;
    span {
      display: inline;
      margin-top: 5px;
      font-size: 12px;
    }
    img {
      cursor: pointer;
      height: 150px;
      border-radius: 10px;
    }
  }
  .right {
    margin-left: 20px;
    width: 82%;
    .header {
      margin-bottom: 10px;
    }
  }
  .more {
    width: 100%;
    height: 30px;
    background-color: rgb(246, 246, 246);
    span {
      float: right;
      line-height: 30px;
      font-size: 12px;
      margin-right: 15px;
    }
  }
  .more:hover {
    background-color: #fafafa;
  }
}
</style>
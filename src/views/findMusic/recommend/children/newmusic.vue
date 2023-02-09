<template>
  <div class="new_music">
    <p>最新音乐</p>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in songList" :key="index" v-bind="size">
        <div
          class="item"
          @click="itemClick(index, item.index)"
          ref="imgRef"
          @dblclick="onPlayMusic(item.id)"
        >
          <div class="img" @click="onPlay(index, item.id)">
            <img :src="`${item.picUrl}?param=200y200`" alt="" />

            <svg class="icon shanjiao" aria-hidden="true">
              <use xlink:href="#icon-playfill-copy"></use>
            </svg>
          </div>
          <div class="info">
            <div class="info_name">
              <span>{{ item.name }}</span>
            </div>
            <div class="info_msg">
              <span>{{ item.author }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { mapMusicInfo } from "@/hook/mapMusicInfo";
import { usePlayMusic } from "@/hook/playMusic";

const { computed, ref, onMounted } = require("@vue/runtime-core");
const { useStore } = require("vuex");
const store = useStore();

    const size = {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 8 },
      lg: { span: 8 },
      xl: { span: 8 },
    };

// 请求新音乐数据
store.dispatch("recommend/getnewsong");

// 映射歌曲信息
const songList = computed(() => {
  return store.state.recommend.newsongs.map((item, index) => {
    return {
      index: index + 1,
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      author: item.song.artists[0].name,
    };
  });
});
const imgRef = ref();

// 点击改变背景颜色
const itemClick = (index, item) => {
  for (const item in imgRef.value) {
    if (index === parseInt(item)) {
      imgRef.value[item].style.backgroundColor = "#ebebeb";
    } else {
      imgRef.value[item].style.backgroundColor = "";
    }
  }
};

// 点击图标播放歌曲
const onPlay = (index, id) => {
  // 拿到歌曲详细信息
  store.dispatch("playMusic/getMusicInfo", id).then((res) => {
    const { songs } = res;
    console.log(songs);
    const song = mapMusicInfo(songs);
    // 播放歌曲
    store.dispatch("playMusic/dispatchMusicInfo", song[0]);
    //   // 将歌曲加入播放列表
    store.commit("songMenu/CurrentMenuList", songs);
  });
};

// 双击播放歌曲
const onPlayMusic = (id) => {
  usePlayMusic(id);
};
</script>

<style lang="less" scoped>
.new_music {
  .item {
    height: 60px;
    margin-bottom: 20px;
    display: flex;
    .img {
      height: 100%;
      position: relative;
      cursor: pointer;
      img {
        border-radius: 8px;
        height: 100%;
      }

      .shanjiao {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 5px;
        border-radius: 50%;
        opacity: .9;
      }
    }
    .info {
      margin-left: 8px;
      margin-right: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      font-size: 12px;
    }
  }
  .item:hover {
     border-radius: 8px;
    background-color: #ebebeb;
  }
}
</style>
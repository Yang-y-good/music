<template>
  <el-scrollbar ref="globalRef">
    <!-- <div class="mian" @scroll="onScroll" >  -->
    <!-- <img :src="musicInfo.songsInfo.picUrl" alt="bg" class="bg_img" /> -->
    <div class="lyric">
      <div class="cd_left">
        <img
          src="@/assets/image/needle-ab.png"
          alt=""
          class="needle_ab"
          :class="{ needle_ab_active: isPlay }"
        />
        <img src="@/assets/image/cd.png" alt="" class="img_cd" />
        <img
          :src="musicInfo.songsInfo.picUrl"
          alt=""
          class="pic_url"
          :class="[isPlay ? 'pic_url_active' : 'pic_url_paused']"
        />
      </div>

      <lyric-component
        :musicInfo="musicInfo"
        :ric="ric"
        :currentplaytime="currentplaytime"
        class="lyric_com"
      >
      </lyric-component>
    </div>
    <song-comment
      style="margin-bottom: 100px"
      @commentPosition="resetCommentPosition"
    />

    <!-- </div> -->
  </el-scrollbar>
</template>

<script setup>
import songComment from "./comment/song-comment";
import lyricComponent from "./lyric/lyric-component.vue";
import { mapLyric } from "@/hook/mapLyric";
const {
  computed,
  watch,
  onMounted,
  onUpdated,
  ref,
  watchEffect,
} = require("@vue/runtime-core");
const { useStore } = require("vuex");
const store = useStore();
const props = defineProps({
  // 歌曲信息
  musicInfo: Object,
});

// 总体滚动条的元素
const globalRef = ref();
// 点击分页将滚动条重新定位
const resetCommentPosition = (position) => {
  console.log("分页点击", position);
  globalRef.value.setScrollTop(position);
};

// 判断当前是否处于播放状态
const isPlay = computed(() => store.state.playMusic.isPlay);

onMounted(() => {
  //初次加载歌单页面请求歌词
  store.dispatch("playMusic/getMusicLyric", props.musicInfo.id);
});
// 获取歌词当前播放时间
const currentplaytime = computed(() => store.state.playMusic.currentTime);

const ric = ref();
// 对歌曲歌词进行映射
watch(
  () => store.state.playMusic.lyric,
  (value) => {
    if (!value) return;
    ric.value = mapLyric(value.lyric);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.bg_img {
  min-width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 0;
  // filter: blur(300px);
  // filter: drop-shadow(10px);
}
.lyric_com {
  margin-top: 50px;
  flex: 1;
}

.lyric {
  height: 80vh;
  width: 100%;
  display: flex;

  z-index: 1;
  position: relative;
  // background-color: rgba(173, 145, 145, 0.8);
  .cd_left {
    width: 500px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // margin-bottom: 100px;
    flex: 1;
    .needle_ab {
      right: 190px;
      width: 60px;
      top: 50%;
      left: 50%;
      margin-top: -150px;
      position: absolute;
      z-index: 3;
      transform: rotate(-30deg);
      transform-origin: left top;
      transition: all 1s;
    }
    .needle_ab_active {
      top: 50%;
      left: 50%;
      margin-top: -150px;
      right: 190px;
      width: 60px;
      position: absolute;
      z-index: 3;
      transform: rotate(0deg);
      transform-origin: left top;
      transition: all 1s;
    }

    .img_cd {
      // top: -35px;
      // width: 200px;
      position: absolute;
      // z-index: 2;
    }
    .pic_url {
      width: 130px;
      border-radius: 50%;
      animation: rotate_cd 15s linear infinite;
    }
    .pic_url_active {
      animation-play-state: running;
    }
    .pic_url_paused {
      animation-play-state: paused;
    }
    // 旋转动画
    @keyframes rotate_cd {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
}
</style>
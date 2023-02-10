<template>
  <!-- :src="`https://music.163.com/song/media/outer/url?id=${songlist[currentIndex].id}.mp3`" -->
  <div class="player" :class="{ disabled: songlist.length == 0 }">
    <audio
      :src="url"
      ref="audio"
      @timeupdate="onTimeupdate"
      @canplay="onCanplay"
      @playing="onPlaying"
      @pause="onPause"
      @loadstart="onLoadstart"
      @ended="onEnded"
    ></audio>

    <!-- 切换上一首 -->
    <div class="play-list">
      <el-tooltip
        class="box-item"
        effect="light"
        content="上一首"
        placement="top"
        :show-after="1000"
      >
        <span class="play-change">
          <svg class="icon" aria-hidden="true" @click="preClick" ref="preRef">
            <use xlink:href="#icon-chapter-pre" v-if="ispre"></use>
            <use xlink:href="#icon-chapter-pre-copy" v-else></use>
          </svg>
        </span>
      </el-tooltip>

      <!-- 播放和暂停 -->
      <button class="play-buttom" @click="changePlayimg">
        <img :src="play" ref="playimg" />
        <!-- <svg class="icon img" aria-hidden="true">
          <use xlink:href="#icon-play" ></use>
        </svg> -->
      </button>

      <!-- 切换下一首 -->
      <el-tooltip
        class="box-item"
        effect="light"
        content="下一首"
        placement="top"
        :show-after="1000"
      >
        <span class="play-change">
          <svg class="icon" aria-hidden="true" @click="nextClick" ref="nextRef">
            <use xlink:href="#icon-chapter-next" v-if="isnext"></use>
            <use xlink:href="#icon-chapter-next-copy" v-else></use>
          </svg>
        </span>
      </el-tooltip>
    </div>
    <div class="slider-demo-block">
      <span class="current-time">
        <span v-if="songlist.length != 0">
          {{ formatSongTime(currentTime) }}
        </span>
      </span>
      <div class="my_slider">
        <el-slider
          v-model="value1"
          :max="totalTime / 1000"
          @change="changeTime"
          @input="actionTime"
          @mousedown="isChang = true"
          @mouseup="isChang = false"
          :show-tooltip="false"
        />
      </div>
      <span class="total-time">
        <span v-if="songlist.length != 0">
          {{ formatSongTime(totalTime) }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { formatSongTime } from "@/utils/formatSongTime";
import { mapMusicInfo } from "@/hook/mapMusicInfo";
import { useStore } from "vuex";
import { watchMouse } from "@/hook/watchMouse";

const props = defineProps({
  url: {
    type: String,
    default: () => {},
  },
});

const store = useStore();
// 获取当前歌单歌曲列表
const songlist = computed(() => {
  return mapMusicInfo(store.state.songMenu.currentMenuList);
});

// console.log(songlist.value);

// 存储用户点击歌曲的下标
const index = ref();

// 获取用户点击歌曲的下标
watchEffect(() => {
  index.value = store.state.playMusic.index;
});

// 引入静态资源
const play = require("@/assets/image/play.png");
const pause = require("@/assets/image/pause.png");
const playleft = require("@/assets/image/play-left.png");
const playright = require("@/assets/image/play-right.png");
// 进度条
const value1 = ref(0);
// 获取audio元素
const audio = ref();
// 获取img元素
const playimg = ref();
// 歌曲总时长
const totalTime = ref("");
// 歌曲当前播放进度
const currentTime = ref("");
// 判断是否处于拖拽状态
const isChang = ref(false);

// play()方法被调用触发
const onPlaying = () => {
  playimg.value.src = pause;
  console.log("音乐正在播放");
};
// pause() 方法被调用触发
const onPause = () => {
  playimg.value.src = play;
  console.log("音乐已暂停");
};

// 改变歌曲状态
const changePlayimg = () => {
  if (playimg.value.src === pause) {
    // 暂停
    // store.state.playMusic.isPlay = false;
    audio.value.pause();
    playimg.value.src = play;
  } else {
    // 播放
    // store.state.playMusic.isPlay = true;
    audio.value.play();
    playimg.value.src = pause;
  }
};

// 控制音乐播放
watch(
  () => store.state.playMusic.isPlay,
  (value) => {
    if(!value) {
      console.log('暂停播放');
       audio.value.pause();
    }
  }
);

// 开始加载音频了
const onLoadstart = () => {
  console.log("开始加载音频了");
};

// canplay可以播放
const onCanplay = () => {
  store.state.playMusic.isPlay = true;
  console.log("开始播放音频时触发");
  audio.value.play();
  //   获取音频的总长度
  totalTime.value = audio.value.duration * 1000;
  console.log(totalTime.value);
};

// 已播放时长更新
const onTimeupdate = (res) => {
  store.commit("playMusic/changeCurrent", audio.value.currentTime);
  // 如果正在拖拽进度条就不给当前播放时长赋值
  if (isChang.value === true) return;
  // console.log(audio.value.currentTime);
  value1.value = audio.value.currentTime;
  currentTime.value = audio.value.currentTime * 1000;
};

// 切换上一首歌曲
const preClick = () => {
  console.log("切换上一首歌曲");

  if (index.value === 1) {
    ElMessage({
      message: "已经是第一首歌了.",
      grouping: true,
      type: "warning",
    });
    return;
  }
  // 再减1
  store.dispatch("playMusic/dispatchMusicInfo", songlist.value[--index.value]);
};
// 切换下一首
const nextClick = () => {
  console.log("切换下一首歌曲");
  if (songlist.value.length === index.value) {
    ElMessage({
      message: "已经是最后一首歌了.",
      grouping: true,
      type: "warning",
    });
    return;
  }
  store.dispatch("playMusic/dispatchMusicInfo", songlist.value[index.value++]);
};

// 音乐结束
const onEnded = () => {
  console.log("音乐结束");
  store.state.playMusic.isPlay = false;
  if (songlist.value.length === index.value) {
    ElMessage({
      message: "已经是最后一首歌了.",
      grouping: true,
      type: "warning",
    });
    return;
  }
  // 自动播放下一首
  store.dispatch("playMusic/dispatchMusicInfo", songlist.value[index.value++]);
};

// 拖拽进度条松开时触发
const changeTime = (value) => {
  console.log(value);
  isChang.value = false;
  // 调整播放进度
  audio.value.currentTime = value;
};
// 拖拽进度条实时触发
const actionTime = (value) => {
  isChang.value = true;
  currentTime.value = value * 1000;
};
// 监听音量改变
watch(
  () => store.state.playMusic.volumeSize,
  (value) => {
    console.log(value);
    audio.value.volume = value / 100;
  }
);

const preRef = ref();
const nextRef = ref();
const ispre = ref(true);
const isnext = ref(true);
onMounted(() => {
  const result1 = watchMouse(preRef.value);
  watch(result1, (value) => {
    ispre.value = value;
  });
  const result2 = watchMouse(nextRef.value);
  watch(result2, (value) => {
    isnext.value = value;
  });
});
</script>


<style lang="less" scoped>
.player {
  height: 100%;
  flex: 1;
  box-sizing: content-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .play-list {
    display: flex;
    align-items: center;
  }
  .play-buttom {
    margin: 0 45px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    position: relative;
    border: 0;
    cursor: pointer;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 20px;
      margin: auto;
      transform: translate(-50%, -50%);
    }
  }
  .play-buttom:hover {
    background-color: #cfd3da;
    // background-color: #909399;
  }

  .play-change {
    .icon {
      font-size: 20px;
      cursor: pointer;
    }
  }

  .slider-demo-block {
    display: flex;
    justify-content: center;
    width: 350px;
    align-items: center;
    span {
      width: 50px;
      font-size: 10px;
    }
    .current-time {
      width: 50px;
      margin-right: 10px;
    }
    .my_slider {
      flex: 1;
    }
    .el-slider {
      height: 40px;
    }
    .total-time {
      margin-left: 10px;
      width: 50px;
    }
  }
}
/deep/.el-slider__button {
  background-color: transparent;
  border: 0;
}

// 没有歌曲播放时禁用
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>

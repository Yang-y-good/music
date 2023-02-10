<template>
  <div class="lessen" ref="lessRef" @scroll="onscroll">
    <div class="voide_left">
      <h2 class="detail">
        <el-icon class="exit" @click="exit"><ArrowLeftBold /></el-icon>
        {{ tag }}
      </h2>
      <vue3-video-play
        v-if="videoDetail"
        v-bind="options"
        :poster="videoDetail.coverUrl || videoDetail.cover"
        :src="videoUrl"
      />
      <div class="detail_item">
        <detail-video @onVideoDetail="getDetail" @onVideoUrl="getUrl" />
      </div>
      <div class="comment">
        <comment @onClickPlgination="setPosition" />
      </div>
    </div>
    <div class="recommend">
      <related-video />
    </div>
  </div>
  <el-backtop
    :right="50"
    :bottom="110"
    :visibility-height="1000"
    target=".lessen"
  />
</template>

<script setup>
import relatedVideo from "./relatedVideo.vue";

import listVideo from "./listVideo.vue";
import detailVideo from "./detailVideo.vue";
import comment from "../comment/comment.vue";

import { reactive, ref } from "@vue/reactivity";
import {
  computed,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  watch,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const route = useRoute();
const router = useRouter();

// 保存滚动条位置
const scrolltop = ref();

const lessRef = ref();

// 点击分页后重新定位到最新评论
const setPosition = (position) => {
  console.log(position);
  // 最新评论减去顶端状态栏高度
  lessRef.value.scrollTop = position - 60;
};
// 获取滚动距离
const onscroll = (e) => {
  scrolltop.value = e.target.scrollTop;
};

onActivated(() => {
  store.state.playMusic.isPlay = false;
  console.log("视频界面缓存");
  store.commit("setisPlayMusic", false);
  console.log(scrolltop.value);
  lessRef.value.scrollTop = scrolltop.value;
});

onUnmounted(() => {
  store.state.playMusic.isPlay = false;
  console.log("离开视频界面");
  store.commit("setisPlayMusic", true);
});

onDeactivated(() => {
  store.commit("setisPlayMusic", true);
});

const tag = computed(() => {
  return route.query.mvId ? "MV详情" : "视频详情";
});

// 保存视频详情
const videoDetail = ref();
// 保存视频地址
const videoUrl = ref();

const getDetail = (data) => {
  videoDetail.value = data;
};
const getUrl = (data) => {
  videoUrl.value = data;
};

const options = reactive({
  width: "650px", //播放器高度
  height: "350px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称

  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.5, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});

const exit = () => {
  router.back(-1);
};
</script>

<style lang="less" scoped>
.lessen {
  display: flex;
  height: calc(100vh - 55px);
  overflow-x: hidden;
  justify-content: center;
  .voide_left {
    width: 650px;
  }
  .recommend {
    width: 50%;
    margin-left: 50px;
  }
  .comment {
    margin-top: 30px;
  }
}
.detail_item {
  display: flex;
  flex-direction: column;
}
.detail {
  display: flex;
  align-items: center;
  .exit {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>
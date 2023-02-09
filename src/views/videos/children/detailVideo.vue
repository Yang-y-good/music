<template>
  <div class="detail_item" v-if="videoDetail">
    <!-- 视频作者 -->
    <div class="creator">
      <div>
        <img
          :src="videoDetail.creator.avatarUrl"
          alt=""
          @click="clickName(videoDetail)"
        />
        <span class="author_name" @click="clickName(videoDetail)">{{
          videoDetail.creator.nickname
        }}</span>
      </div>
      <el-button type="primary" round class="foll">
        <span> + 关注 </span>
      </el-button>
    </div>

    <!-- 视频标题 -->
    <div class="title">
      <h2>{{ videoDetail.title }}</h2>
    </div>
    <!-- 发布事件，播放量 -->
    <div class="publish_playCount">
      <span>发布时间: {{ DateTimeFormat(videoDetail.publishTime) }}</span>
      <span>播放量：{{ formatNumber(videoDetail.playTime) }}</span>
    </div>

    <!-- 视频标签 -->
    <div class="videoGroup">
      <span
        v-for="item in videoDetail.videoGroup"
        :key="item"
        class="group_item"
        @click="clickGroup(item)"
        >{{ item.name }}</span
      >
    </div>
  </div>

  <div class="detail_item" v-if="MvDetail">
    <!-- 视频作者 -->
    <div class="creator">
      <div>
        <img :src="MvDetail.cover" alt="" @click="clickName(MvDetail)" />
        <span class="author_name" @click="clickName(MvDetail)">{{
          MvDetail.artistName
        }}</span>
      </div>
    </div>

    <!-- 视频标题 -->
    <div class="title">
      <h2>{{ MvDetail.name }}</h2>
    </div>
    <!-- 发布事件，播放量 -->
    <div class="publish_playCount">
      <span>发布时间: {{ MvDetail.publishTime }}</span>
      <span>播放量：{{ formatNumber(MvDetail.playCount) }}</span>
    </div>

    <!-- 视频标签 -->
    <div class="videoGroup">
      <span
        v-for="item in MvDetail.videoGroup"
        :key="item"
        class="group_item"
        @click="clickGroup(item)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script setup>
// 格式化时间
import { DateTimeFormat } from "@/utils/date-format.js";
// 格式化播放量
import { formatNumber } from "@/utils/formatNumber.js";
import {
  computed,
  onActivated,
  onMounted,
  onUpdated,
  ref,
  watch,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const emit = defineEmits(["onVideoUrl", "onVideoDetail"]);

const store = useStore();
const route = useRoute();
const router = useRouter();
// 保存视频详情
const videoDetail = ref();
// 保存视频地址
const videoUrl = ref();

// 保存MV详情
const MvDetail = ref();
// 保存MV地址
const MvUrl = ref();

// 请求视频详情
const getVideoDetail = (value) => {
  store.dispatch("video/getVideoDetail", value).then((res) => {
    videoDetail.value = res.data;
    emit("onVideoDetail", videoDetail.value);
  });

  store.dispatch("video/getVideoUrl", value).then((res) => {
    videoUrl.value = res.urls[0]?.url;
    console.log(videoUrl.value);
    emit("onVideoUrl", videoUrl.value);
  });
};

// 请求mv详情
const getMvDetail = (value) => {
  store.dispatch("video/getMvData", value).then((res) => {
    MvDetail.value = res.data;
    emit("onVideoDetail", MvDetail.value);
  });
  store.dispatch("video/getMvUrl", value).then((res) => {
    MvUrl.value = res.data.url;
    emit("onVideoUrl", MvUrl.value);
  });
};

// 监听路由参数，请求不同的数据
watch(
  () => route.query,
  (value) => {
    if (value.vid) {
      getVideoDetail(value.vid);
    } else if (value.mvId) {
      getMvDetail(value.mvId);
    }
  },
  {
    immediate: true,
  }
);

// 跳转到对应的视频标签
const clickGroup = (item) => {
  console.log(item);
  store.commit("video/setTags", { id: item.id, name: item.name });
  router.push({
    path: "/video/listVideo",
    query: {
      tag: item.id,
    },
  });
};

const clickName = (item) => {
  console.log(item);
  if (!route.query.mvId) {
    console.log("object--------------");
    // 跳转个人信息页
    router.push({
      path: "/profilePage",
      query: {
        id: item.creator.userId,
      },
    });
    return;
  }
  // mv跳转到歌手界面
  router.push({
    path: "/singerDetailPage",
    query: {
      id: item.artistId,
    },
  });
};
</script>

<style lang="less" scoped>
.detail_item {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  .creator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
      margin-right: 15px;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .author_name {
      cursor: pointer;
    }
    .foll {
      background-color: #fdf5f4;
      border-style: none;
      span {
        color: red;
      }
    }
  }

  .title {
    display: flex;
    margin-top: 20px;
  }

  .publish_playCount {
    font-size: 12px;
    color: #c2b7b7;
    margin: 15px 0;
    span:last-child {
      margin-left: 15px;
    }
  }
  .videoGroup {
    margin-top: 10px;
    .group_item {
      background-color: #f7f7f7;
      padding: 5px;
      border-radius: 35%;
      margin-right: 10px;
      font-size: 13px;
      cursor: pointer;
    }
  }
}
</style>
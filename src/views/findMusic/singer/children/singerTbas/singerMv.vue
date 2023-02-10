<template>
  <div
    v-infinite-scroll="load"
    :infinite-scroll-distance="500"
    :infinite-scroll-delay="500"
    infinite-scroll-immediate
    :infinite-scroll-disabled="disabled"
  >
    <el-row :gutter="30">
      <el-col :span="6" v-for="item in mvdata" :key="item" v-bind="size">
        <div class="item">
          <div class="img" @click="playVideo(item)">
            <img class="el_img" :src="`${item.imgurl}?param=500y300`" />
            <!-- 播放量 -->
            <div class="playCount">
              <el-icon><VideoPlay /></el-icon>
              <span>{{ formatNumber(item.playCount) }}</span>
            </div>
            <!-- 视频时间 -->
            <div class="video_durationms">
              <span> {{ formatSongTime(item.duration) }}</span>
            </div>
          </div>

          <!-- 视频标题 -->
          <div class="title" @click="playVideo(item)">
            <el-tooltip
              class="box-item"
              effect="light"
              :show-after="500"
              :content="item.name"
              placement="bottom"
            >
              <span>{{ item.name }}</span>
            </el-tooltip>
          </div>
        </div>
      </el-col>
    </el-row>

    <loading v-if="isloading" class="loading" />
  </div>
</template>

<script setup>
// 对播放量进行格式化
import { formatNumber } from "@/utils/formatNumber";
// 对歌曲时间进行转化
import { formatSongTime } from "@/utils/formatSongTime";

import loading from "@/components/loading.vue";

import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const route = useRoute();
const router = useRouter();

// 响应式
const size = {
  xs: { span: 12 },
  sm: { span: 8 },
  md: { span: 8 },
  lg: { span: 6 },
  xl: { span: 4 },
};
// 加载loading
const isloading = ref(false);
// 禁用无限滚动
const disabled = ref(false);
// 请求参数
const temp = ref({
  id: route.query.id,
  offset: 0,
  limit: 15,
});

// mv数据
const mvdata = ref([]);
// 数据初始化
const getArtist = (args) => {
  store.dispatch("recommend/singer/getArtisiMv", args).then((res) => {
    console.log(res);
    mvdata.value = res.mvs;
  });
};

getArtist(temp.value);

const playVideo = (item) => {
  console.log(item);
  router.push({
    path: "/mainVideo",
    query: {
      mvId: item.id,
    },
  });
};

const load = () => {
  isloading.value = true;
  console.log("加载更多");
  temp.value.offset += 15;
  console.log(temp.value);
  store.dispatch("recommend/singer/getArtisiMv", temp.value).then((res) => {
    console.log(res);
    isloading.value = false;
    //  没有更多数据时
    if (!res.hasMore) {
      isloading.value = false;
      disabled.value = true;
      ElMessage({
        message: "没有更多数据了!!!",
        grouping: true,
        type: "success",
      });
    }
    mvdata.value.push(...res.mvs);
  });
};
</script>

<style lang="less" scoped>
.item {
  height: 150px;
  margin-bottom: 20px;

  .img {
    height: 80%;
    position: relative;
    .el_img {
      height: 100%;
      width: 100%;
      border-radius: 5px;
      cursor: pointer;
    }
    .playCount {
      z-index: 1;
      position: absolute;
      top: 5px;
      right: 5px;
      color: white;
      font-size: 12px;
      .el-icon {
        margin-right: 3px;
        vertical-align: top;
      }
    }
    .video_durationms {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: white;
      font-size: 13px;
    }
  }
  .title {
    font-weight: 400;
    font-size: 13px;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    span:hover {
      font-weight: 550;
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 550px) {
  .item {
    display: none;
  }
}
</style>
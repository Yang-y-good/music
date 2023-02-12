<template>
  <div
    class="video_tabs_list"
    ref="video"
    v-if="voideData.length"
    v-infinite-scroll="load"
    :infinite-scroll-distance="500"
    :infinite-scroll-delay="500"
    :infinite-scroll-disabled="disabled"
    @scroll="onscroll"
  >
    <div>
      <el-row :gutter="30">
        <el-col :span="6" v-for="item in voideData" :key="item" v-bind="size">
          <div class="item">
            <div class="img" @click="playVideo(item)">
              <picture
                class="picture"
                @mouseover="onmouseover($event, item)"
                @mouseleave="onmouseleave($event)"
              >
                <source type="image/webp" />
                <img
                  class="el_img"
                  :src="`${item.data.coverUrl}?param=500y300`"
                />
                <svg
                  class="icon shanjiao"
                  aria-hidden="true"
                  v-show="playiconvid === item.data.vid"
                >
                  <use xlink:href="#icon-playfill-copy"></use>
                </svg>
              </picture>
              <!-- 播放量 -->
              <div class="playCount">
                <el-icon><VideoPlay /></el-icon>
                <span>{{
                  formatNumber(item.data?.playTime || item.data?.playCount)
                }}</span>
              </div>

              <!-- 视频时间 -->
              <div class="video_durationms">
                <span>
                  {{
                    formatSongTime(item.data?.durationms || item.data?.duration)
                  }}</span
                >
              </div>
            </div>

            <!-- 视频标题 -->
            <!-- || item.data.name -->
            <div class="title" @click="playVideo(item)">
              <el-tooltip
                class="box-item"
                effect="light"
                :show-after="500"
                :content="item.data.title || item.data.name"
                placement="bottom"
              >
                <span>{{ item.data.title || item.data.name }}</span>
              </el-tooltip>
            </div>

            <!-- 视频作者 -->
            <div class="author">
              <span
                v-if="item.data.creator"
                @click="profileClick(item.data.creator)"
              >
                {{ item.data.creator.nickname }}
              </span>
              <span v-if="item.data.artists">
                {{ item.data.artists[0].name }}
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <loading v-if="isloading" class="loading" />
  </div>

  <div v-else>
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
  <el-backtop
    :right="50"
    :bottom="110"
    :visibility-height="1000"
    target=".el-scrollbar__wrap"
  />
</template>

<script setup>
// 对播放量进行格式化
import { formatNumber } from "@/utils/formatNumber";
// 对歌曲时间进行转化
import { formatSongTime } from "@/utils/formatSongTime";
import loading from "@/components/loading.vue";
import tags from "./tags.vue";

import {
  nextTick,
  onActivated,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// 响应式
const size = {
  xs: { span: 24 },
  sm: { span: 12 },
  md: { span: 8 },
  lg: { span: 6 },
  xl: { span: 4 },
};

// 加载loading
const isloading = ref(false);

const emit = defineEmits();
const store = useStore();
const router = useRouter();
const route = useRoute();
// 视频数据
const voideData = ref([]);
// 元素dom
const video = ref();

// 保存滚动条位置
const scrolltop = ref();

// 获取滚动距离
const onscroll = (e) => {
  scrolltop.value = e.target.scrollTop;
};

onMounted(() => {
  console.log(video.value);
});

onActivated(() => {
  // 回到界面时再次返回原来的位置
  if (video.value) {
    video.value.scrollTop = scrolltop.value;
  }
});

// 请求参数
const tabsObject = reactive({
  offset: 0,
  id: 58100,
});

// 默认请求现场tag视频
const defaultRequest = (tabsObject) => {
  store.dispatch("video/getVideoGroups", tabsObject).then((res) => {
    voideData.value = res;
  });
};

defaultRequest(tabsObject);

watch(
  () => store.getters["video/getTags"],
  (value) => {
    voideData.value = [];
    console.log("------------------------------------", value);

    // 请求点击标签的视频
    tabsObject.offset = 0;
    tabsObject.id = value.id;
    defaultRequest(tabsObject);

    // // 点击的标签为全部视频时 总是频繁请求，不请求全部视频了
    // if (!value) {
    //   // 请求全部视频
    //   store.dispatch("video/getVideoAll", 0).then((res) => {
    //     voideData.value = res;
    //   });
    // } else {
    // }
  }
);

// 播放图标
const playiconvid = ref(false);

// 定时器
let clean = null;
// 鼠标移入
const onmouseover = (e, item) => {
  // 关闭定时器
  clearInterval(clean);
  // 判断视频有没有预览图
  if (item.data.previewUrl && e.path) {
    // 添加预览图
    e.path[1].firstChild.setAttribute("srcset", item.data.previewUrl);
    // 定时器结束关闭预览图
    clean = setTimeout(() => {
      e.path[1].firstChild?.setAttribute("srcset", "");
      playiconvid.value = item.data.vid;
    }, 5500);
  } else {
    // 没有直接显示播放图片
    playiconvid.value = item.data.vid || item.data.id;
  }
};

// 鼠标离开
const onmouseleave = (e) => {
  // 关闭定时器
  clearInterval(clean);
  // 关闭图标
  playiconvid.value = 0;
  // 关闭预览图
  if (e.path) {
    e.path[0].firstChild.setAttribute("srcset", "");
  }
};

const disabled = ref(false);

// 当滚动条加载到底部触发
const load = () => {
  console.log("加载更多-------------");
  tabsObject.offset += 8;
  // 500ms还没加载成功显示loading
  const showLoading = setTimeout(() => {
    isloading.value = true;
  }, 500);
  try {
    store.dispatch("video/getVideoGroups", tabsObject).then((res) => {
      // 关闭loading
      clearTimeout(showLoading);
      isloading.value = false;
      // 请求最新数据追加到原来数据上
      voideData.value.push(...res);
    });
  } catch (error) {
    console.log("禁用滚动条");
    disabled.value = true;
  }
};
//  else {
//   try {
//     store.dispatch("video/getVideoAll", tabsObject).then((res) => {
//       isloading.value = false;
//       if (!res.hasmore) {
//         ElMessage({
//           message: res.msg,
//           grouping: true,
//           type: "success",
//         });

//         return;
//       }
//       if(res.datas.length) voideData.value.push(...res.datas);
//     });
//   } catch (error) {
//     // console.log("禁用滚动条");
//     disabled.value = true;
//     console.log("加载出错", error);
//   }
// }

// 跳转视频播放页面
const playVideo = (item) => {
  console.log(typeof route.query.tag);
  // 当点击的是MV视频时
  if (parseInt(route.query.tag) === 1000) {
    console.log("MV");
    console.log(item);
    router.push({
      path: "/mainVideo",
      query: {
        mvId: item.data.id,
      },
    });
  } else {
    router.push({
      path: "/mainVideo",
      query: {
        vid: item.data.vid,
      },
    });
  }
};
// 跳转作者详情页
const profileClick = (item) => {
  console.log(item);
  router.push({
    path: "/profilePage",
    query: {
      id: item.userId,
    },
  });
};
</script>

<style lang="less" scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.video_tabs_list {
  height: calc(100vh - 248px);
  overflow-x: hidden;
}
.loading {
  margin-bottom: 10px;
}
.item {
  height: 200px;
  margin-bottom: 20px;
  .img {
    height: 70%;
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
    .shanjiao {
      position: absolute;
      font-size: 22px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border-radius: 50%;
      padding: 10px;
      animation: icon 1s;
    }

    @keyframes icon {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
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
    margin: 5px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    span:hover {
      font-weight: 550;
      cursor: pointer;
    }
  }
  .author {
    color: #cfcfcf;
    font-size: 12px;
    span:hover {
      font-weight: 550;
      cursor: pointer;
    }
  }
}
</style>
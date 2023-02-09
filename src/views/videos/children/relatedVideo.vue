<template>
  <div>
    <h2 class="related">相关推荐</h2>
    <div class="recommend" v-if="relatedData">
      <div v-for="item in relatedData" :key="item" class="related_item">
        <div class="related_categ">
          <div class="img" @click="playVideo(item)">
            <img class="el_img" :src="`${item.coverUrl}?param=500y300`" />

            <!-- 播放量 -->
            <div class="playCount">
              <el-icon><VideoPlay /></el-icon>
              <span>{{ formatNumber(item.playTime) }}</span>
            </div>

            <!-- 视频时间 -->
            <div class="video_durationms">
              <span> {{ formatSongTime(item.durationms) }}</span>
            </div>
          </div>

          <div class="item_text">
            <!-- 视频标题 -->
            <div class="title" @click="playVideo(item)">
              <el-tooltip
                class="box_item"
                effect="light"
                :show-after="500"
                :content="item.title"
                placement="bottom"
              >
                <span>{{ item.title }}</span>
              </el-tooltip>
            </div>
            <!-- 视频作者 -->
            <div class="author">
              <span @click="profileClick(item.creator)">
                {{ item.creator[0].userName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="recommend" v-if="relatedMvData">
      <div v-for="item in relatedMvData" :key="item" class="related_item">
        <div class="related_categ">
          <div class="img" @click="playVideo(item)">
            <img class="el_img" :src="`${item.cover}?param=500y300`" />

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

          <div class="item_text">
            <!-- 视频标题 -->
            <div class="title" @click="playVideo(item)">
              <el-tooltip
                class="box_item"
                effect="light"
                :show-after="500"
                :content="item.name"
                placement="bottom"
              >
                <span>{{ item.name }}</span>
              </el-tooltip>
            </div>
            <!-- 视频作者 -->
            <div class="author">
              <span @click="profileClick(item.artistId)">
                {{ item.artistName }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 对播放量进行格式化
import { formatNumber } from "@/utils/formatNumber";
// 对歌曲事件进行转化
import { formatSongTime } from "@/utils/formatSongTime";

import { ref, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({});
const store = useStore();
const route = useRoute();
const router = useRouter();

// 相关视频数据
const relatedData = ref([]);
// 相关MV数据
const relatedMvData = ref([]);


// 请求mv相关
const reqMvRelated = (value) => {
  store.dispatch("video/getRelatedMv", value).then((res) => {
    console.log(res);
    relatedMvData.value = res.mvs;
  });
};

// 请求视频相关
const reqVideoRelated = (value) => {
  store.dispatch("video/getRelatedVideo", value).then((res) => {
    console.log(res);
    relatedData.value = res.data;
  });
};

// 监听路由参数，请求不同的数据
watch(
  () => route.query,
  (value) => {
    if (value.vid) {
      reqVideoRelated(value.vid);
    } else if (value.mvId) {
      reqMvRelated(value.mvId);
    }
  },
  {
    immediate: true,
  }
);


// 跳转视频播放页面
const playVideo = (item) => {
  console.log(item);
  // 视频
  if (route.query.vid) {
    router.push({
      path: "/mainVideo",
      query: {
        vid: item.vid,
      },
    });
    return;
  }
  // MV
  window.sessionStorage.setItem("mvid", item.id);
  router.push({
    path: "/mainVideo",
    query: {
      mvId: item.id,
    },
  });
};
// 跳转作者详情页
const profileClick = (item) => {
  console.log(item);
  if (!route.query.mvId) {
    console.log("object--------------");
    // 跳转个人信息页
    router.push({
      path: "/profilePage",
      query: {
        id: item[0].userId,
      },
    });
    return;
  }
  // mv跳转到歌手界面
  router.push({
    path: "/singerDetailPage",
    query: {
      id: item,
    },
  });
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  flex-direction: column;
  .related_item {
    height: 100px;
    width: 350px;
    margin-bottom: 10px;
  }
  .related_categ {
    display: flex;
    .img {
      cursor: pointer;
      flex: 1;
      position: relative;
      .el_img {
        width: 100%;
        height: 100px;
        border-radius: 5px;
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
    .item_text {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .title {
        cursor: pointer;
        font-size: 13px;
        /* 溢出部分隐藏 */
        overflow: hidden;
        /* 溢出部分用省略号代替 */
        text-overflow: ellipsis;
        /* 弹性伸缩盒子模型显示 */
        display: -webkit-box;
        /* 限制一个块元素显示的文本行数 */
        -webkit-line-clamp: 2;
        /* 设置伸缩盒对象子元素的排列方式 */
        -webkit-box-orient: vertical;
      }
      .author {
        color: #c2b7b7;
        font-size: 12px;
        span:hover {
          font-weight: 550;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
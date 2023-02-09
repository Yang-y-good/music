<template>
  <div class="album_info">
    <detail-components :detailInfo="albumInfo">
      <template
        #item="{
          coverImgUrl,
          name,
          transNames,
          subscribedCount,
          shareCount,
          time,
          artist,
          artistid,
        }"
      >
        <div class="main">
          <div class="img">
            <img
              v-image="`${coverImgUrl}?param=300y300`"
              alt=""
              :default-img="defaultimg"
            />
          </div>

          <div class="info">
            <div class="name" v-if="name">
              <span class="info_menu">专辑</span>
              <span class="album_name">{{ name }}</span>
              <span class="transNames" v-if="transNames">
                ({{ transNames }})</span
              >
            </div>

            <div class="three">
              <el-button class="three-items all_play" color="#F2F2F2" plain
                ><svg class="icon play" aria-hidden="true">
                  <use xlink:href="#icon-playfill-copy-copy"></use>
                </svg>
                <span>播放全部</span>
              </el-button>
              <el-button
                class="three-items"
                color="#F2F2F2"
                plain
                @click="handleSub"
              >
                <el-icon :size="20"><FolderAdd /></el-icon>
                <span>收藏</span>
                ({{ formatNumber(subscribedCount) }})
              </el-button>

              <el-button
                class="three-items"
                color="#F2F2F2"
                plain
                @click="handleShare"
                ><el-icon><Share /></el-icon>分享 ({{
                  formatNumber(shareCount)
                }})</el-button
              >
              <el-button
                class="three-items"
                color="#F2F2F2"
                plain
                @click="handleDownload"
                ><el-icon><Download /></el-icon>下载全部</el-button
              >
            </div>

            <div class="singer">
              <span
                >歌手:
                <a href="javascript:void(0)" @click="singerClick(artistid)">{{
                  artist
                }}</a></span
              >
              <span>时间: {{ DateTimeFormat(time) }}</span>
            </div>
          </div>
        </div>
      </template>
    </detail-components>
  </div>
</template>

<script setup>
import detailComments from "@/components/detail-Components.vue";

import { formatNumber } from "@/utils/formatNumber.js";
import { DateTimeFormat } from "@/utils/date-format";

import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const emit = defineEmits(['changeTitle'])
const store = useStore();
const route = useRoute();
const router = useRouter()
// 占位图
const defaultimg = require("@/assets/image/loadingImg.jpg");
// 专辑信息
const albumInfo = ref({});

// 请求专辑信息
const albumContent = store.dispatch(
  "recommend/singer/getAlbumContent",
  route.query.ids
);

// 获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
const albumDynamic = store.dispatch(
  "recommend/singer/getAlbumDynamic",
  route.query.ids
);
// 获取专辑全部信息
Promise.all([albumContent, albumDynamic]).then((res) => {
  
  emit('changeTitle', res[1].commentCount)
  // 处理专辑信息
  const obj = {
    coverImgUrl: res[0].picUrl,
    name: res[0].name,
    // alias: res[0].alias,
    transNames:res[0].transNames ? res[0].transNames[0] : null,
    time: res[0].publishTime,
    artist: res[0].artist.name,
    artistid: res[0].artist.id,
  };
  const albumDynamic = {
    subscribedCount: res[1].subCount,
    shareCount: res[1].shareCount,
  };

  albumInfo.value = [Object.assign(obj, albumDynamic)];
});

const profile = computed(() => store.state.login.profile);
const handleSub = () => {
  if (!profile.value) {
    //用户未登录弹出登录框
    store.commit("login/changelogindialog", true);
  }
};
const handleShare = () => {
  if (!profile.value) {
    //用户未登录弹出登录框
    store.commit("login/changelogindialog", true);
  }
};
const handleDownload = () => {
  if (!profile.value) {
    //用户未登录弹出登录框
    store.commit("login/changelogindialog", true);
  }
};

// 跳转到歌手界面
const singerClick = (id) => {
  console.log(id);
  router.push({
    path: "/singerDetailPage",
    query: {
      id,
    },
  });
};
</script>

<style lang="less" scoped>
.album_info {
  .main {
    display: flex;
    .img {
      height: 180px;
      width: 180px;
      display: flex;
      img {
        border-radius: 5px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      .name {
        font-size: 18px;
        margin-bottom: 30px;
        .album_name {
          font-weight: 700;
        }
        .info_menu {
          margin-right: 7.5px;
          color: red;
          font-size: 8px;
          padding: 0.5px 2.5px;
          border: 1px red solid;
          border-radius: 3px;
          vertical-align: middle;
        }
        .transNames {
          margin-left: 5px;
          color: #9f9f9f;
        }
      }
      .alias {
        font-size: 13px;
        margin-bottom: 15px;
        .alias_tow {
          margin-left: 10px;
        }
      }

      .three {
        display: inline-block;
        height: 30px;
        font-size: 13px;
        margin-bottom: 30px;
        .all_play {
          background-color: #ec4141;
          color: white !important;
          .play {
            font-size: 19px;
          }
          span {
            margin-left: 5px;
          }
        }
        .all_play:hover {
          background-color: #cc3232;
        }
        .three-items {
          height: 80%;
          vertical-align: middle;
          padding: 13px;
          font-weight: 400;
          border: 2px solid #ededed;
          color: #373737;
          border-radius: 15px;
        }
        .el-icon {
          display: inline-block;
          margin-right: 5px;
        }
      }

      .singer {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        span {
          margin-bottom: 10px;
          a {
            padding-right: 5px;
            text-decoration: none;
            color: #0b58b0;
          }
        }
      }
    }
  }
}
</style>
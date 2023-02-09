<template>
  <div class="detail">
    <!-- 判断歌单信息是否存在 -->
    <div class="header" ref="headerRef" v-show="songmenuinfo">
      <div class="img">
        <div style="height: 180px; width: 180px">
          <img :src="`${songmenuinfo.coverImgUrl}?param=300y300`" alt="image" />
        </div>
        <div class="info">
          <div class="menu-name">
            <slot name="title_name">
              <span class="info-menu">歌单</span>
              <span>{{ songmenuinfo.name }}</span>
            </slot>
          </div>

          <slot name="alias"></slot>

          <div class="createTime" v-if="songmenuinfo.createTime">
            <slot name="createTime">
              <img
                :src="songmenuinfo.creator.avatarUrl"
                alt=""
                @click="imgClick(songmenuinfo)"
              />
              <a href="javascript:void(0)" @click="imgClick(songmenuinfo)">{{
                songmenuinfo.creator.nickname
              }}</a>
              <span>{{ DateTimeFormat(songmenuinfo.createTime) }}创建</span>
            </slot>
          </div>

          <div class="three">
            <slot name="menu_buttom">
              <el-button
                class="three-items all_play"
                color="red"
                type="primary"
                round
                @click="playClick"
                ><svg class="icon play" aria-hidden="true">
                  <use xlink:href="#icon-playfill-copy-copy"></use>
                </svg>
                播放全部
              </el-button>

              <el-button
                class="three-items"
                color="#F2F2F2"
                plain
                @click="handleSub"
              >
                <el-icon :size="20"><FolderAdd /></el-icon>
                <span>收藏</span>
                ({{ formatNumber(songmenuinfo.subscribedCount) }})
              </el-button>

              <el-button
                class="three-items"
                color="#F2F2F2"
                plain
                @click="handleShare"
                ><el-icon><Share /></el-icon>分享 ({{
                  formatNumber(songmenuinfo.shareCount)
                }})</el-button
              >
              <el-button
                class="three-items"
                color="#F2F2F2"
                plain
                @click="handleDownload"
                ><el-icon><Download /></el-icon>下载全部</el-button
              >
            </slot>
          </div>

          <div class="four" v-show="songmenuinfo.tags.length">
            <span
              >标签:
              <template v-for="item in songmenuinfo.tags" :key="item">
                <a href="javascript:void(0)"> {{ item }} </a>
              </template>
            </span>
          </div>

          <div class="five">
            <slot name="songsCount">
              <span>歌曲: {{ songmenuinfo.trackCount }}</span>
              <span>播放: {{ formatNumber(songmenuinfo.playCount) }}</span>
            </slot>
          </div>

          <!-- <div class="demo-collapse">
            <el-collapse class="el-collapse" accordion>
              <el-collapse-item name="1" title="简介...">
                <div class="text-items">
                  {{ menuInfo.description }}
                </div>
              </el-collapse-item>
            </el-collapse>
          </div> -->
        </div>
      </div>
    </div>
    <div class="main"></div>
  </div>
</template>

<script>
import { playSongMenuList } from '@/hook/playSongMenuList'

import { computed, defineComponent, onMounted, ref, onBeforeMount } from "vue";

// 格式化时间
import { DateTimeFormat } from "@/utils/date-format.js";
// 格式化播放量
import { formatNumber } from "@/utils/formatNumber.js";

import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "songmenudetail",
  components: {},
  props: {
    songmenuinfo: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const headerRef = ref(); 
    console.log(props.songmenuinfo);

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
    // 跳转到歌单创建者页面
    const imgClick = (songmenuinfo) => {
      router.push({
        path: "/profilePage",
        query: {
          id: songmenuinfo.userId,
        },
      });
    };
    // 播放全部
    const playClick = () => {
      playSongMenuList(route.query.id)
    }

    return {
      DateTimeFormat,
      formatNumber,
      headerRef,
      handleSub,
      handleShare,
      handleDownload,
      imgClick,
      playClick
    };
  },
});
</script>

<style lang="less" scoped>
.detail {
  height: 100%;
  margin: 10px 0;
  .header {
    display: flex;
    .img {
      height: 180px;
      display: flex;
      img {
        height: 180px;
        border-radius: 5px;
      }
    }
    .info {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 15px;
      .menu-name {
        display: flex;
        height: 29px;
        align-items: center;
        .info-menu {
          margin-right: 7.5px;
          color: red;
          font-size: 8px;
          padding: 0.5px 2.5px;
          border: 1px red solid;
          border-radius: 3px;
        }
      }
      .createTime {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 5px 0;
        height: 35px;
        font-size: 10px;
        img {
          height: 100%;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 10px;
          cursor: pointer;
        }
        a {
          text-decoration: none;
          margin-right: 10px;
          color: #507daf;
        }
        a:hover {
          color: #0950a0;
        }
      }
      .three {
        display: inline-block;
        height: 30px;
        font-size: 13px;
        .all_play {
          color: white !important;
          .play {
            font-size: 19px;
          }
          span {
            margin-left: 5px;
          }
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
      .four {
        font-size: 10px;
        margin-top: 9px;
        display: flex;
        align-items: flex-end;
        a {
          padding-right: 5px;
          text-decoration: none;
          color: #0b58b0;
        }
      }
      .five {
        font-size: 10px;
        margin-top: 9px;
        display: flex;
        align-items: flex-end;
        span {
          padding-right: 5px;
        }
      }

      .demo-collapse {
        width: 500px;
        .el-collapse {
          border: 0px !important;
        }
      }
    }
  }
  // .el-button:hover {
  //   // border-color: #eee;
  //   // background-color: #f2f2f2;
  // }
  // .el-collapse {
  //   --el-collapse-border-color: white;
  // }
  // .main {
  //   background-color: blue;
  // }
}
</style>

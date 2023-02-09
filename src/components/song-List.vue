<template>
  <div class="song_list">
    <el-table
      :data="songlist"
      stripe
      style="width: 100%"
      @row-dblclick="changeClick"
      :row-style="tabStyle"
      highlight-current-row
      :show-header="showHeader"
      row-class-name="rowClass"
    >
      <el-table-column
        type="index"
        label="序号"
        width="55"
        v-if="isIndexShow"
        class-name="indexColumn"
      >
        <template #default="scoped">
          <!-- 匹配点击下标的index -->
          <template
            v-if="scoped.$index + 1 === songlistindex && isCurrentPlayMusic"
          >
            <!-- 替换序号 -->
            <img :src="img" alt="" class="active_play" />
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="80" v-if="isHandleShow">
        <template #default="scoped">
          <div class="row_handle">
            <div>
              <!-- 喜欢 -->
              <el-tooltip
                class="box-item"
                effect="dark"
                :show-after="500"
                content="喜欢"
                :enterable="false"
                placement="bottom"
                v-if="!likelist.find((item) => item == scoped.row.id)"
              >
                <svg
                  class="icon love"
                  aria-hidden="true"
                  @click="loveClick(scoped.row.id)"
                >
                  <use xlink:href="#icon-Love"></use>
                </svg>
              </el-tooltip>

              <el-tooltip
                class="box-item"
                effect="dark"
                :show-after="500"
                content="取消喜欢"
                :enterable="false"
                placement="bottom"
                v-else
              >
                <svg class="icon dislike" @click="dislike(scoped.row.id)">
                  <use xlink:href="#icon-love-active"></use>
                </svg>
              </el-tooltip>
              <!-- 不喜欢 -->
            </div>

            <div>
              <svg class="icon download" aria-hidden="true">
                <use xlink:href="#icon-download"></use>
              </svg>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="标题"
        min-width="120"
        header-align="left"
      >
        <template #default="scoped">
          <div class="main_column">
            <div class="left_column" v-show="showImg">
              <el-image
                :src="`${scoped.row.songsInfo.picUrl}?param=100y100`"
                alt=""
                class="imageColumn"
              >
              </el-image>

              <span class="san">
                <svg class="icon shanjiao" aria-hidden="true">
                  <use xlink:href="#icon-playfill-copy"></use>
                </svg>
              </span>
            </div>

            <div class="center_column">
              <el-tooltip
                effect="light"
                :content="
                  songlist[scoped.$index].name +
                  (songlist[scoped.$index].alia || '')
                "
                placement="bottom-end"
                :show-after="1000"
              >
                <div class="name_ali">
                  <template
                    v-if="
                      scoped.$index + 1 === songlistindex && isCurrentPlayMusic
                    "
                  >
                    <span style="color: red">
                      {{ songlist[scoped.$index].name }}</span
                    >
                  </template>
                  <template v-else>
                    <span>
                      {{ songlist[scoped.$index].name }}
                    </span>
                  </template>
                  <!-- 别名 -->
                  <span class="aliases" v-if="songlist[scoped.$index].alia">
                    ({{ songlist[scoped.$index].alia }})
                  </span>
                </div>
              </el-tooltip>
            </div>

            <div class="right_column">
              <div class="other">
                <!-- vip -->
                <span v-show="songlist[scoped.$index].fee === 1">
                  <span class="ico vip">VIP</span>
                </span>
                <!-- sq -->
                <span v-show="songlist[scoped.$index].sq != null">
                  <span class="ico sq">SQ</span>
                </span>
                <!-- MV -->
                <span v-show="songlist[scoped.$index].mv != 0">
                  <span class="ico mv">MV</span>
                </span>
                <!-- 无音源 -->
                <span v-show="songlist[scoped.$index].noCopyrightRcmd != null">
                  <span class="ico rcmd">无音源</span>
                  <span
                    v-if="songlist[scoped.$index].noCopyrightRcmd"
                    style="color: #898989"
                  >
                    {{ songlist[scoped.$index].noCopyrightRcmd.typeDesc }}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <!-- 匹配点击下标的index -->
          <!-- 替换名字并指定颜色 -->
        </template>
      </el-table-column>

      <template v-for="items in propList" :key="items.prop">
        <el-table-column v-bind="items" show-overflow-tooltip>
          <template #default="scoped">
            <slot :name="items.slotName" :row="scoped.row">
              <span>{{ scoped.row[items.prop] }}</span>
            </slot>
          </template>
        </el-table-column>
      </template>

      <template #empty>
        <loading />
      </template>

      <template #append>
        <slot name="append"> </slot>
      </template>
    </el-table>

    <el-dialog
      v-model="centerDialogVisible"
      title="该歌曲暂无音源"
      width="30%"
      center
    >
      <span>亲爱的,暂无版权</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false"
            >知道了</el-button
          >
        </span>
      </template>
    </el-dialog>
    <slot class="default_name"> </slot>
  </div>
</template>
<script>
import { computed, defineComponent, ref, watch } from "vue";
import { formatSongTime } from "@/utils/formatSongTime";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { mapMusicInfo } from "@/hook/mapMusicInfo";

import loading from "@/components/loading.vue";

export default defineComponent({
  name: "",
  components: {},
  props: {
    // 是否显示操作
    isHandleShow: {
      type: Boolean,
      default: true,
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true,
    },
    tabStyle: {
      type: Object,
      default: () => {
        return {
          fontSize: "13px",
          height: "40px",
        };
      },
    },
    // 歌曲列表
    songList: {
      type: Array,
      required: true,
    },
    // 是否显示专辑项
    // isAlbumShow: {
    //   type: Boolean,
    //   default: true,
    // },
    // 是否显示下标项
    isIndexShow: {
      type: Boolean,
      default: true,
    },
    // 是否显示图片
    showImg: {
      type: Boolean,
      default: false,
    },
    propList: {
      type: Array,
      default: () => {
        return [
          { prop: "author", label: "歌手", slotName: "author" },
          {
            prop: "album",
            label: "专辑",
            "min-width": "50",
            slotName: "album",
          },
          {
            prop: "time",
            label: "时间",
            align: "right",
            "header-align": "right",
          },
        ];
      },
    },
  },
  emits: ["onhandleClick"],
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    // 弹窗控制
    const centerDialogVisible = ref(false);
    // 当前列表是否存在正在播放的音乐
    const isCurrentPlayMusic = ref(false);

    // 播放图标
    const img = require("../assets/image/activity-play.png");

    // 映射歌曲信息
    const songlist = computed(() => {
      if (props.songList) {
        return mapMusicInfo(props.songList);
      }
    });

    // 监听用户点击歌曲列表
    const changeClick = (row, column) => {
      // 歌曲是否可用
      // store.dispatch("playMusic/isMusicPlay", row.id).then((res) => {
      //   if (!res.success) {
      //     centerDialogVisible.value = true;
      //     return;
      //   }
      // });
      // 将点击的歌曲和当前歌曲列表发送出去
      emit("onhandleClick", row, props.songList);
    };

    // 当前音乐列表的下标
    const songlistindex = ref();
    // 当前歌曲列表
    const songlistcurrent = ref();

    /**突出正在播放的音乐
     * @param {number} currentSongList 当前歌曲列表
     * @param {Object} currentSong 当前播放歌曲
     */
    const actionMusic = (currentSongList, currentSong) => {
      const index = currentSongList.findIndex(
        (item) => item.id === currentSong
      );
      // 拿到查找歌曲的下标
      if (index !== -1) {
        isCurrentPlayMusic.value = true;
        songlistindex.value = index + 1;
      } else {
        isCurrentPlayMusic.value = false;
      }
    };

    watch(
      //监听播放歌曲信息的变化
      () => songlist.value,
      (value) => {
        songlistcurrent.value = value;
        // 查找当前歌曲列表是否存储播放的歌曲
        actionMusic(value, store.state.playMusic.musicInfo.id);
      },
      {
        immediate: true,
      }
    );
    // 监听歌曲切换
    watch(
      () => store.state.playMusic.musicInfo,
      (value) => {
        actionMusic(songlistcurrent.value, value.id);
      }
    );

    // 导入歌曲喜欢hook
    const { likelist, uselike } = require("@/hook/useLike.js");

    // 喜欢此歌曲
    const loveClick = (id) => {
      uselike(id);
    };
    // 取消喜欢的歌曲
    const dislike = (id) => {
      uselike(id, false);
    };

    return {
      changeClick,
      songlist,
      formatSongTime,
      img,
      centerDialogVisible,
      songlistindex,
      isCurrentPlayMusic,
      songlistcurrent,
      likelist,
      loveClick,
      dislike,
    };
  },
});
</script>
<style lang="less">
.el-table {
  --el-table-border-color: 0;
}
</style>


<style lang="less" scoped>
.song_list {
  margin-bottom: 20px;
  .active_play {
    display: flex;
  }
  .row_handle {
    display: flex;
    height: 100%;
    .icon {
      display: flex;
      // padding: 0 10px 0 0;
      padding: 3px;
      font-size: 18px;
    }
    .love {
      position: relative;
      bottom: -2px;
    }
    .love:hover {
      background-color: #f7e0eb;
      border-radius: 50%;
      color: red;
      cursor: pointer;
    }
    .dislike:hover {
      cursor: pointer;
      border-radius: 50%;
      background-color: #f7e0eb;
    }
    .download {
      margin-left: 5px;
    }
  }

  .main_column {
    display: flex;
    align-items: center;
    .left_column {
      position: relative;
      margin-right: 10px;
      .imageColumn {
        height: 60px;
        width: 60px;
        border-radius: 5px;
        vertical-align: middle;
        position: relative;
      }
      .san {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 50%;
        height: 40%;
        width: 40%;
        opacity: 0.9;
      }
      .shanjiao {
        position: absolute;
        font-size: 15px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .center_column {
      display: flex;
      overflow: hidden;
      .name_ali {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .right_column {
      display: flex;
      flex-wrap: nowrap;
      .other {
        min-width: 80px;
      }
    }
  }

  .aliases {
    font-weight: 200;
    margin-left: 5px;
    color: #969797;
  }
  @white: white;
  @bgcolor: red;
  .ico {
    vertical-align: middle;
    margin-left: 10px;
    padding: 0px 2px;
    color: white;
    // border: 2px solid red;
    background-color: @bgcolor;
    border-radius: 4px;
    cursor: pointer;
    zoom: 0.7;
  }
  .rcmd {
    color: @white;
    margin-right: 2px;
    // border: 2px solid #898989;
    background-color: @bgcolor;
  }
}
.el-table {
  --el-table-row-hover-bg-color: #f1f2f3;
  --el-table-current-row-bg-color: #eeeeee;
}
</style>

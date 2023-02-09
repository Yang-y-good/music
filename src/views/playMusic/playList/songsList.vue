<template>
  <div class="songs_lis">
    <div class="layout_right" v-if="songslist.length != 0">
      <lyric-component
        v-if="isShow"
        class="lyric_min"
        :ric="ric"
        :musicInfo="musicInfo"
        :currentplaytime="currentplaytime"
        :scrollPosition="40"
        :styleObject="styleObject"
      >
        <template #music_info>
          <div></div>
        </template>
      </lyric-component>

      <!-- 音量调节 -->
      <el-tooltip
        class="box-item"
        effect="light"
        content="音量"
        placement="top"
      >
        <template #content>
          <div class="slider-demo-block">
            <el-slider
              v-model="value"
              vertical
              height="100px"
              @input="onInput"
              size="small"
            />
          </div>
        </template>
        <img class="img" src="@/assets/image/volume.png" alt="music" />
      </el-tooltip>

      <!-- Tooltip 文字提示 播放列表 抽屉为fasle时渲染-->
      <el-tooltip
        class="box-item"
        effect="light"
        :show-after="1000"
        content="打开歌曲列表"
        placement="top"
        v-if="!drawer"
      >
        <img
          class="img"
          src="@/assets/image/musiclist.png"
          alt="music"
          @click="isdrawer"
        />
      </el-tooltip>
      <!-- Tooltip 文字提示 播放列表 抽屉为true时渲染-->
      <el-tooltip
        class="box-item"
        effect="light"
        :show-after="1000"
        content="关闭歌曲列表"
        placement="top"
        v-else
      >
        <img
          class="img"
          src="@/assets/image/musiclist.png"
          alt="music"
          @click="isdrawer"
        />
      </el-tooltip>

      <!-- 抽屉 -->
      <div>
        <el-drawer
          v-model="drawer"
          :with-header="false"
          :append-to-body="true"
          :z-index="111"
        >
          <div class="title_info">
            <span class="name">当前播放</span>
            <div class="left total">总共{{ songslist.length }}首</div>
            <el-link type="primary" @click="cleanList" class="right"
              >清空列表</el-link
            >
          </div>

          <song-list
            :songList="songslist"
            :isIndexShow="false"
            :isHandleShow="false"
            :showHeader="false"
            :actionIndex="index"
            @onhandleClick="onhandleClick"
            class="test"
            :propList="propList"
          >
            <!-- 歌手 -->
            <template #author="scoped">
              <span
                class="cursorHover"
                >{{ scoped.row.author[0].name }}</span
              >
              <span
                v-if="scoped.row.author[1]"
                class="cursorHover"
              >
                <span> / </span>
                {{ scoped.row.author[1].name }}</span
              >
            </template>
          </song-list>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script setup>
import songList from "@/components/song-List.vue";
import lyricComponent from "@/views/lyric/lyric/lyric-component.vue";
import { mapLyric } from "@/hook/mapLyric";
import { ref, computed, watch, watchEffect, onMounted, reactive } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  musicInfo: {
    type: Object,
    required: true,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
});
const value = ref(100);
const drawer = ref(false);
const store = useStore();
const isfon = ref(true);
const ric = ref();

const propList = [
  { prop: "author", label: "歌手", headerAlign: "left", align: "left", slotName: 'author'},
  { prop: "time", label: "时间", headerAlign: "center", align: "center" },
];
// 歌词字体大小
const styleObject = reactive({
  fontSize: "13px",
});

// 监听歌曲改变
watch(
  () => props.musicInfo,
  (value) => {
    if (value) return;
    store.dispatch("playMusic/getMusicLyric", value.id);
  }
);
// 监听歌词改变
watch(
  () => store.state.playMusic.lyric,
  (value) => {
    if (value) {
      console.log("----------------------");
      ric.value = mapLyric(value.lyric);
    }
  }
);
// 获取歌词当前播放时间
const currentplaytime = computed(() => store.state.playMusic.currentTime);

// 控制抽屉显示
const isdrawer = () => {
  drawer.value = !drawer.value;
};

// 获取歌单列表歌曲
const songslist = computed(() => store.state.songMenu.currentMenuList);

// 清空列表数据
const cleanList = () => {
  store.state.songMenu.currentMenuList = [];
  (store.state.playMusic.index = ""), (store.state.playMusic.musicInfo = {});
  store.state.playMusic.musicUrl = "";
  drawer.value = !drawer.value;
};

// 声音大小进度条实时监听
const onInput = (value) => {
  console.log(value);
  store.state.playMusic.volumeSize = value;
};

// 拿到正在播放音乐的下标
const index = ref();

const onhandleClick = (row) => {
  console.log(row);
  // 发送歌曲信息播放歌曲
  store.dispatch("playMusic/dispatchMusicInfo", row);
  // 点击歌曲的下标
  index.value = row.index;
};
</script>

<style lang="less" scoped >
.songs_lis {
  width: 400px;
  height: 100%;
}
.layout_right {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  .lyric_min {
    height: 100%;
  }
  .title_info {
    height: 65px;
    border-bottom: 2px #eee solid;
  }
  .img {
    cursor: pointer;
    height: 30px;
    vertical-align: middle;
    margin: 0 10px;
  }
}
.name {
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
  color: #333333;
  font-weight: 700;
}
.left {
  float: left;
}
.right {
  margin-top: 15px;
  float: right;
  margin-right: 10px;
}
.total {
  margin: 15px 0 10px 10px;
  font-size: 10px;
  font-weight: 200;
  color: #cccccc;
}

.test {
  margin-bottom: 110px;
}
:deep(.el-drawer.ltr, .el-drawer.rtl) {
  height: 50%;
}
.drawer {
  height: 50%;
  overflow: hidden;
}
</style>

<style lang="less">
</style>
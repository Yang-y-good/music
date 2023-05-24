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
        <el-drawer
          v-model="drawer"
          :with-header="false"
          :append-to-body="true"
          :z-index="111"
        >
        <virList :songslist="songslist" :isdrawer="drawer"/>
        </el-drawer>
      </div>
    </div>
</template>

<script setup>
import songList from "@/components/song-List.vue";
import lyricComponent from "@/views/lyric/lyric/lyric-component.vue";
import virList from "./virList.vue";
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
// 获取歌单列表歌曲
const songslist = computed(() => store.state.songMenu.currentMenuList);

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

// 声音大小进度条实时监听
const onInput = (value) => {
  console.log(value);
  store.state.playMusic.volumeSize = value;
};


</script>

<style lang="less">
.el-drawer.rtl {
  top: 0;
  height: calc(100vh - 100px);
  bottom: 0;
}
</style>

<style lang="less" scoped >
.songs_lis {
  flex: 1;
  height: 100%;
}
.layout_right {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  .lyric_min {
    height: 100%;
    width: 65%;
    text-align: center;
  }
  .img {
    cursor: pointer;
    height: 30px;
    vertical-align: middle;
    margin: 0 10px;
  }
}

</style>

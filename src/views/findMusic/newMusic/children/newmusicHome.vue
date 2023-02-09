<template>
  <div class="newmusic_home">
    <tabs
      :titleLeft="title"
      :currentLeft="currentLeft"
      @handleTitleLeft="handleClick"
    >
      <template #title_right>
        <el-button round class="playAll" @click="playClick">播放全部</el-button>
        <el-button round class="subAll">收藏全部</el-button>
      </template>
    </tabs>

    <template v-if="isShowLoading">
      <song-list
        class="song_list"
        :songList="musicList"
        :showHeader="false"
        :isHandleShow="false"
        :showImg="true"
        @onhandleClick="onclick"
        :tabStyle="tabStyle"
        :propList="proplist"
      >
        <!-- 歌手 -->
        <template #author="scoped">
          <span
            @click="singerClick(scoped.row.author[0].id)"
            class="cursorHover"
            >{{ scoped.row.author[0].name }}</span
          >

          <span
            v-if="scoped.row.author[1]"
            @click="singerClick(scoped.row.author[1].id)"
            class="cursorHover"
          >
            <span> / </span>
            {{ scoped.row.author[1].name }}</span
          >
        </template>

        <!-- 专辑 -->
        <template #album="scoped">
          <span
            @click="albumClick(scoped.row.songsInfo.id)"
            class="cursorHover"
            >{{ scoped.row.album }}</span
          >
        </template>
      </song-list>
    </template>
    <template v-else>
      <loading />
    </template>
  </div>
</template>

<script setup>
import tabs from "@/components/tabs.vue";
import { ref } from "@vue/reactivity";
import { nextTick, onMounted, onUnmounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { mapMusicInfo } from "@/hook/mapMusicInfo";
import songList from "@/components/song-List.vue";
import loading from "@/components/loading.vue";
import { useRouter } from "vue-router";
import { usePlayMusic } from "@/hook/playMusic";
const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const router = useRouter();
const isShowLoading = ref(true);
const tabStyle = {
  cursor: "pointer",
  fontSize: "13px",
  height: "60px",
};

const proplist = [
  { prop: "author", label: "歌手", "min-width": "100", slotName: "author" },
  { prop: "album", label: "专辑", "min-width": "50", slotName: "album" },
  { prop: "time", label: "时间", align: "right" },
];

// 存储全部歌曲
const musicList = ref([]);

// 保存歌曲id
const songId = ref();

const getMusicDetail = (type) => {
  isShowLoading.value = false;
  store.dispatch("recommend/newsong/getNewMusicInfo", type).then((res) => {
    // 将歌曲id转化为数组
    const arr = Array.from(res, (v) => {
      return v.id;
    });
    songId.value = arr[0];
    // 使用歌曲id获取歌曲详情
    store.dispatch("recommend/newsong/getMusicDetail", arr).then((res) => {
      musicList.value = res;
      if (res) {
        isShowLoading.value = true;
      }
    });
  });
};
// 播放全部
const playClick = () => {
  // 通过歌曲id获取歌曲信息并播放
  store.dispatch("playMusic/getMusicInfo", songId.value).then((res) => {
    const { songs } = res;
    const song = mapMusicInfo(songs);
    // 播放歌曲
    store.dispatch("playMusic/dispatchMusicInfo", song[0]);
  });
  // 将全部歌曲加入播放列表
  store.commit("songMenu/CurrentMenuList", musicList.value);
};

// tbas切换
const title = ref([
  { type: "0", name: "全部" },
  { type: "7", name: "华语" },
  { type: "96", name: "欧美" },
  { type: "16", name: "韩国" },
  { type: "8", name: "日本" },
]);

// 点击的当前元素
const currentLeft = ref(title.value[0]);
// 点击触发
const handleClick = (item) => {
  currentLeft.value = item;
  // 点击歌曲的下标
  getMusicDetail(item.type);
};

getMusicDetail(currentLeft.value.type);

const index = ref();
// 监听歌曲的点击事件
const onclick = (row) => {
  console.log("newmusci", row);
  index.value = row.index;
  // 发送歌曲信息播放歌曲
  store.dispatch("playMusic/dispatchMusicInfo", row);
  // 将歌曲添加进播放列表
  store.commit("songMenu/CurrentMenuList", musicList.value);
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
// 跳转到专辑页面
const albumClick = (id) => {
  console.log(id);
  router.push({
    path: "/albumDetailPage",
    query: {
      ids: id,
    },
  });
};
</script>

<style lang="less" scoped>
.cursorHover > span {
  font-weight: 400;
}
.cursorHover:hover {
  cursor: pointer;
  font-weight: 550;
}

.playAll {
  margin-right: 5px;
  background-color: #e80101;
  padding: 3px 10px;
  color: white;
}
.playAll:hover {
  background-color: #cd4747;
}
.song_list {
  margin-top: 10px;
}
</style>
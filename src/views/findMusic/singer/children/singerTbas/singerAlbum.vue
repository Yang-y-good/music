<template>
  <div
    class="singerAlbum"
    v-infinite-scroll="load"
    :infinite-scroll-distance="500"
    :infinite-scroll-delay="1000"
    :infinite-scroll-immediate="false"
    :infinite-scroll-disabled="disabled"
  >
    <template v-if="showloading">
      <div class="hot_top">
        <div class="left">
          <img :src="topimg" alt="top50" />
        </div>
        <div class="right">
          <div class="header">
            <span style="font-weight: 700">热门50首</span>
          </div>
          <songList
            :songList="songs"
            :show-header="false"
            @onhandleClick="onhandleClick"
            :propList="propList"
          >
            <template #append>
              <div class="more" @click="handleMore" v-if="showMore">
                <span>查看全部五十首 ></span>
              </div>
            </template>
          </songList>
        </div>
      </div>
      
      <album-list :albumlist="artistAlbum" />
    </template>
    <template v-else>
      <loading class="loading" />
    </template>

    <!-- 滚动到底部触发 -->
    <loading v-show="isloading" class="loading" />
    <p class="load" v-show="loadingover">已经加载到最底部了...</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import loading from "@/components/loading.vue";
import albumList from "./albumList.vue";

const {
  computed,
  watch,
  ref,
  toRef,
  watchEffect,
  reactive,
  nextTick,
  onMounted,
  onUpdated,
  onBeforeMount,
} = require("@vue/runtime-core");
const { useStore } = require("vuex");
const props = defineProps({
  singerId: {
    typeof: String,
    default: "",
  },
});
const emit = defineEmits();
const store = useStore();
const showMore = ref(true);
const topimg = require("@/assets/image/top50.png");
const route = useRoute();
const showloading = ref(false);

const propList = [
  { prop: "time", label: "时间", headerAlign: "center", align: "center" },
];


// 歌曲点击事件
const onhandleClick = (row, songlist) => {
  // 发送歌曲信息播放歌曲
  store.dispatch("playMusic/dispatchMusicInfo", row);
  // 将歌单所有歌曲添加到播放列表
  store.commit("songMenu/CurrentMenuList", songlist);
};

// 获得热门歌曲
const songlist = computed(() => {
  const result = store.state.recommend.singer.hotSongs
    ? store.state.recommend.singer.hotSongs.slice(0, 10)
    : [];
  return result;
});

const songs = ref();
watch(
  () => songlist.value,
  (value) => {
    songs.value = value;
  },
  {
    immediate: true,
  }
);
// 查看全部歌曲
const handleMore = () => {
  showMore.value = false;
  songs.value.push(...store.state.recommend.singer.hotSongs.slice(10));
  console.log(songs.value);
};

// 请求专辑参数
const album = reactive({
  id: store.state.recommend.singer.singerId,
  limit: 5,
  offset: 0,
});
const artistAlbum = ref(new Map());

const requestAlbum = async (item) => {
  // 请求歌手专辑
  await store.dispatch("recommend/singer/getAlbumList", item).then((res) => {
    // 保存请求的promise对象
    const arr = [];
    // 保存歌手专辑
    const albumitem = [];
    // 请求专辑中的歌曲
    res.forEach((item) => {
      albumitem.push(item);
      arr.push(store.dispatch("recommend/singer/getAlbumContents", item.id));
    });
    // 将保存的promise对象按顺序进行返回
    Promise.all(arr).then((res) => {
      showloading.value = true;
      for (const item in res) {
        // Map保存专辑, key: 专辑信息 value: 专辑歌曲
        artistAlbum.value.set(albumitem[item], res[item].songs);
      }
    });
  });
  return Promise.resolve(200);
};

onMounted(async () => {
  // 歌手id
  album.id = store.state.recommend.singer.singerId;
  // 请求数据
  requestAlbum(album);
});

// 加载数据时显示的动画
const isloading = ref(false);
// 数据全部加载完显示
const loadingover = ref(false);
// 是否禁用滚动条
const disabled = ref(false);
// 没有数据可加载
const more = computed(() => store.state.recommend.singer.more);
// 拷贝请求参数
const newArr = { ...album };
// 重新设置请求偏移
newArr.offset = 5;
// 滚动条到底部触发
const load = async () => {
  console.log("加载更多");
  // 加载数据时显示
  isloading.value = true;
  if (!more.value) {
    // 数据都加载完了禁用无限滚动
    disabled.value = true;
    // 显示提示
    loadingover.value = true;
    // 没了数据时隐藏
    isloading.value = false;
  }
  // 请求新数据
  const result = await requestAlbum(newArr);
  console.log(result);
  // 请求数据成功时
  if (result === 200) {
    // 一次加载五条专辑数据
    newArr.offset += 5;
    console.log(newArr);
  }
};
</script>

<style lang="less" scoped>
.loading {
  margin-bottom: 20px;
}
.load {
  text-align: center;
}
.hot_top {
  display: flex;
  .left {
    display: flex;
    flex-direction: column;
    width: 160px;
    text-align: center;
    margin-right: 20px;
    span {
      display: inline;
      margin-top: 5px;
      font-size: 12px;
    }
    img {
      height: 150px;
      border-radius: 5px;
    }
  }
  .right {
    margin-left: 20px;
    width: 82%;
    .header {
      margin-bottom: 10px;
    }
  }
  .more {
    width: 100%;
    height: 30px;
    background-color: rgb(246, 246, 246);
    span {
      float: right;
      line-height: 30px;
      font-size: 12px;
      margin-right: 15px;
    }
  }
  .more:hover {
    background-color: #fafafa;
  }
}
</style>
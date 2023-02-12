<!-- 使用了虚拟列表进行数据优化 -->
<template>
  <div class="conent-drawer" @scroll="scrollEvent($event)" ref="list">
    <div :style="{ height: listHeight + 'px' }">
      <div class="title_info" v-show="isTitle">
        <span class="name">当前播放</span>
        <div class="left total">总共{{ songslist.length }}首</div>
        <el-link type="primary" class="right" @click="cleanList"
          >清空列表</el-link
        >
      </div>

      <song-list
        :songList="visibleData"
        :isIndexShow="false"
        :isHandleShow="false"
        :showHeader="false"
        @onhandleClick="onhandleClick"
        class="test"
        :propList="propList"
        :style="{ transform: getTransform }"
      >
        <!-- 歌手 -->
        <template #author="scoped">
          <span class="cursorHover">{{ scoped.row.author[0].name }}</span>
          <span v-if="scoped.row.author[1]" class="cursorHover">
            <span> / </span>
            {{ scoped.row.author[1].name }}</span
          >
        </template>
      </song-list>
    </div>
  </div>
</template>

<script setup>
import songList from "@/components/song-List.vue";
import { computed, nextTick, onMounted, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
const props = defineProps({
  songslist: {
    type: Array,
    default: [],
  },
  isdrawer: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits();
const store = useStore();
const propList = [
  {
    prop: "author",
    label: "歌手",
    headerAlign: "left",
    align: "left",
    slotName: "author",
  },
  { prop: "time", label: "时间", headerAlign: "center", align: "center" },
];

// 清空列表数据
const cleanList = () => {
  store.state.songMenu.currentMenuList = [];
  (store.state.playMusic.index = ""), (store.state.playMusic.musicInfo = {});
  store.state.playMusic.musicUrl = "";
  drawer.value = !drawer.value;
};
// 获取dom元素
const list = ref();
//可视区域高度
const screenHeight = ref(50);
//偏移量
const startOffset = ref(0);
//起始索引
const start = ref(0);
//结束索引
const end = ref(null);

// 监听歌曲列表是否打开
watch(
  () => props.isdrawer,
  async (value) => {
    if (value) {
      await nextTick();
      // 滚动到播放音乐的距离
      list.value.scrollTop = store.state.savePosition - 200;
    }
  },
  {
    immediate: true,
  }
);

//获取真实显示列表数据
const visibleData = computed(() =>
  props.songslist.slice(
    start.value,
    Math.min(end.value, props.songslist.length)
  )
);
// watch(
//   () => props.songslist,
//   (value) => {
//     console.log("需要更新数据");
//      console.log(list.value.scrollTop);
//   },
//   {
//     immediate: true,
//   }
// );

//   偏移量对应的style
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`);

//列表总高度
const listHeight = computed(() => props.songslist.length * 40);

//可显示的列表项数
const visibleCount = computed(() => Math.ceil(screenHeight.value / 40));

const setclientHeight = () => {
  console.log("渲染");
  // 设置页面可视高度
  screenHeight.value = list.value.clientHeight;
  // 设置结束索引
  end.value = start.value + visibleCount.value;

  console.log(screenHeight.value);
};
nextTick(setclientHeight);

// 隐藏标题
const isTitle = ref(true);
const scrollEvent = (e) => {
  console.log(list.value.scrollTop);
  //当前滚动位置
  let scrollTop = list.value.scrollTop;
  if (scrollTop > 0) {
    console.log("隐藏");
    isTitle.value = false;
  } else {
    isTitle.value = true;
  }
  //此时的开始索引
  start.value = Math.floor(scrollTop / parseInt(40));
  //此时的结束索引
  end.value = start.value + visibleCount.value + 6;
  //此时的偏移量
  startOffset.value = scrollTop - (scrollTop % 40);
  // console.log(screenHeight.value);
  // console.log(start.value, end.value, startOffset.value);
};

// 播放点击的歌曲
const onhandleClick = (row) => {
  console.log(row);
  // 发送歌曲信息播放歌曲
  store.dispatch("playMusic/dispatchMusicInfo", row);
};
</script>

<style lang="less" scoped>
.conent-drawer {
  height: 100%;
  overflow-x: hidden;
}
.title_info {
  height: 65px;
  border-bottom: 2px #eee solid;
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
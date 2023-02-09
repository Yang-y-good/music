<template>
  <div class="lyric_right">
    <div class="lyric">
      <slot name="music_info">
        <div class="music_info">
          <div class="music_name">
            <span>{{ musicInfo.name }}</span>
            <span>{{ musicInfo.author[0].name }}
              <span v-if="musicInfo.author[1]">/ {{ musicInfo.author[1].name }}</span>- {{ musicInfo.album }}</span
            >
          </div>
        </div>
      </slot>
      <el-scrollbar
        :min-size="40"
        @scroll="scroll"
        ref="scrollbarRef"
        @mousewheel="onMouseWheel"
        class="layscroll"
      >
        <p
          :style="styleObject"
          v-for="(item, index) in ric"
          :key="index"
          :class="{
            p_active:
              currentplaytime >= item.currentTime &&
              currentplaytime <= item.nextTime,
          }"
        >
          {{ item.lyric }}
        </p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
const { ref, reactive } = require("@vue/reactivity");
const { watch } = require("@vue/runtime-core");
const { useStore } = require("vuex");

const props = defineProps({
  // 歌曲信息
  musicInfo: {
    type: Object,
    required: true,
  },
  // 歌词
  ric: {
    type: Object,
    default: () => {},
  },
  // 当前播放时间
  currentplaytime: {
    type: Number,
    default: 0,
  },
  //   滚动条位置
  scrollPosition: {
    type: Number,
    default: 150,
  },
  //   字体大小
  styleObject: {
    type: Object,
    default: () => {},
  },
});

const store = useStore();
// 控制滚动条滚动
const isScroll = ref(true);
// 防抖函数 在一段时间内频繁触发只会执行最后一次
const debounce = (fn, delay) => {
  // 定义定时器，保存上一次的定时器
  let timer = null;
  // 正在执行的函数
  const _debounce = function () {
    // 取消上一次定时器
    if (timer) clearTimeout(timer);
    // 延迟执行
    timer = setTimeout(() => {
      // 外部正在要执行的函数
      fn();
    }, delay);
  };

  return _debounce;
};
// 获取歌词滚动条元素
const scrollbarRef = ref();
// 监听歌词滚动条事件
const scroll = ref();
// 滚动事件
const bar = (scrollLeft, scrollTop) => {
  //   console.log("回到正在播的放歌词");
  isScroll.value = true;
};
// 拿到防抖后的滚动事件
scroll.value = debounce(bar, 2000);

// 监听鼠标滑动事件
const onMouseWheel = () => {
  isScroll.value = false;
};

// 监听歌词样式的滚动
watch(
  () => props.currentplaytime,
  (value) => {
    const p = document.querySelector("p.p_active");
    if (p && p.offsetTop > 50) {
      // 如果鼠标滑动则不会自动进行滚动
      if (isScroll.value) {
        scrollbarRef.value.setScrollTop(
          p.offsetTop - props.scrollPosition || 150
        );
      }
    }
  }
);

// 歌曲发生变化请求歌词
watch(
  () => props.musicInfo,
  (value) => {
    if (!value) return;
    store.dispatch("playMusic/getMusicLyric", value.id);
    // 滚动条重新回到0
    scrollbarRef.value.setScrollTop(0);
  }
);
</script>

<style lang="less" scoped >
.lyric_right {
  width: 60%;
  display: flex;
  align-items: flex-start;
  .lyric {
    // margin-top: 50px;
    height: 100%;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    .music_info {
      width: 100%;
      // height: 100px;
      height: 50%;
      .music_name {
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        & span:nth-child(1) {
          font-size: 30px;
          margin-bottom: 10px;
        }
        & span:nth-child(2) {
          font-size: 12px;
          margin-bottom: 5px;
          font-weight: 300;
          span {
             font-size: 12px;
          }
        }
      }
    }
    .p_active {
      font-size: 20px;
      color: black;
      font-weight: 700;
      z-index: 999;
    }

    .p_active_min {
      font-size: red;
      color: black;
      font-weight: 700;
      z-index: 999;
    }

    .layscroll {
      box-sizing: border-box;
      padding: 10px 0;
      width: 100%;
      // height: calc(100vh - 300px);
      font-size: 15px;
    }
  }
}
</style>
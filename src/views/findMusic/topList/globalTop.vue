<template>
  <div class="global_top">
    <slot name="title"> </slot>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in songlist" :key="item" v-bind="size">
        <div class="items" @click="onEnterMenu(item.id)">
          <div
            class="item_img"
            @mouseover="onmouseover(item)"
            @mouseleave="onmouseleave(item)"
          >
            <el-image
              :src="`${item.coverImgUrl}?param=300y300`"
              alt=""
              class="img"
            >
              <!-- <template #placeholder> <span class="loading"> loading... </span></template> -->
              <template #error>
                <el-icon><Picture /></el-icon>
              </template>
            </el-image>

            <!-- 播放量 -->
            <div class="playCount">
              <el-icon><VideoPlay /></el-icon>
              <span>{{ formatNumber(item.playCount) }}</span>
            </div>
            <svg
              class="icon shanjiao"
              aria-hidden="true"
              v-show="imgid === item.id"
              @click="playMusic($event, item.id)"
            >
              <use xlink:href="#icon-playfill-copy"></use>
            </svg>
          </div>

          <div class="text">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 对播放量进行格式化
import { formatNumber } from "@/utils/formatNumber";
import { playSongMenuList } from "@/hook/playSongMenuList";
import { useRouter } from "vue-router";

const { computed, ref, watch } = require("@vue/runtime-core");
const { useStore } = require("vuex");
const props = defineProps({
  songlist: {
    type: Array,
    required: true,
  },
});

const size = {
  xs: { span: 6 },
  sm: { span: 6 },
  md: { span: 4 },
  lg: { span: 4 },
  xl: { span: 4 },
};

const store = useStore();
const router = useRouter();
const songlistCopy = ref(false);

// 跳转至歌单详情页
const onEnterMenu = (id) => {
  router.push({
    path: "songMenuDetailPage",
    query: {
      id: id,
    },
  });
};

// 鼠标移入的对象
const imgid = ref(0);
// 鼠标移入
const onmouseover = (item) => {
  imgid.value = item.id;
};
// 鼠标移出
const onmouseleave = (item) => {
  imgid.value = 0;
};

// play图标点击事件
const playMusic = (event, id) => {
  // 阻止父元素的点击事件
  event.stopPropagation();
  // 传入歌单id播放歌曲
  playSongMenuList(id);
};
</script>
<style lang="less" scoped>
.title {
  font-weight: 700;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.items {
  margin-bottom: 10px;
  position: relative;
  .item_img {
    // height: 100%;
    position: relative;
    cursor: pointer;
    .img {
      border-radius: 8px;
      max-width: 100%;
      // height: 100%;
      // width: 100%;
      // height: 80%;
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
    .shanjiao {
      position: absolute;
      font-size: 22px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border-radius: 50%;
      padding: 10px;
      animation: icon 1s;
    }

    @keyframes icon {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .text {
    // 只展示俩行文字，多则省略...
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    padding-top: 5px;
    font-size: 13px;
    cursor: pointer;
  }
  .text:hover {
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
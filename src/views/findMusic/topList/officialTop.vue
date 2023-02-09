<template>
  <div class="official_top">
    <p class="title">官方榜</p>
    <div class="content" v-for="(item, index) in songimg" :key="index">
      <div
        class="img"
        @click="onSonglist(item.id)"
        @mouseover="onmouseover(item)"
        @mouseleave="onmouseleave(item)"
      >
        <img :src="`${item.coverImgUrl}?param=200y200`" alt="" />
        <span class="update_time"
          >{{ DateTimeFormat(item.updateTime, "MM月DD日") }}更新</span
        >

        <svg
          class="icon shanjiao"
          aria-hidden="true"
          v-show="imgid === item.id"
          @click="playMusic($event, item.id)"
        >
          <use xlink:href="#icon-playfill-copy"></use>
        </svg>
      </div>

      <div class="song_list" ref="itemRef">
        <div
          class="song"
          v-for="(i, ind) in songlist[index]"
          :key="ind"
          @click="itemClick(index, ind)"
          @dblclick="onPlay(index, ind)"
        >
          <span :class="ind + 1 + 'index'" id="song_index">{{ ind + 1 }}</span>
          <div class="song_name">{{ i.name }}</div>
          <div class="song_author">{{ i.ar[0].name }}</div>
        </div>
        <div class="loading" v-if="isLoading">
          <loading />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DateTimeFormat } from "@/utils/date-format";
import { useRouter } from "vue-router";
import { playSongMenuList } from "@/hook/playSongMenuList";
import { usePlayMusic } from "@/hook/playMusic";
import loading from "@/components/loading.vue";
const { computed, onMounted, watch, ref } = require("@vue/runtime-core");
const { useStore } = require("vuex");

const store = useStore();
const router = useRouter();
// 获取全部歌单
store.dispatch("recommend/toplist/getOfficialTop");

// 显示加载动画
const isLoading = ref(true);

const songimg = ref();
// 获取官方版歌曲榜单
watch(
  () => store.state.recommend.toplist.officialtop,
  (value) => {
    songimg.value = value.slice(0, 4);
  },
  {
    immediate: true,
  }
);
// 获取官方版歌曲榜单部分歌曲
const songlist = ref([]);
watch(
  () => songimg.value,
  () => {
    // 保存请求的promise对象
    const arr = [];
    songimg.value.forEach((item) => {
      arr.push(store.dispatch("recommend/toplist/getSongMenuDetail", item.id));
    });
    // 按顺序输出异步请求
    Promise.all(arr).then((res) => {
      isLoading.value = false;
      for (const item in res) {
        if (res[item]) {
          songlist.value.push(res[item].songs.slice(0, 5));
        }
      }
    });
  }
);
const itemRef = ref();

// 点击改变背景颜色
const itemClick = (index, itemindex) => {
  for (const item in itemRef.value) {
    // 对比父节点
    if (index === parseInt(item)) {
      // 拿到点击的父节点遍历字节点
      for (const k in itemRef.value[index].children) {
        // 对比点击的子节点
        if (itemindex === parseInt(k)) {
          // 给子节点设置背景颜色
          itemRef.value[index].children[k].style.backgroundColor = "#ebebeb";
        } else {
          // 去其他子节点去除背景色
          if (!Object.is(parseInt(k), NaN)) {
            itemRef.value[index].children[k].style.backgroundColor = "";
          }
        }
      }
    } else {
      // 遍历其他父节点的子节点
      for (const k in itemRef.value[item].children) {
        if (!Object.is(parseInt(k), NaN)) {
          // 将其他子节点去除背景色
          itemRef.value[item].children[k].style.backgroundColor = "";
        }
      }
    }
  }
};

// 双击播放歌曲
const onPlay = (parentindex, sonindex) => {
  usePlayMusic(songlist.value[parentindex][sonindex].id);
};

const imgid = ref(0);
// 鼠标移入
const onmouseover = (item) => {
  imgid.value = item.id;
};
// 鼠标移出
const onmouseleave = (item) => {
  imgid.value = 0;
};

// 跳转至歌单详情页
const onSonglist = (id) => {
  router.push({
    path: "songMenuDetailPage",
    query: {
      id,
      index: 3,
    },
  });
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
span[class="1index"] {
  color: red !important;
  font-weight: 700;
}
span[class="2index"] {
  color: red !important;
  font-weight: 700;
}
span[class="3index"] {
  color: red !important;
  font-weight: 700;
}
.official_top {
  .title {
    font-weight: 700;
  }
  .content {
    width: 100%;
    height: 160px;
    margin-bottom: 40px;
    display: flex;
    .img,
    img {
      width: 160px;
      position: relative;
      border-radius: 5px;
      .update_time {
        zoom: 0.9;
        box-sizing: border-box;
        position: absolute;
        font-size: 12px;
        color: white;
        width: 100%;
        text-align: center;
        left: 50%;
        bottom: 20%;
        transform: translate(-50%, -50%);
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
        opacity: 0.8;
        animation: icon 1s;
        cursor: pointer;
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
    .song_list {
      flex: 1;
      display: flex;
      flex-direction: column;
      // padding-left: 20px;
      justify-content: center;
      .song {
        margin-bottom: 10px;
        background-color: #fafafa;
        display: flex;
        height: 50px;
        // justify-content: space-between;
        cursor: pointer;
        margin-left: 20px;
        align-items: center;
        font-size: 12px;
        #song_index {
          margin-right: 10px;
          color: #9c9c9c;
        }
        .song_name {
          flex: 1;
        }
        .song_author {
          text-align: end;
          flex: 1;
          color: #9c9c9c;
        }
      }
      .song:nth-child(2n) {
        background-color: white;
      }
      .song:last-child {
        margin-bottom: 0;
      }
      .loading {
        margin: auto;
      }
    }
  }
}
</style>
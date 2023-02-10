<template>
  <div>
    <template v-if="!songslist.length">
      <el-empty description="暂无音乐" />
    </template>
    <template v-else>
      <song-list :songList="songlist" @onhandleClick="onhandleClick">
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
  </div>
</template>

<script setup>
import songList from "@/components/song-List.vue";
import {
  computed,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import { usePlayMusic } from "@/hook/playMusic";
const props = defineProps({
  songMenuId: {
    type: Number,
    required: true,
  },
});
const router = useRouter();
const store = useStore();
const route = useRoute();
// 请求歌单所有歌曲
const songslist = ref(["undefined"]);
store.dispatch("songMenu/getSongMenuList", props.songMenuId).then((res) => {
  songslist.value = res;
});

onActivated(() => {
  // watch(
  //   () => props.songMenuId,
  //   (value) => {
  //     console.log(value);
  //     store
  //       .dispatch("songMenu/getSongMenuList", value)
  //       .then((res) => {
  //         songslist.value = res;
  //       });
  //   },{
  //     immediate: true
  //   }
  // );

});

// 获取歌单歌曲
const songlist = computed(() => store.state.songMenu.songlist);

onDeactivated(() => {
  console.log("清空数据");

  // store.state.songMenu.songlist = [];
});

// 歌曲点击事件
const onhandleClick = (row) => {
  // usePlayMusic(row.id)
  // 发送歌曲信息播放歌曲
  store.dispatch("playMusic/dispatchMusicInfo", row);

  // 将歌单所有歌曲添加到播放列表
  store.commit("songMenu/CurrentMenuList", songlist.value);
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
// 取消请求
const cancel = computed(() => store.state.cancel);
// 组件销毁
onUnmounted(() => {
  // // 取消请求
  cancel.value();
  // // 清空歌曲列表
  store.state.songMenu.songlist = [];
});
</script>

<style lang="less" scoped>
.cursorHover > span {
  font-weight: 400;
}
.cursorHover:hover {
  cursor: pointer;
  font-weight: 550;
}
</style>
<template>
  <el-scrollbar class="newmusic" ref="elRef" @scroll="onscroll">
    <div class="tabs">
      <div class="newmusic_box" @click="onNewMusci(0)">
        <div
          class="tabs_newmusic"
          :class="{ tbas_public: currentIndex === 0 }"
        ></div>
        <span class="text">新歌速递</span>
      </div>
      <div class="album_box" @click="onAlbum(1)">
        <div
          class="tabs_album"
          :class="{ tbas_public: currentIndex === 1 }"
        ></div>
        <span class="text">新碟上市</span>
      </div>
    </div>
     <!-- v-if="tabsIndex === 4" -->
    <keep-alive exclude="newmusicHome">
     
      <suspense >
        <!-- 具有深层异步依赖的组件 -->
        <component :is="currentIndex ? album : newmusicHome" class="lessen"/>
      </suspense>
    </keep-alive>
  </el-scrollbar>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, defineAsyncComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useScrollPostion } from "@/hook/useScrollPostion";
const newmusicHome = defineAsyncComponent(() =>
  import("./children/newmusicHome.vue")
);
import album from "./children/album.vue";
const store = useStore();
const props = defineProps({});
const emit = defineEmits();
const currentIndex = ref(0);
const tabsIndex = computed(() => store.state.tabsIndex);
const onNewMusci = (value) => {
  console.log("新歌速递");
  currentIndex.value = value;
};
const onAlbum = (value) => {
  console.log("新碟上市", value);
  currentIndex.value = value;
};

const elRef = ref()
// 记录当前页面滚动的位置
const onscroll = useScrollPostion(elRef)

</script>

<style lang="less" scoped>
.text {
  position: absolute;
  font-size: 13px;
  width: 100%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.newmusic {
  height: calc(100vh - 190px);
  box-sizing: border-box;
    overflow-x: hidden;
  .tabs {
    width: 250px;
    margin: 0 auto;
    height: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 1em 1em 1em 1em;
    display: flex;
    .tbas_public {
      background-color: #bbbbbb;
      border-radius: 1em 1em 1em 1em;
      transition: all 0.5s;
      opacity: 1 !important;
    }

    .newmusic_box {
      width: 50%;
      height: 100%;
      display: flex;
      position: relative;
      cursor: pointer;
    }
    .tabs_newmusic {
      width: 100%;
      height: 30px;
    }
    .newmusic_box:hover .tabs_newmusic {
      background-color: #bbbbbb;
      border-radius: 1em 1em 1em 1em;
      opacity: 0.3;
      transition: all 0.5s;
      animation: run 1s ease;
    }

    .album_box {
      width: 50%;
      height: 100%;
      display: flex;
      position: relative;
      cursor: pointer;
    }
    .tabs_album {
      width: 100%;
      height: 30px;
      cursor: pointer;
    }
    .album_box:hover .tabs_album {
      background-color: #bbbbbb;
      border-radius: 1em 1em 1em 1em;
      opacity: 0.3;
      transition: all 0.5s;
    }
  }
}
</style>
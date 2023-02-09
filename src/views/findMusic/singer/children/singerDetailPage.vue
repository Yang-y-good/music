<template>
  <div>
    <el-scrollbar class="singer_detail_page">
      <!-- 歌手信息 -->
      <singer-detail-info />

      <!-- tabs切换 -->
      <main-nav :title="title" @tabIndex="tabHandle">
        <!-- 专辑 -->
        <template #0>
          <suspense v-if="currentIndex === 0">
            <singer-album :singerId="singerId" />
            <template #fallback> <loading /> </template>
          </suspense>
        </template>

        <template #1> </template>

        <!-- 歌手详情 -->
        <template #2>
          <singer-detail :singerId="singerId" />
        </template>
        <!-- 相似歌手 -->
        <template #3>
          <simi-singer :singerId="singerId" />
        </template>
      </main-nav>
      <el-backtop
        :right="50"
        :bottom="110"
        :visibility-height="1000"
        target=".el-scrollbar__wrap"
      />
    </el-scrollbar>
  </div>
</template>

<script setup>
// 歌手信息
import singerDetailInfo from "./singerDetailInfo.vue";

// tabs标签
import mainNav from "@/components/main-nav.vue";

import singerAlbum from "./singerTbas/singerAlbum.vue";
import singerDetail from "./singerTbas/singerDetail.vue";
import simiSinger from "./singerTbas/simiSinger.vue";

import loading from "@/components/loading.vue";

import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const isSongMenuInfo = ref(true);
const title = ref(["专辑", "MV", "歌手详情", "相似歌手"]);
const store = useStore();
const route = useRoute();
const currentIndex = ref(0);
const singerId = ref("");

// 监听歌手id的改变
watch(
  () => route.query.id,
  (value) => {
    // console.log(value);
    singerId.value = value;
    isSongMenuInfo.value = true;
    store.state.recommend.singer.singerId = value;
    // 请求歌手信息
    store.dispatch("recommend/singer/getArtistsInfo", value).then((res) => {
      // 数据请求成功
      if (res === 200) {
        isSongMenuInfo.value = false;
      }
    });
  },
  {
    immediate: true,
  }
);

// tabs栏切换
const tabHandle = (index) => {
  // console.log(index);
  currentIndex.value = index;
};
</script>

<style lang="less" scoped>
.singer_detail_page {
  height: calc(100vh - 150px);
  padding: 0 20px;
  overflow: hidden;
}
.name {
  font-size: 20px;
  font-weight: 700;
}
.alias_tow {
  margin-left: 10px;
}
</style>
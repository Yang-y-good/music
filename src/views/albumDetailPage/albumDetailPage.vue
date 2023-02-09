<template>
    <el-scrollbar class="albumDetail">
      <!-- 专辑信息 -->
      <album-info @changeTitle="handleTitle" />

      <!-- tabs标签页 -->
      <main-nav :title="title" @tabIndex="indexHandel">
        <!-- 专辑歌曲 -->
        <template #0 v-if="currentIndex === 0">
          <album-song-list />
        </template>

        <template #1>
          <publish-comment />

          <suspense v-if="currentIndex === 1">
            <album-comment />
            <!-- 在 #fallback 插槽中显示 “正在加载中” -->
            <template #fallback> <loading /> </template>
          </suspense>
        </template>
      </main-nav>
    </el-scrollbar>
</template>

<script setup>
import albumInfo from "./children/albumInfo.vue";
import mainNav from "@/components/main-nav.vue";
import albumSongList from "./children/albumSongList.vue";
import pbulishComment from "@/components/publishComment.vue";
import albumComment from "./comment/albumComment.vue";

import loading from "@/components/loading.vue";

import { DateTimeFormat } from "@/utils/date-format";
import { computed, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({});
const emit = defineEmits();
const route = useRoute();
const store = useStore();
const router = useRouter();

const title = ref(["歌曲列表", "评论", "专辑详情"]);
// 评论总数
const handleTitle = (commentCount) => {
  title.value[1] = `评论(${commentCount})`;
};

// 当前选中tab
const currentIndex = ref(0);
const indexHandel = (index) => {
  console.log(index);
  currentIndex.value = index;
};
</script>

<style lang="less" scoped>
.albumDetail {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: calc(100vh - 150px);
  overflow-x: hidden;
}
</style>
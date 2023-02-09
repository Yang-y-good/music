<template>
  <div class="album_comment" v-if="loadingComment">
    <comment-components
      :comment="hotComments"
      class="hot_comments"
      @onClickStar="handleStar"
      v-if="commentInfo.offset == 1"
    >
      <template #comment-title v-if="hotComments.length">
        <span class="comment_title">精彩评论({{ hotComments.length }})</span>
      </template>
    </comment-components>

    <span class="comment_title" ref="agocomment">最新评论({{ total }})</span>
    <el-skeleton :loading="isShow" :count="10">
      <template #template>
        <skeleton-comment />
      </template>

      <template #default>
        <comment-components :comment="comment" />
      </template>
    </el-skeleton>

    <el-pagination
      background
      layout="prev, pager, next"
      v-model:currentPage="commentInfo.offset"
      v-model:page-size="commentInfo.limit"
      :total="total"
      class="pagination"
    />
  </div>
  <template v-else>
    <el-empty description="暂无评论" />
  </template>
</template>

<script setup>
import commentComments from "@/components/comment-Components.vue";

import skeletonComment from "@/views/songMenuDetailPage/comment/skeleton-comment.vue";

import { computed, ref, watch } from "@vue/runtime-core";

import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const route = useRoute();
// 获取评论的参数
const commentInfo = ref({ limit: 30, offset: 1 });
const loadingComment = ref(true);

// 请求评论
const getAlbumComment = async (offset) => {
  const result = await store.dispatch("comment/getComment", {
    id: route.query.ids,
    limit: commentInfo.value.limit,
    offset: offset * commentInfo.value.limit,
  });
  if (!result.length) {
    loadingComment.value = false;
  }
};
// 请求专辑评论
await getAlbumComment(0);

// 评论是否显示
const isShow = ref(false);

watch(
  () => commentInfo.value.offset,
  (value) => {
    isShow.value = true;
    getAlbumComment(value - 1);
  }
);

// 热门评论
const hotComments = computed(() => store.state.comment.hotComments);
// 专辑最新评论
const comment = computed(() => store.state.comment.comments);
// 得到总评论数
const total = computed(() => store.state.comment.total);

const handleStar = (item) => {
  console.log(item);
};
watch(
  () => comment.value,
  (value) => {
    if (value) {
      isShow.value = false;
    }
  }
);
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
.comment_title {
  display: block;
  font-weight: 700;
  box-sizing: border-box;
  padding: 0 10px;
}
</style>
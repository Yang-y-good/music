<template>
  <div class="comment" v-if="loadingComment && comments" ref="agocomment">
    <comment-components
      :comment="comments.hotComments"
      class="hot_comments"
      v-if="commentInfo.offset == 1"
    >
      <template #comment-title v-if="comments.hotComments.length">
        <span class="comment_title"
          >精彩评论({{ comments.hotComments.length }})</span
        >
      </template>
    </comment-components>

    <div class="new_comment">
      <span class="comment_title">最新评论({{ comments.total }})</span>
      <el-skeleton :loading="isShow" :count="10">
        <template #template>
          <skeleton-comment />
        </template>

        <template #default>
          <comment-components :comment="comments.comments" />
        </template>
      </el-skeleton>

      <el-pagination
        background
        layout="prev, pager, next"
        v-model:currentPage="commentInfo.offset"
        v-model:page-size="commentInfo.limit"
        :total="comments.total"
        class="pagination"
      />
    </div>
  </div>
</template>

<script setup>
import commentComponents from "@/components/comment-Components.vue";
import skeletonComment from "@/views/songMenuDetailPage/comment/skeleton-comment.vue";

import { ref } from "@vue/reactivity";
import { onMounted, onUpdated, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits(["onClickPlgination"]);
const route = useRoute();
const store = useStore();
// 获取评论的参数
const commentInfo = ref({ limit: 30, offset: 1 });
// 显示评论
const loadingComment = ref(true);
// 评论数据
const comments = ref();
// 评论是否显示
const isShow = ref(false);
// 拿到最顶端的元素
const agocomment = ref();

//请求MV评论
const reqMvComment = async (id, offset) => {
  comments.value = await store.dispatch("video/getMvComment", {
    id: id,
    limit: commentInfo.value.limit,
    offset: offset * commentInfo.value.limit,
  });
  if (!comments.value) {
    loadingComment.value = false;
    return;
  }
  //关闭请求时的效果
  isShow.value = false;
};

// 请求视频评论
const reqVideoComment = async (vid, offset) => {
  comments.value = await store.dispatch("video/getVoideComment", {
    id: vid,
    limit: commentInfo.value.limit,
    offset: offset * commentInfo.value.limit,
  });
  if (!comments.value) {
    loadingComment.value = false;
    return;
  }
  //关闭请求时的效果
  isShow.value = false;
};


// 监听路由参数，请求不同的数据
watch(
  () => route.query,
  (value) => {
    if (value.vid) {
      // 请求视频评论
      reqVideoComment(value.vid, 0);
    } else if (value.mvId) {
      //请求MV评论
      reqMvComment(value.mvId, 0);
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => commentInfo.value.offset,
  (value) => {
    isShow.value = true;
    // 定位到最新评论元素， 发送评论到页面顶端的距离
    emit("onClickPlgination", agocomment.value.offsetTop);
    if (route.query.vid) {
      reqVideoComment(route.query.vid, value - 1);
      return;
    }
    reqMvComment(route.query.id, value - 1);
  }
);
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
.new_comment {
  margin-top: 50px;
}
</style>
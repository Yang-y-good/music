<template>
  <div class="comment" v-if="loadingComment">
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
        <comment-components
          :comment="comment"
          ref="newCommentRef"
          @onClickStar="handleStar"
        >
        </comment-components>
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
import commentComponents from "@/components/comment-Components.vue";
import skeletonComment from "@/views/songMenuDetailPage/comment/skeleton-comment.vue";
import store from "@/store";
import {
  computed,
  ref,
  watch,
  defineExpose,
  nextTick,
  onMounted,
} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useHandleStar } from "@/hook/useHandleStar";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["onClickPlgination"]);
const route = useRoute();

// 获取评论的参数
const commentInfo = ref({ limit: 30, offset: 1 });
// 显示评论
const loadingComment = ref(true);

// 请求评论
const reqComment = async (offset) => {
  const result = await store.dispatch("songMenu/getComment", {
    id: props.id,
    limit: commentInfo.value.limit,
    offset: offset * commentInfo.value.limit,
  });
  if (!result.length) {
    loadingComment.value = false;
  }
};
await reqComment(0);

// 热门评论
const hotComments = computed(() => store.state.songMenu.hotComments);
// 最新评论
const comment = computed(() => store.state.songMenu.comment);
// 拿到评论总数
const total = computed(() => store.state.songMenu.commentTotal);
// 获取最新评论标签dom元素
const agocomment = ref();
// 获取最新评论组件dom元素
const newCommentRef = ref();
// 评论是否显示
const isShow = ref(false);
// 监听分页的点击
const loadingclose = ref();

watch(
  () => commentInfo.value.offset,
  (value) => {
    isShow.value = true;
    // 定位到最新评论元素
    emit("onClickPlgination", newCommentRef.value.commentRef.offsetTop);
    reqComment(value - 1);
  }
);

watch(
  () => comment.value,
  (value) => {
    if (value) {
      isShow.value = false;
    }
  }
);

// 拿到节流的函数
const _throttle = useHandleStar(1000);
// 点赞评论触发
const handleStar = (item) => {
  // 判断评论是否点赞过
  if (!item.liked) {
    _throttle(parseInt(route.query.id), item.commentId, 1, 2, (res) => {
      if (!res) {
        ElMessage({
          message: "点赞失败",
          grouping: true,
          type: "error",
        });
        return;
      }
      ElMessage({
        message: "点赞成功",
        grouping: true,
        type: "success",
      });
      // 点赞成功再次请求评论
      reqComment(commentInfo.value.offset - 1);
    });
  }

  _throttle(parseInt(route.query.id), item.commentId, 0, 2, (res) => {
    if (!res.code === 200) {
      ElMessage({
        message: "操作出错",
        grouping: true,
        type: "error",
      });
      return;
    }
    ElMessage({
      message: "已取消点赞",
      grouping: true,
      type: "success",
    });
    reqComment(commentInfo.value.offset - 1);
  });
};


// 暴露属性
// defineExpose({
//   info,
//   onChange,
// });
</script>

<style lang="less" scoped>
.comment {
  .pagination {
    display: flex;
    justify-content: center;
  }
}
.hot_comments {
  margin-bottom: 20px;
}
.comment_title {
  display: block;
  font-weight: 700;
  box-sizing: border-box;
  padding: 0 10px;
}
</style>
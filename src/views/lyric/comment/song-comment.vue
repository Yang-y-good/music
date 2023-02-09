<template>
  <div class="song_comment" ref="songRef">
    <p class="total_comment" style="width: 50%">全部评论 ({{ total }})</p>
    <el-skeleton :loading="isShow" :count="10" style="width: 50%">
      <!-- 自定义渲染文本 -->
      <template #template>
        <skeleton-comment />
      </template>
      <!-- 真实的渲染 -->
      <template #default>
        <comment-components
          :comment="comment"
          style="width: 50%"
          class="com_component"
          @onClickStar="handleStar"
        >
          <template #replied="scoped">
            <div class="replied" v-if="scoped.rep[0]">
              <span class="name">@{{ scoped.rep[0].user.nickname }}</span>
              <span>: {{ scoped.rep[0].content }}</span>
            </div>
          </template>
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
</template>

<script setup>
import commentComponents from "@/components/comment-Components.vue";
import skeletonComment from "@/views/songMenuDetailPage/comment/skeleton-comment.vue";
const {
  computed,
  ref,
  watch,
  onMounted,
  onUnmounted,
  onActivated,
} = require("@vue/runtime-core");
const { useStore } = require("vuex");
import { useHandleStar } from "@/hook/useHandleStar";
const props = defineProps({});
const emit = defineEmits(["commentPosition"]);
const store = useStore();
const songRef = ref();
// 评论是否显示
const isShow = ref(false);
// 拿到歌曲id
const songId = computed(() => store.state.playMusic.musicInfo.id);
// 获取评论的参数
const commentInfo = ref({ limit: 30, offset: 1 });
// 请求评论
const reqComment = (offset, id) => {
  store.dispatch("playMusic/reqSongComment", {
    id,
    limit: commentInfo.value.limit,
    offset: offset * commentInfo.value.limit,
  });
};

onMounted(() => {
  console.log("object");
});
onUnmounted(() => {
  console.log("onUnmounted");
});
onActivated(() => {
  console.log("onActivated");
});
// 监听歌曲的变化
watch(
  songId,
  (value) => {
    // 重新请求歌曲评论
    reqComment(0, value);
    // 分页重置
    commentInfo.value.offset = 1;
  },
  {
    immediate: true,
  }
);

// 监听分页的点击
watch(
  () => commentInfo.value.offset,
  (value) => {
    isShow.value = true;
    console.log(songRef.value);
    // 重置评论滚动位置
    emit("commentPosition", songRef.value.offsetTop);
    // isShow.value = true
    // 重新请求歌曲评论
    reqComment(value - 1, songId.value);
  }
);
// 拿到评论
const comment = computed(() => store.state.playMusic.comment);
// 拿到总评论数
const total = computed(() => store.state.playMusic.totalComment);
watch(comment, (value) => {
  if (value) isShow.value = false;
});

const _throttle = useHandleStar(500);
// 处理点赞
const handleStar = (item) => {
  console.log(item, songId.value);
  // 判断评论是否点赞过
  if (!item.liked) {
    _throttle(songId.value, item.commentId, 1, 0, (res) => {
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
      reqComment(commentInfo.value.offset - 1, songId.value);
    });
  }

  _throttle(songId.value, item.commentId, 0, 0, (res) => {
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
    reqComment(commentInfo.value.offset - 1, songId.value);
  });
};
</script>

<style lang="less" scoped>
.song_comment {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  .total_comment {
    display: inline-block;
    height: 20px;
    font-size: 15px;
    font-weight: 700;
  }
  .pagination {
    margin: 20px 0;
  }
}
.replied {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  font-weight: 300;
  // background-color: rgb(226, 233, 234);
}
</style>
<template>
  <div class="publish_comment">
    <textarea class="comment_edit" autofocus :maxlength="140"></textarea>
    <div class="comment_icon">
      <div class="comment_left">emoji</div>
      <div class="comment_right">
        <el-button class="btn">评论</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({});
const emit = defineEmits();
</script>

<style lang="less" scoped>
.publish_comment {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 10px;
  .comment_edit {
    height: 80px;
    width: 100%;
    font-size: 12px;
    resize: none;
    outline: none;
  }
  .comment_icon {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    .btn {
      border-radius: 20px;
    }
  }
}
</style>
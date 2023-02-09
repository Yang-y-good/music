<template>
  <div>
    <div class="items">
      <div style="width: 50px; height: 50px">
        <el-skeleton-item
          variant="image"
          style="width: 100%; height: 100%; border-radius: 50%"
        />
      </div>
      <div class="comment_msg">
        <div class="comment_content">
          <el-skeleton-item variant="text"></el-skeleton-item>

          <div class="comment_Replied">
            <el-skeleton-item variant="text"></el-skeleton-item>
          </div>
        </div>

        <div class="comment_create_time">
          <el-skeleton-item
            variant="text"
            style="width: 100px"
          ></el-skeleton-item>
          <div class="comment_icon">
            <div class="comment_star comment_icon_items">
              <el-skeleton-item
                variant="image"
                style="width: 50px"
              ></el-skeleton-item>
            </div>
            <div class="comment_share comment_icon_items">
              <el-skeleton-item
                variant="image"
                style="width: 50px"
              ></el-skeleton-item>
            </div>
            <div class="comment_message comment_icon_items">
              <el-skeleton-item
                variant="image"
                style="width: 50px"
              ></el-skeleton-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({});
const emit = defineEmits();
</script>

<style lang="less" scoped>
.items {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  box-sizing: border-box;
  border-bottom: 1px #eee solid;

  .comment_img {
    width: 50px;
    
    //   background-color: blue;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .comment_msg {
    flex: 1;
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: space-around;
    //   background-color: yellow;
    .comment_content {
      font-size: 0.0889rem;
      margin-bottom: 0.037rem;
      .name {
        color: #5091ca;
        cursor: pointer;
      }
      .comment_Replied {
        margin: 10px;
        padding: 10px;
        box-sizing: border-box;
        background-color: #f5f5f5;
        font-weight: 300;
      }
    }
    .comment_create_time {
      margin-top: 5px;
      color: rgb(179, 170, 170);
      font-size: 0.0889rem;
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      .comment_icon {
        display: flex;
        .comment_icon_items {
          padding: 0 10px;
          border-right: 2px #eee solid;
        }
        img {
          cursor: pointer;
          vertical-align: bottom;
        }
        .comment_message {
          border-right: 0;
        }
      }
    }
  }
}
</style>
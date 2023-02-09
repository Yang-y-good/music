<template>
  <div class="song_menu_info">
    <div class="header">
      <div style="height: 190px">
        <el-skeleton-item
          variant="image"
          style="height: 180px; width: 180px"
        ></el-skeleton-item>
      </div>

      <div class="info">
        <div class="menu-name">
          <el-skeleton-item
            variant="text"
            style="
              margin-right: 7.5px;
              font-size: 8px;
              padding: 0.2px 2.5px;
              border-radius: 3px;
              width: 20px;
            "
          ></el-skeleton-item>
          <el-skeleton-item variant="text"></el-skeleton-item>
        </div>

        <div class="createTime">
          <el-skeleton-item
            variant="image"
            style="
              height: 100%;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
              width: 20px;
            "
          ></el-skeleton-item>
          <el-skeleton-item
            variant="text"
            style="width: 25%; margin-right: 10px"
          ></el-skeleton-item>
          <el-skeleton-item
            variant="text"
            style="width: 25%"
          ></el-skeleton-item>
        </div>

        <div class="three">
          <el-skeleton-item
            variant="button"
            style="
              height: 10%;
              vertical-align: middle;
              padding: 13px;
              font-weight: 550;
              border-radius: 15px;
            "
          ></el-skeleton-item>

          <el-skeleton-item
            variant="button"
            style="
              height: 10%;
              vertical-align: middle;
              padding: 13px;
              margin: 0 10px;
              font-weight: 550;
              border-radius: 15px;
            "
          ></el-skeleton-item>
          <el-skeleton-item
            variant="button"
            style="
              height: 10%;
              vertical-align: middle;
              padding: 13px;
              margin: 0 10px;
              font-weight: 550;
              border-radius: 15px;
            "
          ></el-skeleton-item>
          <el-skeleton-item
            variant="button"
            style="
              height: 10%;
              vertical-align: middle;
              padding: 13px;
              margin: 0 10px;
              font-weight: 550;
              border-radius: 15px;
            "
          ></el-skeleton-item>
          <el-skeleton-item
            variant="button"
            style="
              height: 10%;
              vertical-align: middle;
              padding: 13px;
              font-weight: 550;
              border-radius: 15px;
            "
          ></el-skeleton-item>
        </div>

        <div class="four">
          <el-skeleton-item
            variant="text"
            style="width: 20%"
          ></el-skeleton-item>
        </div>
        <div class="five">
          <el-skeleton-item
            variant="text"
            style="width: 20%"
          ></el-skeleton-item>
        </div>

        <div class="demo-collapse">
          <el-collapse class="el-collapse" accordion>
            <el-skeleton-item
              variant="text"
              style="width: 20%"
            ></el-skeleton-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({});
</script>

<style lang="less" scoped>
.song_menu_info {
  padding-top: 10px;
  .header {
    display: flex;
    .info {
      display: flex;
      height: 80%;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 15px;
      .menu-name {
        display: flex;
        height: 30px;
        align-items: center;
      }
      .createTime {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 5px 0;
        height: 35px;

        font-size: 10px;
      }
      .three {
        display: inline-block;
        height: 30px;
        font-size: 13px;
      }
      .four {
        font-size: 10px;
        margin-top: 9px;
        display: flex;
        align-items: flex-end;
      }
      .five {
        font-size: 10px;
        margin-top: 9px;
        display: flex;
        align-items: flex-end;
      }

      .demo-collapse {
        width: 500px;
        margin-top: 9px;
        .el-collapse {
          border: 0px !important;
        }
      }
    }
  }
}
</style>
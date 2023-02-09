<template>
  <div class="singer_detail_info">
    <detail-components :detailInfo="artists">
      <template #item="{ coverImgUrl, name, alias, album, music, mv }">
        <div class="main">
          <div class="img">
            <img
              v-image="`${coverImgUrl}?param=300y300`"
              alt=""
              :default-img="defaultimg"
            />
          </div>

          <div class="info">
            <div class="name" v-if="name">
              <span>{{ name }}</span>
            </div>

            <div class="alias" v-if="Object.keys(alias).length">
              <span>{{ alias[0] }}</span>
              <span class="alias_tow">{{ alias[1] }}</span>
            </div>

            <el-button class="three_items" color="#F2F2F2" plain>
              <el-icon :size="20"><FolderAdd /></el-icon>
              <span>收藏</span>
            </el-button>

            <div class="count">
              <span>单曲数: {{ music }}</span>
              <span>专辑数: {{ album }}</span>
              <span>MV数: {{ mv }}</span>
            </div>
          </div>
        </div>
      </template>
    </detail-components>
  </div>
</template>

<script setup>
import detailComponents from "@/components/detail-Components.vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
const props = defineProps({});

// 占位图
const defaultimg = require("@/assets/image/loadingImg.jpg");
const store = useStore();
// 拿到歌手信息
const artists = computed(() => {
  const result = store.state.recommend.singer.artist;
  for (const item in result) {
    return [
      {
        coverImgUrl: result.picUrl,
        name: result.name,
        alias: result.alias,
        album: result.albumSize,
        music: result.musicSize,
        mv: result.mvSize,
      },
    ];
  }
});

</script>

<style lang="less" scoped>
.singer_detail_info {
  height: 100%;
  .main {
    display: flex;
    .img {
      height: 180px;
      width: 180px;
      display: flex;
      img {
        border-radius: 5px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      .name {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 15px;
      }
      .alias {
        font-size: 13px;
        margin-bottom: 15px;
        .alias_tow {
          margin-left: 10px;
        }
      }
      .three_items {
        height: 20px;
        width: 100px;
        vertical-align: middle;
        padding: 13px;
        font-weight: 400;
        border: 2px solid #ededed;
        color: #373737;
        border-radius: 15px;
        margin-bottom: 15px;
      }
      .count {
        margin-bottom: 15px;
        span {
          font-size: 13px;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
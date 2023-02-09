<template>
  <!-- 歌单，歌手详情信息 -->
  <el-skeleton animated :loading="Object.keys(detailInfo).length == 0">
    <template #template>
      <skeleton-song-menu-info />
    </template>
    
    <template #default>
      <div v-for="item in detailInfo" :key="item" class="info">
        <slot name="item" v-bind="item"></slot>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup>
import skeletonSongMenuInfo from "@/views/songMenuDetailPage/comment/skeleton-songMenuInfo.vue";
const props = defineProps({
  detailInfo: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.info {
    margin: 10px 0;
}
</style>
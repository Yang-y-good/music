<template>
  <div>
    <recommend-list :songMenuItem="sublist" v-if="sublist.length">
      <template #trackCount="scoped">
        <span class="track_count"> {{ scoped.count }}首 </span>
      </template>
    </recommend-list>
    <div v-else><el-empty description="暂无收藏歌单" /></div>
  </div>
</template>

<script setup>
import recommendList from "@/components/recommend-List.vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
// 获取收藏的歌单
const sublist = computed(() => store.state.login.subMenu);
</script>

<style lang="less" scoped>
.track_count {
  margin-top: 3px;
  font-size: 13px;
  font-weight: 300;
}
</style>
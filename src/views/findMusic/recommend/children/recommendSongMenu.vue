<template>
  <div class="recommend_song_menu">
    <recommend-list :songMenuItem="personalized">
      <template #title>
        <div class="recommend_emnu" @click="onRecommend">
          推荐歌单 <el-icon><ArrowRight /></el-icon>
        </div>
      </template>
    </recommend-list>
  </div>
</template>
<script>
import { defineAsyncComponent, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
// import recommendList from "@/components/recommend-List.vue";
const recommendList = defineAsyncComponent({
  loader: () => import("@/components/recommend-List.vue"),
});
export default defineComponent({
  name: "songMenu",
  components: {
    // recommendList,
  },

  setup() {
    const store = useStore();
    const personalized = ref();
    // 歌单推荐
    store.dispatch("recommend/getpersonalized", 30);
    // 监听并拿到歌单数据
    watch(
      () => store.state.recommend.personalized,
      (value) => {
        personalized.value = value.splice(0, 12);
      }
    );
    // 跳转歌单界面
    const onRecommend = () => {
      store.commit("setTabsIndex", 2);
      console.log("2");
    };
    return {
      personalized,
      onRecommend
    };
  },
});
</script>

<style lang="less">
.recommend_emnu {
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style>

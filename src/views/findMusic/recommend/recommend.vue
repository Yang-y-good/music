<template>
  <el-scrollbar @scroll="onscroll" class="recommend" ref="elRef">
    <banners class="lessen" />
    <recommend-song-menu class="lessen" />
    <new-music class="lessen" />
  </el-scrollbar>
</template>

<script>
import banners from "./children/banners.vue";
import recommendSongMenu from "./children/recommendSongMenu.vue";
import newMusic from "./children/newmusic.vue";
import { defineComponent, onActivated, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useScrollPostion } from "@/hook/useScrollPostion";

export default defineComponent({
  name: "recommend",
  components: {
    banners,
    recommendSongMenu,
    newMusic,
  },

  setup() {
    const store = useStore();

    const router = useRouter();
    const route = useRoute();
    const elRef = ref();
    // 跳转路由保存其位置
    useScrollPostion(elRef);

    return {
      onscroll,
      elRef,
    };
  },
});
</script>
<style lang="less" scoped>
.recommend {
  height: calc(100vh - 200px);
  overflow-x: hidden;
}

</style>

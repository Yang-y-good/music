<template>
  <el-scrollbar @scroll="onscroll" class="song_menu" ref="elRef">
    <song-menu :hotTags="hotTags" :tags="Tags" class="lessen" />
  </el-scrollbar>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import songMenu from "./children/songMenuPage.vue";
import { useScrollPostion } from "@/hook/useScrollPostion";
export default defineComponent({
  name: "songmenu",
  components: {
    songMenu,
  },
  setup(props) {
    const store = useStore();

    console.log("歌单组件加载");
    // 热门歌单分类
    store.dispatch("recommend/songlist/getPlayListHot");
    const hotTags = computed(() => store.state.recommend.songlist.hotTags);
    // 全部歌单分类
    store.dispatch("recommend/songlist/getPlayListCatlist");
    const Tags = computed(() => store.state.recommend.songlist.Tags);

    const elRef = ref();
    // 记录当前页面滚动的位置
    useScrollPostion(elRef);
    // const onscroll = ({ scrollLeft, scrollTop }) => {
    //   // console.log(scrollTop);
    //   store.commit("setkeepAliveViewsScrollPostion", {
    //     routeName: "findmusic",
    //     list: [{ el: elRef, top: scrollTop }],
    //   });
    // };

    return {
      hotTags,
      Tags,
      onscroll,
      elRef,
    };
  },
});
</script>

<style lang="less" scoped>
.song_menu {
  height: 100%;
}
</style>

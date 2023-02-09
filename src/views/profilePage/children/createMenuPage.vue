<template>
  <div
    class="create_menu_page"
    v-infinite-scroll="load"
    :infinite-scroll-distance="500"
    :infinite-scroll-delay="500"
    infinite-scroll-immediate
    :infinite-scroll-disabled="disabled"
  >
    <recommend-list :songMenuItem="playlist" v-if="playlist.length">
      <template #trackCount="scoped">
        <span class="track_count"> {{ scoped.count }}首 </span>
      </template>
    </recommend-list>
    <div v-else>
      <el-empty description="暂无歌单" />
    </div>

    <loading v-show="isloading" class="loading" />
  </div>
</template>

<script setup>
import recommendList from "@/components/recommend-List.vue";
import loading from "@/components/loading.vue";
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";

import { useRoute } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits();
const route = useRoute();
const store = useStore();
// 无限滚动禁用
const disabled = ref(false);
// 加载数据时显示的动画
const isloading = ref(false);

// 请求参数
const tabsObject = reactive({
  id: route.query.id,
  offset: 0,
  limit: 30,
});

// 请求用户歌单
const reqMenu = async (obj) => {
  return store.dispatch("login/getUserPlaylist", obj);
};

await reqMenu(tabsObject);

// 监听用户变化
watch(
  () => route.query.id,
  (value) => {
    store.commit("login/changeCreateList", []);

    tabsObject.id = value;
    reqMenu(tabsObject);
  }
);
// 创建的歌单
const playlist = computed(() => store.state.login.createMenuList);

const load = () => {
  console.log("加载更多...");
  // 每次加载15条数据
  tabsObject.offset += 30;
  isloading.value = true;
  reqMenu(tabsObject).then((res) => {
    console.log(res);
    // 没了数据时隐藏
    isloading.value = false;
    if (!res.more) {
      disabled.value = true;
      ElMessage({
        message: "没有更多数据了",
        grouping: true,
        type: "success",
      });
    }
  });
};
// 组件销毁清空数据
onUnmounted(() => {
  store.commit("login/changeCreateList", []);
});
</script>

<style lang="less" scoped>
.create_menu_page {
  width: 100%;
}
.track_count {
  margin-top: 3px;
  font-size: 13px;
  font-weight: 300;
}
</style>
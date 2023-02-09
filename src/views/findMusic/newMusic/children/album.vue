<template>
  <div class="album">
    <div>
      <tabs
        :titleLeft="titleLeft"
        :titleRight="titleRight"
        :currentLeft="currentLeft"
        :currentRight="currentRight"
        @handleTitleLeft="onTitleLeftClick"
        @handleTitleRight="handleTitleRight"
      />
    </div>
    <template v-if="isShowLoading">
      <loading />
    </template>

    <template v-else>
      <suspense>
        <album-list :weekData="weekData">
          <template #title> 本周新碟 </template>
        </album-list>
        <template #fallback> <loading /> </template>
      </suspense>
      <album-list :weekData="monthData" :year="year" :month="month">
      </album-list>
    </template>

    <template v-if="errorMeaasge">
      <span>数据请求失败，点击按钮重新刷新</span>
      <el-button type="primary" @click="handleError">刷新</el-button>
    </template>

  </div>
</template>

<script setup>
import tabs from "@/components/tabs.vue";
import { ref } from "@vue/reactivity";
import { computed, defineAsyncComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import loading from "@/components/loading.vue";
const albumList = defineAsyncComponent(() =>
  import(/* webpackChunkName: "albumlist" */ "./albumlist.vue")
);
const props = defineProps({});
const emit = defineEmits();
const store = useStore();

const year = ref(2022);
const month = ref(10);

const titleLeft = ref([
  { area: "ALL", name: "全部" },
  { area: "ZH", name: "华语" },
  { area: "EA", name: "欧美" },
  { area: "KR", name: "韩国" },
  { area: "JP", name: "日本" },
]);
const titleRight = ref([
  { type: "hot", name: "热门" },
  { type: "new", name: "全部" },
]);
// 请求发生错误时展示
const errorMeaasge = ref(false)

// 默认请求专辑
const currentLeft = ref(titleLeft.value[0]);

// 是否显示加载组件
const isShowLoading = ref(false);

// 请求新碟数据
const getAlbumList = (parsms) => {
  // 定义一个计时器，300毫秒之内没拿到数据显示加载组件
  const times = setTimeout(() => {
    isShowLoading.value = true;
  }, 300);
  store.dispatch("recommend/newsong/getnewAlbum", parsms).then((res) => {
    // 清除定时器
    clearTimeout(times);
    // 关闭加载组件
    isShowLoading.value = false;
  }).catch((res) =>{
    console.log('数据请求失败------------------');
    isShowLoading.value = false;
    errorMeaasge.value = true
  })
};

// 点击刷新进行重新请求
const handleError = () => {
  getAlbumList(currentLeft.value.area);
  errorMeaasge.value = false
}

// 请求全部新碟
const getAllAlbum = (parsms) => {
  // 定义一个计时器，300毫秒之内没拿到数据显示加载组件
  const times = setTimeout(() => {
    isShowLoading.value = true;
  }, 300);
  store.dispatch("recommend/newsong/getAllAlbum", parsms).then((res) => {
    // 清除定时器
    clearTimeout(times);
    // 关闭加载组件
    isShowLoading.value = false;
  });
};

getAlbumList(currentLeft.value.area);

// 类别点击事件
const onTitleLeftClick = (item) => {
  console.log(item);
  currentLeft.value = item;
  if (currentRight.value.type == "new") {
    getAllAlbum(item.area);
    return;
  } else {
    getAlbumList(item.area);
  }
};

const currentRight = ref(titleRight.value[0]);

// 全部新碟
const handleTitleRight = (item) => {
  const newObj = Object.assign({}, item, currentLeft.value);
  currentRight.value = item;
  console.log(newObj);
  if (newObj.type == "new") {
    getAllAlbum(newObj.area);
    return;
  } else {
    getAlbumList(newObj);
  }
};

const weekData = computed(() => store.state.recommend.newsong.weekData);
const monthData = computed(() => store.state.recommend.newsong.monthData);
</script>

<style lang="less" scoped>
</style>
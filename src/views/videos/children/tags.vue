<template>
    <div class="tabs">
      <category-tabs
        :hotTags="categoryList"
        :tags="groupList"
        :isCategory="isCategory"
        class="padd"
      >
        <template #All>
          <el-button round @click="openAll">
            <span ref="totalMenuRef">全部歌单</span>
            <el-icon><ArrowRight /></el-icon
          ></el-button>
        </template>

        <template #hotTabs="{ id, name }">
          <span :class="{ hot_tags: currentName === name }">
            <span @click="onSwitch(name, id)" class="text">{{ name }}</span>
          </span>
        </template>

        <template #tabsHeadre>
          <span
            class="tag_all"
            :class="{ total_check: currentName === '全部视频' }"
            @click="onTotalMenu('全部视频')"
            >全部视频</span
          >
        </template>

        <template #tags="{ id, name }">
          <div class="tags_select">
            <span
              class="icona"
              :class="{ text_check: currentName === name }"
              @click="onCategory(name, id)"
              >{{ name }}</span
            >
          </div>
        </template>
      </category-tabs>

      <router-view v-slot="{ Component }">
        <keep-alive :include="keepAlive" :exclude="notAliveViews">
          <component :is="Component" :key="$route.meta.title" />
        </keep-alive>
      </router-view>
    </div>

    <!-- <list-video :voideId="hotTagsId" class="lessen" /> -->
</template>

<script setup>
import categoryTabs from "@/components/categoryTabs.vue";
import listVideo from "./listVideo.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const router = useRouter();

const keepAlive = computed(() => store.state.keepAliveViews);
const notAliveViews = computed(() => store.state.notAliveViews);

// 拿到全部歌单dom元素
const totalMenuRef = ref();
// 是否打开全部歌单
const isCategory = ref(false);

// 默认选中的热门歌单
const currentName = computed(() => {
  // 修改全部歌单的文本内容
  totalMenuRef.value.innerHTML = store.state.video.tags.name;
  return store.state.video.tags.name;
});

const categoryList = ref([]);
// 获取视频分类列表
store.dispatch("video/getCategoryList").then((res) => {
  categoryList.value = res;
});
const groupList = ref([]);
// 获取视频标签列表
store.dispatch("video/getGroupList").then((res) => {
  groupList.value = res;
});

// 打开全部歌单
const openAll = () => {
  // 对控制全部歌单显示进行取反
  isCategory.value = !isCategory.value;
};
const hotTagsId = ref();
// 热门标签的点击事件
const onSwitch = (name, id) => {
  hotTagsId.value = id;
  router.push({
    path: "/video/listVideo",
    query: {
      tag: id,
    },
  });
  // 修改当前选中的标签值
  store.commit("video/setTags", { id, name });
};

// // 全部歌单的分类点击事件
const onCategory = (name, id) => {
  hotTagsId.value = id;
  router.push({
    path: "/video/listVideo",
    query: {
      tag: id,
    },
  });
  // 修改当前选中的标签值
  store.commit("video/setTags", { id, name });
  // 关闭全部歌单
  isCategory.value = false;
};

// // 点击选择全部歌单
const onTotalMenu = (name) => {
  // console.log(name);
  hotTagsId.value = 0;
  // 修改当前选中的标签值
  currentName.value = name;
  // 关闭全部歌单
  isCategory.value = false;
  // 修改全部歌单的文本内容
  totalMenuRef.value.innerHTML = name;
};
</script>

<style lang="less" scoped>
.tabs {
  overflow: hidden;
  // height: 100%;
}
.hot_tags {
  color: red;
  background-color: rgba(246, 212, 212, 0.5);
  border-radius: 50%;
}
.text {
  padding: 5px;
}
.total_check {
  padding: 5px 8px;
  border-radius: 50%;
  color: red;
  background-color: rgba(246, 212, 212, 0.5);
}
.icona {
  width: 15%;
  font-weight: 100;
  margin-left: 12px;
}

.tag_all:hover {
  color: red;
  cursor: pointer;
}

// 选中状态
.text_check {
  padding: 5px 8px;
  border-radius: 50%;
  color: red;
  background-color: rgba(246, 212, 212, 0.5);
}

.icona:hover {
  cursor: pointer;
  color: red;
}
</style>
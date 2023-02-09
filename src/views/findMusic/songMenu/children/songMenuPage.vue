<template>
  <div class="tabs_main">
    <div class="tabs_songMenu">
      <div class="tabs_select">
        <el-button round @click="onOpen">
          <span ref="totalMenuRef">全部歌单</span>
          <el-icon><ArrowRight /></el-icon
        ></el-button>
      </div>
      <div class="tabs_check">
        <template v-for="(item, index) in hotTags" :key="index">
          <span
            class="tabs_text"
            @click="onSwitch(index, item)"
            :class="{ tabs_action: currentName === item.name }"
            >{{ item.name }}</span
          >
        </template>
      </div>
    </div>

    <div class="conent" v-show="tags">
      <template v-if="isShowLoading">
        <global-top :songlist="songlist" />
        <el-pagination
          v-if="songlist.length !== 0"
          background
          layout="prev, pager, next"
          :total="total"
          v-model:currentPage="tabsparams.offset"
          v-model:page-size="tabsparams.limit"
          @update:current-page="changeCurrentPage"
          class="pageina"
        />
      </template>

      <template v-else>
        <loading />
      </template>

      <div class="total_Menu" v-show="isCategory">
        <div class="headre" @click="onTotalMenu(tags1.name)">
          <span :class="{ total_check: currentName === tags1.name }">{{
            tags1.name
          }}</span>
        </div>

        <div class="category" v-for="(item, index) in tags2" :key="index">
          <div class="icona">{{ item }}</div>
          <div class="category_select">
            <template v-for="items in tags3" :key="items">
              <div
                class="category_items"
                v-if="items.category == index"
                @click="onCategory(items.name)"
              >
                <span
                  class="text"
                  :class="{ text_check: currentName === items.name }"
                  >{{ items.name }}
                </span>
                <span class="hot" v-if="items.hot">HOT </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, computed, defineAsyncComponent } from "vue";
const { ref, reactive } = require("@vue/reactivity");
const { useStore } = require("vuex");
import loading from "@/components/loading.vue";

const globalTop = defineAsyncComponent(() =>
  import("@/views/findMusic/topList/globalTop.vue")
);

const emit = defineEmits(["update:current-page"]);

const props = defineProps({
  // 热门歌单分类
  hotTags: {
    type: Array,
    default: [],
  },
  // 歌单分类
  tags: {
    type: Array,
    default: [],
  },
});
// 创建store实例
const store = useStore();
// 拿到全部歌单dom元素
const totalMenuRef = ref();
// 是否打开全部歌单
const isCategory = ref(false);
// 当前选中的热门歌单
const currentName = ref();
// 存储获取的标签数据
const tags1 = ref({});
const tags2 = ref({});
const tags3 = ref({});
// 歌单总数
const total = ref(0);
// 请求到的歌单数据
const songlist = ref([]);


/**
 * 歌单网络请求函数
 * {tabsparams} 请求歌单参数
 */
const getHotMenuList = (tabsparams) => {
  // 定义计时器，如果300ms数据没有请求到就显示loading组件
  const times = setTimeout(() => {
    isShowLoading.value = false;
  }, 300);
  store
    .dispatch("recommend/songlist/getHotSongMenu", tabsparams)
    .then((res) => {
      if (res.code == 200) {
        // 清除定时器
        clearInterval(times);
        isShowLoading.value = true;
      }
    });
};


// 监听tbas的变化
watch(
  () => props.tags,
  (value) => {
    console.log(value);
    tags1.value = value[0];
    tags2.value = value[1];
    tags3.value = value[2];
  }
);
// 定义请求歌单的参数
const tabsparams = reactive({
  order: "hot",
  cat: "全部",
  limit: 30,
  offset: 1,
});

//监听分页的点击
const changeCurrentPage = (value) => {
  let params = { ...tabsparams };
  params.offset = value * params.limit;
  
  getHotMenuList(params)
};


// 监听得到请求的歌单数据
watch(
  () => store.state.recommend.songlist.hotSongMenu,
  (value) => {
    total.value = value.total;
    songlist.value = value.playlists;
  }
);

// 是否显示加载中组件
const isShowLoading = ref(true);


// 发送网络请求初始化数据
getHotMenuList(tabsparams)

// 热门标签的点击事件
const onSwitch = (index, item) => {
  // 将选中的标签赋值给当前存储的标签
  currentName.value = item.name;
  // 将选中的标签值赋值给歌单请求参数
  tabsparams.cat = item.name;
  tabsparams.offset = 1;

  // 重新进行歌单请求
  getHotMenuList(tabsparams);

  // 修改全部歌单的文本内容
  totalMenuRef.value.innerHTML = item.name;
};

// 打开全部歌单
const onOpen = () => {
  // 对控制全部歌单显示进行取反
  isCategory.value = !isCategory.value;
};

// 点击选择全部歌单
const onTotalMenu = (name) => {
  console.log(name);
  tabsparams.cat = name;
  tabsparams.offset = 1;
  // 重新发送请求
  getHotMenuList(tabsparams);
  // 关闭全部歌单
  isCategory.value = false;
  // 修改当前选中的标签值
  currentName.value = name;
  // 修改全部歌单的文本内容
  totalMenuRef.value.innerHTML = name;
};

// 全部歌单的分类点击事件
const onCategory = (name) => {
  // 关闭全部歌单
  isCategory.value = false;
  // 修改当前选中的标签值
  currentName.value = name;
  // 给请求参数重新赋值
  tabsparams.cat = name;
  tabsparams.offset = 1;
  // 重新请求
  getHotMenuList(tabsparams);
  // 修改全部歌单的文本内容
  totalMenuRef.value.innerHTML = name;
};

// 拿到当前的tab下标
const tabsIndex = computed(() => store.state.tabsIndex);

// 当滚动条到达底部触发
// const loaad = () => {
//   if (tabsIndex.value === 2) {
//     console.log("加载中...");
//     tabsparams.limit += 12;
//     store.dispatch("recommend/songlist/getHotSongMenu", tabsparams);
//   }
// };
</script>

<style lang="less" scoped>
.tabs_songMenu {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tabs_text {
    padding: 0 10px;
    border-right: 2px pink solid;
    cursor: pointer;
    font-size: 13px;
  }
  .tabs_text:last-child {
    border: 0;
  }
  .tabs_action {
    color: red;
    background-color: rgba(237, 219, 219, 0.3);
    border-radius: 50%;
  }
}

.conent {
  margin-top: 10px;
  margin-bottom: 20px;
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 13px;
}
.total_Menu {
  border: 1px #eee solid;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.3);
  width: 60%;
  min-height: 500px;
  background-color: white;
  position: absolute;
  z-index: 1;
  top: 0;
  display: flex;
  flex-direction: column;

  .headre {
    margin-left: 12px;
    line-height: 60px;
    border-bottom: 2px #eee solid;
    vertical-align: middle;
    cursor: pointer;
    span:hover {
      color: red;
    }
    .total_check {
      padding: 5px 8px;
      border-radius: 50%;
      color: red;
      background-color: rgba(246, 212, 212, 0.5);
    }
  }

  .category {
    display: flex;
    margin-top: 20px;
    .icona {
      width: 15%;
      font-weight: 100;
      margin-left: 20px;
    }
    .category_select {
      flex: 1;
      // background-color: pink;
      .category_items {
        display: inline-block;
        width: 100px;
        height: 40px;
        cursor: pointer;
        .text {
          padding: 5px 8px;
          border-radius: 50%;
        }
        // 选中状态
        .text_check {
          color: red;
          background-color: rgba(246, 212, 212, 0.5);
        }
        .hot {
          zoom: 0.5;
          font-weight: 900;
          position: absolute;
          top: 25;
          color: red;
        }
      }
      .category_items:hover {
        color: red;
      }
    }
  }
}
.pageina {
  display: flex;
  justify-content: center;
}
</style>

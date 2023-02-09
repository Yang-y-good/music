<template>
  <div class="search">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearch"
      :placeholder="placeholder"
      @select="handleSelect"
      select-when-unmatched
      placement="bottom"
    >
      <template #prefix>
        <el-icon class="el-input__icon" @click="handleIconClick">
          <Search />
        </el-icon>
      </template>

      <template #default="{ item }">
        <div class="hot_item">
          <div class="item_index">
            <span :class="item.index + 'index'">{{ item.index }}</span>
          </div>
          <div class="item_content">
            <div class="item_content-top">
              <span :class="item.index + 'value'">{{ item.value }}</span>
              <img :src="item.iconUrl" alt="" class="hot_icon" />
              <span>{{ item.score }}</span>
            </div>
            <div class="item_content-bottom">
              <span>{{ item.content }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { defaultSearch } from "~/network";
import store from "@/store";
const { onMounted, computed } = require("@vue/runtime-core");

const router = useRouter();
const state = ref("");

onMounted(() => {
  // 请求默认关键词
  store.dispatch("search/getDefaultSearch");
  // 请求热搜列表
  store.dispatch("search/getHotSearch");
});
// 得到默认关键词
const placeholder = computed(() => store.state.search.defaultSearch);
// 得到热搜列表
const hotSearch = computed(() => {
  return store.state.search.hotSearch.map((item, index) => {
    return {
      index: index + 1,
      value: item.searchWord,
      iconUrl: item.iconUrl,
      score: item.score,
      content: item.content,
    };
  });
});

// 搜索触发事件
const handleSelect = (item) => {
  // 点击建议搜索
  console.log(item.value);
  if (!item.value) {
    ElMessage({
      message: "请输入内容.",
      grouping: true,
      type: "success",
    });
    return;
  }

  // 判断是有输入值
  item = item.value || placeholder.value;

  // 跳转到搜索界面
  router.push({
    path: "search",
    query: {
      value: item,
    },
  });
};

// 搜索图标触发
const handleIconClick = (item) => {
  state.value = state.value || placeholder.value;
  handleSelect(state);
};

// 搜索关键词
const querySearch = (queryString, cb) => {
  const result = queryString
    ? hotSearch.value.filter(createFilter(queryString))
    : hotSearch.value;
  cb(result);
};


const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
</script>

<style lang="less" scoped>
[class="1index"] {
  color: red;
}
[class="2index"] {
  color: red;
}
[class="3index"] {
  color: red;
}

[class="1value"] {
  font-weight: 700 !important;
}
[class="2value"] {
  font-weight: 700 !important;
}
[class="3value"] {
  font-weight: 700 !important;
}
.el-input__icon {
  cursor: pointer;
  color: white;
}

:deep(.el-input__wrapper) {
  // width: 150px;
  border-radius: 20px !important;
  background-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 0 0 0;
  // color: red !important;
  font-size: 12px;
}
:deep(.el-input__inner) {
  color: white;
}

input {
  color: white;
}
.hot_item {
  display: flex;
  align-items: center;
  height: 40px;
  margin: 3px 0;
  .item_index {
    width: 15px;
    margin-right: 20px;
  }
  .item_content {
    font-size: 10px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    .item_content-top {
      flex: 1;
      display: flex;
      align-items: center;
      span {
        font-weight: 300;
      }
      .hot_icon {
        height: 12px;
        margin: 0 8px;
      }
    }
    .item_content-bottom {
      flex: 1;
      font-weight: 100;
    }
  }
}
</style>
<template>
  <div
    class="singer_home"
    v-infinite-scroll="load"
    :infinite-scroll-distance="300"
    :infinite-scroll-delay="1000"
    :infinite-scroll-disabled="disabled"
    infinite-scroll-immediate
  >
    <div class="singr_search" v-for="(item, key) in total" :key="item">
      <div class="singr_name">
        <span>{{ key }}:</span>
      </div>
      <div class="singer_check">
        <template v-for="items in item" :key="items">
          <div class="singer_area" @click="singerCheck(item, items)">
            <span
              class="area_text"
              :class="{
                areaCheck: items.area == params.area,
                areaCheck1: items.type == params1.type,
                areaCheck2: items.initial == params2.initial,
              }"
              >{{ items.name }}</span
            >
          </div>
        </template>
      </div>
    </div>
    <!-- <loading-status/> -->

    <suspense>
      <template #default>
        <asyncComp :singerList='singerList'/>
      </template>
      <template #fallback>
        <p style="text-align: center">Loading...</p>
      </template>
    </suspense>
    <loading v-show="isloading" class="loading" />
    <p class="load" v-show="loadingover">已经加载到最底部了...</p>
  </div>
</template>

<script setup>
const { reactive, ref } = require("@vue/reactivity");
import { getsonger } from "@/data/songer";
import { useStore } from "vuex";
import { computed, watch } from "@vue/runtime-core";
import { defineAsyncComponent } from "vue";
import loading from "@/components/loading.vue";

const asyncComp = defineAsyncComponent(() => import("./singerList.vue"));

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const temp = ref({
  area: -1,
  type: -1,
  initial: -1,
  offset: 0,
  limit: 30,
});
// 数据初始化
store.dispatch("recommend/singer/getSingerInfo", temp.value);

// 拿到歌手信息
const singerList = computed(() => store.state.recommend.singer.singerInfo);

// 标签数据
const total = getsonger();
// 语种
const params = ref({ area: "-1", name: "全部" });
// 分类
const params1 = ref({ type: "-1", name: "全部" });
// 筛选
const params2 = ref({ initial: "-1", name: "热门" });

// 标签点击事件
const singerCheck = (item, items) => {
  // 判断点击的对象长度
  if (Object.keys(item).length === 6) {
    for (const i in item) {
      if (item[i].area === items.area) {
        params.value = items;
      }
    }
  }
  if (Object.keys(item).length === 4) {
    for (const i in item) {
      if (item[i].type === items.type) {
        params1.value = items;
      }
    }
  }
  if (Object.keys(item).length === 28) {
    for (const i in item) {
      if (item[i].initial === items.initial) {
        params2.value = items;
      }
    }
  }
  console.log({
    area: params.value.area,
    type: params1.value.type,
    initial: params2.value.initial,
  });
  temp.value = {
    area: params.value.area,
    type: params1.value.type,
    initial: params2.value.initial,
    offset: 0,
    limit: 30,
  };
  store.dispatch("recommend/singer/getSingerInfo", temp.value);
};
// 是否禁用滚动条
const disabled = ref(false);
// 加载数据时显示的动画
const isloading = ref(false);
// 数据全部加载完显示
const loadingover = ref(false);
// 滚动条到底部触发
const load = () => {
  console.log("加载更多");
  isloading.value = true;
  // 每次加载30条数据
  temp.value.offset += 30;
  // 拿到新的数据追加到原来的数据里
  store.dispatch("recommend/singer/getscrollInfo", temp.value).then((res) => {
    // 当加载到最底部时
    if (res.length === 0) {
      // 禁用无限滚动
      disabled.value = true;
      // 显示提示
      loadingover.value = true;
      // 没了数据时隐藏
      isloading.value = false;
    }
    // 循环追加数据
    res.forEach((item) => {
      store.state.recommend.singer.singerInfo.push(item);
    });
  });
};
</script>

<style lang="less" scoped>
.singer_home {
  margin-top: 20px;
  .load {
    text-align: center;
  }
}
.singr_search {
  font-size: 14px;
  height: 100%;
  display: flex;
  .singr_name {
    width: 5%;
    display: flex;
  }
  .singer_check {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    .singer_area {
      display: flex;
      text-align: center;
      justify-content: center;
      display: inline-block;
      font-weight: 200;
      height: 40px;
      width: 80px;

      cursor: pointer;
      .area_text {
        padding: 4px 7px;

        border-radius: 50%;
      }
      .areaCheck {
        color: red;
        background-color: rgba(246, 212, 212, 0.5);
      }
      .areaCheck1 {
        color: red;
        background-color: rgba(246, 212, 212, 0.5);
      }
      .areaCheck2 {
        color: red;
        background-color: rgba(246, 212, 212, 0.5);
      }
    }
  }
}
.loading {
  margin-bottom: 20px;
}
</style>
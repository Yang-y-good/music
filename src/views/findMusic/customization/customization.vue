<template>
  <el-scrollbar class="customization" ref="elRef">
    <h5 class="lessen">专属定制</h5>
    <!-- <recommend-list
      :songMenuItem="menuList"
      class="lessen"
      v-infinite-scroll="load"
      :infinite-scroll-distance="300"
      :infinite-scroll-delay="1000"
      infinite-scroll-immediate
    /> -->
  </el-scrollbar>
  <!-- v-infinite-scroll="load"
      :infinite-scroll-distance="300"
      :infinite-scroll-delay="1000"
      infinite-scroll-immediate -->
</template>

<script setup>
import recommendList from "@/components/recommend-List.vue";
const { ref } = require("@vue/reactivity");
const { watch } = require("@vue/runtime-core");
const { useStore } = require("vuex");

// const store = useStore();
// const menuList = ref([]);
// // 歌单推荐
// store.dispatch("recommend/getpersonalized", 30);
// // 监听并拿到歌单数据
// watch(
//   () => store.state.recommend.personalized,
//   (value) => {
//     menuList.value = value;
//     // console.log(menuList.value);
//   }
// );
// let count = 30;
// const load = () => {
//   console.log("加载更多");
//   count += 12;
//   store.dispatch("recommend/getpersonalized", count).then((res) => {
//     console.log(res.result);
//     const newarr = res.result.slice(18)
//     newarr.forEach((item) => {
//       // menuList.value.push(item);
//       store.state.recommend.personalized.push(item)
//     });
//   });
// };
</script>

<style lang="less" scoped>
.lessen {
  margin-bottom: 20px;
}
.customization {
  height: 100%;
  overflow: hidden;
}
</style>

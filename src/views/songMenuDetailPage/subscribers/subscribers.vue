<template>
  <div class="subscribers">
    <div class="items" v-for="item in subsList" :key="item">
      <img :src="item.avatarUrl" alt="img" @click="profileClick(item)" />

      <el-tooltip
        class="box-item"
        effect="light "
        :content="item.nickname"
        placement="right-start"
      >
        <span @click="profileClick(item)">{{ item.nickname }}</span>
      </el-tooltip>
      <svg class="icon" aria-hidden="true">
        <use
          xlink:href="#icon-xingbienan"
          v-if="item.gender === 1"
        ></use>
        <use
          xlink:href="#icon-xingbienv"
          v-if="item.gender === 2"
        ></use>
      </svg>
    </div>
  </div>
  <div v-show="isShow" class="default">
    <el-empty description="暂无收藏者" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const store = useStore();
const router = useRouter();
const isShow = ref(false);
// 请求收藏者信息
store.dispatch("songMenu/getsubscriBers", props.id).then((res) => {
  if (!res.subscribers.length) {
    isShow.value = true;
  }
});
// 拿到收藏者信息
const subsList = computed(() => store.state.songMenu.subscribers);

const profileClick = (item) => {
  console.log(item);
  router.push({
    path: "/profilePage",
    query: {
      id: item.userId,
    },
  });
};
</script>

<style lang="less" scoped>
.subscribers {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  .items {
    min-width: 300px;
    height: 100px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin-right: 10px;
      cursor: pointer;
    }
    span {
      font-size: 13px;
      cursor: pointer;
    }
    span:hover {
      font-weight: 700;
    }
  }
  .default {
    display: flex;
    justify-content: center;
  }
}
</style>
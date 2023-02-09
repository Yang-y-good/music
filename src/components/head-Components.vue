<template>
  <div class="title">
    <div class="left">
      <span class="name" @click="backHome">网易云音乐</span>
      <div class="search">
        <el-button @click="onback" class="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-back1"></use>
          </svg>
        </el-button>
        <el-button @click="onGO" class="back">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qianjin"></use>
          </svg>
        </el-button>
        <search />
      </div>
    </div>
    <div class="right"><login /></div>

  </div>
</template>

<script>
import { defineComponent } from "vue";

import search from "@/views/search/search.vue";
import { useRouter } from "vue-router";
import loading from "./loading.vue";
import login from "@/views/login/login.vue";

export default defineComponent({
  name: "head-Components",
  components: {
    search,
    login,
    loading,
  },
  setup() {
    const router = useRouter();

    const onback = () => {
      router.go(-1);
      console.log(window.history.length);
    };

    const onGO = () => {
      router.go(1);
    };

    const backHome = () => {
      router.push({
        path: '/findmusic'
      })
    }
    return {
      onback,
      onGO,
      backHome
    };
  },
});
</script>

<style lang="less" scoped>
.title {
  height: 50px;
  background-color: #ec4141;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .name {
      cursor: pointer;
      color: white;
      padding: 0 50px;
      font-size: 18px;
      font-family: "Times New Roman", Times, serif;
    }
    .search {
      margin-left: 20px;
      display: flex;
      align-items: center;
      .back {
        cursor: pointer;
        background-color: #d93b3b;
        border: 0;
        padding: 5px 8px;
        border-radius: 50%;
        zoom: 0.8;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  @media only screen and (max-width: 820px) {
    .right {
      display: none;
    }
  }
}
</style>

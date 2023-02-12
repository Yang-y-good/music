<template>
  <div class="common-layout">
    <el-container>
      <el-header class="hader"> <head-components /></el-header>
      <el-container>
        <el-aside width="200px" class="aside"> <nav-menu /></el-aside>
        <el-container>
          <el-main class="main">
            <router-view v-slot="{ Component }">
              <template v-if="Component">
                <keep-alive :include="keepAlive" :exclude="notAliveViews">
                  <component :is="Component" :key="$route.meta.title" />
                </keep-alive>
              </template> </router-view
          ></el-main>
        </el-container>
      </el-container>
      <el-footer class="footer">
        <play-music v-show="flag" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import headComponents from "../components/head-Components.vue";
import playMusic from "./playMusic/play-music.vue";
import navMenu from "../components/nav-Menu.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
export default {
  name: "HomeView",
  components: {
    headComponents,
    navMenu,
    playMusic,
  },
  setup() {
    const store = useStore();
    const keepAlive = computed(() => store.state.keepAliveViews);
    const notAliveViews = computed(() => store.state.notAliveViews);
    const flag = ref(true);
    watch(
      () => store.state.isPlayMusic,
      (value) => {
        flag.value = value;
      },
      {
        immediate: true,
      }
    );
    return {
      keepAlive,
      notAliveViews,
      flag,
    };
  },
};
</script>
<style  lang="less">
.sook-enter-active,
.sook-leave-active {
  transition: opacity 0.15s;
}
.sook-enter,
.sook-leave-to {
  opacity: 0;
}
</style>

<style lang="less" scoped>
.common-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .hader {
    --el-header-padding: 0;
    height: 50px;
  }
  .main {
    height: 100%;
    overflow-x: hidden;
  }
  .footer {
    padding: 0;
    height: 100px;
    width: 100%;
  }
}
// .home {
//   height: 100%;
//   // 隐藏首页滚动条
//   overflow: hidden;
//   .common-layout {
//     height: 100vh;
//     .container_main {
//       height: 100%;
//     }
//     .header {
//       height: 100%;

//     }
//   }
//   .el-header {
//     // --el-header-height: 50px;
//     margin: 0;
//     padding: 0;
//   }
//   .aside {
//     border-right: 2px #eee solid;
//     width: 12%;
//     height: 100vh;
//   }
.el-main {
  --el-main-padding: 0;
  padding-top: 0px;
}
// }
</style>

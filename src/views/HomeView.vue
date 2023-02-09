<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-header>
          <head-components />
        </el-header>
        <el-container class="container_main">
          <el-aside class="aside">
            <nav-menu />
          </el-aside>
          <el-main class="main">
            <!-- 缓存组件 -->
            <!-- 第一种方式 -->
            <!-- <router-view v-slot="{ Component }">
              <keep-alive>
                <component
                  :is="Component"
                  v-if="$route.meta.keepAlive"
                  :key="$route.meta.title"
                />
              </keep-alive>
            </router-view> -->
            <!-- 第二种方式 -->

            <router-view v-slot="{ Component }">
              <template v-if="Component">
                <!-- <transition name="sook" mode="out-in"> -->
                <keep-alive :include="keepAlive" :exclude="notAliveViews">
                  <component :is="Component" :key="$route.meta.title" />
                </keep-alive>
                <!-- App.vue -->
                <!-- 利用缓存的时间戳key 保证页面保鲜 -->
                <!-- <keep-alive :max="5">
                  <component
                    :is="Component"
                    v-if="$route.meta.keepAlive"
                    :key="
                      $route.meta.keepAlive
                        ? kEEP_ALIVE_MAP.get($route.name)
                        : $route.path
                    "
                  />
                </keep-alive>

                <component
                  :is="Component"
                  v-if="!$route.meta.keepAlive"
                  :key="$route.name"
                /> -->
                <!-- </transition> -->
              </template>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import headComponents from "../components/head-Components.vue";
import navMenu from "../components/nav-Menu.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
export default {
  name: "HomeView",
  components: {
    headComponents,
    navMenu,
  },
  setup() {
    const store = useStore();
    const keepAlive = computed(() => store.state.keepAliveViews);
    const notAliveViews = computed(() => store.state.notAliveViews);
    return {
      keepAlive,
      notAliveViews,
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
.home {
  height: 100%;
  // 隐藏首页滚动条
  overflow: hidden;
  .common-layout {
    height: 100%;
    .container_main {
      height: 100%;
    }
  }
  .el-header {
    --el-header-height: 50px;
    margin: 0;
    padding: 0;
  }
  .aside {
    border-right: 2px #eee solid;
    width: 12%;
    height: 100vh;
  }
  .el-main {
    --el-main-padding: 0;
    padding-top: 0px;
  }
}
</style>

<template>
  <el-scrollbar class="profilePage" ref="songMenuRef">
    <div class="sss">
      <div class="profile">
        <profile-detail @watchRequest="isFlag" />
        <!-- 没请求到数据先显示这个 -->
        <div v-if="flag">
          <p class="avatar_loading"></p>
        </div>
      </div>
      <!-- <div v-if="userInfo">还未请求到数据显示的页面</div> -->
      <main-nav :title="tabs" @tabIndex="tabHandle">
        <template #0>
          <suspense v-if="currentIndex === 0">
            <create-menu-page />
            <template #fallback> <loading /> </template>
          </suspense>
        </template>

        <template #1>
          <suspense v-if="currentIndex === 1">
            <sub-menu-page />
            <template #fallback> <loading /> </template>
          </suspense>
        </template>
      </main-nav>
    </div>
  </el-scrollbar>

  <el-backtop
    :right="50"
    :bottom="110"
    :visibility-height="1000"
    target=".el-scrollbar__wrap"
  />
</template>

<script setup>
import profileDetail from "./children/profileDetail.vue";
import mainNav from "@/components/main-nav.vue";
import createMenuPage from "./children/createMenuPage.vue";
import loading from "@/components/loading.vue";
import subMenuPage from "./children/subMenuPage.vue";
import { ref } from "vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
const props = defineProps({});
const emit = defineEmits();

const store = useStore();

const userInfo = computed(() => store.state.login.userInfo);

const flag = ref(true);

const isFlag = (item) => {
  flag.value = item;
};

// tabs切换
const tabs = ref(["创建的歌单", "收藏的歌单", "创建的音乐专栏"]);

const currentIndex = ref(0);
// tabs栏切换
const tabHandle = (index) => {
  console.log(index);
  currentIndex.value = index;
};
</script>

<style lang="less" scoped>
.sss {
  overflow: hidden;
}
.profile {
  margin: 10px 0;
  height: 180px;
  .avatar_loading {
    position: absolute;
    top: 10px;
    margin: 0;
    width: 180px;
    height: 180px;
    border: 2px solid #ece8e7;
    border-radius: 50%;
  }
}
.profilePage {
  height: calc(100vh - 150px);
  overflow: hidden;
  margin: 0 30px;
}
</style>
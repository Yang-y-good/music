<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import playMusic from "./views/playMusic/play-music.vue";
export default defineComponent({
  name: "app",
  components: {
    playMusic,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  overflow: hidden;
}
</style>

<style lang="less">
.el-drawer__body {
  box-shadow: none !important;
  padding: 0px;
}
@media only screen and (min-width: 1920px) {
  .lessen {
    padding: 0 180px;
  }
}

@media screen and (min-width: 1600px) and (max-width: 1920px) {
  .lessen {
    padding: 0 100px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1600px) {
  .lessen {
    padding: 0 80px;
  }
}
@media screen and (min-width: 900px) and (max-width: 1200px) {
  .lessen {
    padding: 0 50px;
  }
}
@media only screen and (max-width: 700px) {
  .lessen {
    padding: 0;
  }
}
</style>

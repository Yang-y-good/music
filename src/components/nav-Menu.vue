<template>
  <div class="menu">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      active-text-color="red"
    >
      <el-menu-item index="1">
        <!-- <span :class="{ span_active: currentIndex === 1 }">发现音乐</span> -->
        <router-link to="/findmusic" active-class="active">
          发现音乐
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/podcast">播客</router-link>
        <!-- <span :class="{ span_active: currentIndex === 2 }">播客</span> -->
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/video/listVideo">视频</router-link>
        <!-- <span :class="{ span_active: currentIndex === 3 }">视频</span> -->
      </el-menu-item>
      <el-menu-item index="4">
        <!-- <router-link to="/findmusic">关注</router-link> -->
        <!-- <span :class="{ span_active: currentIndex === 4 }">关注</span> -->
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "",
  components: {},
  setup() {
    const router = useRouter();
    return {};
  },
});
</script>

<style lang="less" scoped>
// .el-menu-item.is-active {
//   color: black;
//   font-weight: 700;
//   font-size: 16px;
// }
.el-menu-item:hover span {
  width: 100%;
  padding: 20px 0px;
  border-radius: 5px;
  background-color: #f6f6f7;
}
a {
  text-decoration: none;
  width: 100%;
  padding: 20px 0px;
  border-radius: 5px;
  color: black;
}
a.router-link-exact-active {
  font-weight: 700;
  font-size: 16px;
  background-color: #f6f6f7;
}
// a.router-link-active {
//   background-color: #f6f6f7;
// }
a:hover {
  background-color: #f6f6f7;
}
// .span_active {
//   width: 100%;
//   padding: 20px 0px;
//   border-radius: 5px;
//   background-color: #f6f6f7;
// }
.el-menu-item:hover {
  background-color: transparent;
}
.el-menu-item {
  height: 50px !important;
  --el-menu-item-height: 0 !important;
  --el-menu-base-level-padding: 10px;
}
.menu {
  .el-menu {
    border-right: 0px;
  }
}
</style>

<template>
  <div class="login">
    <template v-if="profile">
      <div class="avatar">
        <img :src="profile.avatarUrl" alt=""  @click="handleClick(profile.userId)"/>
      </div>
      <el-dropdown class="el-dro">
        <span class="el_dropdown_link">
          <span>{{ profile.nickname }}</span>
          <el-icon class="el_icon_right">
            <arrow-down v-if="profile" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="font_icon">
        <svg class="icon yifu" aria-hidden="true">
          <use xlink:href="#icon-yifu1"></use>
        </svg>
        <svg class="icon yifu" aria-hidden="true">
          <use xlink:href="#icon-Setting"></use>
        </svg>
        <svg class="icon yifu" aria-hidden="true">
          <use xlink:href="#icon-youxiang"></use>
        </svg>
      </div>
      
    </template>

    <template v-else>
      <div class="avatar">
        <el-avatar :icon="UserFilled" class="icon-user" @click="loginClick" />
      </div>

      <div class="el-dro" @click="loginClick">
        <div class="el_dropdown_link">
          <span>未登陆</span>
          <el-icon class="el_icon_right">
            <arrow-down />
          </el-icon>
        </div>
      </div>

      <div class="font_icon">
        <svg class="icon yifu" aria-hidden="true">
          <use xlink:href="#icon-yifu1"></use>
        </svg>
        <svg class="icon yifu" aria-hidden="true">
          <use xlink:href="#icon-Setting"></use>
        </svg>
        <svg class="icon yifu" aria-hidden="true">
          <use xlink:href="#icon-youxiang"></use>
        </svg>
      </div>
    </template>
  </div>

  <el-dialog v-model="centerDialogVisible" title="退出登录" width="30%" center>
    <span>你确定要退出登录吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logoutHandle">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <teleport to="html">
    <suspense v-if="loginShow">
      <template #default>
        <login-ui @loginshow="handleLogin" />
      </template>
      <template #fallback>
        <teleport to="body">
          <h2 class="loading">
            <loading class="load" loadingColor="white">
              <template #content>
                <span class="loading_text">正在加载登录页，请稍等...</span>
              </template>
            </loading>
          </h2>
        </teleport>
      </template>
    </suspense>
  </teleport>
</template>


<script setup>
import { computed, defineAsyncComponent, ref } from "@vue/runtime-core";
import { UserFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { logout } from "~/network";
import { useRouter } from "vue-router";
const loginUi = defineAsyncComponent(() =>
  import("@/views/login/loginUI.vue" /* webpackChunkName: "loginUI" */)
);
const props = defineProps({});
const store = useStore();
const router = useRouter()
// const loginShow = ref(false);
const loginShow = computed(() => store.state.login.logindialog);
// 检测登录状态
store.dispatch("login/chechLoginStatus");
const profile = computed(() => store.state.login.profile);

// 点击用户登陆
const loginClick = () => {
  console.log(profile.value);
  if (profile.value) return;
  // loginShow.value = !loginShow.value;
  store.commit("login/changelogindialog", !loginShow.value);
};

// 关闭登陆
const handleLogin = (value) => {
  // loginShow.value = value;
  store.commit("login/changelogindialog", value);
};

const centerDialogVisible = ref(false);

// 对话框确定
const exitLogin = () => {
  centerDialogVisible.value = true;
};
// 退出登录
const logoutHandle = () => {
  console.log("退出登录");
  centerDialogVisible.value = false;
  logout().then((res) => {
    if (res.code === 200) {
      window.location.reload();
    }
  });
  store.dispatch("login/chechLoginStatus");
  localStorage.removeItem("cookie");
};

const handleClick = (id) => {
  console.log('object');
  router.push({
    path: '/profilePage',
    query: {
      id
    }
  })
}

</script>
<style lang="less" scoped>
.font_icon {
  width: 200px;
  margin: 0 10px;
  
}
.yifu {
  font-size: 20px;
  margin: 0 10px;
  padding: 0 5px;
  
}
.yifu:hover {
  cursor: pointer;
  font-size: 21px;
}

.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.avatar {
  img {
    cursor: pointer;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.icon-user {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  cursor: pointer;
}
.el-dro {
  padding-left: 15px;
  color: white;
  font-size: 12px;
  vertical-align: middle;
  cursor: pointer;
  .el_dropdown_link {
    display: flex;
    .el_icon_right {
      margin-left: 5px;
    }
  }
}

.loading {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 300px;
  border-top-left-radius: 2em;
  border-bottom-left-radius: 2em;
  border-top-right-radius: 2em;
  border-bottom-right-radius: 2em;
  transform: translate(-50%, -50%);
  background-color: #373737;
  font-size: 15px;
  color: white;
  opacity: 0.9;
  .loading_text {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 0.1037rem;
  }
  .load {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>

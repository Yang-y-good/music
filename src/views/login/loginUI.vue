<template>
  <div class="login">
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="320px"
      draggable
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template #header>
        <div></div>
      </template>
      <div class="login_layout">
        <h1 class="title">扫码登陆</h1>
        <div class="login_img">
          <img :src="loginImg" alt="" class="img" />
          <div class="disabled" ref="disabledRef" style="display: none">
            <span class="disabled_text">二维码已过期</span>
            <el-button type="primary" @click="handleRefresh"
              >点击刷新</el-button
            >
          </div>
        </div>
        <div>
          <span
            >使用
            <a href="https://music.163.com/#/download" class="login_url"
              >网易云音乐App</a
            >扫码登陆</span
          >
        </div>
        <div class="login_other">选择其他登陆模式 ></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
const { ref } = require("@vue/reactivity");
const { watch, onMounted } = require("@vue/runtime-core");
import { useStore } from "vuex";
import { getKey, getLoginImg, checkimg, loginStatus } from "~/network";
const props = defineProps({
  loginShow: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["loginshow"]);
const store = useStore();

const dialogVisible = ref(false);
const loginImg = ref();
const disabledRef = ref();

// 检测二维码扫码状态
const checkimgStatus = (key) => {
  return checkimg(key);
};

let timer;
// 生成登陆二维码
const generateimg = async () => {
  if (timer) clearInterval(timer);
  const { data } = await getKey();
  const {
    data: { qrimg },
  } = await getLoginImg(data.unikey);
  loginImg.value = qrimg;
  dialogVisible.value = true;

  timer = setInterval(async () => {
    const status = await checkimgStatus(data.unikey);
    if (status.code === 800) {
      //   alert("二维码已过期,请重新获取");
      clearInterval(timer);
      //显示遮罩层
      disabledRef.value.style.display = "";
    }
    if (status.code === 801) {
      console.log("等待扫码");
    }
    if (status.code === 802) {
      console.log("待确认");
    }
    if (status.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      //   alert("授权登录成功");
      // 更新登陆状态
      store.dispatch("login/chechLoginStatus");
      // store.dispatch("login/chechLoginStatus", status.cookie);
      //   将cookie存储到本地
      localStorage.setItem("cookie", status.cookie);
      //   关闭窗口
      dialogVisible.value = false;
    }
  }, 3000);
};
// 发送请求
await generateimg();


// 关闭登陆窗口
const handleClose = (done) => {
  console.log("关闭");
  emit("loginshow", false);
  done();
  clearInterval(timer);
};

// 刷新登陆二维码
const handleRefresh = () => {
  console.log("刷新二维码");
  // 重新请求二维码
  generateimg();
  // 关闭遮罩层
  disabledRef.value.style.display = "none";
};
</script>

<style lang="less" scoped>
.login_layout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-weight: 400;
  }
  .login_img {
    margin: 15px 0;
    position: relative;
    height: 180px;
    width: 180px;

    .img {
      position: absolute;
    }
    // 二维码失效遮罩层
    .disabled {
      position: absolute;
      color: white;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.7) no-repeat center;
      .disabled_text {
        margin-bottom: 15px;
      }
    }
  }
  .login_url {
    text-decoration: none;
    color: #0c73c2;
  }
  .login_other {
    margin: 70px 0 30px 0;
    font-size: 12px;
  }
}
</style>
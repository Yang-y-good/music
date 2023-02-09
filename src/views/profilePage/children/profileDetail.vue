<template>
  <div class="profile_detail" v-if="userInfo.profile">
    <div class="avatar" v-if="userInfo.profile">
      <img :src="userInfo.profile.avatarUrl" alt="" />
    </div>
    <div class="info">
      <div class="name">
        {{ userInfo.profile.nickname }}
      </div>
      <div class="icn">
        <span class="level">Lv{{ userInfo.level }} </span>
        <svg class="icon" aria-hidden="true">
          <use
            xlink:href="#icon-xingbienan"
            v-if="userInfo.profile.gender === 1"
          ></use>
          <use
            xlink:href="#icon-xingbienv"
            v-if="userInfo.profile.gender === 2"
          ></use>
        </svg>
      </div>

      <div>
        <span class="line"></span>
      </div>

      <div class="data">
        <div class="data_item">
          <div>{{ userInfo.profile.eventCount }}</div>
          <span class="data_text">动态</span>
        </div>
        <div class="data_item">
          <div>{{ userInfo.profile.follows }}</div>
          <span class="data_text">关注</span>
        </div>
        <div class="data_item">
          <div>{{ userInfo.profile.followeds }}</div>
          <span class="data_text">粉丝</span>
        </div>
      </div>

      <div>
        <span class="other">社交网络</span>
        <span v-if="userInfo.bindings.length < 2" class="signature">
          未绑定
        </span>

        <span v-if="userInfo.bindings[1]" class="signature">
          <span v-if="userInfo.bindings[1].url">
            <svg class="icon" aria-hidden="true">
              <a :href="userInfo.bindings[1].url" target="_blank">
                <use xlink:href="#icon-xinlangweibo-copy"></use>
              </a>
            </svg>
          </span>
        </span>
        <!-- <span  class="signature">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xinlangweibo"></use>
          </svg>
        </span> -->
      </div>

      <div>
        <span class="other">个人介绍:</span>
        <span class="signature">
          <span v-if="!userInfo.profile.signature">暂无介绍</span>
          <span v-else>{{ userInfo.profile.signature }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits(["watchRequest"]);
const route = useRoute();
const store = useStore();
const router = useRouter();
watch(
  () => route.query.id,
  (value) => {
    console.log(route.name);
    // 判断是否为当前路由
    if (route.name == "profilePage") {
      emit("watchRequest", true);
      store.dispatch("login/getUserDetail", value).then((res) => {
        if (res.code === 200) {
          emit("watchRequest", false);
        }
      });
    }
  },
  {
    immediate: true,
  }
);

const userInfo = computed(() => store.state.login.userInfo);
</script>

<style lang="less" scoped>
.profile_detail {
  display: flex;
  height: 180px;
  .avatar {
    height: 100%;
    width: 180px;
    img {
      width: 180px;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #ece8e7;
    }
  }
  .info {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 15px;
    .name {
      font-weight: 700;
      font-size: 20px;
    }
    .icn {
      margin-bottom: 0;
    }
    .icn > span {
      margin-right: 8px;
    }
    .level {
      padding: 2px 4px;
      font-size: 12px;
      border-radius: 45%;

      background-color: #f0f0f0;
    }
    .line {
      display: inline-block;
      width: 100%;
      border: 1px solid #eee;
    }
    .data {
      display: flex;
      .data_item:first-of-type {
        padding-left: 0;
      }
      .data_item {
        padding: 0 24px;
        border-right: 1px solid #e5e5e5;
        .data_text {
          display: inline-block;
          margin-top: 5px;
          font-weight: 200;
          font-size: 13px;
        }
      }
      .data_item:last-child {
        border-right: 0;
      }
    }
    .other {
      font-size: 14px;
    }
    .signature {
      margin-left: 10px;
      font-size: 14px;
      font-weight: 200;
    }
  }
  .info > div {
    margin-bottom: 10px;
  }
  .icon {
    font-size: 18px;
  }
}
</style>
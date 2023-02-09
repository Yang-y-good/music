<template>
  <div class="comment" ref="commentRef">
    <slot name="comment-title"> </slot>
    <div class="comment_items" v-for="item in comment" :key="item.liked">
      <div class="comment_img">
        <img :src="item.user.avatarUrl" alt="" @click="imgClick(item)" />
      </div>

      <div class="comment_msg">
        <div class="comment_content">
          <span class="name" @click="imgClick(item)">{{
            item.user.nickname
          }}</span>
          <span>: {{ item.content }}</span>

          <slot name="replied" :rep=" item.beReplied">
            <div class="comment_Replied" v-if="item.beReplied[0]">
              <span class="name">@{{ item.beReplied[0].user.nickname }}</span>
              <span>: {{ item.beReplied[0].content }}</span>
            </div>
          </slot>
          
        </div>
        <div class="comment_create_time">
          <span>{{ item.timeStr }}</span>
          <div class="comment_icon">
            <div class="comment_star comment_icon_items">
              <img
                src="@/assets/image/star.png"
                alt=""
                @click="onStar(item)"
                v-show="!item.liked"
              />
              <svg
                class="icon"
                aria-hidden="true"
                v-show="item.liked"
                @click="onStar(item)"
              >
                <use xlink:href="#icon-dianzan_kuai"></use>
              </svg>
              {{ item.likedCount }}
            </div>
            <div class="comment_share comment_icon_items" @click="onCancel">
              <img src="@/assets/image/share.png" alt="" />
            </div>
            <div class="comment_message comment_icon_items">
              <img src="@/assets/image/message.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DateTimeFormat } from "@/utils/date-format";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { watch, ref, computed,onMounted } from "vue";
const route = useRoute();
const store = useStore();
const router = useRouter();
const props = defineProps({
  // 评论
  comment: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["onClickStar"]);
const profile = computed(() => store.state.login.profile);
const onStar = (item) => {
  emit("onClickStar", item);
  if (!profile.value) {
    //用户未登录弹出登录框
    store.commit("login/changelogindialog", true);
  }
};
const imgClick = (id) => {
  // console.log(id);
  store.commit('setIslyric', false)
  router.push({
    path: "/profilePage",
    query: {
      id: id.user.userId,
    },
  });
};

const controller = new AbortController();
const onCancel = () => {
  console.log("取消请求");
  controller.abort();
};

const commentRef = ref();

// setTimeout(() => {
//   console.log(commentRef.value.offsetTop);
// }, 0);

defineExpose({
  commentRef,
});
</script>

<style lang="less" scoped>
.icon {
  font-size: 16px;
}
.comment {
  // display: flex;
  width: 100%;

  height: 100%;
  // flex-direction: column;
  .comment_title {
    box-sizing: border-box;
    padding: 0 10px;
  }

  &_items:last-child {
    border-bottom: 0px;
  }
  &_items {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    border-bottom: 1px #eee solid;

    .comment_img {
      width: 50px;
      cursor: pointer;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .comment_msg {
      flex: 1;
      display: flex;
      margin-left: 15px;
      flex-direction: column;
      justify-content: space-around;
      .comment_content {
        font-size: 12px;
        margin-bottom: 5px;
        .name {
          color: #5091ca;
          cursor: pointer;
        }
        .comment_Replied {
          // width: 100%;
          margin: 10px;
          padding: 10px;
          border-radius: 5px;
          background-color: #f5f5f5;
          font-weight: 300;
        }
      }
      .comment_create_time {
        margin-top: 5px;
        color: rgb(179, 170, 170);
        font-size: 12px;
        display: flex;
        font-size: 12px;
        justify-content: space-between;
        .comment_icon {
          display: flex;
          .comment_icon_items {
            padding: 0 10px;
            border-right: 2px #eee solid;
          }
          img {
            cursor: pointer;
            vertical-align: bottom;
          }
          svg {
            cursor: pointer;
            vertical-align: bottom;
          }

          .comment_message {
            border-right: 0;
          }
        }
      }
    }
  }
}
</style>
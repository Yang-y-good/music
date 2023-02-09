<template>
  <div class="tabs">
    <div class="title">
      <div class="title_left">
        <template v-for="(item, index) in titleLeft" :key="index">
          <span
            class="name_text"
            @click="ontitleLeft(item)"
            :class="{ name_text_check: currentLeft === item }"
            >{{ item.name }}</span
          >
        </template>
      </div>

      <slot name="title_right">
        <div class="title_right">
          <template v-for="item in titleRight" :key="item">
            <span
              class="text"
              @click="ontitleRight(item)"
              :class="{ text_check: currentRight === item }"
              >{{ item.name }}</span
            >
          </template>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
const { ref } = require("@vue/reactivity");
const { nextTick } = require("@vue/runtime-core");
const props = defineProps({
  // 左边切换的标题
  titleLeft: {
    type: Array,
    default: [],
  },
  // 右边切换的标题
  titleRight: {
    type: Array,
    default: [],
  },
  // 左边点击的下标
  currentLeft: {
    type: Object,
    default: () => {},
  },
  // 右边点击的下标
  currentRight: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["handleTitleLeft", "handleTitleRight"]);

// 左边tab切换触发
const ontitleLeft = (item) => {
  emit("handleTitleLeft", item);
};
// 右边tab切换触发
const ontitleRight = (item) => {
  emit("handleTitleRight", item);
};
</script>

<style lang="less" scoped>
.tabs {
  .title {
    height: 50px;
    display: flex;
    font-size: 15px;

    align-items: center;
    .title_left {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      .name_text {
        margin-right: 30px;
        cursor: pointer;
      }
      .name_text_check {
        font-weight: 700;
      }
    }
    .title_right {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .text {
        margin-left: 20px;
        padding: 5px 8px;
        cursor: pointer;
      }
      .text:last-child {
        border: 0px;
      }
      .text_check {
        color: red;
        background-color: rgba(246, 212, 212, 0.3);
        border-radius: 50%;
        border-right: 1px #eee solid;
      }
    }
  }
}
</style>
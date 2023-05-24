<template>
  <div class="categorytbas">
    <div class="tabs_songMenu">
      <div class="tabs_select">
        <slot name="All"></slot>
      </div>
      <div>
        <template v-for="(item, index) in hotTags" :key="index">
          <span class="tabs_text">
            <slot name="hotTabs" v-bind="item"></slot>
          </span>
        </template>
      </div>
    </div>

    <div class="conent" v-show="tags">
      <div class="total_Menu" v-if="isCategory">
        
        <div class="headre">
          <slot name="tabsHeadre"> </slot>
        </div>
        <el-scrollbar max-height="400px">
          <div class="category">
            <span
              v-for="(item, index) in tags"
              :key="index"
              class="category_items"
            >
              <slot name="tags" v-bind="item" class="tags_select"></slot>
            </span>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

const props = defineProps({
  // 热门歌单分类
  hotTags: {
    type: Array,
    default: [],
  },
  // 歌单分类
  tags: {
    type: Array,
    default: [],
  },
  // 全部标签
  isCategory: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits();
</script>

<style lang="less" scoped>
.tabs_songMenu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  .tabs_text {
    padding: 0 10px;
    // border-right: 2px pink solid;
    cursor: pointer;
    font-size: 13px;
  }
  .tabs_text:last-child {
    border: 0;
  }
  .tabs_action {
    color: red;
    background-color: rgba(237, 219, 219, 0.3);
    border-radius: 50%;
  }
}

.conent {
  margin-top: 10px;
  // margin-bottom: 20px;
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 13px;
}
.total_Menu {
  border: 1px #eee solid;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.3);
  width: 60%;
  min-height: 500px;
  background-color: white;
  position: absolute;
  z-index: 1;
  top: 0;
  display: flex;
  flex-direction: column;
  .headre {
    margin-left: 12px;
    line-height: 60px;
    border-bottom: 2px #eee solid;
    vertical-align: middle;
    // span:hover {
    //   color: red;
    //   cursor: pointer;
    // }
    // .total_check {
    //   padding: 5px 8px;
    //   border-radius: 50%;
    //   color: red;
    //   background-color: rgba(246, 212, 212, 0.5);
    // }
  }
  .category {
    margin-top: 20px;
    .category_items {
      display: inline-block;
      width: 100px;
      height: 30px;
      margin: 10px 0 10px 5px;
      .icona {
        width: 15%;
        font-weight: 100;
        margin-left: 12px;
      }
      // 选中状态
      .text_check {
        padding: 5px 8px;
        border-radius: 50%;
        color: red;
        background-color: rgba(246, 212, 212, 0.5);
      }
    }
  }
}
</style>
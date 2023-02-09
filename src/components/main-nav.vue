<template>
  <!-- 封装的tab组件，参数title名 -->
  <!-- 动态绑定class 组件是否绝对定位 -->
  <div :class="{ 'main-nav': isfixed }" ref="mainNav">
    <el-tabs v-model="activeIndex" class="demo-tabs" @tab-change="handleClick" >
      <!-- :class="[activeName ? index : 'actionFontSize', '']" -->
      <template v-for="(item, index) in title" :key="index">
        <el-tab-pane :label="item" :name="index">
          <!-- 具名插槽 -->
          <slot :name="index"></slot>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "",
  components: {},
  props: {
    title: {
      type: Array,
      required: true,
    },
    isfixed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["tabIndex"],
  setup(props, {emit}) {
    const store = useStore();
    const mainNav = ref();
    // tab标签下标
    const activeIndex = ref(0);

    // tab点击事件
    const handleClick = (tabIndex, event) => {
      // 记录点击切换的下标
      store.commit("setTabsIndex", tabIndex);
      // 发送事件，记录切换的下标
      emit('tabIndex',tabIndex)
    };

    // 监听tba栏的切换
    watch(
      () => store.state.tabsIndex,
      (value) => {
        activeIndex.value = value;
      }
    );

    return {
      handleClick,
      mainNav,
      activeIndex,
    };
  },
});
</script>

<style lang="less">
.el-tabs__nav-wrap::after {
  height: 0;
}
.el-tabs__item.is-active {
  color: black;
  font-weight: 700;
  font-size: 18px;
  transform: scale(1);
}
.el-tabs__active-bar {
  background-color: red;
}
.main-nav {
  .el-tabs__header {
    padding: 0 20px ;
    z-index: 10;
    position: fixed;
    width: 100%;
    background-color: white;
  }
  .el-tab-pane {
    margin-top: 50px;
  }
  .actionFontSize {
    font-size: 25px;
    color: red;
  }
}
</style>

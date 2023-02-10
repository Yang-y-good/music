<template>
  <div>
    <el-tabs class="demo_tabs" v-model="activeName" @tab-change="handleClick">
      <template v-for="(item, index) in title" :key="index">
        <el-tab-pane :label="item" :name="index"> </el-tab-pane>
      </template>
      <slot name="comp"> </slot>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  tabsComponent: {
    type: Array,
    default: [],
  },
  title: {
    type: Array,
    default: () => {},
  },
});
const emit = defineEmits(["changeTbas"]);

const activeName = ref(0);

const handleClick = (name) => {
  emit("changeTbas", name);
};
</script>

<style lang="less" scoped>
  .demo_tabs {
    padding:  0 20px;
  }
</style>
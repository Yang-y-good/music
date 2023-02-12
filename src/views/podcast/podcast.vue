<template>
  <div class="podcast">
    <virtual-list :listData="count" :itemSize="{ height: '100px' }" />
 
  </div>
</template>

<script setup>
import VirtualList from "./VirtualList.vue";
import { onActivated, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const props = defineProps({});
const emit = defineEmits();
const router = useRouter();
const count = ref([]);

onMounted(() => {
  for (let i = 0; i < 1000; i++) {
    count.value.push({ id: i, value: String(Date.now()) });
  }
  console.log("onMounted");
});
onActivated(() => {
  console.log("缓存");
});
</script>
<style>
</style>

<style lang="less" scoped>
.podcast {
  height: 100vh;
}

</style>
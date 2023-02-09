<template>
  <div>
    <h2>博客</h2>
    <!-- <button @click="more">多级路由</button> -->
    <router-link to="/podcast/test">测试</router-link>
     <router-link to="/podcast/news">新闻</router-link>
    <router-view/>
  </div>
</template>

<script setup>
import { onActivated, onMounted } from "@vue/runtime-core"
import { useRouter } from "vue-router"

const props = defineProps({
})
const emit = defineEmits()
const router = useRouter()
onMounted(() => {
  console.log('onMounted');
})
onActivated(() => {
  console.log('缓存');
})
// const more = () => {
//   router.push({
//     path: 'podcast/test',
//     query: {
//       id: 111
//     }
//   })
// }
</script>

<style lang="less" scoped>
</style>
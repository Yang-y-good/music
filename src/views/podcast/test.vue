<template>
  <button @click="log">{{ msg }}</button>
  <h2>三级路由</h2>
</template>

<script setup>
// 变量
const msg = 'Hello!'

// 函数
function log() {
  console.log(msg)
}
</script>


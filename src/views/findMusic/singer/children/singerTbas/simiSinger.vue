<template>
  <div>
    <singerList :singerList="singerInfo" @tabIndex="handleIndex"/>
  </div>
</template>

<script setup>
import singerList from "../singerList.vue";
import { ref, toRef, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { simiArtist } from "~/network";
import { inject, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
const props = defineProps({
  singerId: {
    typeof: String,
    default: "",
  },
});
const emit = defineEmits();
const route = useRoute();
const store = useStore()
console.log(props.singerId);

const singerInfo = ref([]);

// 请求相似歌手
const getSimiArtist = async (id) => {
  const result = await simiArtist(id);
  singerInfo.value = result.artists;
};

// 监听歌手id的变化
watch(() =>props.singerId,(value) => {
  getSimiArtist(value);
},{
  immediate:true
})

// 相似歌手点击触发
const handleIndex = (id) => {
  console.log(id);
  store.state.recommend.singer.singerId = id
  store.commit("setTabsIndex", 0);

}

</script>

<style lang="less" scoped>
</style>
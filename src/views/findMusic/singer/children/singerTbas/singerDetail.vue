<template>
  <div class="singerDetail">
    <div class="singer_item" v-for="item in introduction" :key="item.id">
      <h3>{{ item.title }}</h3>
      <span v-html="item.txt"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { artistDetail } from "~/network";
const props = defineProps({
  singerId: {
    typeof: String,
    default: "",
  },
});
const emit = defineEmits();

// \n转换成<br/>
const replaceRegex = /(\n\r|\r\n|\r|\n)/g;

const introduction = ref([]);

const getArtistDetail = async (id) => {
  const result = await artistDetail(id);
  // 转换介绍文本格式
  introduction.value = result.introduction.map((item) => {
    return {
      title: item.ti,
      txt: item.txt.replace(replaceRegex, "<br/>"),
    };
  });
};
// 监听歌手id的变化
watch(
  () => props.singerId,
  (value) => {
    getArtistDetail(value);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.singer_item {
  margin-bottom: 20px;
  span {
    font-size: 13px;
    padding-left: 2em;
  }
}
</style>
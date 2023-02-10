<template>
  <el-scrollbar class="video">
    <main-nav :title="title">
      <template #0>
        <tags class="voide_tabs" />
      </template>
    </main-nav>
  </el-scrollbar>
</template>

<script setup>
import mainNav from "@/components/main-nav.vue";
import categoryTabs from "@/components/categoryTabs.vue";
import tags from "./children/tags.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const title = ref(["视频", "MV"]);
</script>

<style lang="less" scoped>
.video {
  padding: 0 20px;
  overflow: hidden;

}
</style>
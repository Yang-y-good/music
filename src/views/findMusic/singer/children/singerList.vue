<template>
  <div class="singer_list">
    <el-row :gutter="20" v-if="singerList.length !== 0">
      <el-col
        :span="4"
        v-for="item in singerList"
        :key="item.id"
        class="col"
        v-bind="size"
      >
        <div class="item" @click="handleClick(item.id)">
          <img
            alt=""
            class="el_img"
            v-image='`${item.img1v1Url}?param=300y300`'
            :default-img="defaultimg"
          />
          <span class="name">{{ item.name }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const { computed, ref, inject } = require("@vue/runtime-core");
const { useStore } = require("vuex");
import loading from "@/components/loading.vue";
import { useRouter } from "vue-router";
const props = defineProps({
  singerList: {
    typeof: Array,
    default: []
  }
});

const emit = defineEmits(['tabIndex'])

const store = useStore();
const size = {
  xs: { span: 8 },
  sm: { span: 6 },
  md: { span: 6 },
  lg: { span: 4 },
  xl: { span: 4 },
};

// 占位图
const defaultimg = require('@/assets/image/loadingImg.jpg')
const router = useRouter()


// 跳转到歌手界面
const handleClick = (id) => {
  emit('tabIndex',id)
  router.push({
    path: '/singerDetailPage',
    query: {
      id
    }
  })
}

</script>

<style lang="less" scoped>
.singer_list {
  .col {
    margin-bottom: 20px;
    .item {
      .el_img {
        height: 80%;
        width: 100%;
        border-radius: 10px;
        cursor: pointer;
      }
      .name {
        font-size: 15px;
      }
    }
  }
}
</style>
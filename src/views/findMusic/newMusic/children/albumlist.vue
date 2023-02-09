<template>
  <div class="album_list" @scroll="onscroll">
    <span class="title" v-if="weekData.length != 0">
      <slot name="title" :text="2" :count="1"> </slot>
    </span>

    <span class="sticky_box" v-if="weekData.length != 0">
      <span class="month">{{ month }}</span>
      <i class="xia" v-if="month"></i>
      <span class="year">{{ year }}</span>
    </span>

    <el-row :gutter="20" class="style_row">
      <template v-for="item in weekData" :key="item">
        <el-col :span="4">
          <div class="album_box">
            <!-- <el-image class="img" :src="`${item.picUrl}?param=300y300`"> -->
            <!-- </el-image> -->
            <img
              v-image="`${item.picUrl}?param=300y300`"
              alt=""
              class="img"
              @click="handleClick(item.id)"
            />
            <span class="name_text">{{ item.name }}</span>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup>
import { onErrorCaptured, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const props = defineProps({
  weekData: {
    type: Array,
    default: [],
  },
  year: {
    type: Number,
    default: undefined,
  },
  month: {
    type: Number,
    default: undefined,
  },
});
const emit = defineEmits();

const router = useRouter()
const handleClick = (id) => {
  console.log(id);
  router.push({
    path: "/albumDetailPage",
    query: {
      ids: id,
    },
  });
};
console.log("本周新碟");
</script>

<style lang='less'>
</style>

<style lang="less" scoped>
.album_list {
  // margin-bottom: 230px;
  .title {
    float: left;
    position: sticky;
    top: 0px;
    width: 2em;
  }
  .sticky_box {
    text-align: center;
    float: left;
    position: sticky;
    top: 0px;
    width: 2em;
    // background-color: #eee;
    .month {
      font-size: 25px;
      font-weight: 700;
    }
    .year {
      color: #676767;
      font-size: 15px;
    }
    .xia {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 5px;
      border-radius: 50%;
      background-color: #d5d6d9;
      // background-image: linear-gradient(#D5D6D9, #D5D6D9);
      // box-shadow: -11px -4px 19px 20px #d5d6d9;
      transform: rotate(-15deg);
      z-index: -1;
      opacity: 0.8;
    }
  }
}

.album_box {
  margin-bottom: 40px;
  .img {
    // height: 100%;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }
  .name_text {
    display: block;
    font-size: 0.1111rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
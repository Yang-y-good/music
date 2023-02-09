<template>
  <div class="banners">
    <el-carousel :interval="5000" type="card" height="200px">
        <el-skeleton animated :loading='isShow'>
          <!-- 自定义渲染 skeleton 模板 -->
        <template #template>
            <el-carousel-item v-for="item in 6" :key="item" class="carousel">
          <el-skeleton-item variant="image" style="width: 100%; height: 240px" />
          <!-- <span class="banner-text">{{ item.typeTitle }}</span> -->
        </el-carousel-item>
        </template>

        <!-- 正在渲染的DOM -->
        <template #default>
        <el-carousel-item v-for="item in banners" :key="item" class="carousel">
          <img :src="item.imageUrl" alt="banner" class="image" />
          <span class="banner-text">{{ item.typeTitle }}</span>
        </el-carousel-item>
        </template>
        </el-skeleton>


    </el-carousel>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "banners",
  components: {},
  setup() {
    const store = useStore();
    const banners = ref();
    const isShow = ref(true)
    // 请求轮播图数据
    store.dispatch("recommend/getbanner");
    // 监听并拿到轮播图数据
    watch(
      () => store.state.recommend.banners,
      (value) => {
        banners.value = store.state.recommend.banners;
        // console.log(value.length);
        if(value.length !== 0){
          isShow.value = false
        }
      }
    );

    return {
      banners,
      isShow
    };
  },
});
</script>

<style lang="less" scoped>
.banners {
  .image {
    width: 100%;
    height: 100%;
  }
  .carousel {
    border-radius: 10px;
  }
  .banner-text {
    color: red;
    z-index: 999;
  }
}

// element-plus
// .demo-image__error .block {
//   padding: 30px 0;
//   text-align: center;
//   border-right: solid 1px var(--el-border-color);
//   display: inline-block;
//   width: 100%;
//   box-sizing: border-box;
//   vertical-align: top;
// }
// .demo-image__error .demonstration {
//   display: block;
//   color: var(--el-text-color-secondary);
//   font-size: 14px;
//   margin-bottom: 20px;
// }
// .demo-image__error .el-image {
//   padding: 0 5px;
//   max-width: 300px;
//   max-height: 200px;
//   width: 100%;
//   height: 200px;
// }

// .demo-image__error .image-slot {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   background: var(--el-fill-color-light);
//   color: var(--el-text-color-secondary);
//   font-size: 30px;
// }
// .demo-image__error .image-slot .el-icon {
//   font-size: 30px;
// }
</style>

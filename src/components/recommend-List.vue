<template>
  <div class="recommend-list">
    <slot name="title"> </slot>
    <div class="layout-recommend">
      <!-- 自定义渲染 skeleton 模板 -->
      <el-skeleton animated :loading="isShow" :throttle="500">
        <template #template>
          <el-row :gutter="20">
            <el-col v-for="item in 12" :key="item.id" :span="4" v-bind="size">
              <div class="items">
                <!-- 显示图片 -->
                <el-skeleton-item
                  variant="image"
                  style="height: 150px; width: 150px"
                />
                <!-- 显示文字 -->
                <div class="text">
                  <el-skeleton-item variant="text" style="width: 150px" />
                </div>
              </div>
            </el-col>
          </el-row>
        </template>

        <!-- 正在渲染的DOM -->
        <template #default>
          <el-row :gutter="20">
            <el-col
              :span="4"
              v-bind="size"
              v-for="item in songMenuItem"
              :key="item"
            >
              <div class="items">
                <!-- 显示图片 -->
                <div class="image iconfont" @click="songlist(item.id)">
                  <!-- 播放量 -->
                  <div class="playCount">
                    <el-icon><VideoPlay /></el-icon>
                    <span>{{ formatNumber(item.playCount) }}</span>
                  </div>
                  <el-image
                    :src="`${
                      item.picUrl || item.coverImgUrl
                    }params?param=300y300`"
                    alt="img"
                    @mouseover="onmouseover(item)"
                    @mouseleave="onmouseleave(item)"
                  >
                  </el-image>

                  <svg
                    class="icon shanjiao"
                    aria-hidden="true"
                    v-show="imgid === item.id"
                    @click="playMusic($event, item.id)"
                    @mouseover="onmouseover(item)"
                    @mouseleave="onmouseleave(item)"
                  >
                    <use xlink:href="#icon-playfill-copy"></use>
                  </svg>
                </div>
                <!-- 显示文字 -->
                <div class="text">
                  <span @click="songlist(item.id)">{{ item.name }}</span>
                </div>
                <slot name="trackCount" :count="item.trackCount"></slot>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, ref, onMounted } from "vue";
// 对播放量进行格式化
import { formatNumber } from "@/utils/formatNumber";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { playSongMenuList } from "@/hook/playSongMenuList";
export default defineComponent({
  name: "",
  components: {},
  props: {
    songMenuItem: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const router = useRouter();
    const isShow = ref(true);
    const store = useStore();
    const size = {
      xs: { span: 8 },
      sm: { span: 6 },
      md: { span: 6 },
      lg: { span: 4 },
      xl: { span: 4 },
    };
    watch(
      () => props.songMenuItem,
      (value) => {
        if (value.length !== 0) {
          console.log("object");
          isShow.value = false;
        }
      },
      {
        immediate: true,
      }
    );
    // 跳转至歌单详情页
    const songlist = (id) => {
      router.push({
        path: "songMenuDetailPage",
        query: {
          id: id,
        },
      });
    };

    // 鼠标移入的对象
    const imgid = ref(0);
    // 鼠标移入
    const onmouseover = (item) => {
      imgid.value = item.id;
    };
    // 鼠标移出
    const onmouseleave = (item) => {
      imgid.value = 0;
    };

    // play图标点击事件
    const playMusic = (event, id) => {
      // 阻止父元素的点击事件
      event.stopPropagation();
      // 传入歌单id播放歌曲
      playSongMenuList(id);
    };

    return {
      isShow,
      imgid,
      songlist,
      formatNumber,
      onmouseover,
      onmouseleave,
      playMusic,
      size,
    };
  },
});
</script>

<style lang="less" scoped>
.recommend-list {
  .layout-recommend {
    margin-top: 10px;
    .temp_loading {
      display: flex;
      justify-content: center;
    }
    .items {
      display: inline-block;
      .image {
        position: relative;
        cursor: pointer;
        .el-image {
          border-radius: 10px;
        }
        .playCount {
          z-index: 1;
          position: absolute;
          top: 5px;
          right: 5px;
          color: white;
          font-size: 12px;
          .el-icon {
            margin-right: 3px;
            vertical-align: top;
          }
        }
        .shanjiao {
          position: absolute;
          font-size: 22px;
          bottom: 15px;
          right: 10px;
          background-color: white;
          border-radius: 50%;
          padding: 8px;
          animation: icon 1s;
        }
      }

      .text {
        // 只展示俩行文字，多则省略...
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        padding-top: 5px;
        font-size: 13px;
        span:hover {
          cursor: pointer;
          font-weight: 700;
        }
      }
      @keyframes icon {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
}
</style>

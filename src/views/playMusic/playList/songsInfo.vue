<template>
  <div class="layout-left">
    <transition-group name="bounce" v-if="Object.keys(copymusic).length !== 0">
      <template v-if="!drawer">
        <div class="image" @click="OpenDrawer">
          <el-tooltip
            class="box-item"
            effect="light"
            content="展开音乐详情页"
            placement="top"
            :show-after="1000"
          >
            <div class="image">
              <img :src="musicInfo.songsInfo.picUrl" alt="" />
            </div>
          </el-tooltip>
        </div>
        <div class="song-name">
          <!-- 歌曲名字 -->
          <div class="song_name">
            <span>{{ musicInfo.name }}</span>
            <svg
              class="icon love"
              aria-hidden="true"
              @click="loveClick(musicInfo.id)"
              v-if="!likelist.find((item) => item == musicInfo.id)"
            >
              <use xlink:href="#icon-Love"></use>
            </svg>

            <!-- 不喜欢 -->
            <svg class="icon dislike" @click="dislike(musicInfo.id)" v-else>
              <use xlink:href="#icon-love-active"></use>
            </svg>
          </div>
          <!-- 歌曲作者 -->
          <div class="author">
            <span
              class="cursorHover"
              @click="singerClick(musicInfo.author[0].id)"
              >{{ musicInfo.author[0].name }}
            </span>
            <span v-if="musicInfo.author[1]" class="line">/</span>
            <span
              v-if="musicInfo.author[1]"
              class="cursorHover"
              @click="singerClick(musicInfo.author[1].id)"
            >
              {{ musicInfo.author[1].name }}
            </span>
          </div>
        </div>
      </template>

      <div v-else class="ArrowDown">
        <el-tooltip
          class="box-item"
          effect="light"
          content="收起音乐详情页"
          placement="top"
          :show-after="1000"
        >
          <el-icon @click="closeDrawer"><ArrowDown /></el-icon>
        </el-tooltip>
      </div>
    </transition-group>

    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="false"
      direction="btt"
      :append-to-body="true"
      size="100%"
      :z-index="11"
    >
      <!-- 歌词界面 -->
      <template #default>
        <lyric :musicInfo="musicInfo" />
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import lyric from "@/views/lyric/lyric.vue";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({
  musicInfo: {
    type: Object,
    default: () => {},
  },
});
const store = useStore();
const router = useRouter();

// 监听歌曲信息
const copymusic = computed(() => props.musicInfo);

const emit = defineEmits(["OpenDrawer"]);

const drawer = ref(false);
// 歌词页是否显示
watch(() => store.state.islyric, (value) => {
  drawer.value = store.state.islyric
})
// 打开歌词界面
const OpenDrawer = () => {
  store.commit('setIslyric', true)
  emit("OpenDrawer", true);
};
// 关闭歌词界面
const closeDrawer = () => {
  store.commit('setIslyric', false)
  emit("OpenDrawer", false);
};

//  跳转到歌手界面
const singerClick = (id) => {
  console.log(id);
  router.push({
    path: "/singerDetailPage",
    query: {
      id,
    },
  });
};
// 导入歌曲喜欢hook
const { likelist, uselike } = require("@/hook/useLike.js");
// 喜欢此歌曲
const loveClick = (id) => {
  uselike(id);
};
// 取消喜欢的歌曲
const dislike = (id) => {
  uselike(id, false);
};
</script>

<style lang="less" scoped>
// 进入动画
.bounce-enter-active {
  animation: fadeIn 1s linear;
}

.ArrowDown {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 60px;
  cursor: pointer;
}

.layout-left {
  display: flex;
  align-items: center;
  width: 400px;

  height: 100%;
  .image {
    position: relative;
    width: 65px;
    height: 60px;
    cursor: pointer;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    // 利用伪类元素添加遮罩层
    &::before {
      // url(@/assets/image/pause.png)
      content: "";
      border-radius: 5px;
      background: url(@/assets/image/jiantou.png) no-repeat rgba(0, 0, 0, 0.3)
        center;
      width: 100%;
      height: 100%;
      // display: block;
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
      transition: opacity ease-in-out 0.2s;
    }
    &:hover::before {
      z-index: 10;
      opacity: 1;
    }
  }

  .song-name {
    padding-left: 10px;
    font-size: 16px;
    span {
      display: block;
    }
    .author {
      display: flex;
      padding-top: 8px;
      font-size: 10px;
      .line {
        margin: 0 5px;
      }
    }
    .cursorHover:hover {
      font-weight: 550;
      cursor: pointer;
    }
    .song_name {
      display: flex;
      .love {
        margin-left: 5px;
        font-size: 18px;
      }
      .love:hover {
        color: red;
        cursor: pointer;
      }
      .dislike {
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }
  .drawer-geci {
    margin-bottom: 50px;
  }
}
</style>

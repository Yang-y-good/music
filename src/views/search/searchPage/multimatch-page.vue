<template>
  <p style="font-size: 13px; margin-top: 30px">你可能感兴趣的</p>
  <div class="multimatch" v-if="multimatch">
    <div
      class="artist"
      @click="clickartist(multimatch.artist[0])"
      v-if="multimatch.orders.find((e) => e == 'artist')"
    >
      <div class="img">
        <img :src="multimatch.artist[0].img1v1Url" alt="" />
      </div>
      <div class="text">
        <span>
          歌手: {{ multimatch.artist[0].name }}
          <span v-if="multimatch.artist[0].alias"
            >({{ multimatch.artist[0].alias[0] }})</span
          >
        </span>
        <div>
          <span> 粉丝 {{ formatNumber(multimatch.artist[0].fansSize) }}, </span>
          <span> 歌曲 {{ multimatch.artist[0].musicSize }} </span>
        </div>
      </div>
    </div>

    <div
      class="album"
      @click="clickalbum(multimatch.album[0])"
      v-if="multimatch.orders.find((e) => e == 'album')"
    >
      <div class="img">
        <img :src="multimatch.album[0].picUrl" alt="" />
      </div>
      <div class="text">
        <span>
          {{ multimatch.album[0].type + ": " + multimatch.album[0].name }}
        </span>
        <div>{{ multimatch.album[0].artist.name }},</div>
      </div>
    </div>

    <div
      class="playlist"
      @click="clickplaylist(multimatch.playlist[0])"
      v-if="multimatch.orders.find((e) => e == 'playlist')"
    >
      <div class="img">
        <img :src="multimatch.playlist[0].coverImgUrl" alt="" />
      </div>
      <div class="text">
        <span>歌单: {{ multimatch.playlist[0].name }}</span>
        <div>
          <span> 歌曲{{ multimatch.playlist[0].trackCount }}, </span>
          <span>
            歌曲{{ formatNumber(multimatch.playlist[0].playCount) }}
          </span>
        </div>
      </div>
    </div>

    <div
      class="new_mlog"
      @click="clickPlayVideo(multimatch.new_mlog[0])"
      v-if="multimatch.orders.find((e) => e == 'new_mlog')"
    >
      <div class="img">
        <img
          :src="multimatch.new_mlog[0].baseInfo.resource.mlogBaseData.coverUrl"
          alt=""
        />
      </div>

      <div class="text">
        <span>{{
          multimatch.new_mlog[0].resourceName +
          ":" +
          multimatch.new_mlog[0].baseInfo.resource.mlogBaseData.text
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatNumber } from "@/utils/formatNumber";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({});
const emit = defineEmits();
const store = useStore();
const router = useRouter();
const route = useRoute();

// 感兴趣的数据
const multimatch = ref();

watch(
  () => route.query.value,
  (value) => {
    if (!(route.name == "search")) return
    console.log('object-----------');
    store.dispatch("search/getMultimatch", value).then((res) => {
      console.log(res.result.orders);
      multimatch.value = res.result;
    });
  },
  {
    immediate: true,
  }
);

// 跳转到歌手界面
const clickartist = (item) => {
  console.log(item);
  router.push({
    path: "/singerDetailPage",
    query: {
      id: item.id,
    },
  });
};
// 跳转到专辑页面
const clickalbum = (item) => {
  console.log(item);
  router.push({
    path: "/albumDetailPage",
    query: {
      ids: item.id,
    },
  });
};
// 跳转到歌单界面
const clickplaylist = (item) => {
  console.log(item);
  router.push({
    path: "songMenuDetailPage",
    query: {
      id: item.id,
    },
  });
};

// 跳转MV界面
const clickPlayVideo = (item) => {
  console.log(item);
  router.push({
    path: "/mainVideo",
    query: {
      mvId: item.resourceId
    },
  });
};
</script>

<style lang="less" scoped>
img {
  margin-left: 10px;
  margin-right: 15px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  vertical-align: middle;
}
.text {
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.text > div:last-child {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 300;
}
.multimatch {
  display: flex;
  .artist {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 70px;
    width: 280px;
    background-color: #f5f5f5;
  }
  .album {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 15px;
    height: 70px;
    width: 280px;
    background-color: #f5f5f5;
  }
  .playlist {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 15px;
    height: 70px;
    width: 280px;
    background-color: #f5f5f5;
  }
  .new_mlog {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 15px;
    height: 70px;
    width: 280px;
    background-color: #f5f5f5;
  }
}
</style>
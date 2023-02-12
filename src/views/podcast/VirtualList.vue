<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }">
    </div>
    <el-table
      class="infinite-list"
      :data="visibleData"
      :row-style="itemSize"
      :style="{ transform: getTransform }"
      :show-header="isHeader"
    >
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="value" label="Date" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

const props = defineProps({
  // 所有列表数据
  listData: {
    type: Array,
    default: [],
  },
  //每项高度
  itemSize: {
    type: Number,
    default: 200,
  },
  itemSize: {
    type: Object,
    default: () => {
      return {
        fontSize: "13px",
        height: "50px",
      };
    },
  },
});

// 是否显示表头
const isHeader = ref(true)

const list = ref();
//可视区域高度
const screenHeight = ref(0);
//偏移量
const startOffset = ref(0);
//起始索引
const start = ref(0);
//结束索引
const end = ref(null);

//列表总高度
const listHeight = computed(
  () => props.listData.length * parseInt(props.itemSize.height.match(/\d+/g)[0])
);

//可显示的列表项数
const visibleCount = computed(() =>
  Math.ceil(
    screenHeight.value / parseInt(props.itemSize.height.match(/\d+/g)[0]) 
  )
);

//获取真实显示列表数据
const visibleData = computed(() =>
  props.listData.slice(start.value, Math.min((end.value+1), props.listData.length))
);
//   偏移量对应的style
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`);

onMounted(() => {
  screenHeight.value = list.value.clientHeight;
  console.log(list.value.clientHeight);
  end.value = start.value + visibleCount.value;
  console.log(visibleCount.value);
  console.log(start.value);
  console.log(end.value);
  console.log(visibleData.value);
});

const scrollEvent = (e) => {
  console.log(screenHeight.value);
  if(e.target.scrollTop > screenHeight.value) {
    isHeader.value = false
  }else {
    isHeader.value = true
  }
  //当前滚动位置
  let scrollTop = list.value.scrollTop;
  //此时的开始索引
  start.value = Math.floor(
    scrollTop / parseInt(props.itemSize.height.match(/\d+/g)[0])
  );
  //此时的结束索引
  end.value = start.value + visibleCount.value;

  //此时的偏移量
  startOffset.value = scrollTop - (scrollTop % parseInt(props.itemSize.height.match(/\d+/g)[0]));
};
</script>

<style lang="less" scoped>
.infinite-list-container {
  height: calc(100vh - 150px);
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
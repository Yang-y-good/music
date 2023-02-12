<template>
  <div class="volume-container">
    <div class="volume">
      <div class="volume-bar"></div>
    </div>
    <div class="volume1">
      <div class="volume-bar1"></div>
    </div>
    <div class="volume2">
      <div class="volume-bar2"></div>
    </div>
    <div class="volume3">
      <div class="volume-bar3"></div>
    </div>
    <div class="volume4">
      <div class="volume-bar4"></div>
    </div>
    <div class="volume5">
      <div class="volume-bar5"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({});
const emit = defineEmits();
</script>

<style lang="less" scoped>
.volume-container {
  display: flex;
 
  // justify-content: center;
  // align-items: center;
  align-items: flex-end;
}

.volume-bar,
.volume-bar1,
.volume-bar2,
.volume-bar3,
.volume-bar4,
.volume-bar5 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  background-color: #3498db;
}

.volume {
  width: 5px;
  height: 60px;
  position: relative;
  margin: 0 2px;
}
.volume-bar {
  animation: grow 0.2s ease-in-out infinite alternate;
}
@keyframes grow {
  0% {
    height: 0;
  }
  100% {
    height: 60px;
  }
}
.volume1 {
  width: 5px;
  height: 40px;
  position: relative;
  margin: 0 2px;
}
.volume-bar1 {
  animation: grow1 0.3s infinite;
}
@keyframes grow1 {
  0% {
    height: 0;
  }
  100% {
    height: 40px;
  }
}
.volume2 {
  width: 5px;
  height: 65px;
  position: relative;
  margin: 0 2px;
}
.volume-bar2 {
  animation: grow2 0.2s ease-in-out infinite alternate;
}
@keyframes grow2 {
  0% {
    height: 0;
  }
  100% {
    height: 65px;
  }
}

.volume3 {
  width: 5px;
  height: 40px;
  position: relative;
  margin: 0 2px;
}
.volume-bar3 {
  animation: grow3 0.3s ease-in-out infinite ;
}
@keyframes grow3 {
  0% {
    height: 0;
  }
  100% {
    height: 40px;
  }
}

.volume4 {
  width: 5px;
  height: 70px;
  position: relative;
  margin: 0 2px;
}
.volume-bar4 {
  animation: grow4 0.2s ease-in-out infinite alternate;
}
@keyframes grow4 {
  0% {
    height: 0;
  }
  100% {
    height: 70px;
  }
}

.volume5 {
  width: 5px;
  height: 60px;
  position: relative;
  margin: 0 2px;
}
.volume-bar5 {
  animation: grow5 0.2s ease-in-out infinite alternate;
}
@keyframes grow5 {
  0% {
    height: 30px;
  }
  100% {
    height: 60px;
  }
}
</style>
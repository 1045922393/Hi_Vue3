<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { onMounted, onBeforeUnmount } from 'vue';
// ==================================== 四、API类  ====================================
const rotateFn = () => {
  const wh = window.innerHeight;
  const ww = window.innerWidth;

  const body = document.querySelector('.home');
  if (wh > ww) {
    body && (body.style.transform = 'rotate(90deg)');
  } else {
    body && (body.style.transform = 'rotate(00deg)');
  }
};
onMounted(() => {
  rotateFn();
  window.addEventListener('resize', rotateFn);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', rotateFn);
});
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
}
.villiam {
}
</style>

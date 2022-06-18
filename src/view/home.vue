<template>
  <div class="v_home">
    <div class="out_box">
      <div
        class="game_box hide_img"
        :class="{
          leftImg: index === leftIndex,
          rightImg: index === rightIndex,
          centerImg: index === centerIndex,
          leftBackImg: index === leftBackIndex && routerComp.length > 4,
          rightBackImg: index === rightBackIndex && routerComp.length > 4,
        }"
        v-for="(item, index) in routerComp"
        :key="item.name"
        :to="item.path"
        @click="clickRouter(index, item.path)"
      >
        {{ item.name }}
      </div>
      <!-- <router-link class="game_box" :to="{ path: './hnzxknk' }"
        >害你在心口难开</router-link
      >
      <router-link class="game_box" :to="{ path: './wolf_kill' }"
        >狼人杀</router-link
      > -->
    </div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@ 主页 导航页
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
import { routes } from "@/route/routes";
import { useRouter } from "vue-router";
// ==================================== 三、方法类 ====================================
import { rndColor } from "../utils";
import { onMounted, computed, ref } from "vue";
// ==================================== 四、API类  ====================================
const routerComp = computed(() => routes.filter((item) => !item.hide));
onMounted(() => {
  const box: any = document.querySelector(".v_home");
  box.style.background = rndColor();
});

const centerIndex = ref(0);
const leftIndex = computed(() => {
  let temp = centerIndex.value - 1;
  if (temp < 0) {
    temp = routerComp.value.length + temp;
  }
  return temp;
});
const rightIndex = computed(() => {
  let temp = centerIndex.value + 1;
  if (temp > routerComp.value.length - 1) {
    temp = temp - routerComp.value.length;
  }
  return temp;
});
const leftBackIndex = computed(() => {
  let temp = centerIndex.value - 2;
  if (temp < 0) {
    temp = routerComp.value.length + temp;
  }
  return temp;
});
const rightBackIndex = computed(() => {
  let temp = centerIndex.value + 2;
  if (temp > routerComp.value.length - 1) {
    temp = temp - routerComp.value.length;
  }
  return temp;
});
const router = useRouter();

const clickRouter = (index, path) => {
  if (centerIndex.value == index) {
    router.push({
      path: path,
    });
    return;
  }
  centerIndex.value = index;
};
</script>
<style scoped lang="less">
.v_home {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100vw;
  height: 100vh;

  .out_box {
    padding: 10px;
    position: relative;
    width: 100vw;
    height: 200px;
    // overflow: hidden;
    // flex-wrap: wrap;
  }
  .game_box {
    cursor: pointer;
    position: absolute;
    flex: 0 0 200px;
    display: inline-block;
    // line-height: 100px;
    text-align: center;
    text-decoration: none;
    box-shadow: 1px 1px 1px 1px #eeefff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25vw;
    min-height: 25vw;
    border-radius: 10px;
    font-size: 2vw;
    font-weight: 800;
    color: #fff;
    background-color: black;
    border: 1px solid #fff;
    perspective: 800px;
    transform-style: preserve-3d;
    transition: all 1.5s;
    left: 50%;
    top: 50%;
  }
  .hide_img {
    transform: perspective(800px) translateX(-110%) translateZ(-1000px)
      translateY(-50%);
    z-index: 7;
  }

  .leftBackImg {
    transform: perspective(800px) translateX(-215%) translateZ(-800px)
      translateY(-50%) rotateY(-150deg);
    z-index: 8;
  }
  .rightBackImg {
    transform: perspective(800px) translateX(15%) translateZ(-800px)
      translateY(-50%) rotateY(150deg);
    z-index: 8;
  }

  .leftImg {
    transform: perspective(800px) translateX(-200%) translateZ(-400px)
      translateY(-50%) rotateY(-30deg);
    z-index: 9;
  }
  .rightImg {
    transform: perspective(800px) translateX(65%) translateZ(-400px)
      translateY(-50%) rotateY(30deg);
    z-index: 9;
  }
  .centerImg {
    transform: perspective(800px) translateX(-50%) translateZ(0)
      translateY(-50%);
    z-index: 10;
  }
}
</style>

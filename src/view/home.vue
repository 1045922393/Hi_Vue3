<template>
  <div class="v_home">
    <div class="out_box">
      <div
        class="game_box hide_img"
        :class="{
          current: index === centerIndex,
          leftImg: index === leftIndex,
          rightImg: index === rightIndex,
          centerImg: index === centerIndex,
          leftBackImg: index === leftBackIndex && routerComp.length > 4,
          rightBackImg: index === rightBackIndex && routerComp.length > 4,
          blur: index !== centerIndex,
        }"
        v-for="(item, index) in routerComp"
        :key="item.name"
        :to="item.path"
        @click="clickRouter(index, item.path)"
      >
        <span :data-content="item.name">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@ 主页 导航页
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
import { routes } from '@/route/routes';
import { useRouter } from 'vue-router';
// ==================================== 三、方法类 ====================================
import { rndColor } from '../utils';
// import stringRender from "json-templater/string";
// import objectRender from "json-templater/object";
// import jsonTemp from "../json/template.json";
import { onBeforeUnmount, onMounted, computed, ref, watch } from 'vue';
// ==================================== 四、API类  ====================================
const routerComp = computed(() => routes.filter((item) => !item.hide));
onMounted(() => {
  const box: any = document.querySelector('body');
  box.style.background = rndColor();
});

const hueValue = ref(0);
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

const huValueComp = computed(() => {
  return hueValue.value + 'deg';
});

const symbolNum = ref(20);

const unwatch = watch(hueValue, (newVal) => {
  if (newVal > 360 || newVal < -360) symbolNum.value = symbolNum.value * -1;
});

let intervalId: any = setInterval(() => {
  hueValue.value = hueValue.value + symbolNum.value;
}, 2000);

onBeforeUnmount(() => {
  clearInterval(intervalId);
  intervalId = null;
  unwatch();
});
</script>
<style scoped lang="less">
.v_home {
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
  .out_box {
    padding: 10px;
    position: relative;
    width: 100%;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    min-height: 200px;
    border-radius: 20px;
    font-size: 30px;
    font-weight: 800;
    color: #fff;
    border: none;
    perspective: 800px;
    transform-style: preserve-3d;
    transition: all 1.5s;
    left: 50%;
    top: 50%;
    background: url('@/assets/water_di.jpg') left top / 100% 100% no-repeat;
    span {
      .gradientShadow(linear-gradient(0deg, #CBEEFF 0%, #FFFFFF 49.7314453125%);2px 2px 2px #0E2130, 3px 3px 3px rgba(198,227,255,0.3), 0px 6px 24px rgba(215,212,255,0.52));
    }
  }
  .blur {
    filter: blur(2px);
  }

  .current {
    filter: hue-rotate(v-bind(huValueComp));
    // background-color: paleturquoise;
    box-shadow: 0px 0px 10px 10px paleturquoise;
  }
  .hide_img {
    transform: perspective(800px) translateX(-80%) translateZ(-1000px) translateY(250%) rotateX(90deg) scale(1) ;
    z-index: 7;
  }

  .leftBackImg {
    transform: perspective(800px) translateX(-415%) translateZ(-800px) translateY(60%)
      rotateY(-10deg) scale(0.8);
    z-index: 8;
  }
  .rightBackImg {
    transform: perspective(800px) translateX(115%) translateZ(-800px) translateY(-260%)
      rotateY(150deg) scale(0.8);
    z-index: 8;
  }

  .leftImg {
    transform: perspective(800px) translateX(-200%) translateZ(-400px) translateY(-220%)
      rotateY(-10deg);
    z-index: 9;
  }
  .rightImg {
    transform: perspective(800px) translateX(165%) translateZ(-400px) translateY(-60%) rotateY(10deg);
    z-index: 9;
  }
  .centerImg {
    transform: perspective(800px) translateX(-50%) translateZ(0) translateY(-50%);
    z-index: 10;
  }
}
</style>

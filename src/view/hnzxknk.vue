<template>
  <div class="hnzxknk">
    <div class="box" @click="change">
      <span class="word" :data-content="tipWord">{{ tipWord }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
import { word } from './hnzxknk/words';
import { rndColor } from '../utils/utils';
// ==================================== 三、方法类 ====================================
import { onMounted, onUnmounted, onBeforeUnmount, ref, computed } from 'vue';
// ==================================== 四、API类  ====================================
const wordColor = ref('rgb(0,0,0)');
let timeId: any = null;
const tipWord = ref('');
const change = () => {
  if (timeId) clearTimeout(timeId);
  timeId = setTimeout(() => {
    const box = document.querySelector('.word') as any;
    const body = document.querySelector('body') as any;
    tipWord.value = word.splice(Math.floor(Math.random() * word.length), 1)[0];
    body.style.backgroundColor = rndColor();
    wordColor.value = rndColor();
  }, 300);
};

var shakeThreshold = 2000; // 定义一个摇动的阈值
var lastUpdate = 0; // 记录上一次摇动的时间
var x, y, z, lastX, lastY, lastZ; // 定义x、y、z记录三个轴的数据以及上一次触发的数据
// 运动传感器处理
function deviceMotionHandler(eventData) {
  var acceleration = eventData.accelerationIncludingGravity; // 获取含重力的加速度
  var curTime = new Date().getTime();
  // 100毫秒进行一次位置判断
  if (curTime - lastUpdate > 100) {
    var diffTime = curTime - lastUpdate;
    lastUpdate = curTime;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    var speed = (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;
    if (speed > shakeThreshold) {
      change();
    }
    lastX = x;
    lastY = y;
    lastZ = z;
  }
}

const rotateDeg = ref(0);
const degComp = computed(() => {
  return rotateDeg.value + 'deg';
});

const textDirection = () => {
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  if (ww > wh) {
    rotateDeg.value !== 0 && (rotateDeg.value = 0);
  } else {
    rotateDeg.value !== 90 && (rotateDeg.value = 90);
  }
};

const wordLinearColor = computed(() => {
  return `linear-gradient(
        to bottom,
        ${wordColor.value},
        #eee,
        #eee,
        ${wordColor.value}
      )`;
});

const wordShadowColor = computed(() => {
  return `2px 2px 2px ${wordColor.value}, 3px 3px 5px rgba(198,227,255,0.3), 0px 6px 24px rgba(215,212,255,0.52)`;
});

onMounted(() => {
  textDirection();
  window.addEventListener('resize', textDirection);
  change();
  // 监听传感器运动事件
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  } else {
    //浏览器不支持DeviceMotion
    alert('天呐，你的手机竟然还不支持摇一摇ヾ(◍°∇°◍)ﾉﾞ');
  }
});
onUnmounted(() => {
  // window.removeEventListener('devicemotion', deviceMotionHandler, false);
  window.removeEventListener('resize', textDirection);
});

// const rotateFn = () => {
//   const wh = window.innerHeight;
//   const ww = window.innerWidth;

//   const body = document.querySelector('.home');
//   if (wh > ww) {
//     body && (body.style.transform = 'rotate(90deg)');
//   } else {
//     body && (body.style.transform = 'rotate(00deg)');
//   }
// };
// onMounted(() => {
//   rotateFn();
//   window.addEventListener('resize', rotateFn);
// });

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', rotateFn);
// });
</script>
<style scoped lang="less">
.hnzxknk {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    // line-height: 100vh;
    text-align: center;
    font-size: 150px;
    // color: #eee;
    .word {
      .gradientShadow(v-bind(wordLinearColor); v-bind(wordShadowColor));
      // animation: move-letter 4s linear forwards;  //forwards当动画完成后，保持最后一帧的状态
    }
  }
  @keyframes move-letter{
    0% {
      opacity: 0;
      letter-spacing: -40px;
      filter: blur(10px);
    }
    25% {
      opacity: 1;
    }
    50% {
      filter: blur(5px);
    }
    100% {
      letter-spacing: 20px;
      filter: blur(2px);
    }
  }

}
</style>

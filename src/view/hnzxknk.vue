<template>
  <div class="hnzxknk">
    <div class="box" @click="change"></div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
import { word } from "./hnzxknk/words";
import { rndColor } from "../utils/index";
// ==================================== 三、方法类 ====================================
import { onMounted, onUnmounted } from "vue";
// ==================================== 四、API类  ====================================
let timeId: any = null;
const change = () => {
  if (timeId) clearTimeout(timeId);
  timeId = setTimeout(() => {
    const box = document.querySelector(".box") as any;
    const body = document.querySelector("body") as any;
    box.innerText = word.splice(Math.floor(Math.random() * word.length), 1);
    body.style.background = rndColor();
  }, 300);
};

var shakeThreshold = 1000; // 定义一个摇动的阈值
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
    var speed =
      (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;
    if (speed > shakeThreshold) {
      change();
    }
    lastX = x;
    lastY = y;
    lastZ = z;
  }
}
onMounted(() => {
  change();
  // 监听传感器运动事件
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", deviceMotionHandler, false);
  } else {
    //浏览器不支持DeviceMotion
    alert("天呐，你的手机竟然还不支持摇一摇ヾ(◍°∇°◍)ﾉﾞ");
  }
});
onUnmounted(() => {
  window.removeEventListener("devicemotion", deviceMotionHandler, false);
});
</script>
<style scoped lang="less">
.hnzxknk {
  .box {
    width: 100vw;
    height: 100vh;
    line-height: 100vh;
    text-align: center;
    font-size: 150px;
    color: #fff;
    white-space: nowrap;
  }
}
</style>

<template>
  <div class="button">
    <div class="text">{{ props.text }}</div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { defineProps } from "vue";
// ==================================== 四、API类  ====================================
const props = defineProps({
  text: {
    type: String,
    default: "Loading",
  },
});
</script>
<style scoped lang="less">
.button {
  margin: 0 auto;
  font-size: 40px;
  line-height: 80px;
  height: 80px;
  text-align: center;
  width: 300px;
  position: relative;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  border-radius: 30px;
  background-size: 400%;
  color: #fff;
  z-index: 2;
  font-weight: 800;
  animation: colorChange 10s linear infinite;
  // background-clip: text;
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}

.button:before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: 1;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 40px;
  filter: blur(40px);
}

.text {
  font-size: 40px;
  line-height: 80px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(0deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  border-radius: 30px;
  background-size: 400%;
  color: #fff;
  z-index: 5;
  font-weight: 800;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: colorChange 10s linear infinite;
}

@keyframes colorChange {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}
</style>

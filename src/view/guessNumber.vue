<template>
  <div class="guessNumber">
    <label class="control" for="input">
      点击输入
      <input id="input" type="number" class="input_box" v-model="guess" @keyup.enter="onGuess" />
    </label>
    <div class="line_break_10"></div>
    <div class="target" @click="onReset">点击重新开始游戏: {{ target }}</div>
    <div class="line_break_10"></div>
    <div class="outline">
      <div class="box left-box">
        {{ min }}
      </div>
      <div class="line"></div>
      <div class="box right-box">
        {{ max }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { ref, onMounted, Ref } from 'vue';
import vertical from '@/utils/vertical';
// ==================================== 四、API类  ====================================
vertical.setup();

const target = ref();
const min = ref(0);
const max = ref(100);
const targetVisible = ref(0);
const guess: Ref<number> = ref(0);

onMounted(() => {
  onReset();
});

function onGuess() {
  if (guess.value < min.value || guess.value > max.value) {
    alert(`范围${min.value}-${max.value}`);
    return;
  }
  if (guess.value == target.value) {
    alert(`嘣!!!你${Math.random() < 0.5 ? '输' : '赢'}了!`);
    targetVisible.value = 1;
    // onReset();
    return;
  }
  if (guess.value < target.value) {
    min.value = guess.value;
  } else {
    max.value = guess.value;
  }
}

function onReset() {
  guess.value = 0;
  min.value = 0;
  max.value = 100;
  targetVisible.value = 0;
  target.value = (Math.random() * 100) | 0;
}
</script>
<style scoped lang="less">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
/* 火狐 */
input {
  -moz-appearance: textfield;
}
.guessNumber {
  position: relative;
  padding: 20px;
  background: url('@/assets/guessNum_bg.jpg') center center / cover no-repeat;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .line_break_10 {
    height: 10px;
  }
  .target {
    cursor: pointer;
    font-size: 20px;
    color: #0f1162;
    opacity: v-bind(targetVisible);
  }
  .outline {
    display: flex;
    align-items: center;
    width: 90vw;
    perspective: 300px;
    transform-style: preserve-3d;
    max-width: 400px;

    .left-box {
      background: rgba(189, 228, 237, 0.2);
      backdrop-filter: blur(8px);
      color: #06cdc6;
      transform: rotateY(-10deg);
    }
    .right-box {
      background: rgba(255, 161, 191, 0.2);
      backdrop-filter: blur(8px);
      color: #5e17e1;
      transform: rotateY(20deg);
    }
    .box {
      font-size: 30px;
      height: 100px;
      line-height: 100px;
      width: 100px;
      // border: 1px solid #000;
      text-align: center;
      border-radius: 8px;
    }
    .line {
      height: 2px;
      flex: 1;
    }
  }
  .input_box {
    height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 4px;
    border: none;
    background: transparent;
    font-size: 20px;
  }

  .control {
    font-size: 20px;
    color: #1c0f40;
  }
}
</style>

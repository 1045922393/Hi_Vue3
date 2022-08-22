<template>
  <div class="guessNumber">
    <div class="outline">
      <div class="box left-box">
        {{ min }}
      </div>
      <div class="line"></div>
      <div class="box right-box">
        {{ max }}
      </div>
    </div>
    <div class="line_break_10"></div>
    <label for="input">
      点击输入
      <input id="input" type="number" class="input_box" v-model="guess" @keyup.enter="onGuess" />
    </label>
    <div class="line_break_10"></div>
    <div class="target" @click="onReset">点击重新开始游戏: {{ target }}</div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { ref, onMounted, Ref } from 'vue';
// ==================================== 四、API类  ====================================

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
.guessNumber {
  padding: 20px;
  background: #e6ebf5;
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
    font-size: 20px;
    color: #876;
    opacity: v-bind(targetVisible);
  }
  .outline {
    display: flex;
    align-items: center;
    .left-box {
      background: #876;
      color: #fff;
    }
    .right-box {
      background: #678;
      color: #fff;
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
      width: 20px;
      background: #987;
    }
  }
  .input_box {
    height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 4px;
    border: none;
    background: #e6ebf5;
  }
}
</style>

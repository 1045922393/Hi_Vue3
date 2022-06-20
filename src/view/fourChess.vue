<template>
  <div class="chess_out">
    <div class="legend">
      <div class="legendItem" :class="{ highLight: turnPlay1 }">
        <span class="play1 legendIcon"></span>玩家1
      </div>
      <div class="legendItem" :class="{ highLight: !turnPlay1 }">
        <span class="play2 legendIcon"></span>玩家2
      </div>
    </div>
    <div
      class="column"
      v-for="(col, index) in chessBoard"
      :key="index"
      @click="playChess(index)"
    >
      <div
        class="chess"
        :class="{ play1: chess === 1, play2: chess === 2 }"
        v-for="(chess, chessIndex) in col"
        :key="chessIndex"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { ref, Ref, onMounted, computed } from "vue";
// ==================================== 四、API类  ====================================

const play1 = ref(1);
const play2 = ref(2);

const turnPlay1 = ref(true);

const playerPlaying = computed(() => {
  if (turnPlay1.value) return play1.value;
  return play2.value;
});

const chessBoard: Ref<Array<any>> = ref([]);

const initBoard = () => {
  const outBoard: Array<Array<number>> = [];
  for (let i = 0; i < 8; i++) {
    const inBoard = new Array(8).fill(0);
    outBoard.push(inBoard);
  }
  chessBoard.value = outBoard;
};

onMounted(() => {
  initBoard();
});

const playChess = (col: number) => {
  const targetCol: Array<number> = chessBoard.value[col];
  const targetChessIndex = targetCol.findIndex((item) => item === 0);
  if (targetChessIndex === -1) return;
  targetCol[targetChessIndex] = playerPlaying.value;
  turnPlay1.value = !turnPlay1.value;
};
</script>
<style scoped lang="less">
.chess_out {
  --borderPadding: 50px;
  position: relative;
  background-color: #333;
  border-radius: 8px;
  margin: auto;
  padding: 0 var(--borderPadding);
  box-sizing: border-box;
  width: 100vw;
  height: 100vw;
  max-height: 100vh;
  max-width: 100vh;
  display: flex;
  .column {
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
    justify-content: center;
    margin: 0 10px;
    padding: var(--borderPadding) 0;

    .chess {
      justify-content: center;
      align-items: center;
      display: flex;
      flex: 1;
      width: 100%;
      height: 100%;
      border: 1px solid #333;
      border-radius: 50%;
      margin: 10px 0;
      background-color: #f7f9f7;
      transition: all 0.3s;
    }
  }

  .legend {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #f7f9f7;
    display: flex;
    .legendItem {
      display: flex;
      justify-content: start;
      align-items: center;
      &.highLight {
        color: yellowgreen;
      }
    }

    .legendIcon {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin: 0 10px;
    }
  }

  .play1 {
    background-color: #1500d9 !important;
  }
  .play2 {
    background-color: #ff1744 !important;
  }
}
</style>

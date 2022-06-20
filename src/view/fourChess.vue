<template>
  <div class="outBoard">
    <div class="chess_out">
      <div class="legend">
        <div class="legendItem color1" :class="{ highLight: turnPlay1 }">
          <span class="play1 legendIcon"></span>玩家1
        </div>
        <div class="legendItem color2" :class="{ highLight: !turnPlay1 }">
          <span class="play2 legendIcon"></span>玩家2
        </div>
      </div>
      <div class="tools">
        <div @click="goBack" :class="{ disabled: banLastStep }">上一步</div>
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
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { ref, Ref, onMounted, computed, reactive } from "vue";
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

const lastStep = reactive({
  lastCol: -1,
  lastChess: -1,
});

const playChess = (col: number) => {
  const targetCol: Array<number> = chessBoard.value[col];
  const targetChessIndex = targetCol.findIndex((item) => item === 0);
  if (targetChessIndex === -1) return;
  lastStep.lastCol = col;
  lastStep.lastChess = targetChessIndex;
  targetCol[targetChessIndex] = playerPlaying.value;
  turnPlay1.value = !turnPlay1.value;
};
const banLastStep = computed(() => {
  if ([lastStep.lastCol, lastStep.lastChess].includes(-1)) return true;
  return false;
});
const goBack = () => {
  if (banLastStep.value) return;
  chessBoard.value[lastStep.lastCol][lastStep.lastChess] = 0;
  lastStep.lastCol = -1;
  lastStep.lastChess = -1;
  turnPlay1.value = !turnPlay1.value;
};
</script>
<style scoped lang="less">
.outBoard {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #333;
}
.chess_out {
  --borderPadding: 2vw;
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
    position: fixed;
    top: 10px;
    left: 10px;
    color: rgb(255, 2, 196);
    display: flex;
    .legendItem {
      display: flex;
      justify-content: start;
      align-items: center;
      &.color1 {
        color: #1500d9;
      }
      &.color2 {
        color: #ff1744;
      }
      &.highLight {
        transform: scale(1.3);
      }
    }

    .legendIcon {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin: 0 4px 0 16px;
      border-radius: 5px;
    }
  }

  .tools {
    position: fixed;
    left: 2vw;
    bottom: 2vh;
    color: #fff;
    font-size: 2rem;

    .disabled {
      opacity: 0;
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

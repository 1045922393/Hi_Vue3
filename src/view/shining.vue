<template>
  <div class="shinning">
    <div class="types">
      <template v-for="imgItem in components">
        <component :is="imgItem" @click="showDialog(imgItem)"></component>
      </template>
    </div>
    <MyButton class="my_button" text="START" @click="gameDialog = true"></MyButton>
  </div>
  <div class="dialog" v-if="gameDialog">
    <span class="close" @click="gameDialog = false">x</span>
    <div class="showCard" :class="{ greenStatus: showImg }" @click="init">
      <div v-show="showImg" class="card-face">
        <component class="firstImg" :is="listData[0]"></component>
        <component class="secondImg" :is="listData[1]"></component>
      </div>
      <div v-show="!showImg" class="waiting">
        <span class="jump" style="--delay: 0s">R</span>
        <span class="jump" style="--delay: 0.2s">e</span>
        <span class="jump" style="--delay: 0.4s">a</span>
        <span class="jump" style="--delay: 0.6s">d</span>
        <span class="jump" style="--delay: 0.8s">y</span>
      </div>
    </div>
  </div>
  <div class="dialog" v-if="dialogShow">
    <span class="close" @click="dialogShow = false">x</span>
    <component :is="screenImg"></component>
  </div>
</template>
<script lang="ts" setup>
import MyButton from '../components/myButton.vue';
import book from './shining/book.vue';
import bottle from './shining/bottle.vue';
import ghost from './shining/ghost.vue';
import mouse from './shining/mouse.vue';
import sofa from './shining/sofa.vue';
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { onMounted, ref, Ref, reactive, computed, watch } from 'vue';
import vertical from '@/utils/vertical';
// ==================================== 四、API类  ====================================
vertical.setup();
const listData: Ref<Array<any>> = ref([]);
const showImg = ref(false);
const dialogShow = ref(false);
const gameDialog = ref(false);
const type = ['老鼠', '酒瓶', '幽灵', '沙发', '书本'],
  components = [mouse, bottle, ghost, sofa, book],
  color = ['#B2ABAC', '#279152', '#F8EDD2', '#ff001e', '#3883e1'],
  showColor = ref(['#B2ABAC', '#279152', '#F8EDD2', '#ff001e', '#3883e1']);
const imgTop = ref('0');
const img2Top = ref('0');
const imgDeg = ref('0');
const img2Deg = ref('0');
const mouseColor = computed(() => showColor.value[0]);
const bottleColor = computed(() => showColor.value[1]);
const ghostColor = computed(() => showColor.value[2]);
const sofaColor = computed(() => showColor.value[3]);
const bookColor = computed(() => showColor.value[4]);
// 获得随机数(可排除)
const randomExcept = (indexArr: Array<number> = []) => {
  const tempIndex = (Math.random() * 5) | 0;
  if (indexArr.includes(tempIndex)) return randomExcept(indexArr);
  return tempIndex;
};

const randomBoolean = () => {
  return ((Math.random() * 2) | 0) === 1;
};

const screenImg = ref(null);
const showDialog = (showImg) => {
  dialogShow.value = true;
  screenImg.value = showImg;
};

const getExist = () => {
  //  情况一 存在
  const firstIndex = randomExcept();
  const secondeIndex = firstIndex;
  const thirdIndex = randomExcept([firstIndex]);
  const forthIndex = randomExcept([firstIndex, thirdIndex]);
  showColor.value[firstIndex] = color[secondeIndex];
  showColor.value[thirdIndex] = color[forthIndex];
  const resultArr = [components[firstIndex], components[thirdIndex]];
  return randomBoolean() ? resultArr : resultArr.reverse();
};

const nonentity = () => {
  // 情况二 不存在
  const firstIndex = randomExcept();
  const secondeIndex = randomExcept([firstIndex]);
  const thirdIndex = randomExcept([firstIndex, secondeIndex]);
  const forthIndex = randomExcept([firstIndex, secondeIndex, thirdIndex]);
  const resultArr = [components[firstIndex], components[thirdIndex]];
  showColor.value[firstIndex] = color[secondeIndex];
  showColor.value[thirdIndex] = color[forthIndex];
  return randomBoolean() ? resultArr : resultArr.reverse();
};

const showCard = () => {
  return randomBoolean() ? getExist() : nonentity();
};

let timeId: any = null;
const init = () => {
  showImg.value = false;
  if (timeId) clearInterval(timeId);
  const time = Math.floor(Math.random() * 4) + 2;
  timeId = setTimeout(() => {
    imgTop.value = Math.random() * 400 + 'px';
    img2Top.value = Math.random() * 400 + 'px';
    listData.value = showCard();
    imgDeg.value = Math.floor(Math.random() * 360) + 1 + 'deg';
    img2Deg.value = Math.floor(Math.random() * 360) + 1 + 'deg';
    showImg.value = true;
  }, time * 1000);
};

watch(
  () => gameDialog.value,
  (newValue) => {
    if (newValue) init();
  },
);

onMounted(() => {});
</script>
<style scoped lang="less">
img,
/deep/svg {
  width: 200px !important;
  height: 200px !important;
}
.shinning {
  .types {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .my_button {
    margin-top: 60px;
    &:active {
      box-shadow: 0px 0px 3px 3px #666 inset;
      transform: translate(2px, 2px);
    }
  }
}
.showCard {
  position: relative;
  margin: 0 auto;
  width: 100vw;
  max-width: 600px;
  height: 600px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.75);
  border: 10px solid rgba(225, 68, 68, 0.6);
  &.greenStatus {
    border: 10px solid rgba(89, 221, 12, 0.871);
  }
  .waiting {
    font-size: 50px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .jump {
      display: inline-block;
      animation: 2s linear infinite goJump;
      animation-delay: var(--delay);
    }
  }
  .card-face {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &.flip {
    transform: rotateY(180deg);
  }
  // 改变svg颜色
  /deep/svg {
    // 老鼠
    path[fill='#B2ABAC'] {
      fill: v-bind(mouseColor);
    }
    // 酒瓶
    path[fill='#279152'] {
      fill: v-bind(bottleColor);
    }

    // 幽灵
    path[fill='#F8EDD2'] {
      // fill: red;
      fill: v-bind(ghostColor);
    }

    // 沙发
    path[fill='#ff001e'] {
      // fill: green;
      fill: v-bind(sofaColor);
    }

    // book
    path[fill='#3883e1'] {
      // fill: red;
      fill: v-bind(bookColor);
    }
  }

  .firstImg,
  .secondImg {
    position: absolute;
  }
  .firstImg {
    left: 50px;
    top: v-bind(imgTop);
    transform: rotate(v-bind(imgDeg));
  }
  .secondImg {
    right: 50px;
    top: v-bind(img2Top);
    transform: rotate(v-bind(img2Deg));
  }
}

.fade-enter,
.fade-leave-to {
  //进入前，离开后
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  //进入后，离开前
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 1s;
}
.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 100vw;
  // height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/desktop.jpeg') 100% 100% no-repeat;
  z-index: 9999;

  .close {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 30px;
  }
}

@keyframes goJump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

<template>
  <div class="page_layout">
    <div v-for="(goodItem, goodIndex) in goods" :key="goodItem.id">
      <div :class="{ cheapest: goodIndex === cheapestTagIndex }">
        <NInput class="w100" v-model:value="goodItem.name" />:
        <NInput class="w100" v-model:value="goodItem.money" type="text" />元
        <NInput class="w100" v-model:value="goodItem.amount" type="text" />单位
      </div>
      <div>单价:{{ price(goodItem.money, goodItem.amount) }}</div>
    </div>

    <NButton class="btn" @click="addItem">添加</NButton>
    <NButton class="btn" @click="computedGoods">计算</NButton>
    <div class="bg-highlight">
      最优选:{{
        goods[cheapestTagIndex].name +
        ':' +
        goods[cheapestTagIndex].money +
        '元' +
        goods[cheapestTagIndex].amount +
        '单位'
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NInput } from 'naive-ui';
const goods = ref([itemInit()]);

const cheapest = ref({});

const cheapestTagIndex = ref(0);

function itemInit() {
  const id = (Math.random() * 10 ** 8) | 0;
  return {
    id,
    name: '商品' + id,
    money: 0,
    amount: 0,
  };
}
const money = ref(0);

const amount = ref(0);
function price(money, amount) {
  if (money && amount) {
    return money / amount;
  }
  return 0;
}

function addItem() {
  goods.value.push(itemInit());
}

function computedGoods() {
  let cheapestIndex = 0;
  cheapestTagIndex.value = 0;
  goods.value.forEach((item, curIndex) => {
    if (item.money && item.amount) {
      if (
        item.money / item.amount <
        goods.value[cheapestIndex].money / goods.value[cheapestIndex].amount
      ) {
        cheapestIndex = curIndex;
        cheapestTagIndex.value = curIndex;
      }
    }
  });
}
</script>

<style scoped lang="less">
.page_layout {
  padding: 8px;
}
.w100 {
  width: 100px;
}

.cheapest {
  background: greenyellow;
  font-weight: bolder;
  padding: 8px;
}

.btn {
  margin: 10px;
  background: peru;
}

.bg-highlight {
  padding: 8px;
  background: gainsboro;
  color: blueviolet;
  font-weight: bolder;
}
</style>

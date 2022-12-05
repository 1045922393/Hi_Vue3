<template>
  <div class="customRender">自定义渲染函数</div>
  <div>props: {{ custPropData }}</div>
  <button @click="addPropData">增加custPropData</button>
</template>

<script>
export default {
  props: {
    custPropData: 0,
  },
  emits: ['update:custPropData'],
  setup(props, { emit }) {
    function addPropData() {
      emit('update:custPropData', props.custPropData + 1);
    }
    return {
      addPropData,
    };
  },
};
</script>

<style>
.customRender {
  height: 400px;
  background: rebeccapurple;
}
</style>

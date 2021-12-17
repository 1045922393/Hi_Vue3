<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div id="teleportFather"></div>
  <HelloWorld @my-click="clickHello" @getMsgFromFather="fatherMethod" msg="Hello Vue 3.0 + Vite" other="other attrs">
    <template v-slot:slot1>
      <div>slot112312</div>
    </template>
    <div>slot 2</div>
  </HelloWorld>
  <custmRender v-model:custPropData="custPropData" />
  <functionCom level="1" key="keyOfFunctionCom">函数式组件</functionCom>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import custmRender from './components/custmRender.vue'
import functionCom from './components/functionCom.js'
import {ref, reactive} from 'vue'

export default {
  name: 'App',
  components: {
    functionCom,
    HelloWorld,
    custmRender
  },
  setup(){
    function fatherMethod(){
      console.log('this log is from fatherMethod')
    }

    function clickHello() {
      console.log('click hello-world component');
    }

    const custPropData = ref(1)

    const keyOfFunctionCom = reactive({
      key: 0
    })
    return {
      keyOfFunctionCom,
      fatherMethod,
      clickHello,
      custPropData
    };
  }
}
</script>

<style scoped>
#teleportFather 
{
  height: 200px;
  background: purple;
}
</style>
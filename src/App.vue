<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld @getMsgFromFather="fatherMethod" msg="Hello Vue 3.0 + Vite" other="other attrs">
    <slot name="slot1">
      <div>slot 1</div>
    </slot>
    <div>slot 2</div>
  </HelloWorld>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    function fatherMethod(){
      console.log('this log is from fatherMethod')
    }
    return {
      fatherMethod
    };
  }
}
</script>

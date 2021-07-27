<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div id="teleportFather"></div>
  <HelloWorld @getMsgFromFather="fatherMethod" msg="Hello Vue 3.0 + Vite" other="other attrs">
    <template v-slot:slot1>
      <div>slot112312</div>
    </template>
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

<style scoped>
#teleportFather 
{
  height: 200px;
  background: purple;
}
</style>
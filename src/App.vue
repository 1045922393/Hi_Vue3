<template>
  <div id="teleportFather"></div>
  <HelloWorld
    @my-click="clickHello"
    @getMsgFromFather="fatherMethod"
    msg="Hello Vue 3.0 + Vite"
    other="other attrs"
  >
    <template v-slot:slot1>
      <div>slot112312</div>
    </template>
    <div>slot 2</div>
  </HelloWorld>
  <custmRender v-model:custPropData="custPropData" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import custmRender from "./components/custmRender.vue";
import { ref, watch, watchEffect } from "vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    custmRender,
  },
  setup() {
    function fatherMethod() {
      console.log("this log is from fatherMethod");
    }

    function clickHello() {
      console.log("click hello-world component");
    }

    const custPropData = ref(1);

    watchEffect(() => {
      console.log("custPropData turn to ", custPropData.value);
    });
    return {
      fatherMethod,
      clickHello,
      custPropData,
    };
  },
};
</script>

<style scoped>
#teleportFather {
  height: 200px;
  background: purple;
}
</style>

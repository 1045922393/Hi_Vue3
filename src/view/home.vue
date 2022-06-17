<template>
  <div class="v_home">
    <div class="out_box">
      <router-link
        class="game_box"
        v-for="(item, index) in routerComp"
        :key="item.name"
        :to="item.path"
        >{{ item.name }}</router-link
      >
      <!-- <router-link class="game_box" :to="{ path: './hnzxknk' }"
        >害你在心口难开</router-link
      >
      <router-link class="game_box" :to="{ path: './wolf_kill' }"
        >狼人杀</router-link
      > -->
    </div>
  </div>
</template>
<script lang="ts" setup>
//@@description@@ 主页 导航页
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
import { routes } from "@/route/routes";
// ==================================== 三、方法类 ====================================
import { rndColor } from "../utils";
import { onMounted, computed } from "vue";
// ==================================== 四、API类  ====================================
const routerComp = computed(() => routes.filter((item) => !item.hide));
onMounted(() => {
  const box: any = document.querySelector(".out_box");
  box.style.background = rndColor();
});
</script>
<style scoped lang="less">
.v_home {
  .out_box {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .game_box {
    display: block;
    line-height: 200px;
    text-align: center;
    text-decoration: none;
    box-shadow: 1px 1px 1px 1px #eeefff;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    /* background-color: transparent; */
    border: 1px solid #fff;
  }
}
</style>

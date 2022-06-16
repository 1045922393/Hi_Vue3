import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/hnzxknk",
    component: () => import("../view/hnzxknk.vue"),
  },
  {
    path: "/",
    component: () => import("../view/home.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

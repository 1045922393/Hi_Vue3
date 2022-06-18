export const routes = [
  {
    path: "/shining",
    name: "闪灵快手",
    component: () => import("../view/shining.vue"),
  },
  {
    path: "/wolf_kill",
    name: "狼人杀",
    component: () => import("../view/wolfKill.vue"),
  },
  {
    path: "/hnzxknk",
    name: "害你在心口难开",
    component: () => import("../view/hnzxknk.vue"),
  },
  {
    path: "/null",
    name: "德国心脏病",
    component: () => import("../view/null.vue"),
  },
  {
    path: "/null",
    name: "四子连棋",
    component: () => import("../view/null.vue"),
  },
  {
    path: "/",
    name: "首页",
    hide: true,
    component: () => import("../view/home.vue"),
  },
];

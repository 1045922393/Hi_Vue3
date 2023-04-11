export const routes = [
  {
    path: '/hnzxknk',
    name: '害你在心',
    component: () => import('../view/hnzxknk.vue'),
  },
  {
    path: '/guessNumber',
    name: '猜数字',
    component: () => import('../view/guessNumber.vue'),
  },
  {
    path: '/shining',
    name: '闪灵快手',
    component: () => import('../view/shining.vue'),
  },
  {
    path: '/wolf_kill',
    name: '狼人杀',
    component: () => import('../view/wolfKill.vue'),
  },
  {
    path: '/null',
    name: '德国心脏病',
    component: () => import('../view/null.vue'),
  },
  {
    path: '/fourChess',
    name: '四子连棋',
    component: () => import('../view/fourChess.vue'),
  },
  {
    path: '/snake',
    name: '贪吃蛇',
    component: () => import('../view/snake.vue'),
  },
  {
    path: '/boyAndGirl',
    name: '消消乐',
    component: () => import('../view/xiaoxiaole/index.vue'),
  },
  {
    path: '/',
    name: '首页',
    hide: true,
    component: () => import('../view/home.vue'),
  },
];

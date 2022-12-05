import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';

export default createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

import { createRouter, createWebHistory, RouteLocationNamedRaw } from 'vue-router';
import routes from './routes';
import { store } from '@/store/index';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由导航守卫
const whiteList = ['/login']; // 白名单
router.beforeEach((to, from, next) => {
  if(store.getters.token) {
    if(to.path === '/login') {
      next('/');
    }else {
      next();
    }
  }else {
    if(whiteList.includes(to.path)) {
      next();
    }else {
      next('/login');
    }
  }
})

export default router;
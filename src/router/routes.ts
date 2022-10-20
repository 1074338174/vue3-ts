import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/home/sub',
    component: () => import('@/pages/home/index.vue'),
    children: [
      {
        path: '/home/sub',
        name: 'sub',
        component: () => import('@/pages/home/index.vue'),
      },
      {
        path: '/home/mine',
        name: 'mine',
        component: () => import('@/pages/mine/index.vue'),
      }
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404/index.vue'),
  },
];

export default routes;

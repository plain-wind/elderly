import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/index/Login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/index/Register.vue'),
        },
      ],
    },
  ],
});

export default router;

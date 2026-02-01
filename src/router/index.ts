import { createRouter, createWebHistory } from 'vue-router';
import { isTopLevelChange } from '@/utils';

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
    {
      path: '/monitor',
      name: 'monitor',
      component: () => import('@/views/Monitor.vue'),
    },
    {
      path: '/admin',
      redirect: '/admin/data',
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/index.vue'),
      children: [
        {
          path: 'data',
          name: 'data',
          component: () => import('@/views/admin/data.vue'),
        },
      ],
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/Detail.vue'),
    },
  ],
});

// 路由加载状态管理
export const routerLoading = ref(false);

// 导航守卫
router.beforeEach((to, from) => {
  // 只在顶层路由变化时显示加载动画
  if (isTopLevelChange(to, from)) {
    routerLoading.value = true;
  }
});

router.afterEach((to, from) => {
  // 只在顶层路由变化时隐藏加载动画
  if (isTopLevelChange(to, from)) {
    setTimeout(() => {
      routerLoading.value = false;
    }, 300);
  }
});

export default router;

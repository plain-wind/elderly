import { createRouter, createWebHistory } from 'vue-router';
import { isTopLevelChange } from '@/utils';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/admin',
    redirect: '/admin/bodyData/list',
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
        path: 'bodyData',
        name: 'bodyData',
        component: () => import('@/views/admin/bodyData/index.vue'),
        children: [
          {
            path: 'list',
            name: 'list',
            component: () => import('@/views/admin/bodyData/List.vue'),
          },
          {
            path: 'detail',
            name: 'detail',
            component: () => import('@/views/admin/bodyData/Detail.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
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

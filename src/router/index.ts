import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/dashboard/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        title: '仪表盘',
      },
    },
    {
      path: '/articles',
      name: 'Articles',
      component: () => import('@/pages/articles/articles.vue'),
      meta: {
        title: '文章管理',
      },
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/pages/categories/categories.vue'),
      meta: {
        title: '分类管理',
      },
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/pages/users/users.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/pages/settings/settings.vue'),
      meta: {
        title: '系统设置',
      },
    },
  ],
})

export default router

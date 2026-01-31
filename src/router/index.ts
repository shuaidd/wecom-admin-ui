import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
import Dashboard from '@/pages/dashboard/dashboard.vue'
import Admin from '@/pages/admin/admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            title: '仪表盘',
          },
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
          meta: {
            title: '用户管理',
          },
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/pages/article/article.vue'),
          meta: {
            title: '文章列表',
          },
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/pages/category/category.vue'),
          meta: {
            title: '分类管理',
          },
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/pages/settings/settings.vue'),
          meta: {
            title: '系统设置',
          },
        },
      ],
    },
  ],
})

export default router

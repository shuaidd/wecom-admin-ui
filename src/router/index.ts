import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import ParentLayout from '@/layouts/ParentLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/dashboard.vue'),
          meta: { title: '仪表盘', icon: 'DashboardOutlined' },
        },
        {
          path: 'form',
          name: 'form',
          component: ParentLayout,
          meta: { title: '表单页面', icon: 'FormOutlined' },
          children: [
            {
              path: 'basic',
              name: 'form-basic',
              component: () => import('@/pages/form/basic-form.vue'),
              meta: { title: '基础表单' },
            },
          ],
        },
        {
          path: 'exception',
          name: 'exception',
          component: ParentLayout,
          meta: { title: '异常页面', icon: 'WarningOutlined' },
          children: [
            {
              path: '403',
              name: 'exception-403',
              component: () => import('@/pages/exception/error-403.vue'),
              meta: { title: '403' },
            },
            {
              path: '404',
              name: 'exception-404',
              component: () => import('@/pages/exception/error-404.vue'),
              meta: { title: '404' },
            },
            {
              path: '500',
              name: 'exception-500',
              component: () => import('@/pages/exception/error-500.vue'),
              meta: { title: '500' },
            },
          ],
        },
        {
          path: 'demo',
          name: 'demo',
          component: ParentLayout,
          meta: { title: '示例页面', icon: 'AppstoreOutlined' },
          children: [
            {
              path: 'long-content',
              name: 'long-content',
              component: () => import('@/pages/demo/long-content.vue'),
              meta: { title: '超长内容' },
            },
            {
              path: 'nested',
              name: 'nested',
              component: ParentLayout,
              meta: { title: '嵌套菜单' },
              children: [
                {
                  path: 'menu1',
                  name: 'nested-menu1',
                  component: () => import('@/pages/demo/nested/nested-menu1.vue'),
                  meta: { title: '菜单 1-1' },
                },
                {
                  path: 'menu2',
                  name: 'nested-menu2',
                  component: () => import('@/pages/demo/nested/nested-menu2.vue'),
                  meta: { title: '菜单 1-2' },
                },
              ],
            },
          ],
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('@/pages/admin/admin.vue'),
          meta: { title: '系统管理', icon: 'SettingOutlined' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: '/exception/404',
    },
  ],
})

export default router

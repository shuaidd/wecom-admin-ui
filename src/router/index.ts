import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import ParentLayout from '@/layouts/ParentLayout.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/LoginPage.vue'),
      meta: { title: '登录' },
    },
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/DashboardPage.vue'),
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
              component: () => import('@/pages/form/BasicForm.vue'),
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
              component: () => import('@/pages/exception/Error403.vue'),
              meta: { title: '403' },
            },
            {
              path: '404',
              name: 'exception-404',
              component: () => import('@/pages/exception/Error404.vue'),
              meta: { title: '404' },
            },
            {
              path: '500',
              name: 'exception-500',
              component: () => import('@/pages/exception/Error500.vue'),
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
              component: () => import('@/pages/demo/LongContent.vue'),
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
                  component: () => import('@/pages/demo/nested/NestedMenu1.vue'),
                  meta: { title: '菜单 1-1' },
                },
                {
                  path: 'menu2',
                  name: 'nested-menu2',
                  component: () => import('@/pages/demo/nested/NestedMenu2.vue'),
                  meta: { title: '菜单 1-2' },
                },
              ],
            },
          ],
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.path !== '/login' && !userStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router

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
          path: 'customer',
          name: 'customer',
          component: ParentLayout,
          meta: { title: '客户管理', icon: 'TeamOutlined' },
          children: [
            {
              path: 'list',
              name: 'customer-list',
              component: () => import('@/pages/customer/CustomerList.vue'),
              meta: { title: '客户列表' },
            },
            {
              path: 'funnel',
              name: 'customer-funnel',
              component: () => import('@/pages/customer/funnel/FunnelPage.vue'),
              meta: { title: '获客漏斗' },
            },
            {
              path: 'detail/:id',
              name: 'customer-detail',
              component: () => import('@/pages/customer/CustomerDetail.vue'),
              meta: { title: '客户详情', hidden: true },
            },
            {
              path: 'portrait/:id',
              name: 'customer-portrait',
              component: () => import('@/pages/customer/CustomerPortrait.vue'),
              meta: { title: '客户画像', hidden: true },
            },
          ],
        },
        {
          path: 'contacts',
          name: 'contacts',
          component: ParentLayout,
          meta: { title: '通讯录管理', icon: 'ContactsOutlined' },
          children: [
            {
              path: 'users',
              name: 'contacts-users',
              component: () => import('@/pages/contacts/UserList.vue'),
              meta: { title: '用户管理' },
            },
            {
              path: 'departments',
              name: 'contacts-departments',
              component: () => import('@/pages/contacts/DepartmentList.vue'),
              meta: { title: '部门管理' },
            },
          ],
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
          path: 'marketing',
          name: 'marketing',
          component: ParentLayout,
          meta: { title: '营销中心', icon: 'RocketOutlined' },
          children: [
            {
              path: 'acquisition-link',
              name: 'marketing-acquisition-link',
              component: () => import('@/pages/marketing/acquisition-link/AcquisitionLinkPage.vue'),
              meta: { title: '获客链接' },
            },
            {
              path: 'channel-code',
              name: 'marketing-channel-code',
              component: () => import('@/pages/marketing/channel-code/ChannelCodePage.vue'),
              meta: { title: '渠道活码' },
            },
            {
              path: 'mass-message',
              name: 'marketing-mass-message',
              component: () => import('@/pages/marketing/mass-message/MassMessagePage.vue'),
              meta: { title: '群发消息' },
            },
            {
              path: 'channel-stats',
              name: 'marketing-channel-stats',
              component: () => import('@/pages/marketing/channel-stats/ChannelStatsPage.vue'),
              meta: { title: '渠道统计' },
            },
            {
              path: 'welcome',
              name: 'marketing-welcome',
              component: () => import('@/pages/marketing/welcome/WelcomePage.vue'),
              meta: { title: '欢迎语管理' },
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

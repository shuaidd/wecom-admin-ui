import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CustomerList from '@/components/customer/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/customers',
      name: 'CustomerList',
      component: CustomerList,
      meta: {
        title: '客户列表',
      },
    },
  ],
})

export default router

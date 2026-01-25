import { createRouter, createWebHashHistory } from 'vue-router'
import CustomerList from '@/components/customer/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/customers',
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

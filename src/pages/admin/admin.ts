import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import AdminApp from './admin.vue'
import router from '@/router'

const app = createApp(AdminApp)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#admin-app')

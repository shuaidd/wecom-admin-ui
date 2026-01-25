import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'


import DashboardApp from './dashboard.vue'

const app = createApp(DashboardApp)

app.use(createPinia())
app.use(Antd)


app.mount('#dashboard-app')

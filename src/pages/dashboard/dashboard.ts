import { createApp } from 'vue'
import { createPinia } from 'pinia'

import DashboardApp from './DashboardPage.vue'

const app = createApp(DashboardApp)

app.use(createPinia())

app.mount('#dashboard-app')

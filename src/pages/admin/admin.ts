import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AdminApp from './admin.vue'

const app = createApp(AdminApp)

app.use(createPinia())

app.mount('#admin-app')

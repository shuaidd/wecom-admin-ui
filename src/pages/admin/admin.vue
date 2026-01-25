<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminPage',
})
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const selectedKeys = ref<string[]>(['customers'])

const menuItems = [
  {
    key: 'customers',
    label: '客户管理',
  },
]

const handleMenuClick = ({ key }: { key: string }) => {
  router.push(`/${key}`)
  selectedKeys.value = [key]
}

watch(
  () => route.path,
  (path) => {
    if (path === '/') {
      selectedKeys.value = ['customers']
    } else {
      selectedKeys.value = [path.replace('/', '')]
    }
  },
  { immediate: true },
)
</script>

<template>
  <a-layout class="admin-layout">
    <a-layout-sider width="200" style="background: #fff">
      <div class="logo">
        <h2>企微客户管理</h2>
      </div>
      <a-menu
        v-model:selected-keys="selectedKeys"
        mode="inline"
        :items="menuItems"
        @click="handleMenuClick"
      />
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>{{ route.meta?.title || '管理' }}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content style="background: #fff; padding: 24px; margin: 0; min-height: 280px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #001529;
  color: #fff;
  margin-bottom: 16px;
}

.logo h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}
</style>

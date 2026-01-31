<script setup lang="ts">
import { h, ref, computed } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const selectedKeys = ref<string[]>(['dashboard'])

const menuItems = computed<MenuProps['items']>(() => [
  {
    key: 'dashboard',
    icon: () => h(DashboardOutlined),
    label: '仪表盘',
  },
  {
    key: 'admin',
    icon: () => h(UserOutlined),
    label: '用户管理',
  },
  {
    key: 'content',
    icon: () => h(FileTextOutlined),
    label: '内容管理',
    children: [
      {
        key: 'article',
        label: '文章列表',
      },
      {
        key: 'category',
        label: '分类管理',
      },
    ],
  },
  {
    key: 'settings',
    icon: () => h(SettingOutlined),
    label: '系统设置',
  },
])

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  const keyStr = String(key)
  selectedKeys.value = [keyStr]
  router.push({ name: keyStr })
}
</script>

<template>
  <a-layout-sider width="200" class="layout-sider">
    <div class="logo">
      <AppstoreOutlined class="logo-icon" />
      <span class="logo-text">Admin System</span>
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :items="menuItems"
      mode="inline"
      :theme="'dark'"
      @click="handleMenuClick"
    />
  </a-layout-sider>
</template>

<style scoped>
.layout-sider {
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon {
  font-size: 24px;
  margin-right: 8px;
}

.logo-text {
  white-space: nowrap;
}

:deep(.ant-menu-dark) {
  background: #001529;
}

:deep(.ant-menu-item-selected) {
  background-color: #1890ff !important;
}
</style>

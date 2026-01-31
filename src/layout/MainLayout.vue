<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  TagsOutlined,
  BellOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import { useThemeStore } from '@/stores/theme'
import ChromeTabs from './ChromeTabs.vue'

const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()
const collapsed = ref(false)

const menuItems = [
  {
    key: '1',
    icon: HomeOutlined,
    label: '仪表盘',
    path: '/dashboard',
  },
  {
    key: '2',
    icon: FileTextOutlined,
    label: '文章管理',
    path: '/articles',
  },
  {
    key: '3',
    icon: TagsOutlined,
    label: '分类管理',
    path: '/categories',
  },
  {
    key: '4',
    icon: UserOutlined,
    label: '用户管理',
    path: '/users',
  },
  {
    key: '5',
    icon: SettingOutlined,
    label: '系统设置',
    path: '/settings',
  },
]

// 根据当前路由计算选中的菜单项
const selectedKeys = computed(() => {
  const currentItem = menuItems.find((item) => item.path === route.path)
  return currentItem ? [currentItem.key] : ['1']
})

// 面包屑数据
const breadcrumbs = computed(() => {
  const currentItem = menuItems.find((item) => item.path === route.path)
  return [
    { label: '首页', path: '/' },
    { label: currentItem?.label || '仪表盘', path: route.path },
  ]
})

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

// 处理菜单点击
const handleMenuClick = (e: { key: string }) => {
  const item = menuItems.find((item) => item.key === e.key)
  if (item) {
    router.push(item.path)
  }
}

// Chrome-style tabs - 基于路由动态管理
const tabs = ref([{ id: '1', title: '仪表盘', path: '/dashboard', active: true }])

const activeTabId = ref('1')

// 监听路由变化，自动更新 tabs
watch(
  () => route.path,
  (newPath) => {
    const existingTab = tabs.value.find((tab) => tab.path === newPath)
    const menuItem = menuItems.find((item) => item.path === newPath)

    if (existingTab) {
      // 切换到已存在的 tab
      activeTabId.value = existingTab.id
    } else if (menuItem) {
      // 创建新 tab
      const newTabId = String(Date.now())
      tabs.value.push({
        id: newTabId,
        title: menuItem.label,
        path: newPath,
        active: true,
      })
      activeTabId.value = newTabId
    }

    // 更新所有 tab 的 active 状态
    tabs.value = tabs.value.map((tab) => ({
      ...tab,
      active: tab.id === activeTabId.value,
    }))
  },
  { immediate: true },
)

const handleTabClick = (tabId: string) => {
  if (tabId === 'new') {
    // 新建 tab - 默认跳转到仪表盘
    router.push('/dashboard')
    return
  }

  const tab = tabs.value.find((t) => t.id === tabId)
  if (tab) {
    activeTabId.value = tabId
    router.push(tab.path)
  }
}

const handleTabClose = (tabId: string) => {
  const index = tabs.value.findIndex((tab) => tab.id === tabId)
  if (index > -1) {
    const tabToClose = tabs.value[index]
    const wasActive = tabToClose?.id === activeTabId.value
    tabs.value.splice(index, 1)

    if (wasActive && tabs.value.length > 0) {
      const newIndex = Math.min(index, tabs.value.length - 1)
      const newActiveTab = tabs.value[newIndex]
      if (newActiveTab) {
        activeTabId.value = newActiveTab.id
        router.push(newActiveTab.path)
      }
    }
  }
}
</script>

<template>
  <a-layout class="main-layout">
    <!-- Sidebar -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :width="260"
      :collapsed-width="80"
      class="sidebar"
    >
      <div class="logo">
        <div class="logo-icon">
          <span class="logo-text">W</span>
        </div>
        <span v-if="!collapsed" class="logo-title">WeCom Admin</span>
      </div>

      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        class="custom-menu"
        @click="handleMenuClick"
      >
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <template #icon>
            <component :is="item.icon" />
          </template>
          <span class="menu-label">{{ item.label }}</span>
        </a-menu-item>
      </a-menu>

      <div v-if="!collapsed" class="sidebar-footer">
        <div class="version">v2.0.0</div>
      </div>
    </a-layout-sider>

    <a-layout class="main-content-wrapper">
      <!-- Header -->
      <a-layout-header class="header">
        <div class="header-left">
          <button class="collapse-btn" @click="toggleCollapsed">
            <MenuFoldOutlined v-if="!collapsed" />
            <MenuUnfoldOutlined v-else />
          </button>

          <div class="breadcrumb">
            <span
              v-for="(item, index) in breadcrumbs"
              :key="item.path"
              class="breadcrumb-item"
              :class="{ active: index === breadcrumbs.length - 1 }"
            >
              {{ item.label }}
              <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
            </span>
          </div>
        </div>

        <div class="header-right">
          <div class="search-box">
            <SearchOutlined class="search-icon" />
            <input type="text" placeholder="搜索..." class="search-input" />
          </div>

          <button class="icon-btn notification-btn">
            <BellOutlined />
            <span class="badge">3</span>
          </button>

          <button class="theme-toggle" @click="themeStore.toggleTheme">
            <span v-if="themeStore.isDark" class="theme-icon">☀</span>
            <span v-else class="theme-icon">☾</span>
          </button>

          <div class="user-profile">
            <a-avatar class="user-avatar">A</a-avatar>
            <span class="user-name">Admin</span>
          </div>
        </div>
      </a-layout-header>

      <!-- Chrome-style Tabs -->
      <ChromeTabs
        :tabs="tabs"
        :active-tab-id="activeTabId"
        @tab-click="handleTabClick"
        @tab-close="handleTabClose"
      />

      <!-- Content -->
      <a-layout-content class="content">
        <div class="content-inner">
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  font-family:
    'Space Grotesk',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

/* Sidebar Styles */
.sidebar {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%) !important;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 100;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
}

.logo {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 1;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  flex-shrink: 0;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.logo-title {
  margin-left: 14px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;
  white-space: nowrap;
  font-family: 'Playfair Display', serif;
}

.custom-menu {
  background: transparent !important;
  border-right: none;
  padding: 16px 12px;
  position: relative;
  z-index: 1;
}

.custom-menu :deep(.ant-menu-item) {
  height: 52px;
  line-height: 52px;
  margin: 8px 0;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.custom-menu :deep(.ant-menu-item::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.custom-menu :deep(.ant-menu-item:hover) {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.custom-menu :deep(.ant-menu-item-selected) {
  background: rgba(102, 126, 234, 0.15) !important;
  color: #ffffff !important;
}

.custom-menu :deep(.ant-menu-item-selected::before) {
  transform: scaleY(1);
}

.custom-menu :deep(.ant-menu-item-icon) {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.custom-menu :deep(.ant-menu-item:hover .ant-menu-item-icon) {
  transform: scale(1.1);
}

.menu-label {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 1;
}

.version {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  letter-spacing: 0.5px;
}

/* Main Content Area */
.main-content-wrapper {
  background: var(--bg-primary, #f8fafc);
  transition: background-color 0.3s ease;
}

/* Header Styles */
.header {
  background: var(--header-bg, #ffffff);
  padding: 0 32px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background-color 0.3s ease;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.collapse-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--text-secondary, #64748b);
  font-size: 18px;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: var(--hover-bg, #f1f5f9);
  color: var(--text-primary, #1e293b);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.breadcrumb-item {
  color: var(--text-secondary, #64748b);
  font-weight: 500;
}

.breadcrumb-item.active {
  color: var(--text-primary, #1e293b);
  font-weight: 600;
}

.breadcrumb-separator {
  color: var(--text-muted, #94a3b8);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted, #94a3b8);
  font-size: 16px;
}

.search-input {
  width: 240px;
  height: 42px;
  padding: 0 16px 0 42px;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  background: var(--input-bg, #ffffff);
  color: var(--text-primary, #1e293b);
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: var(--text-muted, #94a3b8);
}

.icon-btn {
  width: 42px;
  height: 42px;
  border: none;
  background: transparent;
  color: var(--text-secondary, #64748b);
  font-size: 18px;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.icon-btn:hover {
  background: var(--hover-bg, #f1f5f9);
  color: var(--text-primary, #1e293b);
}

.notification-btn .badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(245, 87, 108, 0.4);
}

.theme-toggle {
  width: 42px;
  height: 42px;
  border: none;
  background: var(--hover-bg, #f1f5f9);
  color: var(--text-secondary, #64748b);
  font-size: 18px;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: rotate(15deg);
}

.theme-icon {
  transition: transform 0.3s ease;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-profile:hover {
  background: var(--hover-bg, #f1f5f9);
}

.user-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
}

/* Content Styles */
.content {
  margin: 0;
  padding: 0;
  min-height: calc(100vh - 72px - 48px);
  overflow: auto;
}

.content-inner {
  padding: 32px;
  max-width: 1600px;
  margin: 0 auto;
}

/* Dark Theme Variables */
:global([data-theme='dark']) {
  --bg-primary: #0f172a;
  --header-bg: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border-color: #334155;
  --input-bg: #334155;
  --hover-bg: #334155;
}

:global([data-theme='light']) {
  --bg-primary: #f8fafc;
  --header-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border-color: #e2e8f0;
  --input-bg: #ffffff;
  --hover-bg: #f1f5f9;
}
</style>

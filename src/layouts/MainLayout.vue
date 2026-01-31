<script setup lang="ts">
import { ref, watch, onMounted, computed, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '@/stores/tab'
import { useUserStore } from '@/stores/user'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ThunderboltOutlined,
  StarOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  FormOutlined,
  ExperimentOutlined,
  ExceptionOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'

const iconMap: Record<string, Component> = {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ThunderboltOutlined,
  StarOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  FormOutlined,
  ExperimentOutlined,
  ExceptionOutlined,
  TeamOutlined,
}

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()
const userStore = useUserStore()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([route.path])
const openKeys = ref<string[]>([])
const isFullscreen = ref(false)
const searchValue = ref('')
const isDark = ref(false)
const notificationCount = ref(5)

const menuItems = computed(() => {
  const rootRoute = router.options.routes.find((r) => r.path === '/')
  return rootRoute?.children || []
})

const handleMenuClick = ({ key }: { key: string | number }) => {
  if (key !== route.path) {
    router.push(key as string)
  }
}

const handleUserMenuClick = ({ key }: { key: string | number }) => {
  if (key === 'logout') {
    userStore.logout()
  }
}

const handleTabChange = (key: string | number) => {
  if (key !== route.path) {
    router.push(key as string)
  }
}

const handleTabEdit = (targetKey: string | number | MouseEvent, action: 'add' | 'remove') => {
  if (action === 'remove' && typeof targetKey === 'string') {
    tabStore.removeTab(targetKey)
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark-theme', isDark.value)
}

const getIcon = (iconName?: string): Component => {
  if (!iconName) return InfoCircleOutlined
  return iconMap[iconName] || InfoCircleOutlined
}

onMounted(() => {
  tabStore.addTab(route)
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})

watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath]
    const paths = newPath.split('/').filter(Boolean)
    if (paths.length > 1) {
      const parents = paths.slice(0, -1).map((_, i) => '/' + paths.slice(0, i + 1).join('/'))
      openKeys.value = [...new Set([...openKeys.value, ...parents])]
    }
    tabStore.addTab(route)
  },
  { immediate: true },
)
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#6366f1',
        borderRadius: 8,
      },
    }"
  >
    <a-layout class="main-layout">
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        class="sider"
        :width="260"
        :collapsed-width="80"
      >
        <div class="sider-content">
          <!-- Logo -->
          <div class="logo">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color: #6366f1; stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: #8b5cf6; stop-opacity: 1" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#logoGradient)" />
                <path
                  d="M7 10L12 17L17 10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <transition name="logo-fade">
              <span v-if="!collapsed" class="logo-text">
                <span class="logo-text-main">Wecom</span>
                <span class="logo-text-sub">Admin</span>
              </span>
            </transition>
          </div>

          <!-- Search (Moved from Header) -->
          <div class="sidebar-search" :class="{ collapsed: collapsed }">
            <div v-if="!collapsed" class="search-input-wrapper">
              <SearchOutlined class="search-icon" />
              <input v-model="searchValue" placeholder="搜索..." class="search-input" />
            </div>
            <div v-else class="search-icon-only" @click="collapsed = false" title="展开搜索">
              <SearchOutlined />
            </div>
          </div>

          <!-- Menu -->
          <div class="menu-scroll-container">
            <a-menu
              v-model:selectedKeys="selectedKeys"
              v-model:openKeys="openKeys"
              theme="dark"
              mode="inline"
              @click="handleMenuClick"
              class="custom-menu"
            >
              <template v-for="item in menuItems" :key="item.path">
                <template v-if="item.children && item.children.length > 0">
                  <a-sub-menu :key="'/' + item.path">
                    <template #icon>
                      <component :is="getIcon(item.meta?.icon as string)" />
                    </template>
                    <template #title>{{ item.meta?.title }}</template>

                    <template v-for="subItem in item.children" :key="'sub-' + subItem.path">
                      <template v-if="subItem.children && subItem.children.length > 0">
                        <a-sub-menu :key="'submenu-' + item.path + '/' + subItem.path">
                          <template #title>{{ subItem.meta?.title }}</template>
                          <a-menu-item
                            v-for="grandItem in subItem.children"
                            :key="'/' + item.path + '/' + subItem.path + '/' + grandItem.path"
                          >
                            {{ grandItem.meta?.title }}
                          </a-menu-item>
                        </a-sub-menu>
                      </template>
                      <template v-else>
                        <a-menu-item :key="'/' + item.path + '/' + subItem.path">
                          {{ subItem.meta?.title }}
                        </a-menu-item>
                      </template>
                    </template>
                  </a-sub-menu>
                </template>
                <template v-else>
                  <a-menu-item :key="'/' + item.path">
                    <template #icon>
                      <component :is="getIcon(item.meta?.icon as string)" />
                    </template>
                    <span>{{ item.meta?.title }}</span>
                  </a-menu-item>
                </template>
              </template>
            </a-menu>
          </div>

          <!-- Footer (New) -->
          <div class="sidebar-footer">
            <!-- Action Icons Row -->
            <div class="footer-actions">
              <div class="footer-action-item" @click="toggleTheme" title="切换主题">
                <component :is="isDark ? ThunderboltOutlined : StarOutlined" />
              </div>
              <div class="footer-action-item" @click="toggleFullscreen" title="全屏">
                <component :is="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined" />
              </div>

              <a-dropdown :trigger="['click']" placement="topRight">
                <div class="footer-action-item notification-trigger">
                  <a-badge
                    :count="notificationCount"
                    :overflow-count="99"
                    size="small"
                    :offset="[0, -5]"
                  >
                    <BellOutlined />
                  </a-badge>
                </div>
                <template #overlay>
                  <a-menu>
                    <a-menu-item class="notification-item">
                      <div class="notification-content">
                        <StarOutlined class="notification-icon" />
                        <div class="notification-text">
                          <div class="notification-title">新版本更新</div>
                          <div class="notification-desc">v2.0.0 已发布</div>
                        </div>
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <a @click="() => {}">查看全部通知</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>

            <!-- User Profile Row -->
            <div class="footer-user">
              <a-dropdown :trigger="['click']" placement="topRight">
                <div class="user-trigger" :class="{ collapsed: collapsed }">
                  <div class="user-avatar">
                    <UserOutlined />
                  </div>
                  <transition name="fade">
                    <div v-if="!collapsed" class="user-info">
                      <div class="user-name">管理员</div>
                      <div class="user-role">Super Admin</div>
                    </div>
                  </transition>
                </div>
                <template #overlay>
                  <a-menu @click="handleUserMenuClick">
                    <a-menu-item key="profile">
                      <UserOutlined />
                      <span>个人中心</span>
                    </a-menu-item>
                    <a-menu-item key="settings">
                      <SettingOutlined />
                      <span>系统设置</span>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="help">
                      <QuestionCircleOutlined />
                      <span>帮助文档</span>
                    </a-menu-item>
                    <a-menu-item key="logout">
                      <LogoutOutlined />
                      <span>退出登录</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>

            <!-- Collapse Trigger -->
            <div class="footer-collapse" @click="collapsed = !collapsed">
              <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
            </div>
          </div>
        </div>
      </a-layout-sider>

      <a-layout>
        <!-- No Header -->
        <div class="tabs-container">
          <a-tabs
            v-model:activeKey="tabStore.activeTabKey"
            type="editable-card"
            :hide-add="true"
            class="chrome-tabs"
            @change="handleTabChange"
            @edit="handleTabEdit"
          >
            <a-tab-pane
              v-for="tab in tabStore.tabs"
              :key="tab.key"
              :tab="tab.title"
              :closable="tab.closable"
            />
          </a-tabs>
        </div>

        <a-layout-content class="content">
          <div class="content-wrapper">
            <router-view v-slot="{ Component }">
              <transition name="fade-slide" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.sider {
  box-shadow: 4px 0 24px 0 rgba(0, 0, 0, 0.1);
  height: 100vh;
  background: linear-gradient(180deg, #1a1c23 0%, #0f1117 100%);
  position: relative;
  z-index: 100;
}

.sider::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.3), transparent);
}

.sider-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

/* Logo Styles */
.logo {
  flex-shrink: 0;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.logo-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.logo-text {
  margin-left: 14px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.logo-text-main {
  color: #fff;
  display: inline-block;
}

.logo-text-sub {
  color: #a5b4fc;
  margin-left: 2px;
  font-weight: 400;
}

/* Search Styles */
.sidebar-search {
  flex-shrink: 0;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar-search.collapsed {
  padding: 16px 0;
  display: flex;
  justify-content: center;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 10px;
  height: 36px;
  transition: all 0.3s;
}

.search-input-wrapper:hover,
.search-input-wrapper:focus-within {
  background: rgba(255, 255, 255, 0.1);
  border-color: #6366f1;
}

.search-icon {
  color: #9ca3af;
  font-size: 14px;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #e5e7eb;
  width: 100%;
  outline: none;
}

.search-input::placeholder {
  color: #6b7280;
}

.search-icon-only {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  color: #9ca3af;
  transition: all 0.2s;
}

.search-icon-only:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Menu Styles */
.menu-scroll-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 0;
}

.menu-scroll-container::-webkit-scrollbar {
  width: 4px;
}

.menu-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.custom-menu {
  background: transparent !important;
  border: none !important;
}

.custom-menu :deep(.ant-menu-item),
.custom-menu :deep(.ant-menu-submenu-title) {
  margin: 4px 12px;
  padding: 0 16px !important;
  height: 44px !important;
  line-height: 44px !important;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  color: #9ca3af;
}

.custom-menu :deep(.ant-menu-item:hover),
.custom-menu :deep(.ant-menu-submenu-title:hover) {
  background: rgba(99, 102, 241, 0.15) !important;
  color: #fff !important;
}

.custom-menu :deep(.ant-menu-item.ant-menu-item-selected) {
  background: rgba(99, 102, 241, 0.2) !important;
  color: #fff !important;
}

.custom-menu :deep(.ant-menu-item.ant-menu-item-selected .anticon) {
  color: #8b5cf6 !important;
}

/* Footer Styles */
.sidebar-footer {
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
}

.footer-actions {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
}

.footer-action-item {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  color: #9ca3af;
  transition: all 0.2s;
}

.footer-action-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.footer-user {
  margin-bottom: 12px;
}

.user-trigger {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.user-trigger:hover {
  background: rgba(255, 255, 255, 0.08);
}

.user-trigger.collapsed {
  justify-content: center;
  padding: 8px 0;
  border: none;
  background: transparent;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  flex-shrink: 0;
}

.user-info {
  margin-left: 12px;
  overflow: hidden;
}

.user-name {
  color: #e5e7eb;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}

.user-role {
  color: #9ca3af;
  font-size: 12px;
  margin-top: 2px;
}

.footer-collapse {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  cursor: pointer;
  color: #6b7280;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 8px;
  padding-top: 8px;
  transition: all 0.2s;
}

.footer-collapse:hover {
  color: #fff;
}

/* Tabs Container Adjustments */
.tabs-container {
  padding: 8px 12px 0;
  background: #f0f2f5;
  /* Need to ensure background matches or is transparent enough */
  position: relative;
  z-index: 10;
}

.dark-theme .tabs-container {
  background: #141414;
}

/* Tab Styles - Keeping existing mostly but ensuring they look good at top */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-nav) {
  margin: 0;
}

:deep(.chrome-tabs.ant-tabs-card .ant-tabs-nav::before) {
  display: none;
}

:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab) {
  background: transparent;
  border: none;
  margin: 0 4px 0 0;
  padding: 6px 16px;
  transition: all 0.2s ease;
  border-radius: 8px 8px 0 0;
  min-width: 100px;
  display: flex;
  align-items: center;
  position: relative;
}

/* Hover state for inactive tabs */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab:not(.ant-tabs-tab-active):hover) {
  background-color: rgba(255, 255, 255, 0.5);
}

/* Active tab styling */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active) {
  background: #ffffff;
  border-radius: 8px 8px 0 0;
  position: relative;
  z-index: 1;
}

/* Visual connection to content */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active::before),
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active::after) {
  content: '';
  position: absolute;
  bottom: 0;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  box-shadow: 0 0 0 40px transparent;
  z-index: 2;
  transition: box-shadow 0.2s ease;
}

/* Left curve */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active::before) {
  left: -20px;
  clip-path: inset(50% -10px 0 50%);
  box-shadow: 10px 10px 0 #ffffff;
}

/* Right curve */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active::after) {
  right: -20px;
  clip-path: inset(50% 50% 0 -10px);
  box-shadow: -10px 10px 0 #ffffff;
}

/* Tab Text */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab-btn) {
  color: #5f6368;
  font-size: 12px;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 24px;
}

:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #1f1f1f;
  font-weight: 600;
}

/* Separator between tabs - ONLY for inactive tabs */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab:not(.ant-tabs-tab-active):not(:last-child)::after) {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 20px;
  background-color: #a0a4a8;
  opacity: 1;
  transition: opacity 0.2s;
  z-index: 1;
}

/* Hide separator when tab is hovered */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab:not(.ant-tabs-tab-active):hover::after) {
  opacity: 0;
}

/* Close button */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab-remove) {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
  transition: all 0.2s;
  opacity: 0;
}

/* Show close button on hover or active */
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab:hover .ant-tabs-tab-remove),
:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-remove) {
  opacity: 1;
}

:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab-remove:hover) {
  background-color: rgba(0, 0, 0, 0.1);
  color: #1f1f1f;
}

:deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab-remove svg) {
  width: 10px;
  height: 10px;
}

/* Dark Mode Overrides for Tabs */
.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab:not(.ant-tabs-tab-active):hover) {
  background-color: rgba(255, 255, 255, 0.08);
}

.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active) {
  background: #323639;
}

.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active::before) {
  box-shadow: 10px 10px 0 #323639;
}

.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active::after) {
  box-shadow: -10px 10px 0 #323639;
}

.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab-btn) {
  color: #9aa0a6;
}

.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #e8eaed;
}

.dark-theme
  :deep(
    .chrome-tabs.ant-tabs-card .ant-tabs-tab:not(.ant-tabs-tab-active):not(:last-child)::after
  ) {
  background-color: #4a4d51;
}

.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab-remove) {
  color: #9aa0a6;
}

.dark-theme :deep(.chrome-tabs.ant-tabs-card .ant-tabs-tab-remove:hover) {
  background-color: rgba(255, 255, 255, 0.1);
  color: #e8eaed;
}

/* Notification Popover Styles */
.notification-item :deep(.ant-menu-item) {
  padding: 12px 16px !important;
}

.notification-content {
  display: flex;
  gap: 12px;
}

.notification-icon {
  color: #fbbf24;
  margin-top: 2px;
}

.notification-title {
  font-weight: 500;
  color: #1f2937;
}

.notification-desc {
  font-size: 12px;
  color: #9ca3af;
}

/* Content Area */
.content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  background-color: #f0f2f5;
  padding: 16px;
}

.dark-theme .content-wrapper {
  background-color: #141414;
}

/* Transitions */
.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.3s ease;
}
.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { Menu, Dropdown, Avatar, Badge, Switch, Space, Button, Tooltip } from 'ant-design-vue'
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  BulbOutlined,
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'

defineProps<{
  collapsed?: boolean
}>()

const emit = defineEmits<{
  toggleCollapse: []
}>()

const selectedKeys = ref(['1'])
const isDark = ref(false)
const notificationCount = ref(5)

const menuItems: MenuProps['items'] = [
  {
    key: '1',
    icon: () => h(HomeOutlined),
    label: '首页',
  },
  {
    key: '2',
    icon: () => h(DashboardOutlined),
    label: '仪表盘',
  },
  {
    key: '3',
    icon: () => h(TeamOutlined),
    label: '团队管理',
    children: [
      { key: '3-1', label: '成员列表' },
      { key: '3-2', label: '权限设置' },
      { key: '3-3', label: '角色管理' },
    ],
  },
  {
    key: '4',
    icon: () => h(FileTextOutlined),
    label: '文档中心',
  },
  {
    key: '5',
    icon: () => h(BarChartOutlined),
    label: '数据分析',
  },
  {
    key: '6',
    icon: () => h(AppstoreOutlined),
    label: '应用市场',
  },
]

const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: () => h(UserOutlined),
    label: '个人信息',
  },
  {
    key: 'settings',
    icon: () => h(SettingOutlined),
    label: '账号设置',
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    icon: () => h(LogoutOutlined),
    label: '退出登录',
    danger: true,
  },
]

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  console.log('Menu clicked:', key)
}

const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
  console.log('User menu clicked:', key)
  if (key === 'logout') {
    console.log('Logout...')
  }
}

const toggleTheme = (checked: boolean | number | string) => {
  const isChecked = typeof checked === 'string' ? checked === 'true' : Boolean(checked)
  isDark.value = isChecked
  document.documentElement.classList.toggle('dark', isChecked)
}

const logoText = computed(() => {
  return '企业管理'
})
</script>

<template>
  <div class="top-header">
    <div class="header-left">
      <Button
        type="text"
        :icon="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
        @click="emit('toggleCollapse')"
        class="collapse-btn"
      >
        <template #icon>
          <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </template>
      </Button>
      <div class="logo">
        <div class="logo-icon">
          <AppstoreOutlined />
        </div>
        <span class="logo-text">{{ logoText }}</span>
      </div>
    </div>

    <div class="header-center">
      <Menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        :items="menuItems"
        theme="light"
        class="nav-menu"
        @click="handleMenuClick"
      />
    </div>

    <div class="header-right">
      <Space size="middle">
        <Tooltip :title="isDark ? '切换亮色' : '切换暗色'">
          <Switch :checked="isDark" @change="toggleTheme" class="theme-switch">
            <template #checkedChildren>
              <BulbOutlined />
            </template>
            <template #unCheckedChildren>
              <BulbOutlined />
            </template>
          </Switch>
        </Tooltip>

        <Badge :count="notificationCount" :offset="[-5, 5]">
          <Button type="text" :icon="BellOutlined" class="icon-btn" />
        </Badge>

        <Dropdown :menu="{ items: userMenuItems, onClick: handleUserMenuClick }">
          <div class="user-info">
            <Avatar :size="32" :icon="UserOutlined" class="user-avatar">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
            <span class="user-name">管理员</span>
          </div>
        </Dropdown>
      </Space>
    </div>
  </div>
</template>

<style scoped>
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.top-header::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
  background-size: 200% 100%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  color: #fff;
  font-size: 18px;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  backdrop-filter: blur(10px);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 800px;
}

.nav-menu {
  background: transparent;
  border: none;
  flex: 1;
  justify-content: center;
}

.nav-menu :deep(.ant-menu-item),
.nav-menu :deep(.ant-menu-submenu) {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 6px;
  margin: 0 4px;
}

.nav-menu :deep(.ant-menu-item:hover),
.nav-menu :deep(.ant-menu-submenu:hover) {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

.nav-menu :deep(.ant-menu-item-selected),
.nav-menu :deep(.ant-menu-submenu-selected) {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 600;
}

.nav-menu :deep(.ant-menu-item::after),
.nav-menu :deep(.ant-menu-submenu::after) {
  display: none;
}

.header-right {
  display: flex;
  align-items: center;
}

.theme-switch {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.theme-switch :deep(.ant-switch-handle) {
  background: #fff;
}

.icon-btn {
  color: #fff;
  font-size: 18px;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.15);
}

.user-avatar {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.1);
  border-color: #fff;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 1200px) {
  .header-center {
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .top-header {
    padding: 0 16px;
  }

  .header-center {
    display: none;
  }

  .user-name {
    display: none;
  }

  .theme-switch {
    display: none;
  }

  .logo-text {
    font-size: 16px;
  }
}
</style>

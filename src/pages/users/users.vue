<script lang="ts">
export default {
  name: 'UsersPage',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons-vue'

const searchText = ref('')

const users = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    lastLogin: '2026-01-30 14:30',
    avatar: 'Z',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: 'active',
    lastLogin: '2026-01-29 09:15',
    avatar: 'L',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '作者',
    status: 'inactive',
    lastLogin: '2026-01-25 16:45',
    avatar: 'W',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '读者',
    status: 'active',
    lastLogin: '2026-01-30 11:20',
    avatar: 'Z',
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: '作者',
    status: 'active',
    lastLogin: '2026-01-28 13:50',
    avatar: 'Q',
  },
])

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    管理员: 'red',
    编辑: 'blue',
    作者: 'green',
    读者: 'default',
  }
  return colors[role] || 'default'
}

const getStatusColor = (status: string) => {
  return status === 'active' ? 'success' : 'default'
}

const getStatusText = (status: string) => {
  return status === 'active' ? '活跃' : '停用'
}
</script>

<template>
  <div class="users-page">
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">用户管理</h1>
        <p class="page-subtitle">管理系统用户和权限</p>
      </div>
      <div class="header-right">
        <a-button type="primary" class="add-btn">
          <PlusOutlined />
          新建用户
        </a-button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-value">1,234</div>
        <div class="stat-label">总用户数</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">98</div>
        <div class="stat-label">今日新增</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">856</div>
        <div class="stat-label">活跃用户</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">12</div>
        <div class="stat-label">管理员</div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="search-box">
        <SearchOutlined class="search-icon" />
        <a-input
          v-model:value="searchText"
          placeholder="搜索用户姓名或邮箱..."
          class="search-input"
          allow-clear
        />
      </div>
      <div class="filter-actions">
        <a-select default-value="all" class="filter-select" placeholder="角色">
          <a-select-option value="all">全部角色</a-select-option>
          <a-select-option value="admin">管理员</a-select-option>
          <a-select-option value="editor">编辑</a-select-option>
          <a-select-option value="author">作者</a-select-option>
        </a-select>
        <a-select default-value="all" class="filter-select" placeholder="状态">
          <a-select-option value="all">全部状态</a-select-option>
          <a-select-option value="active">活跃</a-select-option>
          <a-select-option value="inactive">停用</a-select-option>
        </a-select>
      </div>
    </div>

    <!-- Users List -->
    <div class="content-card">
      <div class="users-list">
        <div v-for="user in users" :key="user.id" class="user-item">
          <div class="user-avatar-wrapper">
            <a-avatar :size="48" class="user-avatar" :class="`avatar-${getRoleColor(user.role)}`">
              {{ user.avatar }}
            </a-avatar>
          </div>
          <div class="user-info">
            <div class="user-name-row">
              <span class="user-name">{{ user.name }}</span>
              <a-tag :color="getRoleColor(user.role)" class="user-role">{{ user.role }}</a-tag>
              <a-tag :color="getStatusColor(user.status)" class="user-status">
                {{ getStatusText(user.status) }}
              </a-tag>
            </div>
            <div class="user-meta">
              <span class="meta-item">
                <MailOutlined />
                {{ user.email }}
              </span>
              <span class="meta-item">
                <ClockCircleOutlined />
                最后登录: {{ user.lastLogin }}
              </span>
            </div>
          </div>
          <div class="user-actions">
            <a-button type="link" class="action-btn">
              <EditOutlined />
            </a-button>
            <a-button type="link" class="action-btn" danger>
              <DeleteOutlined />
            </a-button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-wrapper">
        <a-pagination :total="50" :page-size="10" show-size-changer show-quick-jumper />
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-page {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin: 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--text-secondary, #64748b);
  margin: 0;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 24px;
  border-radius: 10px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* Stats Row */
.stats-row {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
  padding: 20px 32px;
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #e2e8f0);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  line-height: 1.2;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary, #64748b);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color, #e2e8f0);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
}

.search-box {
  position: relative;
  width: 320px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted, #94a3b8);
  font-size: 16px;
  z-index: 1;
}

.search-input {
  padding-left: 42px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--card-bg, #ffffff);
}

.search-input:hover,
.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.filter-select {
  width: 140px;
}

/* Content Card */
.content-card {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #e2e8f0);
}

/* Users List */
.users-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: var(--hover-bg, #f8fafc);
  transition: all 0.3s ease;
}

.user-item:hover {
  background: var(--active-bg, #f1f5f9);
  transform: translateX(4px);
}

.user-avatar-wrapper {
  flex-shrink: 0;
}

.user-avatar {
  font-weight: 600;
  font-size: 18px;
}

.avatar-red {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
}

.avatar-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.avatar-green {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.avatar-default {
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
}

.user-role {
  font-size: 12px;
}

.user-status {
  font-size: 12px;
}

.user-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 13px;
  color: var(--text-muted, #94a3b8);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.user-item:hover .user-actions {
  opacity: 1;
}

.action-btn {
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.action-btn:hover {
  background: var(--hover-bg, #e2e8f0);
}

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid var(--border-color, #e2e8f0);
}

/* Dark theme variables */
:global([data-theme='dark']) {
  --card-bg: #1e293b;
  --hover-bg: #334155;
  --active-bg: #475569;
}

:global([data-theme='light']) {
  --card-bg: #ffffff;
  --hover-bg: #f8fafc;
  --active-bg: #f1f5f9;
}
</style>

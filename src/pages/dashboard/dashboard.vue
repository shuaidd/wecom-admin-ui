<script lang="ts">
export default {
  name: 'DashboardPage',
}
</script>

<script setup lang="ts">
import { RiseOutlined, TeamOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons-vue'

const stats = [
  {
    title: '总访问量',
    value: '128,450',
    change: '+12.5%',
    icon: EyeOutlined,
    color: 'blue',
  },
  {
    title: '文章数量',
    value: '2,847',
    change: '+8.2%',
    icon: FileTextOutlined,
    color: 'green',
  },
  {
    title: '用户总数',
    value: '15,234',
    change: '+23.1%',
    icon: TeamOutlined,
    color: 'purple',
  },
  {
    title: '增长率',
    value: '18.7%',
    change: '+5.4%',
    icon: RiseOutlined,
    color: 'orange',
  },
]

const recentArticles = [
  { title: 'Vue 3 组合式 API 最佳实践', date: '2026-01-30', views: 1234 },
  { title: 'TypeScript 高级类型指南', date: '2026-01-29', views: 987 },
  { title: '前端性能优化技巧总结', date: '2026-01-28', views: 856 },
  { title: 'Ant Design Vue 4.0 新特性', date: '2026-01-27', views: 743 },
  { title: 'Pinia 状态管理完全指南', date: '2026-01-26', views: 652 },
]
</script>

<template>
  <div class="dashboard">
    <div class="page-header">
      <h1 class="page-title">仪表盘</h1>
      <p class="page-subtitle">欢迎回来，Admin！这是您今天的数据概览。</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.title" class="stat-card">
        <div class="stat-icon" :class="`stat-icon-${stat.color}`">
          <component :is="stat.icon" />
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-title">{{ stat.title }}</div>
          <div class="stat-change">
            <span class="change-value">{{ stat.change }}</span>
            <span class="change-label">较上月</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="content-grid">
      <!-- Recent Articles -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">最近文章</h3>
          <a-button type="link">查看全部</a-button>
        </div>
        <div class="article-list">
          <div v-for="(article, index) in recentArticles" :key="index" class="article-item">
            <div class="article-info">
              <div class="article-title">{{ article.title }}</div>
              <div class="article-meta">
                <span class="article-date">{{ article.date }}</span>
                <span class="article-views">
                  <EyeOutlined />
                  {{ article.views }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="content-card">
        <div class="card-header">
          <h3 class="card-title">快捷操作</h3>
        </div>
        <div class="action-grid">
          <button class="action-btn">
            <FileTextOutlined class="action-icon" />
            <span class="action-label">写文章</span>
          </button>
          <button class="action-btn">
            <TeamOutlined class="action-icon" />
            <span class="action-label">添加用户</span>
          </button>
          <button class="action-btn">
            <RiseOutlined class="action-icon" />
            <span class="action-label">查看报表</span>
          </button>
          <button class="action-btn">
            <EyeOutlined class="action-icon" />
            <span class="action-label">预览网站</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
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
  margin-bottom: 32px;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--text-secondary, #64748b);
  font-weight: 400;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color, #e2e8f0);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.stat-icon-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-icon-green {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.stat-icon-purple {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.stat-icon-orange {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-title {
  font-size: 14px;
  color: var(--text-secondary, #64748b);
  margin-bottom: 8px;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 6px;
}

.change-value {
  font-size: 13px;
  font-weight: 600;
  color: #10b981;
}

.change-label {
  font-size: 12px;
  color: var(--text-muted, #94a3b8);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.content-card {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #e2e8f0);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  font-family: 'Playfair Display', serif;
}

/* Article List */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-item {
  padding: 16px;
  border-radius: 12px;
  background: var(--hover-bg, #f8fafc);
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-item:hover {
  background: var(--active-bg, #f1f5f9);
  transform: translateX(4px);
}

.article-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary, #1e293b);
  margin-bottom: 8px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: var(--text-muted, #94a3b8);
}

.article-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Action Grid */
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: var(--hover-bg, #f8fafc);
  border-color: #667eea;
  transform: translateY(-2px);
}

.action-icon {
  font-size: 28px;
  color: #667eea;
}

.action-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, #64748b);
}

/* Dark theme variables */
:global([data-theme='dark']) {
  --card-bg: #1e293b;
  --active-bg: #334155;
}

:global([data-theme='light']) {
  --card-bg: #ffffff;
  --active-bg: #f1f5f9;
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>

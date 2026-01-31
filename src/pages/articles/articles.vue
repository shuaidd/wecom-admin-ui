<script lang="ts">
export default {
  name: 'ArticlesPage',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons-vue'

const searchText = ref('')

const articles = ref([
  {
    id: 1,
    title: 'Vue 3 组合式 API 最佳实践',
    category: '技术',
    author: 'Admin',
    date: '2026-01-30',
    views: 1234,
    status: 'published',
  },
  {
    id: 2,
    title: 'TypeScript 高级类型指南',
    category: '技术',
    author: 'Admin',
    date: '2026-01-29',
    views: 987,
    status: 'published',
  },
  {
    id: 3,
    title: '前端性能优化技巧总结',
    category: '技术',
    author: 'Admin',
    date: '2026-01-28',
    views: 856,
    status: 'draft',
  },
  {
    id: 4,
    title: 'Ant Design Vue 4.0 新特性',
    category: '技术',
    author: 'Admin',
    date: '2026-01-27',
    views: 743,
    status: 'published',
  },
  {
    id: 5,
    title: 'Pinia 状态管理完全指南',
    category: '技术',
    author: 'Admin',
    date: '2026-01-26',
    views: 652,
    status: 'published',
  },
])

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    published: 'success',
    draft: 'warning',
    archived: 'default',
  }
  return colors[status] || 'default'
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    published: '已发布',
    draft: '草稿',
    archived: '已归档',
  }
  return texts[status] || status
}
</script>

<template>
  <div class="articles-page">
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">文章管理</h1>
        <p class="page-subtitle">管理您的所有文章和内容</p>
      </div>
      <div class="header-right">
        <a-button type="primary" class="add-btn">
          <PlusOutlined />
          新建文章
        </a-button>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="filter-bar">
      <div class="search-box">
        <SearchOutlined class="search-icon" />
        <a-input
          v-model:value="searchText"
          placeholder="搜索文章标题..."
          class="search-input"
          allow-clear
        />
      </div>
      <div class="filter-actions">
        <a-select default-value="all" class="filter-select" placeholder="状态">
          <a-select-option value="all">全部状态</a-select-option>
          <a-select-option value="published">已发布</a-select-option>
          <a-select-option value="draft">草稿</a-select-option>
        </a-select>
        <a-select default-value="all" class="filter-select" placeholder="分类">
          <a-select-option value="all">全部分类</a-select-option>
          <a-select-option value="tech">技术</a-select-option>
          <a-select-option value="life">生活</a-select-option>
        </a-select>
      </div>
    </div>

    <!-- Articles Table -->
    <div class="content-card">
      <a-table :data-source="articles" :pagination="false" class="articles-table">
        <a-table-column title="标题" data-index="title" key="title">
          <template #default="{ text }">
            <span class="article-title">{{ text }}</span>
          </template>
        </a-table-column>
        <a-table-column title="分类" data-index="category" key="category" width="120">
          <template #default="{ text }">
            <a-tag color="blue">{{ text }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="作者" data-index="author" key="author" width="100" />
        <a-table-column title="发布日期" data-index="date" key="date" width="120" />
        <a-table-column title="阅读量" data-index="views" key="views" width="100">
          <template #default="{ text }">
            <span class="views-count">
              <EyeOutlined />
              {{ text }}
            </span>
          </template>
        </a-table-column>
        <a-table-column title="状态" data-index="status" key="status" width="100">
          <template #default="{ text }">
            <a-tag :color="getStatusColor(text)">{{ getStatusText(text) }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="操作" key="action" width="150">
          <template #default>
            <div class="action-btns">
              <a-button type="link" class="action-btn">
                <EditOutlined />
              </a-button>
              <a-button type="link" class="action-btn" danger>
                <DeleteOutlined />
              </a-button>
            </div>
          </template>
        </a-table-column>
      </a-table>

      <!-- Pagination -->
      <div class="pagination-wrapper">
        <a-pagination :total="50" :page-size="10" show-size-changer show-quick-jumper />
      </div>
    </div>
  </div>
</template>

<style scoped>
.articles-page {
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
  margin-bottom: 32px;
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

/* Table Styles */
.articles-table {
  margin-bottom: 24px;
}

.article-title {
  font-weight: 500;
  color: var(--text-primary, #1e293b);
}

.views-count {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary, #64748b);
}

.action-btns {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--hover-bg, #f1f5f9);
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
}

:global([data-theme='light']) {
  --card-bg: #ffffff;
  --hover-bg: #f1f5f9;
}
</style>

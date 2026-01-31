<script lang="ts">
export default {
  name: 'CategoriesPage',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined, EditOutlined, DeleteOutlined, FolderOutlined } from '@ant-design/icons-vue'

const categories = ref([
  { id: 1, name: '技术', count: 45, description: '技术相关文章' },
  { id: 2, name: '生活', count: 23, description: '生活随笔' },
  { id: 3, name: '随笔', count: 12, description: '日常记录' },
  { id: 4, name: '教程', count: 18, description: '教程文档' },
  { id: 5, name: '新闻', count: 8, description: '行业新闻' },
])

const getTagColor = (index: number) => {
  const colors = ['blue', 'green', 'purple', 'orange', 'red']
  return colors[index % colors.length]
}
</script>

<template>
  <div class="categories-page">
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">分类管理</h1>
        <p class="page-subtitle">管理文章分类和标签</p>
      </div>
      <div class="header-right">
        <a-button type="primary" class="add-btn">
          <PlusOutlined />
          新建分类
        </a-button>
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="categories-grid">
      <div v-for="(category, index) in categories" :key="category.id" class="category-card">
        <div class="category-icon" :class="`category-icon-${getTagColor(index)}`">
          <FolderOutlined />
        </div>
        <div class="category-info">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-desc">{{ category.description }}</p>
          <div class="category-meta">
            <span class="article-count">{{ category.count }} 篇文章</span>
          </div>
        </div>
        <div class="category-actions">
          <a-button type="link" class="action-btn">
            <EditOutlined />
          </a-button>
          <a-button type="link" class="action-btn" danger>
            <DeleteOutlined />
          </a-button>
        </div>
      </div>

      <!-- Add New Category Card -->
      <div class="category-card add-card">
        <div class="add-icon">
          <PlusOutlined />
        </div>
        <span class="add-text">添加新分类</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories-page {
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

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.category-card {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #e2e8f0);
  transition: all 0.3s ease;
  position: relative;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.category-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  color: white;
}

.category-icon-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.category-icon-green {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.category-icon-purple {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.category-icon-orange {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.category-icon-red {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
}

.category-info {
  flex: 1;
  min-width: 0;
}

.category-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin: 0 0 8px 0;
}

.category-desc {
  font-size: 14px;
  color: var(--text-secondary, #64748b);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.category-meta {
  display: flex;
  align-items: center;
}

.article-count {
  font-size: 13px;
  color: var(--text-muted, #94a3b8);
  background: var(--hover-bg, #f1f5f9);
  padding: 4px 12px;
  border-radius: 20px;
}

.category-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.category-card:hover .category-actions {
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

/* Add Card */
.add-card {
  border: 2px dashed var(--border-color, #e2e8f0);
  background: transparent;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  gap: 12px;
}

.add-card:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.02);
}

.add-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--hover-bg, #f1f5f9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #667eea;
  transition: all 0.3s ease;
}

.add-card:hover .add-icon {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.add-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary, #64748b);
}

.add-card:hover .add-text {
  color: #667eea;
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

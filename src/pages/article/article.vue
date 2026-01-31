<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticlePage',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '发布时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '操作',
    key: 'action',
  },
])

const data = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 入门指南',
    author: '张三',
    date: '2024-01-15',
  },
  {
    id: 2,
    title: 'TypeScript 最佳实践',
    author: '李四',
    date: '2024-01-14',
  },
  {
    id: 3,
    title: '前端性能优化技巧',
    author: '王五',
    date: '2024-01-13',
  },
])
</script>

<template>
  <div class="article-page">
    <a-card title="文章列表">
      <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">编辑</a-button>
              <a-button type="link" size="small" danger>删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped>
.article-page {
  padding: 0;
}
</style>

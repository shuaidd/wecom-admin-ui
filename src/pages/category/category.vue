<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CategoryPage',
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
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '文章数量',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: '操作',
    key: 'action',
  },
])

const categories = ref([
  {
    id: 1,
    name: '技术文章',
    count: 120,
  },
  {
    id: 2,
    name: '生活随笔',
    count: 56,
  },
  {
    id: 3,
    name: '教程指南',
    count: 34,
  },
])
</script>

<template>
  <div class="category-page">
    <a-card title="分类管理">
      <a-space direction="vertical" style="width: 100%">
        <a-table :columns="columns" :data-source="categories" :pagination="false">
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
              <a-space>
                <a-button type="link" size="small">编辑</a-button>
                <a-button type="link" size="small" danger>删除</a-button>
              </a-space>
            </template>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </div>
</template>

<style scoped>
.category-page {
  padding: 0;
}
</style>

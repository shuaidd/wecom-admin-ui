<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { title: '消息内容', dataIndex: 'content', key: 'content', ellipsis: true },
  { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '最后修改时间', dataIndex: 'updateTime', key: 'updateTime', width: 200 },
  { title: '操作', key: 'action', width: 150 },
]

const data = ref([
  {
    key: '1',
    content: '春节放假通知草稿...',
    type: '文本',
    updateTime: '2024-01-15 16:30:00',
  },
  {
    key: '2',
    content: '产品介绍V2.pdf',
    type: '文件',
    updateTime: '2024-01-10 11:20:00',
  },
])
</script>

<template>
  <div class="mass-message-drafts">
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a>编辑</a>
            <a class="danger-text">删除</a>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.mass-message-drafts {
  padding-top: 16px;
}
.danger-text {
  color: #ff4d4f;
}
</style>

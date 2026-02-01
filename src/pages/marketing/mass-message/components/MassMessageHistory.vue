<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { title: '消息内容', dataIndex: 'content', key: 'content', width: 250, ellipsis: true },
  { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '发送对象', dataIndex: 'target', key: 'target' },
  { title: '发送时间', dataIndex: 'sendTime', key: 'sendTime' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '送达/已读', dataIndex: 'stats', key: 'stats' },
  { title: '操作', key: 'action', width: 150 },
]

const data = ref([
  {
    key: '1',
    content: '双十一大促开启！全场5折起...',
    type: '文本',
    target: '全部客户',
    sendTime: '2023-11-11 10:00:00',
    status: 'completed', // completed, sending, failed
    stats: '98% / 45%',
  },
  {
    key: '2',
    content: '新品发布会邀请函',
    type: '图文',
    target: 'VIP客户',
    sendTime: '2023-12-01 14:00:00',
    status: 'sending',
    stats: '- / -',
  },
  {
    key: '3',
    content: '客户回访调查',
    type: '链接',
    target: '活跃客户',
    sendTime: '2023-10-20 09:30:00',
    status: 'failed',
    stats: '0% / 0%',
  },
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'sending':
      return 'processing'
    case 'failed':
      return 'error'
    default:
      return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return '已发送'
    case 'sending':
      return '发送中'
    case 'failed':
      return '发送失败'
    default:
      return '未知'
  }
}
</script>

<template>
  <div class="mass-message-history">
    <div class="mb-4 flex justify-between">
      <a-space>
        <a-range-picker />
        <a-select placeholder="消息类型" style="width: 120px" allow-clear>
          <a-select-option value="text">文本</a-select-option>
          <a-select-option value="image">图片</a-select-option>
        </a-select>
        <a-button type="primary">查询</a-button>
      </a-space>
      <a-button>导出数据</a-button>
    </div>

    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-tag :color="getStatusColor(record.status)">
            {{ getStatusText(record.status) }}
          </a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a>详情</a>
            <a>复制</a>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.mass-message-history {
  padding-top: 16px;
}
</style>

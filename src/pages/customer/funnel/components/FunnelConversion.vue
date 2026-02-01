<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  {
    title: '转化环节',
    dataIndex: 'stage',
    key: 'stage',
  },
  {
    title: '本周转化率',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '上周同期',
    dataIndex: 'lastRate',
    key: 'lastRate',
  },
  {
    title: '环比变化',
    dataIndex: 'change',
    key: 'change',
  },
]

const data = [
  {
    key: '1',
    stage: '曝光 → 点击',
    rate: '35.9%',
    lastRate: '34.2%',
    change: '+1.7%',
    status: 'up',
  },
  {
    key: '2',
    stage: '点击 → 扫码',
    rate: '41.1%',
    lastRate: '42.0%',
    change: '-0.9%',
    status: 'down',
  },
  {
    key: '3',
    stage: '扫码 → 添加',
    rate: '45.7%',
    lastRate: '43.5%',
    change: '+2.2%',
    status: 'up',
  },
  {
    key: '4',
    stage: '添加 → 转化',
    rate: '27.0%',
    lastRate: '25.5%',
    change: '+1.5%',
    status: 'up',
  },
  {
    key: '5',
    stage: '整体转化 (曝光→转化)',
    rate: '1.83%',
    lastRate: '1.65%',
    change: '+0.18%',
    status: 'up',
  },
]

const activeKey = ref('all')
</script>

<template>
  <a-card title="各环节转化率分析" :bordered="false" class="conversion-card">
    <template #extra>
      <a-radio-group v-model:value="activeKey" size="small">
        <a-radio-button value="all">整体</a-radio-button>
        <a-radio-button value="channelA">渠道A</a-radio-button>
        <a-radio-button value="channelB">渠道B</a-radio-button>
      </a-radio-group>
    </template>

    <a-table :columns="columns" :data-source="data" :pagination="false" size="small">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'change'">
          <span :class="record.status === 'up' ? 'text-up' : 'text-down'">
            {{ record.change }}
          </span>
        </template>
        <template v-if="column.key === 'rate'">
          <a-progress
            :percent="parseFloat(record.rate)"
            size="small"
            :status="record.status === 'up' ? 'active' : 'normal'"
          />
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<style scoped>
.conversion-card {
  height: 100%;
}

.text-up {
  color: #f5222d;
}

.text-down {
  color: #52c41a;
}
</style>

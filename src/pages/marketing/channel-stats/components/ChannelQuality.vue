<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { title: '渠道名称', dataIndex: 'name', key: 'name' },
  { title: '活跃度', dataIndex: 'activity', key: 'activity' },
  { title: '转化率', dataIndex: 'conversionRate', key: 'conversionRate' },
  { title: '留存率', dataIndex: 'retentionRate', key: 'retentionRate' },
  { title: '平均客单价', dataIndex: 'avgPrice', key: 'avgPrice' },
  { title: '综合评分', dataIndex: 'score', key: 'score' },
]

const data = ref([
  {
    key: '1',
    name: '百度推广',
    activity: '高',
    conversionRate: '5%',
    retentionRate: '30%',
    avgPrice: '¥200',
    score: 85,
  },
  {
    key: '2',
    name: '地推',
    activity: '中',
    conversionRate: '15%',
    retentionRate: '10%',
    avgPrice: '¥150',
    score: 70,
  },
])
</script>

<template>
  <div class="channel-quality">
    <a-card title="渠道质量评估">
      <a-table :columns="columns" :data-source="data" />

      <a-card title="优化策略建议" style="margin-top: 24px" :bordered="false">
        <p>1. 针对<strong>地推</strong>渠道，虽然转化率高，但留存率低，建议加强后续客户关怀。</p>
        <p>2. <strong>百度推广</strong>渠道客户质量整体较高，可考虑扩大投入。</p>
      </a-card>
    </a-card>
  </div>
</template>

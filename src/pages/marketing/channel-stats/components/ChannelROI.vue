<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { title: '渠道名称', dataIndex: 'name', key: 'name' },
  { title: '投入成本 (元)', dataIndex: 'cost', key: 'cost' },
  { title: '收益 (元)', dataIndex: 'revenue', key: 'revenue' },
  { title: 'ROI', dataIndex: 'roi', key: 'roi' },
  { title: '投入产出比', dataIndex: 'ratio', key: 'ratio' },
  { title: '操作', key: 'action' },
]

const data = ref([
  { key: '1', name: '百度推广', cost: 5000, revenue: 12000, roi: '140%', ratio: '1:2.4' },
  { key: '2', name: '朋友圈广告', cost: 3000, revenue: 4500, roi: '50%', ratio: '1:1.5' },
])
</script>

<template>
  <div class="channel-roi">
    <a-card title="渠道ROI计算">
      <template #extra>
        <a-button type="primary">录入成本</a-button>
      </template>

      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>详情</a>
          </template>
        </template>
      </a-table>

      <a-list item-layout="horizontal" style="margin-top: 24px" header="优化建议">
        <a-list-item>
          <a-list-item-meta description="百度推广ROI表现优异，建议增加预算。">
            <template #title>
              <a>百度推广</a>
            </template>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="朋友圈广告ROI较低，建议优化素材或调整投放人群。">
            <template #title>
              <a>朋友圈广告</a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('new')
</script>

<template>
  <div class="channel-analysis">
    <a-card title="渠道对比分析">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="new" tab="新增对比" />
        <a-tab-pane key="active" tab="活跃对比" />
        <a-tab-pane key="conversion" tab="转化对比" />
        <a-tab-pane key="roi" tab="ROI对比" />
      </a-tabs>

      <a-row :gutter="16" style="margin-top: 24px">
        <a-col :span="12">
          <div
            style="
              height: 300px;
              background: #f0f2f5;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            柱状图 (Bar Chart Placeholder)
          </div>
        </a-col>
        <a-col :span="12">
          <div
            style="
              height: 300px;
              background: #f0f2f5;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            折线图 (Line Chart Placeholder)
          </div>
        </a-col>
      </a-row>
      <div
        style="
          margin-top: 24px;
          height: 300px;
          background: #f0f2f5;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        雷达图 (Radar Chart Placeholder)
      </div>

      <a-divider />

      <a-descriptions title="对比报告摘要">
        <a-descriptions-item label="最佳获客渠道">搜索引擎</a-descriptions-item>
        <a-descriptions-item label="最高ROI渠道">社交媒体广告</a-descriptions-item>
        <a-descriptions-item label="需改进渠道">线下活动</a-descriptions-item>
      </a-descriptions>

      <a-alert
        message="改进建议: 线下活动成本较高，建议优化活动流程或转向线上推广。"
        type="info"
        show-icon
        style="margin-top: 16px"
      />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const reportType = ref('daily')
</script>

<template>
  <div class="channel-trend">
    <a-card title="渠道趋势报告">
      <template #extra>
        <a-space>
          <a-button>导出报告</a-button>
          <a-button type="primary">自动推送设置</a-button>
        </a-space>
      </template>

      <div style="margin-bottom: 24px">
        <a-radio-group v-model:value="reportType" button-style="solid">
          <a-radio-button value="daily">日报</a-radio-button>
          <a-radio-button value="weekly">周报</a-radio-button>
          <a-radio-button value="monthly">月报</a-radio-button>
          <a-radio-button value="custom">自定义</a-radio-button>
        </a-radio-group>
      </div>

      <div
        style="
          height: 400px;
          background: #f0f2f5;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        趋势分析图表 (Trend Chart Placeholder)
      </div>

      <div v-if="reportType === 'monthly'" style="margin-top: 24px">
        <h3>同比环比分析</h3>
        <p>本月新增客户环比增长 12%，同比增长 5%。</p>
      </div>
    </a-card>
  </div>
</template>

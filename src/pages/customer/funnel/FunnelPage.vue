<script setup lang="ts">
import { ref } from 'vue'
import FunnelStats from './components/FunnelStats.vue'
import FunnelConversion from './components/FunnelConversion.vue'
import FunnelTrends from './components/FunnelTrends.vue'
import FunnelAlerts from './components/FunnelAlerts.vue'

const activeTab = ref('overview')
</script>

<template>
  <div class="funnel-page">
    <div class="page-header">
      <h1 class="page-title">获客漏斗</h1>
      <div class="page-desc">
        全链路监控获客数据，分析各环节转化效率，通过智能预警及时发现异常。
      </div>
    </div>

    <a-tabs v-model:activeKey="activeTab" class="page-tabs">
      <a-tab-pane key="overview" tab="漏斗总览">
        <a-space direction="vertical" size="large" style="width: 100%">
          <FunnelStats />
          <a-row :gutter="24">
            <a-col :span="12">
              <FunnelConversion />
            </a-col>
            <a-col :span="12">
              <FunnelAlerts />
            </a-col>
          </a-row>
          <FunnelTrends />
        </a-space>
      </a-tab-pane>
      <a-tab-pane key="analysis" tab="深度分析">
        <a-empty description="更多深度分析功能开发中..." />
      </a-tab-pane>
      <a-tab-pane key="settings" tab="预警设置">
        <a-empty description="预警设置功能开发中..." />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
.funnel-page {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 8px;
}

.page-desc {
  color: #8c8c8c;
  font-size: 14px;
}

.page-tabs {
  background: #fff;
  padding: 16px 24px;
  border-radius: 8px;
}
</style>

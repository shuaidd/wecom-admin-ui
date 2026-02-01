<script setup lang="ts">
import { ref } from 'vue'
import ChannelOverview from './components/ChannelOverview.vue'
import ChannelAnalysis from './components/ChannelAnalysis.vue'
import ChannelROI from './components/ChannelROI.vue'
import ChannelTrend from './components/ChannelTrend.vue'
import ChannelQuality from './components/ChannelQuality.vue'

const activeKey = ref('overview')
</script>

<template>
  <div class="channel-stats-page">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="overview" tab="渠道数据总览">
        <ChannelOverview />
      </a-tab-pane>
      <a-tab-pane key="analysis" tab="渠道对比分析">
        <ChannelAnalysis />
      </a-tab-pane>
      <a-tab-pane key="roi" tab="渠道ROI计算">
        <ChannelROI />
      </a-tab-pane>
      <a-tab-pane key="trend" tab="渠道趋势报告">
        <ChannelTrend />
      </a-tab-pane>
      <a-tab-pane key="quality" tab="渠道质量评估">
        <ChannelQuality />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
.channel-stats-page {
  padding: 24px;
  background: #fff;
  min-height: 100%;
}
</style>

<script setup lang="ts">
import { reactive } from 'vue'
import {
  EyeOutlined,
  SelectOutlined,
  QrcodeOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue'

const stats = reactive([
  {
    title: '曝光量',
    value: 125800,
    unit: '次',
    rate: '100%',
    color: '#1890ff',
    icon: EyeOutlined,
    trend: 12.5,
    trendType: 'up',
  },
  {
    title: '点击量',
    value: 45200,
    unit: '次',
    rate: '35.9%',
    color: '#40a9ff',
    icon: SelectOutlined,
    trend: 5.2,
    trendType: 'up',
  },
  {
    title: '扫码量',
    value: 18600,
    unit: '次',
    rate: '41.1%',
    color: '#69c0ff',
    icon: QrcodeOutlined,
    trend: -2.1,
    trendType: 'down',
  },
  {
    title: '添加量',
    value: 8500,
    unit: '人',
    rate: '45.7%',
    color: '#91d5ff',
    icon: UserAddOutlined,
    trend: 8.4,
    trendType: 'up',
  },
  {
    title: '转化量',
    value: 2300,
    unit: '人',
    rate: '27.0%',
    color: '#bae7ff',
    icon: CheckCircleOutlined,
    trend: 15.3,
    trendType: 'up',
  },
])
</script>

<template>
  <a-card title="漏斗数据统计" :bordered="false">
    <div class="funnel-container">
      <div v-for="(item, index) in stats" :key="index" class="funnel-step">
        <div class="step-card" :style="{ borderLeft: `4px solid ${item.color}` }">
          <div class="step-header">
            <span class="step-title">
              <component :is="item.icon" style="margin-right: 8px" />
              {{ item.title }}
            </span>
            <span :class="['trend', item.trendType]">
              {{ item.trendType === 'up' ? '+' : '' }}{{ item.trend }}%
            </span>
          </div>
          <div class="step-value">
            {{ item.value.toLocaleString() }}
            <span class="unit">{{ item.unit }}</span>
          </div>
          <div class="step-footer">
            <span class="label">转化率</span>
            <span class="rate">{{ item.rate }}</span>
          </div>
        </div>

        <!-- Funnel connector/arrow -->
        <div v-if="index < stats.length - 1" class="funnel-arrow">
          <div class="arrow-line"></div>
          <div class="arrow-head"></div>
        </div>
      </div>
    </div>

    <!-- Visual Funnel Bar Representation -->
    <div class="visual-funnel">
      <div v-for="(item, index) in stats" :key="'bar-' + index" class="funnel-bar-row">
        <div class="bar-label">{{ item.title }}</div>
        <div class="bar-wrapper">
          <div
            class="bar"
            :style="{
              width: index === 0 ? '100%' : `${(item.value / (stats[0]?.value || 1)) * 100}%`,
              backgroundColor: item.color,
            }"
          >
            <span class="bar-text">{{ item.rate }}</span>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.funnel-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.funnel-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-card {
  width: 100%;
  max-width: 180px;
  background: #fcfcfc;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
}

.step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.step-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #595959;
}

.trend.up {
  color: #f5222d;
}
.trend.down {
  color: #52c41a;
}

.step-value {
  font-size: 24px;
  font-weight: bold;
  color: #1f1f1f;
  margin-bottom: 8px;
}

.unit {
  font-size: 12px;
  color: #8c8c8c;
  font-weight: normal;
  margin-left: 4px;
}

.step-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #8c8c8c;
}

.rate {
  color: #1890ff;
  font-weight: 500;
}

.funnel-arrow {
  position: absolute;
  right: -50%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hide arrow for last item */
.funnel-step:last-child .funnel-arrow {
  display: none;
}

.visual-funnel {
  margin-top: 24px;
  padding: 0 24px;
}

.funnel-bar-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.bar-label {
  width: 80px;
  text-align: right;
  margin-right: 16px;
  color: #595959;
}

.bar-wrapper {
  flex: 1;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  height: 24px;
}

.bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  border-radius: 0 4px 4px 0;
  transition: width 1s ease-in-out;
}

.bar-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
}
</style>

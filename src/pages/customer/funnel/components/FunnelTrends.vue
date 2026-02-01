<script setup lang="ts">
import { ref, computed } from 'vue'

const timeRange = ref('week')

const trendData = computed(() => {
  // Mock data generator
  const base = timeRange.value === 'week' ? 7 : 30
  const data = []
  for (let i = 0; i < base; i++) {
    const value = Math.floor(Math.random() * 50) + 50
    data.push({
      date: `11-${i + 1}`,
      value,
      height: value + '%',
      isPredict: false,
    })
  }
  // Add prediction
  data.push({
    date: '预测',
    value: 65,
    height: '65%',
    isPredict: true,
  })
  return data
})
</script>

<template>
  <a-card title="漏斗趋势分析" :bordered="false" class="trend-card">
    <template #extra>
      <a-radio-group v-model:value="timeRange" size="small">
        <a-radio-button value="day">日趋势</a-radio-button>
        <a-radio-button value="week">周趋势</a-radio-button>
        <a-radio-button value="month">月趋势</a-radio-button>
      </a-radio-group>
    </template>

    <div class="chart-container">
      <div class="y-axis">
        <span>100</span>
        <span>75</span>
        <span>50</span>
        <span>25</span>
        <span>0</span>
      </div>
      <div class="bars-container">
        <div v-for="(item, index) in trendData" :key="index" class="bar-group">
          <div
            class="bar"
            :class="{ 'is-predict': item.isPredict }"
            :style="{ height: item.height }"
            :title="`数值: ${item.value}`"
          >
            <span class="bar-value">{{ item.value }}</span>
          </div>
          <div class="x-label">{{ item.date }}</div>
        </div>
      </div>
    </div>

    <div class="chart-legend">
      <div class="legend-item"><span class="dot real"></span> 实际转化数</div>
      <div class="legend-item"><span class="dot predict"></span> 预测趋势</div>
    </div>
  </a-card>
</template>

<style scoped>
.trend-card {
  margin-top: 24px;
}

.chart-container {
  display: flex;
  height: 300px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 16px;
  color: #8c8c8c;
  font-size: 12px;
  border-right: 1px solid #f0f0f0;
}

.bars-container {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-left: 20px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  flex: 1;
  margin: 0 4px;
}

.bar {
  width: 30px;
  background: #1890ff;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
  position: relative;
  min-height: 4px;
}

.bar:hover {
  opacity: 0.8;
}

.bar.is-predict {
  background: #d9d9d9;
  border: 1px dashed #1890ff;
}

.bar-value {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #595959;
  opacity: 0;
  transition: opacity 0.2s;
}

.bar:hover .bar-value {
  opacity: 1;
}

.x-label {
  margin-top: 8px;
  font-size: 12px;
  color: #8c8c8c;
}

.chart-legend {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 16px;
  font-size: 12px;
  color: #595959;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.dot.real {
  background: #1890ff;
}
.dot.predict {
  background: #d9d9d9;
  border: 1px solid #1890ff;
}
</style>

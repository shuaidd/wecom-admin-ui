<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerCharts',
})
</script>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { mockTrendData, mockStatusDistribution } from '@/api/mock-data'

const trendChartRef = ref<HTMLElement>()
const statusChartRef = ref<HTMLElement>()
let trendChart: echarts.ECharts | null = null
let statusChart: echarts.ECharts | null = null

const initTrendChart = () => {
  if (!trendChartRef.value) return

  trendChart = echarts.init(trendChartRef.value)

  const option: EChartsOption = {
    title: {
      text: '客户趋势分析',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['新增客户', '活跃客户', '转化客户'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: mockTrendData.map((item) => item.date),
    },
    yAxis: {
      type: 'value',
      name: '数量',
    },
    series: [
      {
        name: '新增客户',
        type: 'line',
        data: mockTrendData.map((item) => item.addCount),
        smooth: true,
        itemStyle: { color: '#1890ff' },
      },
      {
        name: '活跃客户',
        type: 'line',
        data: mockTrendData.map((item) => item.activeCount),
        smooth: true,
        itemStyle: { color: '#52c41a' },
      },
      {
        name: '转化客户',
        type: 'line',
        data: mockTrendData.map((item) => item.convertCount),
        smooth: true,
        itemStyle: { color: '#722ed1' },
      },
    ],
  }

  trendChart.setOption(option)
}

const initStatusChart = () => {
  if (!statusChartRef.value) return

  statusChart = echarts.init(statusChartRef.value)

  const option: EChartsOption = {
    title: {
      text: '客户状态分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: mockStatusDistribution.map((item) => {
        const statusMap: Record<string, string> = {
          potential: '潜在客户',
          intention: '意向客户',
          deal: '已成交',
          lost: '已流失',
        }
        return statusMap[item.status] || item.status
      }) as string[],
    },
    series: [
      {
        name: '客户状态',
        type: 'pie',
        radius: '50%',
        data: mockStatusDistribution.map((item) => ({
          value: item.count,
          name: {
            potential: '潜在客户',
            intention: '意向客户',
            deal: '已成交',
            lost: '已流失',
          }[item.status],
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          formatter: '{b}: {d}%',
        },
      },
    ],
  }

  statusChart.setOption(option)
}

const handleResize = () => {
  trendChart?.resize()
  statusChart?.resize()
}

onMounted(() => {
  initTrendChart()
  initStatusChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  trendChart?.dispose()
  statusChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <a-row :gutter="16" class="customer-charts">
    <a-col :xs="24" :lg="16">
      <a-card>
        <div ref="trendChartRef" class="chart-container" />
      </a-card>
    </a-col>
    <a-col :xs="24" :lg="8">
      <a-card>
        <div ref="statusChartRef" class="chart-container" />
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.customer-charts {
  margin-bottom: 24px;
}

.chart-container {
  min-height: 350px;
}
</style>

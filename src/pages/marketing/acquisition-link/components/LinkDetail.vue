<script setup lang="ts">
import { ref, computed } from 'vue'
import { BarChartOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { AcquisitionLink } from '@/stores/acquisition-link'

const props = defineProps<{
  open: boolean
  link: AcquisitionLink | null
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const activeTab = ref('overview')

const conversionRate = computed(() => {
  if (!props.link) return 0
  return props.link.uniqueVisitors > 0
    ? ((props.link.conversions / props.link.uniqueVisitors) * 100).toFixed(2)
    : '0.00'
})

const downloadQRCode = () => {
  message.success('正在下载二维码')
}

const handleClose = () => {
  emit('update:open', false)
}

const deviceData = [
  { device: '手机', count: 2450, percent: 71.2 },
  { device: 'PC', count: 680, percent: 19.7 },
  { device: '平板', count: 320, percent: 9.1 },
]

const regionData = [
  { region: '北京', count: 890, percent: 30.8 },
  { region: '上海', count: 760, percent: 26.3 },
  { region: '广州', count: 540, percent: 18.7 },
  { region: '深圳', count: 410, percent: 14.2 },
  { region: '其他', count: 290, percent: 10.0 },
]

const timeDistribution = [
  { hour: '00:00-06:00', count: 120 },
  { hour: '06:00-09:00', count: 340 },
  { hour: '09:00-12:00', count: 680 },
  { hour: '12:00-14:00', count: 450 },
  { hour: '14:00-18:00', count: 890 },
  { hour: '18:00-21:00', count: 720 },
  { hour: '21:00-24:00', count: 250 },
]
</script>

<template>
  <a-drawer
    :open="open"
    width="720px"
    placement="right"
    :title="link?.name || '链接详情'"
    :closable="true"
    @close="handleClose"
  >
    <template #extra>
      <a-space>
        <a-button type="primary" size="small" @click="downloadQRCode">
          <template #icon><DownloadOutlined /></template>
          下载二维码
        </a-button>
      </a-space>
    </template>

    <div v-if="link" class="link-detail">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="overview" tab="概览">
          <a-card title="链接信息" size="small" class="mb-4">
            <a-descriptions :column="1" size="small">
              <a-descriptions-item label="类型">
                <a-tag color="blue">{{
                  link.type === 'short' ? '短链接' : link.type === 'qrcode' ? '二维码' : '原始链接'
                }}</a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="短链接">
                <a-typography-text copyable :text="link.shortUrl">
                  {{ link.shortUrl }}
                </a-typography-text>
              </a-descriptions-item>
              <a-descriptions-item label="原始链接">{{ link.originalUrl }}</a-descriptions-item>
              <a-descriptions-item label="渠道">{{ link.channel }}</a-descriptions-item>
              <a-descriptions-item label="来源">{{ link.source }}</a-descriptions-item>
              <a-descriptions-item label="有效期">
                <span v-if="link.validType === 'permanent'" class="text-green-500">永久有效</span>
                <span v-else-if="link.validUntil">{{ link.validUntil }}</span>
                <span v-else>{{ link.validDays }} 天</span>
              </a-descriptions-item>
              <a-descriptions-item v-if="link.maxClicks" label="点击限制">
                {{ link.currentClicks }} / {{ link.maxClicks }}
              </a-descriptions-item>
              <a-descriptions-item v-if="link.utmParams" label="UTM参数">
                {{ JSON.stringify(link.utmParams) }}
              </a-descriptions-item>
            </a-descriptions>
          </a-card>

          <a-card title="数据统计" size="small">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-statistic title="总点击量" :value="link.currentClicks">
                  <template #prefix><BarChartOutlined /></template>
                </a-statistic>
              </a-col>
              <a-col :span="8">
                <a-statistic title="独立访客" :value="link.uniqueVisitors" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="转化数" :value="link.conversions" />
              </a-col>
            </a-row>
            <a-divider />
            <a-row :gutter="16">
              <a-col :span="12">
                <a-statistic title="转化率" :value="conversionRate" suffix="%" />
              </a-col>
              <a-col :span="12">
                <a-statistic title="创建时间" :value="link.createTime" />
              </a-col>
            </a-row>
          </a-card>
        </a-tab-pane>

        <a-tab-pane key="device" tab="设备分析">
          <a-card title="设备类型分布" size="small" class="mb-4">
            <div v-for="(item, index) in deviceData" :key="index" class="mb-3">
              <div class="flex justify-between mb-1">
                <span>{{ item.device }}</span>
                <span>{{ item.count }} ({{ item.percent }}%)</span>
              </div>
              <a-progress :percent="item.percent" :show-info="false" />
            </div>
          </a-card>

          <a-card title="操作系统" size="small">
            <div v-for="(_, index) in 4" :key="index" class="mb-3">
              <div class="flex justify-between mb-1">
                <span>{{ ['iOS', 'Android', 'Windows', 'MacOS'][index] }}</span>
                <span>{{ [35, 42, 15, 8][index] }}%</span>
              </div>
              <a-progress
                :percent="[35, 42, 15, 8][index]"
                :show-info="false"
                :stroke-color="['#1890ff', '#52c41a', '#faad14', '#eb2f96']"
              />
            </div>
          </a-card>
        </a-tab-pane>

        <a-tab-pane key="region" tab="地域分析">
          <a-card title="访问地域分布" size="small">
            <div v-for="(item, index) in regionData" :key="index" class="mb-3">
              <div class="flex justify-between mb-1">
                <span>{{ item.region }}</span>
                <span>{{ item.count }} ({{ item.percent }}%)</span>
              </div>
              <a-progress :percent="item.percent" :show-info="false" />
            </div>
          </a-card>
        </a-tab-pane>

        <a-tab-pane key="time" tab="时间分析">
          <a-card title="访问时间段分布" size="small">
            <a-table
              :columns="[
                { title: '时间段', dataIndex: 'hour', key: 'hour' },
                { title: '访问量', dataIndex: 'count', key: 'count' },
              ]"
              :data-source="timeDistribution"
              :pagination="false"
              size="small"
            />
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-drawer>
</template>

<style scoped>
.mb-3 {
  margin-bottom: 12px;
}
.mb-4 {
  margin-bottom: 16px;
}
</style>

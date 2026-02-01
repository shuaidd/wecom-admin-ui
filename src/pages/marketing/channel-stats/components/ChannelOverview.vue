<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { title: '新增客户', value: 128, trend: '+15%', status: 'up' },
  { title: '活跃客户', value: 324, trend: '+5%', status: 'up' },
  { title: '流失客户', value: 12, trend: '-2%', status: 'down' },
  { title: '客户总量', value: 1024, trend: '+8%', status: 'up' },
])
</script>

<template>
  <div class="channel-overview">
    <a-row :gutter="16">
      <a-col :span="6" v-for="item in stats" :key="item.title">
        <a-card>
          <a-statistic :title="item.title" :value="item.value" style="margin-right: 50px">
            <template #suffix>
              <span :style="{ color: item.status === 'up' ? '#cf1322' : '#3f8600' }">{{
                item.trend
              }}</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="数据概览" style="margin-top: 24px">
      <div
        style="
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f2f5;
        "
      >
        渠道数据仪表盘 (Charts Placeholder)
      </div>
    </a-card>
  </div>
</template>

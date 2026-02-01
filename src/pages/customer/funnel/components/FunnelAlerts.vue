<script setup lang="ts">
import { reactive } from 'vue'
import { BellOutlined, ArrowDownOutlined, WarningOutlined } from '@ant-design/icons-vue'

const alerts = reactive([
  {
    id: 1,
    title: '转化率异常下降',
    desc: '今日“点击→扫码”转化率较昨日下降 15%，请检查落地页加载速度。',
    type: 'error',
    time: '10:30',
    status: 'pending',
  },
  {
    id: 2,
    title: '点击量波动预警',
    desc: '渠道A点击量突增 200%，可能存在恶意刷量或活动爆款。',
    type: 'warning',
    time: '09:15',
    status: 'resolved',
  },
  {
    id: 3,
    title: '添加率低于阈值',
    desc: '扫码后添加率连续3天低于 30%（阈值：35%）。',
    type: 'warning',
    time: '昨天',
    status: 'pending',
  },
])
</script>

<template>
  <a-card title="异常数据预警" :bordered="false" class="alerts-card">
    <template #extra>
      <a-button type="link" size="small">配置规则</a-button>
    </template>

    <div class="alert-list">
      <div v-for="alert in alerts" :key="alert.id" class="alert-item">
        <div class="alert-icon" :class="alert.type">
          <warning-outlined v-if="alert.type === 'warning'" />
          <arrow-down-outlined v-else-if="alert.type === 'error'" />
          <bell-outlined v-else />
        </div>
        <div class="alert-content">
          <div class="alert-header">
            <span class="alert-title">{{ alert.title }}</span>
            <span class="alert-time">{{ alert.time }}</span>
          </div>
          <div class="alert-desc">{{ alert.desc }}</div>
        </div>
        <div class="alert-action">
          <a-tag :color="alert.status === 'resolved' ? 'success' : 'processing'">
            {{ alert.status === 'resolved' ? '已处理' : '待处理' }}
          </a-tag>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.alerts-card {
  height: 100%;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.alert-item:last-child {
  border-bottom: none;
}

.alert-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 12px;
  background: #f5f5f5;
  font-size: 16px;
}

.alert-icon.warning {
  background: #fffbe6;
  color: #faad14;
}

.alert-icon.error {
  background: #fff1f0;
  color: #f5222d;
}

.alert-content {
  flex: 1;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.alert-title {
  font-weight: 500;
  color: #1f1f1f;
}

.alert-time {
  font-size: 12px;
  color: #8c8c8c;
}

.alert-desc {
  font-size: 12px;
  color: #595959;
  line-height: 1.5;
}

.alert-action {
  margin-left: 12px;
  display: flex;
  align-items: center;
}
</style>

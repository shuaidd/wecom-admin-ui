<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const tests = ref([
  {
    id: 1,
    name: '双11话术测试',
    status: 'running', // running, finished
    startTime: '2023-11-01',
    endTime: '2023-11-11',
    versions: [
      { name: '版本A (正式)', traffic: 50, replyRate: '12%' },
      { name: '版本B (幽默)', traffic: 50, replyRate: '18%' },
    ],
  },
])

const columns = [
  { title: '测试名称', dataIndex: 'name', key: 'name' },
  { title: '状态', key: 'status' },
  { title: '测试周期', key: 'period' },
  { title: '版本概览', key: 'versions' },
  { title: '操作', key: 'action' },
]

const visible = ref(false)
</script>

<template>
  <div class="welcome-abtest">
    <div class="header-actions">
      <a-button type="primary" @click="visible = true">
        <template #icon><PlusOutlined /></template>
        新建A/B测试
      </a-button>
    </div>

    <a-table :columns="columns" :dataSource="tests" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-badge status="processing" text="进行中" v-if="record.status === 'running'" />
          <a-badge status="default" text="已结束" v-else />
        </template>
        <template v-if="column.key === 'period'">
          {{ record.startTime }} ~ {{ record.endTime }}
        </template>
        <template v-if="column.key === 'versions'">
          <div v-for="(v, idx) in record.versions" :key="idx">
            {{ v.name }}: {{ v.traffic }}% 流量 (回复率: {{ v.replyRate }})
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="link">详情数据</a-button>
          <a-button type="link" v-if="record.status === 'running'">停止测试</a-button>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="visible" title="新建A/B测试" width="600px">
      <a-form layout="vertical">
        <a-form-item label="测试名称" required><a-input /></a-form-item>
        <a-form-item label="测试周期" required><a-range-picker /></a-form-item>

        <a-divider>版本配置</a-divider>
        <div class="version-row">
          <a-input value="版本A" style="width: 150px" />
          <a-select placeholder="选择欢迎语模板" style="width: 200px" />
          <a-input-number :value="50" addon-after="%" />
        </div>
        <div class="version-row" style="margin-top: 10px">
          <a-input value="版本B" style="width: 150px" />
          <a-select placeholder="选择欢迎语模板" style="width: 200px" />
          <a-input-number :value="50" addon-after="%" />
        </div>
        <a-button type="dashed" block style="margin-top: 10px"><PlusOutlined /> 添加版本</a-button>

        <a-form-item label="优胜策略" style="margin-top: 20px">
          <a-radio-group value="auto">
            <a-radio value="auto">自动选择优胜版本 (基于回复率)</a-radio>
            <a-radio value="manual">手动干预</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
.header-actions {
  margin-bottom: 16px;
}
.version-row {
  display: flex;
  gap: 10px;
}
</style>

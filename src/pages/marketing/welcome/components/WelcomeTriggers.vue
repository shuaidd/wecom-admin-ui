<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'

const rules = ref([
  {
    id: 1,
    name: '默认欢迎语',
    scene: 'add_after',
    priority: 1,
    status: true,
    matchCount: 1250,
  },
  {
    id: 2,
    name: '渠道A欢迎语',
    scene: 'channel_code',
    priority: 10,
    status: true,
    matchCount: 320,
  },
])

const columns = [
  { title: '规则名称', dataIndex: 'name', key: 'name' },
  { title: '触发场景', dataIndex: 'scene', key: 'scene' },
  { title: '优先级', dataIndex: 'priority', key: 'priority' },
  { title: '匹配次数', dataIndex: 'matchCount', key: 'matchCount' },
  { title: '状态', key: 'status' },
  { title: '操作', key: 'action' },
]

const visible = ref(false)
const form = ref({
  name: '',
  scene: 'add_after', // add_after, pass_after, first_chat
  conditions: {
    tags: [],
    channels: [],
    timeRange: [],
  },
  priority: 1,
  templateId: null,
  delay: 0,
})
</script>

<template>
  <div class="welcome-triggers">
    <div class="header-actions">
      <a-button type="primary" @click="visible = true">
        <template #icon><PlusOutlined /></template>
        新建触发规则
      </a-button>
    </div>

    <a-table :columns="columns" :dataSource="rules" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'scene'">
          <span v-if="record.scene === 'add_after'">添加后触发</span>
          <span v-else-if="record.scene === 'channel_code'">渠道码触发</span>
        </template>
        <template v-if="column.key === 'status'">
          <a-switch v-model:checked="record.status" />
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="text" size="small"
              ><template #icon><EditOutlined /></template>编辑</a-button
            >
            <a-button type="text" danger size="small"
              ><template #icon><DeleteOutlined /></template>删除</a-button
            >
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="visible" title="触发规则配置" width="700px">
      <a-form layout="vertical">
        <a-form-item label="规则名称" required>
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="触发场景" required>
          <a-select v-model:value="form.scene">
            <a-select-option value="add_after">客户添加后</a-select-option>
            <a-select-option value="pass_after">好友通过后</a-select-option>
            <a-select-option value="first_chat">首次聊天时</a-select-option>
          </a-select>
        </a-form-item>

        <a-divider>触发条件</a-divider>
        <a-form-item label="客户标签">
          <a-select mode="multiple" placeholder="选择包含的标签" />
        </a-form-item>
        <a-form-item label="渠道来源">
          <a-select mode="multiple" placeholder="选择渠道码" />
        </a-form-item>
        <a-form-item label="添加时间段">
          <a-range-picker show-time />
        </a-form-item>

        <a-divider>执行动作</a-divider>
        <a-form-item label="发送欢迎语" required>
          <a-select placeholder="选择欢迎语模板">
            <a-select-option value="1">通用欢迎语</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="发送延迟">
          <a-input-number v-model:value="form.delay" :min="0" addon-after="秒" />
          <span class="tip">0表示立即发送</span>
        </a-form-item>
        <a-form-item label="优先级">
          <a-input-number v-model:value="form.priority" :min="1" />
          <span class="tip">数字越大优先级越高</span>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
.header-actions {
  margin-bottom: 16px;
}
.tip {
  margin-left: 8px;
  color: #999;
  font-size: 12px;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  PlusOutlined,
  QrcodeOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
  SearchOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useChannelCodeStore, type ChannelCode } from '@/stores/channel-code'
import CreateChannelCode from './components/CreateChannelCode.vue'

const store = useChannelCodeStore()
const searchText = ref('')
const filterStatus = ref('all')
const filterType = ref('all')
const createVisible = ref(false)

const columns = [
  {
    title: '活码名称',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    key: 'channel',
    width: 120,
  },
  {
    title: '接待人员',
    dataIndex: 'staff',
    key: 'staff',
    width: 200,
  },
  {
    title: '今日扫码/添加',
    key: 'todayStats',
    width: 150,
  },
  {
    title: '累计扫码/添加',
    key: 'totalStats',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right' as const,
    width: 200,
  },
]

const filteredData = computed(() => {
  return store.channelCodes.filter((item) => {
    const matchName = item.name.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus = filterStatus.value === 'all' || item.status === filterStatus.value
    const matchType = filterType.value === 'all' || item.type === filterType.value
    return matchName && matchStatus && matchType
  })
})

const handleCreate = () => {
  createVisible.value = true
}

const handleEdit = (record: ChannelCode) => {
  message.info(`编辑功能开发中: ${record.name}`)
}

const handleDelete = (id: string) => {
  store.deleteChannelCode(id)
  message.success('删除成功')
}

const handleStatusChange = (id: string, checked: boolean) => {
  store.updateStatus(id, checked ? 'active' : 'inactive')
  message.success(`已${checked ? '启用' : '停用'}`)
}

const downloadCode = (record: ChannelCode) => {
  message.success(`开始下载 ${record.name} 的二维码`)
}

const typeMap: Record<string, string> = {
  single: '单人',
  multi: '多人',
  group: '群聊',
}

const typeColorMap: Record<string, string> = {
  single: 'blue',
  multi: 'purple',
  group: 'orange',
}
</script>

<template>
  <div class="channel-code-page">
    <!-- 统计卡片 -->
    <a-row :gutter="16" class="mb-4">
      <a-col :span="6">
        <a-card>
          <a-statistic title="今日扫码" :value="128" prefix="">
            <template #prefix><QrcodeOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="今日新增客户" :value="93" :value-style="{ color: '#3f8600' }">
            <template #prefix><UserOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="累计扫码" :value="12560">
            <template #prefix><BarChartOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="累计客户" :value="8902">
            <template #prefix><TeamOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- 操作栏 -->
    <a-card class="mb-4">
      <div class="flex justify-between items-center">
        <div class="flex gap-4">
          <a-input
            v-model:value="searchText"
            placeholder="搜索活码名称"
            style="width: 200px"
            allow-clear
          >
            <template #prefix><SearchOutlined /></template>
          </a-input>
          <a-select v-model:value="filterType" style="width: 120px">
            <a-select-option value="all">所有类型</a-select-option>
            <a-select-option value="single">单人活码</a-select-option>
            <a-select-option value="multi">多人活码</a-select-option>
            <a-select-option value="group">群活码</a-select-option>
          </a-select>
          <a-select v-model:value="filterStatus" style="width: 120px">
            <a-select-option value="all">所有状态</a-select-option>
            <a-select-option value="active">启用中</a-select-option>
            <a-select-option value="inactive">已停用</a-select-option>
            <a-select-option value="expired">已失效</a-select-option>
          </a-select>
        </div>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleCreate">
            <template #icon><PlusOutlined /></template>
            新建活码
          </a-button>
          <a-button>批量创建</a-button>
        </div>
      </div>
    </a-card>

    <!-- 数据表格 -->
    <a-card>
      <a-table :columns="columns" :data-source="filteredData" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="flex items-center gap-2">
              <a-avatar shape="square" :size="40">
                <template #icon><QrcodeOutlined /></template>
              </a-avatar>
              <div>
                <div class="font-medium">{{ record.name }}</div>
                <div class="text-xs text-gray-400">{{ record.createTime }} 创建</div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'type'">
            <a-tag :color="typeColorMap[record.type]">{{ typeMap[record.type] }}</a-tag>
          </template>

          <template v-if="column.key === 'staff'">
            <a-avatar-group :max-count="3" size="small">
              <a-avatar
                v-for="(staff, index) in record.staff"
                :key="index"
                style="background-color: #1890ff"
              >
                {{ staff[0] }}
              </a-avatar>
            </a-avatar-group>
            <span v-if="record.staff.length > 3" class="ml-2 text-xs text-gray-400"
              >等{{ record.staff.length }}人</span
            >
          </template>

          <template v-if="column.key === 'todayStats'">
            <div>
              <span class="text-blue-500">{{ record.todayScanCount }}</span> /
              <span class="text-green-500">{{ record.todayAddCount }}</span>
            </div>
          </template>

          <template v-if="column.key === 'totalStats'">
            <div>
              <span>{{ record.scanCount }}</span> / <span>{{ record.addCount }}</span>
            </div>
          </template>

          <template v-if="column.key === 'status'">
            <a-switch
              :checked="record.status === 'active'"
              :disabled="record.status === 'expired'"
              checked-children="启用"
              un-checked-children="停用"
              @change="(checked) => handleStatusChange(record.id, checked as boolean)"
            />
          </template>

          <template v-if="column.key === 'action'">
            <a-space>
              <a-tooltip title="下载二维码">
                <a-button type="text" size="small" @click="downloadCode(record as ChannelCode)">
                  <template #icon><DownloadOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip title="编辑">
                <a-button type="text" size="small" @click="handleEdit(record as ChannelCode)">
                  <template #icon><EditOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip title="复制">
                <a-button type="text" size="small">
                  <template #icon><CopyOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-popconfirm
                title="确定要删除这个活码吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete(record.id)"
              >
                <a-button type="text" danger size="small">
                  <template #icon><DeleteOutlined /></template>
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <CreateChannelCode v-model:open="createVisible" />
  </div>
</template>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>

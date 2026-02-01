<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  PlusOutlined,
  LinkOutlined,
  QrcodeOutlined,
  BarChartOutlined,
  SearchOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useAcquisitionLinkStore, type AcquisitionLink } from '@/stores/acquisition-link'
import CreateLink from './components/CreateLink.vue'
import LinkDetail from './components/LinkDetail.vue'

const store = useAcquisitionLinkStore()
const searchText = ref('')
const filterStatus = ref('all')
const filterType = ref('all')
const createVisible = ref(false)
const detailVisible = ref(false)
const currentLink = ref<AcquisitionLink | null>(null)

const columns = [
  {
    title: '链接名称',
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
    title: '短链接',
    dataIndex: 'shortUrl',
    key: 'shortUrl',
    ellipsis: true,
  },
  {
    title: '渠道/来源',
    key: 'channelSource',
    width: 180,
  },
  {
    title: '点击/访客/转化',
    key: 'stats',
    width: 160,
  },
  {
    title: '有效期',
    key: 'validity',
    width: 120,
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
  return store.links.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.shortUrl.toLowerCase().includes(searchText.value.toLowerCase())
    const matchStatus = filterStatus.value === 'all' || item.status === filterStatus.value
    const matchType = filterType.value === 'all' || item.type === filterType.value
    return matchSearch && matchStatus && matchType
  })
})

const handleCreate = () => {
  createVisible.value = true
}

const handleEdit = (record: AcquisitionLink) => {
  message.info(`编辑功能开发中: ${record.name}`)
}

const handleDelete = (id: string) => {
  store.deleteLink(id)
  message.success('删除成功')
}

const copyLink = (url: string) => {
  navigator.clipboard.writeText(url)
  message.success('链接已复制到剪贴板')
}

const handleViewDetail = (record: AcquisitionLink) => {
  currentLink.value = record
  detailVisible.value = true
}

const downloadQRCode = (record: AcquisitionLink) => {
  message.success(`正在下载 ${record.name} 的二维码`)
}

const typeMap: Record<string, string> = {
  short: '短链接',
  original: '原始链接',
  qrcode: '二维码',
}

const typeColorMap: Record<string, string> = {
  short: 'blue',
  original: 'gray',
  qrcode: 'purple',
}

const statusMap: Record<string, string> = {
  active: '启用中',
  inactive: '已停用',
  expired: '已过期',
}

const statusColorMap: Record<string, string> = {
  active: 'success',
  inactive: 'default',
  expired: 'error',
}
</script>

<template>
  <div class="acquisition-link-page">
    <a-row :gutter="16" class="mb-4">
      <a-col :span="6">
        <a-card>
          <a-statistic title="今日点击" :value="128" prefix="">
            <template #prefix><LinkOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="今日访客" :value="93" :value-style="{ color: '#3f8600' }">
            <template #prefix><EyeOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="今日转化" :value="56">
            <template #prefix><BarChartOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="累计点击" :value="12560">
            <template #prefix><QrcodeOutlined /></template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-card class="mb-4">
      <div class="flex justify-between items-center">
        <div class="flex gap-4">
          <a-input
            v-model:value="searchText"
            placeholder="搜索链接名称或短链接"
            style="width: 240px"
            allow-clear
          >
            <template #prefix><SearchOutlined /></template>
          </a-input>
          <a-select v-model:value="filterType" style="width: 120px">
            <a-select-option value="all">所有类型</a-select-option>
            <a-select-option value="short">短链接</a-select-option>
            <a-select-option value="original">原始链接</a-select-option>
            <a-select-option value="qrcode">二维码</a-select-option>
          </a-select>
          <a-select v-model:value="filterStatus" style="width: 120px">
            <a-select-option value="all">所有状态</a-select-option>
            <a-select-option value="active">启用中</a-select-option>
            <a-select-option value="inactive">已停用</a-select-option>
            <a-select-option value="expired">已过期</a-select-option>
          </a-select>
        </div>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleCreate">
            <template #icon><PlusOutlined /></template>
            新建链接
          </a-button>
          <a-button>批量生成</a-button>
        </div>
      </div>
    </a-card>

    <a-card>
      <a-table :columns="columns" :data-source="filteredData" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="flex items-center gap-2">
              <a-avatar shape="square" :size="40" style="background-color: #1890ff">
                <template #icon><LinkOutlined /></template>
              </a-avatar>
              <div>
                <div class="font-medium">{{ record.name }}</div>
                <div class="text-xs text-gray-400">{{ record.createTime }} 创建</div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'shortUrl'">
            <a-tooltip :title="record.shortUrl">
              <a-typography-text copyable :text="record.shortUrl" ellipsis style="max-width: 200px">
                {{ record.shortUrl }}
              </a-typography-text>
            </a-tooltip>
          </template>

          <template v-if="column.key === 'channelSource'">
            <div>
              <div class="font-medium">{{ record.channel }}</div>
              <div class="text-xs text-gray-400">{{ record.source }}</div>
            </div>
          </template>

          <template v-if="column.key === 'stats'">
            <div class="text-sm">
              <div>
                <span class="text-blue-500">{{ record.currentClicks }}</span> 点击
              </div>
              <div>
                <span class="text-green-500">{{ record.uniqueVisitors }}</span> 访客
              </div>
              <div>
                <span class="text-orange-500">{{ record.conversions }}</span> 转化
              </div>
            </div>
          </template>

          <template v-if="column.key === 'validity'">
            <div class="text-sm">
              <div v-if="record.validType === 'permanent'" class="text-green-500">永久有效</div>
              <div v-else-if="record.validType === 'date'">
                <div :class="{ 'text-red-500': record.status === 'expired' }">
                  {{ record.validUntil }}
                </div>
                <div v-if="record.maxClicks" class="text-xs text-gray-400">
                  限 {{ record.maxClicks }} 次
                </div>
              </div>
              <div v-else-if="record.validType === 'duration'">
                <div>{{ record.validDays }} 天</div>
                <div v-if="record.maxClicks" class="text-xs text-gray-400">
                  限 {{ record.maxClicks }} 次
                </div>
              </div>
            </div>
          </template>

          <template v-if="column.key === 'type'">
            <a-tag :color="typeColorMap[record.type]">{{ typeMap[record.type] }}</a-tag>
          </template>

          <template v-if="column.key === 'status'">
            <a-tag :color="statusColorMap[record.status]">{{ statusMap[record.status] }}</a-tag>
          </template>

          <template v-if="column.key === 'action'">
            <a-space>
              <a-tooltip title="查看详情">
                <a-button
                  type="text"
                  size="small"
                  @click="handleViewDetail(record as AcquisitionLink)"
                >
                  <template #icon><EyeOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip title="下载二维码">
                <a-button
                  type="text"
                  size="small"
                  @click="downloadQRCode(record as AcquisitionLink)"
                >
                  <template #icon><QrcodeOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip title="编辑">
                <a-button type="text" size="small" @click="handleEdit(record as AcquisitionLink)">
                  <template #icon><EditOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-tooltip title="复制链接">
                <a-button type="text" size="small" @click="copyLink(record.shortUrl)">
                  <template #icon><CopyOutlined /></template>
                </a-button>
              </a-tooltip>
              <a-popconfirm
                title="确定要删除这个链接吗？"
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

    <CreateLink v-model:open="createVisible" />
    <LinkDetail v-model:open="detailVisible" :link="currentLink" />
  </div>
</template>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
  EyeOutlined,
  IdcardOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()

interface Customer {
  id: number
  name: string
  gender: 'male' | 'female'
  phone: string
  company: string
  position: string
  employee: string
  tags: string[]
  tagsType: ('blue' | 'green' | 'orange' | 'red')[]
  addTime: string
  lastFollow: string
  avatar?: string
}

const searchValue = ref('')
const selectedEmployee = ref('all')
const selectedTag = ref('all')
const loading = ref(false)

const employeeOptions = [
  { label: '所有员工', value: 'all' },
  { label: '李销售', value: 'li' },
  { label: '张顾问', value: 'zhang' },
  { label: '王经理', value: 'wang' },
]

const tagOptions = [
  { label: '所有标签', value: 'all' },
  { label: '高意向', value: 'high' },
  { label: '待跟进', value: 'pending' },
  { label: '互联网', value: 'internet' },
]

const dataSource = ref<Customer[]>([
  {
    id: 1,
    name: '张明',
    gender: 'male',
    phone: '138****5678',
    company: '阿里巴巴',
    position: '技术总监',
    employee: '李销售',
    tags: ['高意向', '互联网'],
    tagsType: ['blue', 'green'],
    addTime: '2026-01-15',
    lastFollow: '2026-01-27',
    avatar: 'linear-gradient(135deg, #1890ff, #40a9ff)',
  },
  {
    id: 2,
    name: '王芳',
    gender: 'female',
    phone: '156****9012',
    company: '腾讯科技',
    position: '产品经理',
    employee: '张顾问',
    tags: ['待跟进', '互联网'],
    tagsType: ['orange', 'green'],
    addTime: '2026-01-20',
    lastFollow: '2026-01-25',
    avatar: 'linear-gradient(135deg, #52c41a, #73d13d)',
  },
  {
    id: 3,
    name: '刘强',
    gender: 'male',
    phone: '187****3456',
    company: '字节跳动',
    position: '架构师',
    employee: '李销售',
    tags: ['高意向', '互联网'],
    tagsType: ['blue', 'green'],
    addTime: '2026-01-10',
    lastFollow: '2026-01-28',
    avatar: 'linear-gradient(135deg, #faad14, #ffc53d)',
  },
  {
    id: 4,
    name: '陈丽',
    gender: 'female',
    phone: '139****7788',
    company: '美团',
    position: '运营总监',
    employee: '王经理',
    tags: ['互联网'],
    tagsType: ['green'],
    addTime: '2026-01-22',
    lastFollow: '2026-01-26',
    avatar: 'linear-gradient(135deg, #eb2f96, #f759ab)',
  },
  {
    id: 5,
    name: '赵强',
    gender: 'male',
    phone: '136****1234',
    company: '京东',
    position: '技术负责人',
    employee: '张顾问',
    tags: ['高意向', '电商'],
    tagsType: ['blue', 'orange'],
    addTime: '2026-01-18',
    lastFollow: '2026-01-29',
    avatar: 'linear-gradient(135deg, #722ed1, #9254de)',
  },
  {
    id: 6,
    name: '孙晓',
    gender: 'female',
    phone: '158****5678',
    company: '网易',
    position: '产品总监',
    employee: '李销售',
    tags: ['待跟进', '互联网'],
    tagsType: ['orange', 'green'],
    addTime: '2026-01-25',
    lastFollow: '2026-01-27',
    avatar: 'linear-gradient(135deg, #13c2c2, #36cfc9)',
  },
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 50,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`,
})

const columns = [
  {
    title: '客户信息',
    key: 'customer',
    width: 200,
    customRender: ({ record }: { record: Customer }) => record.name,
  },
  {
    title: '企业/职位',
    key: 'company',
    width: 180,
  },
  {
    title: '所属员工',
    dataIndex: 'employee',
    key: 'employee',
    width: 100,
  },
  {
    title: '标签',
    key: 'tags',
    width: 150,
  },
  {
    title: '添加时间',
    dataIndex: 'addTime',
    key: 'addTime',
    width: 110,
  },
  {
    title: '最后跟进',
    dataIndex: 'lastFollow',
    key: 'lastFollow',
    width: 110,
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    fixed: 'right' as const,
  },
]

const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('搜索完成')
  }, 500)
}

const handleExport = () => {
  message.info('导出功能开发中...')
}

const handleAddFollow = () => {
  message.info('添加跟进功能开发中...')
}

const handleView = (record: Customer) => {
  router.push({ name: 'customer-detail', params: { id: record.id } })
}

const handlePortrait = (record: Customer) => {
  router.push({ name: 'customer-portrait', params: { id: record.id } })
}

const handleTableChange = (pag: { current?: number; pageSize?: number }) => {
  if (pag.current) {
    pagination.value.current = pag.current
  }
  if (pag.pageSize) {
    pagination.value.pageSize = pag.pageSize
  }
}

const getTagClass = (type: 'blue' | 'green' | 'orange' | 'red') => {
  const classMap = {
    blue: 'tag-blue',
    green: 'tag-green',
    orange: 'tag-orange',
    red: 'tag-red',
  }
  return classMap[type]
}

onMounted(() => {
  console.log('CustomerListPage mounted')
})
</script>

<template>
  <div class="customer-list-page">
    <div class="page-header">
      <div class="page-header-content">
        <div class="page-title-group">
          <h1 class="page-title">客户管理</h1>
          <p class="page-description">管理所有从企业微信同步的客户信息</p>
        </div>
        <div class="page-header-actions">
          <a-button @click="handleExport">
            <template #icon>
              <ExportOutlined />
            </template>
            导出
          </a-button>
          <a-button type="primary" @click="handleAddFollow">
            <template #icon>
              <PlusOutlined />
            </template>
            添加跟进
          </a-button>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="table-toolbar">
        <a-space :size="16" wrap>
          <a-input
            v-model:value="searchValue"
            placeholder="搜索客户姓名、企业或手机号..."
            style="width: 280px"
            @pressEnter="handleSearch"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
            <template #suffix>
              <a-button type="link" size="small" @click="handleSearch"> 搜索 </a-button>
            </template>
          </a-input>

          <a-select v-model:value="selectedEmployee" style="width: 140px">
            <a-select-option v-for="opt in employeeOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>

          <a-select v-model:value="selectedTag" style="width: 140px">
            <a-select-option v-for="opt in tagOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </a-space>
      </div>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        :scroll="{ x: 1200 }"
        @change="handleTableChange"
        class="customer-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'customer'">
            <div class="customer-info">
              <a-avatar :size="40" :style="{ background: (record as Customer).avatar }">
                {{ (record as Customer).name.charAt(0) }}
              </a-avatar>
              <div class="customer-detail">
                <div class="customer-name">{{ (record as Customer).name }}</div>
                <div class="customer-meta">
                  {{ (record as Customer).gender === 'male' ? '男' : '女' }} ·
                  {{ (record as Customer).phone }}
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="column.key === 'company'">
            <div class="company-info">
              <div class="company-name">{{ (record as Customer).company }}</div>
              <div class="company-position">{{ (record as Customer).position }}</div>
            </div>
          </template>

          <template v-else-if="column.key === 'tags'">
            <a-space :size="4" wrap>
              <a-tag
                v-for="(tag, index) in (record as Customer).tags"
                :key="index"
                :class="getTagClass((record as Customer).tagsType[index] || 'blue')"
              >
                {{ tag }}
              </a-tag>
            </a-space>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-space :size="2">
              <a-button type="link" size="small" @click="handleView(record as Customer)">
                <template #icon>
                  <EyeOutlined />
                </template>
                查看
              </a-button>
              <a-button type="link" size="small" @click="handlePortrait(record as Customer)">
                <template #icon>
                  <IdcardOutlined />
                </template>
                客户画像
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.customer-list-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: #fff;
  padding: 20px 24px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02);
}

.page-header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-title-group {
  flex: 1;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin: 0 0 8px 0;
}

.page-description {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin: 0;
}

.page-header-actions {
  display: flex;
  gap: 8px;
}

.table-wrapper {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-toolbar {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.table-toolbar :deep(.ant-space) {
  width: 100%;
}

.customer-table {
  flex: 1;
}

.customer-table :deep(.ant-table) {
  font-size: 14px;
}

.customer-table :deep(.ant-table-thead > tr > th) {
  background: #fafafa;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  padding: 16px;
}

.customer-table :deep(.ant-table-tbody > tr > td) {
  padding: 16px;
}

.customer-table :deep(.ant-table-tbody > tr:hover > td) {
  background: #fafafa;
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.customer-detail {
  flex: 1;
  min-width: 0;
}

.customer-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 4px;
}

.customer-meta {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.company-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.company-position {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

:deep(.tag-blue) {
  background: #e6f7ff;
  border-color: #91d5ff;
  color: #0050b3;
}

:deep(.tag-green) {
  background: #f6ffed;
  border-color: #b7eb8f;
  color: #389e0d;
}

:deep(.tag-orange) {
  background: #fff7e6;
  border-color: #ffd591;
  color: #d46b08;
}

:deep(.tag-red) {
  background: #fff1f0;
  border-color: #ffa39e;
  color: #cf1322;
}

@media (max-width: 768px) {
  .page-header-content {
    flex-direction: column;
    gap: 16px;
  }

  .page-header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .table-toolbar {
    padding: 12px;
  }

  .table-toolbar :deep(.ant-space) {
    flex-direction: column;
    align-items: stretch;
  }

  .table-toolbar :deep(.ant-input),
  .table-toolbar :deep(.ant-select) {
    width: 100% !important;
  }
}
</style>

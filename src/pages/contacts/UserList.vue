<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'

interface User {
  id: number
  name: string
  avatar?: string
  gender: 'male' | 'female'
  userId: string
  phone: string
  email: string
  department: string
  position: string
  status: 'active' | 'inactive'
  tags: string[]
  tagsType: ('blue' | 'green' | 'orange' | 'red')[]
  joinTime: string
}

const searchValue = ref('')
const selectedDepartment = ref('all')
const selectedStatus = ref('all')
const loading = ref(false)

const treeSearchValue = ref('')
const selectedTreeKeys = ref<string[]>(['all'])

const treeData = [
  {
    title: '微伴科技',
    key: 'all',
    children: [
      { title: '技术部', key: 'tech' },
      { title: '产品部', key: 'product' },
      { title: '运营部', key: 'operation' },
      { title: '市场部', key: 'marketing' },
    ],
  },
]

const statusOptions = [
  { label: '所有状态', value: 'all' },
  { label: '在职', value: 'active' },
  { label: '离职', value: 'inactive' },
]

const onTreeSelect = (keys: any[]) => {
  if (keys.length > 0) {
    selectedDepartment.value = keys[0] as string
    handleSearch()
  }
}

const dataSource = ref<User[]>([
  {
    id: 1,
    name: '张三',
    gender: 'male',
    userId: 'zhangsan',
    phone: '138****5678',
    email: 'zhangsan@company.com',
    department: '技术部',
    position: '前端工程师',
    status: 'active',
    tags: ['正式员工', '技术骨干'],
    tagsType: ['blue', 'green'],
    joinTime: '2023-03-15',
    avatar: 'linear-gradient(135deg, #1890ff, #40a9ff)',
  },
  {
    id: 2,
    name: '李四',
    gender: 'female',
    userId: 'lisi',
    phone: '156****9012',
    email: 'lisi@company.com',
    department: '产品部',
    position: '产品经理',
    status: 'active',
    tags: ['正式员工', '组长'],
    tagsType: ['blue', 'orange'],
    joinTime: '2023-06-20',
    avatar: 'linear-gradient(135deg, #52c41a, #73d13d)',
  },
  {
    id: 3,
    name: '王五',
    gender: 'male',
    userId: 'wangwu',
    phone: '187****3456',
    email: 'wangwu@company.com',
    department: '运营部',
    position: '运营专员',
    status: 'active',
    tags: ['实习生'],
    tagsType: ['orange'],
    joinTime: '2024-01-10',
    avatar: 'linear-gradient(135deg, #faad14, #ffc53d)',
  },
  {
    id: 4,
    name: '赵六',
    gender: 'female',
    userId: 'zhaoliu',
    phone: '139****7788',
    email: 'zhaoliu@company.com',
    department: '市场部',
    position: '市场经理',
    status: 'active',
    tags: ['正式员工', '部门负责人'],
    tagsType: ['blue', 'red'],
    joinTime: '2022-09-01',
    avatar: 'linear-gradient(135deg, #eb2f96, #f759ab)',
  },
  {
    id: 5,
    name: '孙七',
    gender: 'male',
    userId: 'sunqi',
    phone: '136****1234',
    email: 'sunqi@company.com',
    department: '技术部',
    position: '后端工程师',
    status: 'inactive',
    tags: ['已离职'],
    tagsType: ['red'],
    joinTime: '2022-12-15',
    avatar: 'linear-gradient(135deg, #722ed1, #9254de)',
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
    title: '成员信息',
    key: 'user',
    width: 220,
    customRender: ({ record }: { record: User }) => record.name,
  },
  {
    title: '账号信息',
    key: 'account',
    width: 180,
  },
  {
    title: '部门职位',
    key: 'department',
    width: 180,
  },
  {
    title: '标签',
    key: 'tags',
    width: 150,
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
  },
  {
    title: '入职时间',
    dataIndex: 'joinTime',
    key: 'joinTime',
    width: 110,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
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

const handleAdd = () => {
  message.info('添加成员功能开发中...')
}

const handleEdit = (record: User) => {
  message.info(`编辑成员: ${record.name}`)
}

const handleDelete = (record: User) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除成员 ${record.name} 吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      message.success('删除成功')
    },
  })
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

const getStatusText = (status: 'active' | 'inactive') => {
  return status === 'active' ? '在职' : '离职'
}

const getStatusClass = (status: 'active' | 'inactive') => {
  return status === 'active' ? 'status-active' : 'status-inactive'
}

onMounted(() => {
  console.log('UserListPage mounted')
})
</script>

<template>
  <div class="user-list-page">
    <div class="page-header">
      <div class="page-header-content">
        <div class="page-title-group">
          <h1 class="page-title">用户管理</h1>
          <p class="page-description">管理企业所有成员信息，支持添加、编辑、删除等操作</p>
        </div>
        <div class="page-header-actions">
          <a-button @click="handleExport">
            <template #icon>
              <ExportOutlined />
            </template>
            导出
          </a-button>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined />
            </template>
            添加成员
          </a-button>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="side-tree-wrapper">
        <div class="tree-header">
          <span class="tree-title">组织架构</span>
          <a-button type="link" size="small">
            <template #icon><PlusOutlined /></template>
          </a-button>
        </div>
        <div class="tree-search">
          <a-input v-model:value="treeSearchValue" placeholder="搜索部门..." size="small">
            <template #prefix><SearchOutlined /></template>
          </a-input>
        </div>
        <div class="tree-body">
          <a-tree
            v-model:selectedKeys="selectedTreeKeys"
            :tree-data="treeData"
            default-expand-all
            block-node
            @select="onTreeSelect"
          >
            <template #title="{ title }">
              <div class="tree-node-content">
                <FolderOutlined class="node-icon" />
                <span class="node-title">{{ title }}</span>
              </div>
            </template>
          </a-tree>
        </div>
      </div>

      <div class="table-content-wrapper">
        <div class="table-toolbar">
          <div class="toolbar-left">
            <a-space :size="16" wrap>
              <a-input
                v-model:value="searchValue"
                placeholder="搜索姓名、手机号或邮箱..."
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

              <a-select v-model:value="selectedStatus" style="width: 140px">
                <a-select-option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </a-select-option>
              </a-select>
            </a-space>
          </div>
          <div class="toolbar-right">
            <a-button @click="handleExport">
              <template #icon>
                <ExportOutlined />
              </template>
              导出
            </a-button>
          </div>
        </div>

        <div class="table-container">
          <a-table
            :columns="columns"
            :data-source="dataSource"
            :pagination="pagination"
            :loading="loading"
            :scroll="{ x: 1000 }"
            @change="handleTableChange"
            class="user-table"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'user'">
                <div class="user-info">
                  <a-avatar :size="40" :style="{ background: (record as User).avatar }">
                    {{ (record as User).name.charAt(0) }}
                  </a-avatar>
                  <div class="user-detail">
                    <div class="user-name">{{ (record as User).name }}</div>
                    <div class="user-meta">
                      {{ (record as User).gender === 'male' ? '男' : '女' }}
                    </div>
                  </div>
                </div>
              </template>

              <template v-else-if="column.key === 'account'">
                <div class="account-info">
                  <div class="account-item">
                    <span class="account-label">工号:</span>
                    <span class="account-value">{{ (record as User).userId }}</span>
                  </div>
                  <div class="account-item">
                    <span class="account-label">手机:</span>
                    <span class="account-value">{{ (record as User).phone }}</span>
                  </div>
                  <div class="account-item">
                    <span class="account-label">邮箱:</span>
                    <span class="account-value">{{ (record as User).email }}</span>
                  </div>
                </div>
              </template>

              <template v-else-if="column.key === 'department'">
                <div class="department-info">
                  <div class="department-name">{{ (record as User).department }}</div>
                  <div class="department-position">{{ (record as User).position }}</div>
                </div>
              </template>

              <template v-else-if="column.key === 'tags'">
                <a-space :size="4" wrap>
                  <a-tag
                    v-for="(tag, index) in (record as User).tags"
                    :key="index"
                    :class="getTagClass((record as User).tagsType[index] || 'blue')"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>

              <template v-else-if="column.key === 'status'">
                <a-tag :class="getStatusClass((record as User).status)">
                  {{ getStatusText((record as User).status) }}
                </a-tag>
              </template>

              <template v-else-if="column.key === 'action'">
                <a-space :size="4">
                  <a-button type="link" size="small" @click="handleEdit(record as User)">
                    <template #icon>
                      <EditOutlined />
                    </template>
                    编辑
                  </a-button>
                  <a-button type="link" size="small" danger @click="handleDelete(record as User)">
                    <template #icon>
                      <DeleteOutlined />
                    </template>
                    删除
                  </a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-list-page {
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

.main-container {
  flex: 1;
  display: flex;
  gap: 16px;
  overflow: hidden;
  min-height: 0;
}

.side-tree-wrapper {
  width: 280px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  border: 1px solid #f0f0f0;
}

.tree-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.tree-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}

.tree-search {
  padding: 12px 16px;
}

.tree-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px 16px;
}

.tree-node-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.node-icon {
  color: #1890ff;
  font-size: 16px;
}

.node-title {
  font-size: 14px;
}

.table-content-wrapper {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  border: 1px solid #f0f0f0;
}

.table-toolbar {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.toolbar-left {
  flex: 1;
}

.table-container {
  flex: 1;
  overflow: hidden;
}

.user-table {
  height: 100%;
}

.user-table :deep(.ant-table) {
  font-size: 14px;
}

.user-table :deep(.ant-table-thead > tr > th) {
  background: #fafafa;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  padding: 16px;
}

.user-table :deep(.ant-table-tbody > tr > td) {
  padding: 16px;
}

.user-table :deep(.ant-table-tbody > tr:hover > td) {
  background: #fafafa;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-detail {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 4px;
}

.user-meta {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.account-item {
  display: flex;
  gap: 4px;
}

.account-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  min-width: 32px;
}

.account-value {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  word-break: break-all;
}

.department-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.department-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.department-position {
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

:deep(.status-active) {
  background: #f6ffed;
  border-color: #b7eb8f;
  color: #389e0d;
}

:deep(.status-inactive) {
  background: #f5f5f5;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.45);
}

@media (max-width: 992px) {
  .main-container {
    flex-direction: column;
  }

  .side-tree-wrapper {
    width: 100%;
    height: auto;
    max-height: 300px;
  }
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

  .toolbar-left :deep(.ant-space) {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-left :deep(.ant-input),
  .toolbar-left :deep(.ant-select) {
    width: 100% !important;
  }
}
</style>

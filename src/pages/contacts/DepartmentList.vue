<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'

interface Department {
  id: number
  name: string
  parentId: number | null
  parentName: string
  leader: string
  leaderId: string
  memberCount: number
  sort: number
  createTime: string
  status: 'active' | 'inactive'
}

const searchValue = ref('')
const selectedStatus = ref('all')
const loading = ref(false)

const statusOptions = [
  { label: '所有状态', value: 'all' },
  { label: '启用', value: 'active' },
  { label: '停用', value: 'inactive' },
]

const dataSource = ref<Department[]>([
  {
    id: 1,
    name: '技术部',
    parentId: null,
    parentName: '',
    leader: '张三',
    leaderId: 'zhangsan',
    memberCount: 25,
    sort: 1,
    createTime: '2022-01-01',
    status: 'active',
  },
  {
    id: 2,
    name: '前端组',
    parentId: 1,
    parentName: '技术部',
    leader: '李四',
    leaderId: 'lisi',
    memberCount: 12,
    sort: 1,
    createTime: '2022-03-15',
    status: 'active',
  },
  {
    id: 3,
    name: '后端组',
    parentId: 1,
    parentName: '技术部',
    leader: '王五',
    leaderId: 'wangwu',
    memberCount: 10,
    sort: 2,
    createTime: '2022-03-15',
    status: 'active',
  },
  {
    id: 4,
    name: '产品部',
    parentId: null,
    parentName: '',
    leader: '赵六',
    leaderId: 'zhaoliu',
    memberCount: 8,
    sort: 2,
    createTime: '2022-01-01',
    status: 'active',
  },
  {
    id: 5,
    name: '运营部',
    parentId: null,
    parentName: '',
    leader: '孙七',
    leaderId: 'sunqi',
    memberCount: 15,
    sort: 3,
    createTime: '2022-01-01',
    status: 'active',
  },
  {
    id: 6,
    name: '市场部',
    parentId: null,
    parentName: '',
    leader: '周八',
    leaderId: 'zhouba',
    memberCount: 10,
    sort: 4,
    createTime: '2022-01-01',
    status: 'inactive',
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
    title: '部门名称',
    key: 'name',
    width: 200,
    customRender: ({ record }: { record: Department }) => record.name,
  },
  {
    title: '上级部门',
    dataIndex: 'parentName',
    key: 'parentName',
    width: 150,
  },
  {
    title: '部门负责人',
    key: 'leader',
    width: 120,
  },
  {
    title: '成员数量',
    dataIndex: 'memberCount',
    key: 'memberCount',
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 80,
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
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

const handleAdd = () => {
  message.info('添加部门功能开发中...')
}

const handleEdit = (record: Department) => {
  message.info(`编辑部门: ${record.name}`)
}

const handleDelete = (record: Department) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除部门 ${record.name} 吗?`,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      message.success('删除成功')
    },
  })
}

const handleSort = (record: Department) => {
  message.info(`排序部门: ${record.name}`)
}

const handleTableChange = (pag: { current?: number; pageSize?: number }) => {
  if (pag.current) {
    pagination.value.current = pag.current
  }
  if (pag.pageSize) {
    pagination.value.pageSize = pag.pageSize
  }
}

const getStatusText = (status: 'active' | 'inactive') => {
  return status === 'active' ? '启用' : '停用'
}

const getStatusClass = (status: 'active' | 'inactive') => {
  return status === 'active' ? 'status-active' : 'status-inactive'
}

onMounted(() => {
  console.log('DepartmentListPage mounted')
})
</script>

<template>
  <div class="department-list-page">
    <div class="page-header">
      <div class="page-header-content">
        <div class="page-title-group">
          <h1 class="page-title">部门管理</h1>
          <p class="page-description">管理企业组织架构，支持创建、编辑、删除、排序等操作</p>
        </div>
        <div class="page-header-actions">
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined />
            </template>
            添加部门
          </a-button>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="table-toolbar">
        <a-space :size="16" wrap>
          <a-input
            v-model:value="searchValue"
            placeholder="搜索部门名称..."
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

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        :scroll="{ x: 1100 }"
        @change="handleTableChange"
        class="department-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="department-name-cell">
              <a-avatar :size="32" style="background: #1890ff; margin-right: 8px">
                {{ (record as Department).name.charAt(0) }}
              </a-avatar>
              <span class="department-name">{{ (record as Department).name }}</span>
            </div>
          </template>

          <template v-else-if="column.key === 'leader'">
            <div class="leader-info">
              <div class="leader-name">{{ (record as Department).leader }}</div>
              <div class="leader-id">{{ (record as Department).leaderId }}</div>
            </div>
          </template>

          <template v-else-if="column.key === 'memberCount'">
            <a-tag color="blue">{{ (record as Department).memberCount }} 人</a-tag>
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag :class="getStatusClass((record as Department).status)">
              {{ getStatusText((record as Department).status) }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-space :size="4">
              <a-button type="link" size="small" @click="handleEdit(record as Department)">
                <template #icon>
                  <EditOutlined />
                </template>
                编辑
              </a-button>
              <a-button type="link" size="small" @click="handleSort(record as Department)">
                <template #icon>
                  <PlusOutlined />
                </template>
                排序
              </a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record as Department)">
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
</template>

<style scoped>
.department-list-page {
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

.department-table {
  flex: 1;
}

.department-table :deep(.ant-table) {
  font-size: 14px;
}

.department-table :deep(.ant-table-thead > tr > th) {
  background: #fafafa;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  padding: 16px;
}

.department-table :deep(.ant-table-tbody > tr > td) {
  padding: 16px;
}

.department-table :deep(.ant-table-tbody > tr:hover > td) {
  background: #fafafa;
}

.department-name-cell {
  display: flex;
  align-items: center;
}

.department-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.leader-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.leader-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.leader-id {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
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

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  RightOutlined,
} from '@ant-design/icons-vue'
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
  children?: Department[]
}

const searchValue = ref('')
const selectedStatus = ref('all')
const loading = ref(false)
const expandedKeys = ref<(string | number)[]>([1, 4, 5, 6]) // 默认展开所有父节点

const statusOptions = [
  { label: '所有状态', value: 'all' },
  { label: '启用', value: 'active' },
  { label: '停用', value: 'inactive' },
]

// 平铺的原始数据
const flatData = ref<Department[]>([
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

/**
 * 将平铺数据转换为树形结构
 * @param data 平铺的部门数据
 * @returns 树形结构的部门数据
 */
const buildTreeData = (data: Department[]): Department[] => {
  const map = new Map<number, Department>()
  const roots: Department[] = []

  // 第一遍：创建所有节点的映射
  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })

  // 第二遍：构建父子关系
  data.forEach((item) => {
    const node = map.get(item.id)
    if (!node) return

    if (item.parentId === null || !map.has(item.parentId)) {
      // 根节点
      roots.push(node)
    } else {
      // 子节点，添加到父节点的 children
      const parent = map.get(item.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      }
    }
  })

  return roots
}

// 树形数据源
const dataSource = computed(() => {
  let data = [...flatData.value]

  // 状态过滤
  if (selectedStatus.value !== 'all') {
    data = data.filter((item) => item.status === selectedStatus.value)
  }

  // 搜索过滤
  if (searchValue.value) {
    const keyword = searchValue.value.toLowerCase()
    data = data.filter((item) => item.name.toLowerCase().includes(keyword))
  }

  // 转换为树形结构
  return buildTreeData(data)
})

// 搜索时自动展开所有匹配节点的父级路径
watch(searchValue, (newValue) => {
  if (newValue) {
    const keyword = newValue.toLowerCase()
    const filteredData = flatData.value.filter((item) => item.name.toLowerCase().includes(keyword))

    const parentIds = new Set<number>()
    filteredData.forEach((item) => {
      let current = item
      while (current.parentId) {
        parentIds.add(current.parentId)
        const parent = flatData.value.find((d) => d.id === current.parentId)
        if (parent) {
          current = parent
        } else {
          break
        }
      }
    })
    expandedKeys.value = Array.from(parentIds)
  }
})

const columns = [
  {
    title: '部门名称',
    key: 'name',
    width: 280,
  },
  {
    title: '部门负责人',
    key: 'leader',
    width: 150,
  },
  {
    title: '成员数量',
    dataIndex: 'memberCount',
    key: 'memberCount',
    width: 120,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 130,
  },
  {
    title: '操作',
    key: 'action',
    width: 280,
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

const handleAddSub = (record: Department) => {
  message.info(`添加子部门到: ${record.name}`)
}

const handleEdit = (record: Department) => {
  message.info(`编辑部门: ${record.name}`)
}

const handleDelete = (record: Department) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除部门 ${record.name} 吗?${record.children && record.children.length > 0 ? ' 该操作将同时删除所有子部门。' : ''}`,
    okText: '确定',
    cancelText: '取消',
    okButtonProps: { danger: true },
    onOk: () => {
      message.success('删除成功')
    },
  })
}

const handleSort = (record: Department) => {
  message.info(`排序部门: ${record.name}`)
}

const handleExpandAll = () => {
  const allKeys = flatData.value.filter((d) => d.parentId !== null).map((d) => d.parentId!)
  expandedKeys.value = [...new Set(allKeys)]
}

const handleCollapseAll = () => {
  expandedKeys.value = []
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
          <p class="page-description">
            管理企业组织架构，支持树形层级展示、创建、编辑、删除、排序等操作
          </p>
        </div>
        <div class="page-header-actions">
          <a-button @click="handleExpandAll" style="margin-right: 8px">
            <template #icon>
              <FolderOpenOutlined />
            </template>
            展开全部
          </a-button>
          <a-button @click="handleCollapseAll" style="margin-right: 8px">
            <template #icon>
              <FolderOutlined />
            </template>
            收起全部
          </a-button>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined />
            </template>
            添加根部门
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
        :row-key="(record) => record.id"
        :pagination="false"
        :loading="loading"
        :defaultExpandAllRows="false"
        :expandedRowKeys="expandedKeys"
        @expandedRowsChange="expandedKeys = $event as (string | number)[]"
        :scroll="{ x: 1200 }"
        class="department-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="department-name-cell">
              <a-avatar
                :size="32"
                :style="{
                  background: record.parentId === null ? '#1890ff' : '#52c41a',
                  marginRight: '8px',
                }"
              >
                {{ record.name.charAt(0) }}
              </a-avatar>
              <div class="department-name-wrapper">
                <span class="department-name">{{ record.name }}</span>
                <span v-if="record.parentId" class="department-sub">{{
                  (record as Department).parentName
                }}</span>
              </div>
            </div>
          </template>

          <template v-else-if="column.key === 'leader'">
            <div class="leader-info">
              <div class="leader-name">{{ record.leader }}</div>
              <div class="leader-id">{{ record.leaderId }}</div>
            </div>
          </template>

          <template v-else-if="column.key === 'memberCount'">
            <a-tag color="blue">{{ record.memberCount }} 人</a-tag>
            <span v-if="record.children && record.children.length > 0" class="child-count">
              ({{ record.children.length }} 个子部门)
            </span>
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag :class="getStatusClass(record.status)">
              {{ getStatusText(record.status) }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-space :size="4">
              <a-button type="link" size="small" @click="handleAddSub(record as Department)">
                <template #icon>
                  <PlusOutlined />
                </template>
                添加子部门
              </a-button>
              <a-button type="link" size="small" @click="handleEdit(record as Department)">
                <template #icon>
                  <EditOutlined />
                </template>
                编辑
              </a-button>
              <a-button type="link" size="small" @click="handleSort(record as Department)">
                <template #icon>
                  <RightOutlined />
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

/* 树形节点样式优化 */
.department-table :deep(.ant-table-row-indent) {
  width: 24px;
}

.department-table :deep(.ant-table-row-expand-icon) {
  color: rgba(0, 0, 0, 0.45);
  border: 1px solid #d9d9d9;
}

.department-table :deep(.ant-table-row-expand-icon:hover) {
  color: #1890ff;
  border-color: #1890ff;
}

.department-table :deep(.ant-table-row-expand-icon-expanded) {
  background: #f0f8ff;
}

.department-name-cell {
  display: flex;
  align-items: center;
}

.department-name-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.department-name {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.department-sub {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
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

.child-count {
  margin-left: 4px;
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
    flex-wrap: wrap;
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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerListPage',
})
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Customer } from '@/types/customer'
import { customerApi } from '@/api/customer'
import CustomerFilter from './CustomerFilter.vue'
import CustomerTable from './CustomerTable.vue'
import CustomerActionModal from './CustomerActionModal.vue'

const loading = ref(false)
const customers = ref<Customer[]>([])
const total = ref(0)
const current = ref(1)
const pageSize = ref(10)
const selectedRowKeys = ref<number[]>([])
const selectedRows = ref<Customer[]>([])
const actionModalVisible = ref(false)
const actionModalType = ref<'delete' | 'transfer' | 'export'>('delete')

const fetchCustomers = async () => {
  loading.value = true
  try {
    const params = {
      keyword: '',
      page: current.value,
      pageSize: pageSize.value,
    }
    const response = await customerApi.getCustomerList(params)
    customers.value = response.list
    total.value = response.total
  } catch (error) {
    console.error('获取客户列表失败', error)
  } finally {
    loading.value = false
  }
}

const handleTableChange = (pagination: Record<string, unknown>) => {
  current.value = (pagination.current as number) || 1
  pageSize.value = (pagination.pageSize as number) || 10
  fetchCustomers()
}

const handleFilter = (filters: Record<string, unknown>) => {
  current.value = 1
  fetchCustomers()
}

const handleSearch = (keyword: string) => {
  current.value = 1
  fetchCustomers()
}

const handleRowSelectChange = (keys: number[], rows: Customer[]) => {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

const handleDelete = (record: Customer) => {
  actionModalVisible.value = true
  actionModalType.value = 'delete'
  selectedRowKeys.value = [record.id]
  selectedRows.value = [record]
}

const handleBatchDelete = () => {
  if (selectedRowKeys.value.length === 0) {
    return
  }
  actionModalVisible.value = true
  actionModalType.value = 'delete'
}

const handleBatchTransfer = () => {
  if (selectedRowKeys.value.length === 0) {
    return
  }
  actionModalVisible.value = true
  actionModalType.value = 'transfer'
}

const handleBatchExport = () => {
  if (selectedRowKeys.value.length === 0) {
    return
  }
  actionModalVisible.value = true
  actionModalType.value = 'export'
}

const handleActionModalConfirm = async () => {
  if (actionModalType.value === 'delete') {
    await customerApi.batchDeleteCustomer(selectedRowKeys.value)
    selectedRowKeys.value = []
    selectedRows.value = []
    fetchCustomers()
  } else if (actionModalType.value === 'export') {
    console.log('导出数据', selectedRows.value)
    selectedRowKeys.value = []
    selectedRows.value = []
  }
  actionModalVisible.value = false
}

onMounted(() => {
  fetchCustomers()
})
</script>

<template>
  <div class="customer-list-container">
    <CustomerFilter @search="handleSearch" @filter="handleFilter" />

    <div class="action-bar">
      <a-space>
        <a-button type="primary" @click="() => console.log('新建客户')"> 新建客户 </a-button>
        <a-button :disabled="selectedRowKeys.length === 0" @click="handleBatchTransfer">
          批量转移
        </a-button>
        <a-button :disabled="selectedRowKeys.length === 0" @click="handleBatchExport">
          批量导出
        </a-button>
        <a-button danger :disabled="selectedRowKeys.length === 0" @click="handleBatchDelete">
          批量删除
        </a-button>
      </a-space>
    </div>

    <CustomerTable
      :loading="loading"
      :customers="customers"
      :total="total"
      :current="current"
      :page-size="pageSize"
      :selected-row-keys="selectedRowKeys"
      @table-change="handleTableChange"
      @row-select-change="handleRowSelectChange"
      @delete="handleDelete"
    />

    <CustomerActionModal
      v-model:visible="actionModalVisible"
      :type="actionModalType"
      :count="selectedRowKeys.length"
      @confirm="handleActionModalConfirm"
    />
  </div>
</template>

<style scoped>
.customer-list-container {
  color: inherit;
}

.action-bar {
  margin: 16px 0;
  padding: 12px 16px;
  background: #fafafa;
  border-radius: 4px;
}
</style>

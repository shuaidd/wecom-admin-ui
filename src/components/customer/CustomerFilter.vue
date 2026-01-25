<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerFilter',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', keyword: string): void
  (e: 'filter', filters: Record<string, unknown>): void
}>()

const keyword = ref('')
const status = ref<string | undefined>()
const followUserId = ref<number | undefined>()
const dateRange = ref<[string, string] | undefined>()

const statusOptions = [
  { label: '潜在客户', value: 'potential' },
  { label: '意向客户', value: 'intention' },
  { label: '已成交', value: 'deal' },
  { label: '已流失', value: 'lost' },
]

const userOptions = [
  { label: '李四', value: 1 },
  { label: '赵六', value: 2 },
  { label: '王五', value: 3 },
]

const handleSearch = () => {
  emit('search', keyword.value)
}

const handleReset = () => {
  keyword.value = ''
  status.value = undefined
  followUserId.value = undefined
  dateRange.value = undefined
  emit('filter', {})
}

const handleFilter = () => {
  emit('filter', {
    status: status.value,
    followUserId: followUserId.value,
    addStartTime: dateRange.value?.[0],
    addEndTime: dateRange.value?.[1],
  })
}
</script>

<template>
  <a-card class="customer-filter">
    <a-form layout="inline" :model="{ keyword, status, followUserId, dateRange }">
      <a-form-item label="关键词">
        <a-input
          v-model:value="keyword"
          placeholder="姓名/手机/企业/备注"
          allow-clear
          style="width: 200px"
          @press-enter="handleSearch"
        />
      </a-form-item>

      <a-form-item label="客户状态">
        <a-select
          v-model:value="status"
          placeholder="请选择状态"
          allow-clear
          style="width: 150px"
          :options="statusOptions"
        />
      </a-form-item>

      <a-form-item label="跟进人">
        <a-select
          v-model:value="followUserId"
          placeholder="请选择跟进人"
          allow-clear
          style="width: 150px"
          :options="userOptions"
        />
      </a-form-item>

      <a-form-item label="添加时间">
        <a-range-picker v-model:value="dateRange" style="width: 260px" />
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button type="primary" @click="handleSearch"> 搜索 </a-button>
          <a-button @click="handleReset"> 重置 </a-button>
          <a-button @click="handleFilter"> 筛选 </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<style scoped>
.customer-filter {
  margin-bottom: 16px;
  border-radius: 8px;
}
</style>

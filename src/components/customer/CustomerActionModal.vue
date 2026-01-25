<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerActionModal',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  visible: boolean
  type: 'delete' | 'transfer' | 'export'
  count: number
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'confirm'): void
}>()

const loading = ref(false)
const targetUserId = ref<number>()

const typeMap = {
  delete: {
    title: '确认删除',
    content: `确定要删除选中的 ${props.count} 个客户吗？删除后可在回收站恢复。`,
    confirmText: '确认删除',
  },
  transfer: {
    title: '批量转移',
    content: `将选中的 ${props.count} 个客户转移到以下跟进人：`,
    confirmText: '确认转移',
  },
  export: {
    title: '批量导出',
    content: `确定要导出选中的 ${props.count} 个客户数据吗？`,
    confirmText: '确认导出',
  },
}

const userOptions = [
  { label: '李四', value: 1 },
  { label: '赵六', value: 2 },
  { label: '王五', value: 3 },
]

const handleConfirm = async () => {
  loading.value = true
  try {
    await emit('confirm')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  emit('update:visible', false)
  targetUserId.value = undefined
}
</script>

<template>
  <a-modal
    :open="visible"
    :title="typeMap[type].title"
    :confirm-loading="loading"
    :ok-text="typeMap[type].confirmText"
    cancel-text="取消"
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <p>{{ typeMap[type].content }}</p>

    <a-form v-if="type === 'transfer'" layout="vertical">
      <a-form-item label="选择跟进人" required>
        <a-select v-model:value="targetUserId" placeholder="请选择跟进人" :options="userOptions" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

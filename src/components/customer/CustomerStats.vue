<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerStats',
})
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { customerApi } from '@/api/customer'

const loading = ref(false)
const stats = ref({
  totalCustomers: 0,
  newCustomers: 0,
  activeCustomers: 0,
  lostCustomers: 0,
  conversionRate: 0,
})

const fetchStats = async () => {
  loading.value = true
  try {
    const data = await customerApi.getStatData()
    stats.value = data
  } catch (error) {
    console.error('获取统计数据失败', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <a-row :gutter="16" class="customer-stats">
    <a-col :xs="24" :sm="12" :lg="6">
      <a-card :loading="loading" class="stat-card">
        <a-statistic
          title="客户总数"
          :value="stats.totalCustomers"
          :value-style="{ color: '#1890ff' }"
        >
          <template #prefix>
            <span class="icon">👥</span>
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="12" :lg="6">
      <a-card :loading="loading" class="stat-card">
        <a-statistic
          title="本月新增"
          :value="stats.newCustomers"
          :value-style="{ color: '#52c41a' }"
        >
          <template #prefix>
            <span class="icon">🆕</span>
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="12" :lg="6">
      <a-card :loading="loading" class="stat-card">
        <a-statistic
          title="活跃客户"
          :value="stats.activeCustomers"
          :value-style="{ color: '#722ed1' }"
        >
          <template #prefix>
            <span class="icon">🔥</span>
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="12" :lg="6">
      <a-card :loading="loading" class="stat-card">
        <a-statistic
          title="转化率"
          :value="stats.conversionRate"
          suffix="%"
          :value-style="{ color: '#fa8c16' }"
        >
          <template #prefix>
            <span class="icon">📈</span>
          </template>
        </a-statistic>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.customer-stats {
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 8px;
  transition: all 0.3s;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.icon {
  font-size: 24px;
  margin-right: 8px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage',
})
</script>

<script setup lang="ts">
import CustomerStats from '@/components/customer/CustomerStats.vue'
import CustomerCharts from '@/components/customer/CustomerCharts.vue'
</script>

<template>
  <div>
    <CustomerStats />
    <CustomerCharts />
  </div>
</template>

<style scoped></style>

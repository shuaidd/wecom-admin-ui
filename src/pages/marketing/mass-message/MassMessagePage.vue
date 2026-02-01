<script setup lang="ts">
import { ref } from 'vue'
import CreateMassMessage from './components/CreateMassMessage.vue'
import MassMessageHistory from './components/MassMessageHistory.vue'
import MassMessageDrafts from './components/MassMessageDrafts.vue'

const activeKey = ref('create')
</script>

<template>
  <div class="mass-message-page">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="create" tab="新建群发">
        <div class="create-container">
          <CreateMassMessage />
        </div>
      </a-tab-pane>
      <a-tab-pane key="history" tab="群发记录">
        <div class="history-container">
          <MassMessageHistory />
        </div>
      </a-tab-pane>
      <a-tab-pane key="drafts" tab="草稿箱">
        <div class="drafts-container">
          <MassMessageDrafts />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
.mass-message-page {
  padding: 24px;
  background: #fff;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import WelcomeTemplates from './components/WelcomeTemplates.vue'
import WelcomeTriggers from './components/WelcomeTriggers.vue'
import WelcomeABTest from './components/WelcomeABTest.vue'
import WelcomeStats from './components/WelcomeStats.vue'

const activeKey = ref('templates')
</script>

<template>
  <div class="welcome-page">
    <div class="page-header">
      <h1>欢迎语管理</h1>
      <p class="desc">管理客户添加后的自动欢迎语，支持多种消息类型、智能触发规则及效果分析。</p>
    </div>

    <div class="content-wrapper">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="templates" tab="欢迎语模板">
          <WelcomeTemplates />
        </a-tab-pane>
        <a-tab-pane key="triggers" tab="触发规则">
          <WelcomeTriggers />
        </a-tab-pane>
        <a-tab-pane key="abtest" tab="A/B测试">
          <WelcomeABTest />
        </a-tab-pane>
        <a-tab-pane key="stats" tab="效果统计">
          <WelcomeStats />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped>
.welcome-page {
  min-height: 100%;
  background: #f0f2f5;
}
.page-header {
  background: #fff;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}
.page-header h1 {
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 500;
}
.page-header .desc {
  color: #666;
  margin-bottom: 0;
}
.content-wrapper {
  margin: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 4px;
}
</style>

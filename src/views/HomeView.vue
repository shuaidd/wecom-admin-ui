<script setup lang="ts">
import { ref } from 'vue'
import TopHeader from '@/components/TopHeader.vue'

const collapsed = ref(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div class="layout">
    <TopHeader :collapsed="collapsed" @toggle-collapse="toggleCollapse" />
    <div class="main-content">
      <div class="content-wrapper">
        <h2>欢迎使用企业管理系统</h2>
        <p>这是一个示例页面，展示了顶部菜单组件的使用。</p>
        <p>点击左上角的菜单按钮可以切换折叠状态。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f0f2f5;
}

.main-content {
  padding: 24px;
  background: #f0f2f5;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f1f1f;
}

p {
  font-size: 14px;
  color: #595959;
  line-height: 1.8;
  margin-bottom: 12px;
}
</style>

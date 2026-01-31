<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, type RouteLocationNormalized } from 'vue-router'
import { useTabsStore, type TabItem } from '@/stores/tabs'
import SideMenu from './SideMenu.vue'
import HeaderTabs from './HeaderTabs.vue'

const route = useRoute()
const tabsStore = useTabsStore()

watch(
  () => route,
  (newRoute: RouteLocationNormalized) => {
    if (newRoute.name && newRoute.meta.title) {
      const tab: TabItem = {
        key: newRoute.name as string,
        title: newRoute.meta.title as string,
        path: newRoute.path,
      }
      tabsStore.addTab(tab)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <a-layout class="layout-container">
    <SideMenu />
    <a-layout class="layout-main">
      <a-layout-header class="layout-header">
        <HeaderTabs />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
}

.layout-main {
  margin-left: 200px;
  min-height: 100vh;
  background: #f0f2f5;
}

.layout-header {
  padding: 0;
  background: #fff;
  height: auto;
  line-height: normal;
  border-bottom: 1px solid #f0f0f0;
}

.layout-content {
  padding: 24px;
  margin: 0;
  min-height: calc(100vh - 52px);
}
</style>

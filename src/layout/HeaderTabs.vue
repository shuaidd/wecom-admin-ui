<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useTabsStore } from '@/stores/tabs'

const router = useRouter()
const tabsStore = useTabsStore()

const { tabs, activeKey } = tabsStore

const handleTabClick = (key: string) => {
  tabsStore.setActiveTab(key)
  const tab = tabsStore.getTabByKey(key)
  if (tab) {
    router.push(tab.path)
  }
}

const handleEdit = (targetKey: string | MouseEvent, action: 'add' | 'remove') => {
  if (action === 'remove' && typeof targetKey === 'string') {
    tabsStore.removeTab(targetKey)
  }
}

const closeMenu = computed(() => [
  {
    key: 'close',
    label: '关闭当前',
  },
  {
    key: 'closeOthers',
    label: '关闭其他',
  },
  {
    key: 'closeRight',
    label: '关闭右侧',
  },
  {
    key: 'closeLeft',
    label: '关闭左侧',
  },
  {
    key: 'closeAll',
    label: '关闭全部',
  },
])

const handleMenuClick = ({ key }: { key: string }) => {
  switch (key) {
    case 'close':
      tabsStore.removeTab(activeKey)
      break
    case 'closeOthers':
      tabsStore.closeOtherTabs(activeKey)
      break
    case 'closeRight':
      tabsStore.closeRightTabs(activeKey)
      break
    case 'closeLeft':
      tabsStore.closeLeftTabs(activeKey)
      break
    case 'closeAll':
      tabsStore.closeAllTabs()
      break
  }
}
</script>

<template>
  <div class="chrome-tabs">
    <a-tabs
      v-model:activeKey="activeKey"
      type="editable-card"
      hide-add
      size="small"
      @tabClick="handleTabClick"
      @edit="handleEdit"
    >
      <a-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        :tab="tab.title"
        :closable="tab.closable !== false"
      />
    </a-tabs>
    <div class="tabs-actions">
      <a-dropdown :trigger="['click']">
        <a-button type="text" size="small">
          <template #icon>
            <CloseOutlined />
          </template>
        </a-button>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item v-for="item in closeMenu" :key="item.key">
              {{ item.label }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
.chrome-tabs {
  display: flex;
  align-items: center;
  padding: 8px 12px 0;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  height: 52px;
  overflow: hidden;
}

:deep(.ant-tabs) {
  flex: 1;
  overflow: hidden;
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
  height: 40px;
}

:deep(.ant-tabs-tab) {
  border-radius: 8px 8px 0 0;
  margin-right: 4px;
  padding: 6px 16px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-bottom: none;
  transition: all 0.3s;
}

:deep(.ant-tabs-tab:hover) {
  background: #fff;
  border-color: #1890ff;
}

:deep(.ant-tabs-tab-active) {
  background: #fff;
  border-color: #1890ff;
  border-bottom: 1px solid #fff;
  margin-bottom: 0;
}

:deep(.ant-tabs-tab-btn) {
  color: #333;
  font-size: 13px;
}

:deep(.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #1890ff;
  font-weight: 500;
}

:deep(.ant-tabs-tab-remove) {
  margin-left: 8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

:deep(.ant-tabs-tab-remove:hover) {
  background: #ff4d4f;
  color: #fff;
}

:deep(.ant-tabs-remove-icon) {
  font-size: 12px;
}

.tabs-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
}

.tabs-actions :deep(.ant-btn-text) {
  color: #666;
  border-radius: 4px;
}

.tabs-actions :deep(.ant-btn-text:hover) {
  background: #f0f0f0;
  color: #1890ff;
}
</style>

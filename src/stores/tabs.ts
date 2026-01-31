import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TabItem {
  key: string
  title: string
  path: string
  closable?: boolean
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([])
  const activeKey = ref<string>('')

  const addTab = (tab: TabItem) => {
    const exists = tabs.value.find((t) => t.key === tab.key)
    if (!exists) {
      tabs.value.push(tab)
    }
    activeKey.value = tab.key
  }

  const removeTab = (key: string) => {
    const index = tabs.value.findIndex((t) => t.key === key)
    if (index > -1) {
      const tab = tabs.value[index]
      if (tab?.closable !== false) {
        tabs.value.splice(index, 1)
        if (activeKey.value === key && tabs.value.length > 0) {
          const newActiveTab = tabs.value[Math.max(0, index - 1)]
          if (newActiveTab) {
            activeKey.value = newActiveTab.key
          }
        }
      }
    }
  }

  const setActiveTab = (key: string) => {
    activeKey.value = key
  }

  const closeOtherTabs = (key: string) => {
    tabs.value = tabs.value.filter((t) => t.key === key)
    activeKey.value = key
  }

  const closeAllTabs = () => {
    tabs.value = []
  }

  const closeRightTabs = (key: string) => {
    const index = tabs.value.findIndex((t) => t.key === key)
    if (index > -1) {
      tabs.value = tabs.value.slice(0, index + 1)
    }
  }

  const closeLeftTabs = (key: string) => {
    const index = tabs.value.findIndex((t) => t.key === key)
    if (index > -1) {
      tabs.value = tabs.value.slice(index)
      if (activeKey.value !== key) {
        activeKey.value = key
      }
    }
  }

  const getTabByKey = (key: string) => {
    return tabs.value.find((t) => t.key === key)
  }

  return {
    tabs,
    activeKey,
    addTab,
    removeTab,
    setActiveTab,
    closeOtherTabs,
    closeAllTabs,
    closeRightTabs,
    closeLeftTabs,
    getTabByKey,
  }
})

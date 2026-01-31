import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router'

interface Tab {
  key: string
  title: string
  path: string
  closable?: boolean
}

export const useTabStore = defineStore('tab', () => {
  const tabs = ref<Tab[]>([])
  const activeTabKey = ref('')
  const router = useRouter()

  function addTab(route: RouteLocationNormalizedLoaded) {
    const { path, meta, name } = route
    const key = path
    const title = (meta.title as string) || (name as string) || 'New Tab'

    if (!tabs.value.find((tab) => tab.key === key)) {
      tabs.value.push({
        key,
        title,
        path,
        closable: key !== '/dashboard', // Example: dashboard is not closable
      })
    }
    activeTabKey.value = key
  }

  function removeTab(targetKey: string) {
    const index = tabs.value.findIndex((tab) => tab.key === targetKey)
    if (index === -1) return

    tabs.value.splice(index, 1)

    // If the active tab is closed, switch to the last one or home
    if (activeTabKey.value === targetKey) {
      const lastTab = tabs.value[tabs.value.length - 1]
      if (lastTab) {
        activeTabKey.value = lastTab.key
        router.push(lastTab.path)
      } else {
        router.push('/')
      }
    }
  }

  function switchTab(key: string) {
    const tab = tabs.value.find((t) => t.key === key)
    if (tab) {
      activeTabKey.value = key
      router.push(tab.path)
    }
  }

  return {
    tabs,
    activeTabKey,
    addTab,
    removeTab,
    switchTab,
  }
})

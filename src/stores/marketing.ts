import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface MessageContent {
  type: 'text' | 'image' | 'video' | 'file' | 'news' | 'link' | 'miniprogram'
  text?: string
  mediaUrl?: string
  mediaId?: string // For uploaded files
  title?: string
  description?: string
  linkUrl?: string
  appid?: string
  pagepath?: string
}

export interface TargetSettings {
  type: 'all' | 'tags' | 'department' | 'member'
  tags?: string[]
  departments?: string[]
  members?: string[]
  exclude?: string[]
}

export interface ScheduleSettings {
  type: 'immediate' | 'scheduled'
  sendTime?: string // ISO string
}

export const useMarketingStore = defineStore('marketing', () => {
  const currentMessage = ref<MessageContent>({
    type: 'text',
    text: '',
  })

  const targetSettings = ref<TargetSettings>({
    type: 'all',
  })

  const scheduleSettings = ref<ScheduleSettings>({
    type: 'immediate',
  })

  function resetForm() {
    currentMessage.value = { type: 'text', text: '' }
    targetSettings.value = { type: 'all' }
    scheduleSettings.value = { type: 'immediate' }
  }

  return {
    currentMessage,
    targetSettings,
    scheduleSettings,
    resetForm,
  }
})

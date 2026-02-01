import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useMarketingStore } from '@/stores/marketing'

describe('Marketing Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default values', () => {
    const store = useMarketingStore()
    expect(store.currentMessage.type).toBe('text')
    expect(store.targetSettings.type).toBe('all')
    expect(store.scheduleSettings.type).toBe('immediate')
  })

  it('updates message content', () => {
    const store = useMarketingStore()
    store.currentMessage.text = 'Hello World'
    expect(store.currentMessage.text).toBe('Hello World')
  })

  it('resets form', () => {
    const store = useMarketingStore()
    store.currentMessage.text = 'Changed'
    store.targetSettings.type = 'tags'
    store.scheduleSettings.type = 'scheduled'

    store.resetForm()

    expect(store.currentMessage.text).toBe('')
    expect(store.targetSettings.type).toBe('all')
    expect(store.scheduleSettings.type).toBe('immediate')
  })
})

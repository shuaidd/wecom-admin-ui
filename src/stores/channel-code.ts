import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ChannelCode {
  id: string
  name: string
  type: 'single' | 'multi' | 'group'
  channel: string
  staff: string[]
  status: 'active' | 'inactive' | 'expired'
  scanCount: number
  addCount: number
  todayScanCount: number
  todayAddCount: number
  createTime: string
  tags: string[]
}

export const useChannelCodeStore = defineStore('channel-code', () => {
  const channelCodes = ref<ChannelCode[]>([
    {
      id: '1',
      name: '官网咨询',
      type: 'multi',
      channel: '官网',
      staff: ['张三', '李四'],
      status: 'active',
      scanCount: 1250,
      addCount: 890,
      todayScanCount: 45,
      todayAddCount: 32,
      createTime: '2023-10-01',
      tags: ['潜在客户', '咨询'],
    },
    {
      id: '2',
      name: '门店活动A',
      type: 'single',
      channel: '线下门店',
      staff: ['王五'],
      status: 'active',
      scanCount: 340,
      addCount: 210,
      todayScanCount: 12,
      todayAddCount: 8,
      createTime: '2023-11-15',
      tags: ['门店客户'],
    },
    {
      id: '3',
      name: '技术交流群',
      type: 'group',
      channel: '公众号',
      staff: ['技术小助手'],
      status: 'expired',
      scanCount: 5000,
      addCount: 4800,
      todayScanCount: 0,
      todayAddCount: 0,
      createTime: '2023-09-01',
      tags: ['社群'],
    },
  ])

  const addChannelCode = (
    code: Omit<
      ChannelCode,
      'id' | 'scanCount' | 'addCount' | 'todayScanCount' | 'todayAddCount' | 'createTime'
    >,
  ) => {
    const newCode: ChannelCode = {
      ...code,
      id: Math.random().toString(36).substr(2, 9),
      scanCount: 0,
      addCount: 0,
      todayScanCount: 0,
      todayAddCount: 0,
      createTime: new Date().toISOString().slice(0, 10),
    }
    channelCodes.value.unshift(newCode)
  }

  const updateStatus = (id: string, status: ChannelCode['status']) => {
    const code = channelCodes.value.find((c) => c.id === id)
    if (code) {
      code.status = status
    }
  }

  const deleteChannelCode = (id: string) => {
    const index = channelCodes.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      channelCodes.value.splice(index, 1)
    }
  }

  return {
    channelCodes,
    addChannelCode,
    updateStatus,
    deleteChannelCode,
  }
})

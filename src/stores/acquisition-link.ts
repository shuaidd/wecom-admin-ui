import { defineStore } from 'pinia'
import { ref } from 'vue'

export type LinkType = 'short' | 'original' | 'qrcode'
export type LinkStatus = 'active' | 'inactive' | 'expired'
export type JumpType = 'add' | 'contact' | 'web'

export interface AcquisitionLink {
  id: string
  name: string
  type: LinkType
  status: LinkStatus
  originalUrl: string
  shortUrl: string
  customSuffix: string
  jumpType: JumpType
  jumpTarget?: string
  channel: string
  source: string
  validType: 'permanent' | 'date' | 'duration'
  validUntil?: string
  validDays?: number
  maxClicks?: number
  currentClicks: number
  uniqueVisitors: number
  conversions: number
  createTime: string
  utmParams?: {
    source?: string
    medium?: string
    campaign?: string
    content?: string
  }
  whiteList?: string[]
  blackList?: string[]
}

export const useAcquisitionLinkStore = defineStore('acquisition-link', () => {
  const links = ref<AcquisitionLink[]>([
    {
      id: '1',
      name: '官网首页推广',
      type: 'short',
      status: 'active',
      originalUrl: 'https://example.com/product?utm_source=official&utm_medium=web',
      shortUrl: 'https://s.example.com/home-promo',
      customSuffix: 'home-promo',
      jumpType: 'web',
      jumpTarget: 'https://example.com/product',
      channel: '官网',
      source: '首页Banner',
      validType: 'permanent',
      currentClicks: 3450,
      uniqueVisitors: 2890,
      conversions: 456,
      createTime: '2024-01-15',
      utmParams: {
        source: 'official',
        medium: 'web',
        campaign: 'q1-promo',
      },
    },
    {
      id: '2',
      name: '微信社群引流',
      type: 'qrcode',
      status: 'active',
      originalUrl: 'https://work.weixin.qq.com/kfid/kfc123456',
      shortUrl: 'https://s.example.com/wechat-group',
      customSuffix: 'wechat-group',
      jumpType: 'add',
      channel: '社群',
      source: '朋友圈广告',
      validType: 'date',
      validUntil: '2024-12-31',
      maxClicks: 10000,
      currentClicks: 6780,
      uniqueVisitors: 5200,
      conversions: 1890,
      createTime: '2024-02-01',
    },
    {
      id: '3',
      name: '限时活动页',
      type: 'short',
      status: 'expired',
      originalUrl: 'https://example.com/special-offer',
      shortUrl: 'https://s.example.com/spring-sale',
      customSuffix: 'spring-sale',
      jumpType: 'web',
      jumpTarget: 'https://example.com/special-offer',
      channel: '活动',
      source: '春季促销',
      validType: 'date',
      validUntil: '2024-03-31',
      maxClicks: 5000,
      currentClicks: 4890,
      uniqueVisitors: 4100,
      conversions: 890,
      createTime: '2024-02-15',
    },
  ])

  const addLink = (
    link: Omit<
      AcquisitionLink,
      'id' | 'currentClicks' | 'uniqueVisitors' | 'conversions' | 'createTime'
    >,
  ) => {
    const newLink: AcquisitionLink = {
      ...link,
      id: Math.random().toString(36).substr(2, 9),
      currentClicks: 0,
      uniqueVisitors: 0,
      conversions: 0,
      createTime: new Date().toISOString().slice(0, 10),
    }
    links.value.unshift(newLink)
  }

  const updateStatus = (id: string, status: LinkStatus) => {
    const link = links.value.find((l) => l.id === id)
    if (link) {
      link.status = status
    }
  }

  const deleteLink = (id: string) => {
    const index = links.value.findIndex((l) => l.id === id)
    if (index !== -1) {
      links.value.splice(index, 1)
    }
  }

  const getLinkById = (id: string) => {
    return links.value.find((l) => l.id === id)
  }

  return {
    links,
    addLink,
    updateStatus,
    deleteLink,
    getLinkById,
  }
})

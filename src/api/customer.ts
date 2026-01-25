import type { Customer, CustomerListQuery, CustomerListResponse, StatData } from '@/types/customer'
import { mockCustomers, mockStatData } from './mock-data'

export const customerApi = {
  getCustomerList: async (params: CustomerListQuery): Promise<CustomerListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredList = [...mockCustomers]

    if (params.keyword) {
      const keyword = params.keyword.toLowerCase()
      filteredList = filteredList.filter(
        (customer) =>
          customer.name.toLowerCase().includes(keyword) ||
          customer.mobile.includes(keyword) ||
          customer.corpName.toLowerCase().includes(keyword) ||
          customer.remark.toLowerCase().includes(keyword),
      )
    }

    if (params.status) {
      filteredList = filteredList.filter((customer) => customer.status === params.status)
    }

    if (params.followUserId) {
      filteredList = filteredList.filter(
        (customer) => customer.followUserId === params.followUserId,
      )
    }

    if (params.tagIds && params.tagIds.length > 0) {
      filteredList = filteredList.filter((customer) =>
        customer.tags.some((tag) => params.tagIds!.includes(tag.id)),
      )
    }

    if (params.addStartTime && params.addEndTime) {
      const startTime = new Date(params.addStartTime).getTime()
      const endTime = new Date(params.addEndTime).getTime()
      filteredList = filteredList.filter((customer) => {
        const addTime = new Date(customer.addTime).getTime()
        return addTime >= startTime && addTime <= endTime
      })
    }

    if (params.sortField && params.sortOrder) {
      filteredList.sort((a, b) => {
        const aValue = (a as unknown as Record<string, unknown>)[params.sortField!]
        const bValue = (b as unknown as Record<string, unknown>)[params.sortField!]
        const comparison = (aValue ?? '') > (bValue ?? '') ? 1 : -1
        return params.sortOrder === 'asc' ? comparison : -comparison
      })
    }

    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const list = filteredList.slice(start, end)

    return {
      list,
      total: filteredList.length,
      page: params.page,
      pageSize: params.pageSize,
    }
  },

  getCustomerDetail: async (id: number): Promise<Customer> => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const customer = mockCustomers.find((c) => c.id === id)
    if (!customer) {
      throw new Error('Customer not found')
    }
    return customer
  },

  updateCustomer: async (id: number, data: Partial<Customer>): Promise<Customer> => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = mockCustomers.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error('Customer not found')
    }

    mockCustomers[index] = { ...mockCustomers[index], ...data } as Customer
    return mockCustomers[index]
  },

  deleteCustomer: async (id: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const index = mockCustomers.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error('Customer not found')
    }
    mockCustomers.splice(index, 1)
  },

  batchDeleteCustomer: async (ids: number[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400))

    ids.forEach((id) => {
      const index = mockCustomers.findIndex((c) => c.id === id)
      if (index !== -1) {
        mockCustomers.splice(index, 1)
      }
    })
  },

  getStatData: async (): Promise<StatData> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockStatData
  },
}

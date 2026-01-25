export interface Customer {
  id: number
  externalUserid: string
  name: string
  avatar: string
  gender: 'male' | 'female' | 'unknown'
  birthday: string
  mobile: string
  email: string
  address: string
  addTime: string
  addChannel: string
  addSource: string
  followUserId: number
  followUserName: string
  followDeptId: number
  followDeptName: string
  corpName: string
  corpScale: string
  corpIndustry: string
  position: string
  tags: Tag[]
  remark: string
  status: 'potential' | 'intention' | 'deal' | 'lost'
  customerLevel: 'S' | 'A' | 'B' | 'C'
  lifecycleStage: string
  score: number
  lastActiveTime: string
  lastFollowTime: string
  nextFollowTime: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: number
  tagGroupId: number
  groupName: string
  tagName: string
  color: string
  icon?: string
  sortNum: number
}

export interface FollowRecord {
  id: number
  customerId: number
  customerName: string
  userId: number
  userName: string
  content: string
  type: 'phone' | 'wechat' | 'visit' | 'email' | 'meeting' | 'other'
  result: 'success' | 'fail' | 'pending' | 'scheduled'
  nextFollowTime: string
  reminderTime: string
  reminderType: string[]
  attachmentUrls: string[]
  costAmount: number
  followDuration: number
  createdAt: string
  updatedAt: string
}

export interface CustomerListQuery {
  keyword?: string
  addStartTime?: string
  addEndTime?: string
  followDeptId?: number
  followUserId?: number
  tagIds?: number[]
  status?: string
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
}

export interface CustomerListResponse {
  list: Customer[]
  total: number
  page: number
  pageSize: number
}

export interface StatData {
  totalCustomers: number
  newCustomers: number
  activeCustomers: number
  lostCustomers: number
  conversionRate: number
}

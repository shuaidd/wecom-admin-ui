<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeftOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  StarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  MessageOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const router = useRouter()
const loading = ref(false)

interface Customer {
  id: number
  name: string
  gender: 'male' | 'female'
  phone: string
  email?: string
  company: string
  position: string
  employee: string
  tags: string[]
  tagsType: ('blue' | 'green' | 'orange' | 'red')[]
  addTime: string
  lastFollow: string
  avatar?: string
  address?: string
  remark?: string
}

interface FollowRecord {
  id: number
  type: 'call' | 'visit' | 'message' | 'email'
  title: string
  content: string
  time: string
  employee: string
}

const customer = ref<Customer>({
  id: 1,
  name: '张明',
  gender: 'male',
  phone: '138****5678',
  email: 'zhangming@example.com',
  company: '阿里巴巴',
  position: '技术总监',
  employee: '李销售',
  tags: ['高意向', '互联网'],
  tagsType: ['blue', 'green'],
  addTime: '2026-01-15 14:30',
  lastFollow: '2026-01-27 16:45',
  avatar: 'linear-gradient(135deg, #1890ff, #40a9ff)',
  address: '杭州市余杭区文一西路969号',
  remark: '对产品非常感兴趣，下周安排技术对接会议',
})

const followRecords = ref<FollowRecord[]>([
  {
    id: 1,
    type: 'call',
    title: '电话沟通',
    content: '客户反馈产品功能符合需求，询问了价格方案，表示需要和团队讨论后确定',
    time: '2026-01-27 16:45',
    employee: '李销售',
  },
  {
    id: 2,
    type: 'visit',
    title: '上门拜访',
    content: '现场演示了产品核心功能，客户对UI设计和交互体验表示认可',
    time: '2026-01-25 10:30',
    employee: '李销售',
  },
  {
    id: 3,
    type: 'message',
    title: '微信留言',
    content: '客户询问是否支持定制化开发，已回复需要评估需求',
    time: '2026-01-20 15:20',
    employee: '李销售',
  },
  {
    id: 4,
    type: 'email',
    title: '发送产品资料',
    content: '向客户发送了产品介绍文档和案例资料',
    time: '2026-01-18 09:00',
    employee: '李销售',
  },
])

const getFollowIcon = (type: FollowRecord['type']) => {
  const iconMap = {
    call: PhoneOutlined,
    visit: UserOutlined,
    message: MessageOutlined,
    email: MailOutlined,
  }
  return iconMap[type]
}

const getFollowColor = (type: FollowRecord['type']) => {
  const colorMap = {
    call: '#1890ff',
    visit: '#52c41a',
    message: '#faad14',
    email: '#722ed1',
  }
  return colorMap[type]
}

const getTagClass = (type: 'blue' | 'green' | 'orange' | 'red') => {
  const classMap = {
    blue: 'tag-blue',
    green: 'tag-green',
    orange: 'tag-orange',
    red: 'tag-red',
  }
  return classMap[type]
}

const handleBack = () => {
  router.back()
}

const handleEdit = () => {
  message.info('编辑功能开发中...')
}

const handleAddFollow = () => {
  message.info('添加跟进功能开发中...')
}

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="customer-detail-page">
    <div class="page-header">
      <div class="page-header-content">
        <a-button @click="handleBack" class="back-btn">
          <template #icon>
            <ArrowLeftOutlined />
          </template>
          返回
        </a-button>
        <div class="header-title-group">
          <h1 class="page-title">客户详情</h1>
          <p class="page-description">查看客户的详细信息和跟进记录</p>
        </div>
        <div class="page-header-actions">
          <a-button @click="handleEdit">
            <template #icon>
              <EditOutlined />
            </template>
            编辑
          </a-button>
          <a-button type="primary" @click="handleAddFollow">
            <template #icon>
              <EditOutlined />
            </template>
            添加跟进
          </a-button>
        </div>
      </div>
    </div>

    <a-spin :spinning="loading">
      <div class="detail-content">
        <div class="detail-main">
          <a-card class="detail-card" :bordered="false">
            <template #title>
              <span class="card-title">基本信息</span>
            </template>

            <div class="customer-header">
              <a-avatar :size="80" :style="{ background: customer.avatar }" class="customer-avatar">
                {{ customer.name.charAt(0) }}
              </a-avatar>
              <div class="customer-info">
                <h2 class="customer-name">{{ customer.name }}</h2>
                <div class="customer-meta">
                  <span class="meta-item">
                    <PhoneOutlined />
                    {{ customer.phone }}
                  </span>
                  <span class="meta-item">
                    <UserOutlined />
                    {{ customer.gender === 'male' ? '男' : '女' }}
                  </span>
                </div>
                <div class="customer-tags">
                  <a-tag
                    v-for="(tag, index) in customer.tags"
                    :key="index"
                    :class="getTagClass(customer.tagsType[index] || 'blue')"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
              </div>
            </div>

            <a-divider />

            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">
                  <TeamOutlined />
                  所属企业
                </div>
                <div class="info-value">{{ customer.company }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <SolutionOutlined />
                  职位
                </div>
                <div class="info-value">{{ customer.position }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <UserOutlined />
                  所属员工
                </div>
                <div class="info-value">{{ customer.employee }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <CalendarOutlined />
                  添加时间
                </div>
                <div class="info-value">{{ customer.addTime }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <ClockCircleOutlined />
                  最后跟进
                </div>
                <div class="info-value">{{ customer.lastFollow }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <MailOutlined />
                  邮箱
                </div>
                <div class="info-value">{{ customer.email || '-' }}</div>
              </div>
              <div class="info-item full-width">
                <div class="info-label">
                  <EnvironmentOutlined />
                  地址
                </div>
                <div class="info-value">{{ customer.address || '-' }}</div>
              </div>
              <div class="info-item full-width">
                <div class="info-label">
                  <StarOutlined />
                  备注
                </div>
                <div class="info-value">{{ customer.remark || '-' }}</div>
              </div>
            </div>
          </a-card>

          <a-card class="detail-card" :bordered="false" title="跟进记录">
            <a-timeline>
              <a-timeline-item
                v-for="record in followRecords"
                :key="record.id"
                :color="getFollowColor(record.type)"
              >
                <template #dot>
                  <div class="timeline-dot" :style="{ background: getFollowColor(record.type) }">
                    <component :is="getFollowIcon(record.type)" />
                  </div>
                </template>
                <div class="follow-record">
                  <div class="record-header">
                    <span class="record-title">{{ record.title }}</span>
                    <span class="record-time">{{ record.time }}</span>
                  </div>
                  <div class="record-content">{{ record.content }}</div>
                  <div class="record-employee">
                    <UserOutlined />
                    {{ record.employee }}
                  </div>
                </div>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </div>

        <div class="detail-sidebar">
          <a-card class="detail-card" :bordered="false" title="快捷操作">
            <a-space direction="vertical" :size="12" style="width: 100%">
              <a-button block @click="handleAddFollow">
                <template #icon>
                  <EditOutlined />
                </template>
                添加跟进
              </a-button>
              <a-button block @click="() => {}">
                <template #icon>
                  <PhoneOutlined />
                </template>
                拨打电话
              </a-button>
              <a-button block @click="() => {}">
                <template #icon>
                  <MessageOutlined />
                </template>
                发送消息
              </a-button>
              <a-button block @click="() => {}">
                <template #icon>
                  <MailOutlined />
                </template>
                发送邮件
              </a-button>
            </a-space>
          </a-card>

          <a-card class="detail-card" :bordered="false" title="客户统计">
            <div class="stat-item">
              <div class="stat-label">跟进次数</div>
              <div class="stat-value">{{ followRecords.length }}</div>
            </div>
            <a-divider />
            <div class="stat-item">
              <div class="stat-label">添加天数</div>
              <div class="stat-value">16 天</div>
            </div>
            <a-divider />
            <div class="stat-item">
              <div class="stat-label">距离上次跟进</div>
              <div class="stat-value">4 天</div>
            </div>
          </a-card>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<style scoped>
.customer-detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: #fff;
  padding: 20px 24px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02);
}

.page-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  flex-shrink: 0;
}

.header-title-group {
  flex: 1;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin: 0 0 4px 0;
}

.page-description {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin: 0;
}

.page-header-actions {
  display: flex;
  gap: 8px;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
  align-items: start;
}

.detail-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 0;
}

.detail-card {
  border-radius: 8px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02);
}

.detail-card :deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
}

.detail-card :deep(.ant-card-head-title) {
  padding: 16px 24px;
}

.detail-card :deep(.ant-card-body) {
  padding: 24px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}

.customer-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.customer-avatar {
  flex-shrink: 0;
}

.customer-info {
  flex: 1;
  min-width: 0;
}

.customer-name {
  font-size: 24px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin: 0 0 8px 0;
}

.customer-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.customer-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}

.info-value {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.6;
}

.timeline-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}

.follow-record {
  padding-left: 12px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.record-title {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  font-size: 15px;
}

.record-time {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}

.record-content {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
}

.record-employee {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
}

:deep(.tag-blue) {
  background: #e6f7ff;
  border-color: #91d5ff;
  color: #0050b3;
}

:deep(.tag-green) {
  background: #f6ffed;
  border-color: #b7eb8f;
  color: #389e0d;
}

:deep(.tag-orange) {
  background: #fff7e6;
  border-color: #ffd591;
  color: #d46b08;
}

:deep(.tag-red) {
  background: #fff1f0;
  border-color: #ffa39e;
  color: #cf1322;
}

:deep(.ant-divider-horizontal) {
  margin: 12px 0;
}

@media (max-width: 1200px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .page-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .page-header-actions {
    width: 100%;
  }

  .customer-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .customer-meta {
    justify-content: center;
    flex-wrap: wrap;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .record-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>

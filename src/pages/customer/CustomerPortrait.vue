<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  LeftOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  LineChartOutlined,
  ShoppingOutlined,
  WarningOutlined,
} from '@ant-design/icons-vue'

interface InteractionStats {
  chatCount: number
  messageCount: number
  replyRate: number
  firstReplyMinutes: number
  dailyActive: number
  weeklyActive: number
  monthlyActive: number
  avgOnlineMinutes: number
  heatmap: number[]
  topicPreferences: string[]
  replyPositivity: number
  emotion: '积极' | '中性' | '消极'
  emotionScore: number
}

interface AttributeStats {
  industry: string
  companySize: string
  stage: string
  province: string
  city: string
  areaHeat: string
  sourceChannel: string
  sourceCampaign: string
  acquisitionMethod: string
  status: string
  lifecycle: string
  riskLevel: string
  valueScore: number
  potential: string
  churnRisk: number
}

interface ConversionStats {
  orderCount: number
  orderAmount: number
  orderFrequency: string
  conversionPath: string[]
  repurchaseCount: number
  repurchaseAmount: number
  repurchaseCycleDays: number
  avgOrderValue: number
  spendingPower: string
  purchasePreference: string[]
  productPreference: string[]
  priceSensitivity: string
}

interface ScoreStats {
  overall: number
  activity: number
  value: number
  risk: number
  trend: Array<{ date: string; score: number; alert?: string }>
}

interface CustomerPortrait {
  id: number
  name: string
  avatar: string
  gender: '男' | '女'
  age: number
  birthday: string
  zodiac: string
  phone: string
  wechat: string
  email: string
  address: string
  company: string
  industryLabel: string
  companyScale: string
  position: string
  workYears: string
  region: string
  cityLabel: string
  language: string
  timezone: string
  addTime: string
  addChannel: string
  owner: string
  interaction: InteractionStats
  attribute: AttributeStats
  conversion: ConversionStats
  score: ScoreStats
}

const route = useRoute()
const router = useRouter()

const mockPortraits: Record<number, CustomerPortrait> = {
  1: {
    id: 1,
    name: '张明',
    avatar: 'linear-gradient(135deg, #1e40af, #3b82f6)',
    gender: '男',
    age: 33,
    birthday: '1992-08-15',
    zodiac: '狮子座',
    phone: '138****5678',
    wechat: 'zhangming_biz',
    email: 'zhangming@example.com',
    address: '上海市浦东新区世纪大道 1000 号',
    company: '阿里巴巴',
    industryLabel: '互联网',
    companyScale: '10000+ 人',
    position: '技术总监',
    workYears: '10 年',
    region: '华东',
    cityLabel: '上海',
    language: '中文',
    timezone: 'GMT+8',
    addTime: '2026-01-15 10:24',
    addChannel: '官网咨询表单',
    owner: '李销售',
    interaction: {
      chatCount: 54,
      messageCount: 328,
      replyRate: 92,
      firstReplyMinutes: 6,
      dailyActive: 7,
      weeklyActive: 5,
      monthlyActive: 18,
      avgOnlineMinutes: 32,
      heatmap: [
        2, 3, 1, 4, 0, 2, 3, 5, 2, 2, 1, 4, 5, 3, 2, 1, 3, 4, 4, 2, 5, 4, 3, 2, 1, 2, 4, 5, 3, 2,
      ],
      topicPreferences: ['AI 客服', '数据看板', 'SaaS 集成', '自动化营销'],
      replyPositivity: 87,
      emotion: '积极',
      emotionScore: 84,
    },
    attribute: {
      industry: '互联网平台',
      companySize: '超大型企业',
      stage: '成熟增长期',
      province: '上海市',
      city: '上海',
      areaHeat: '核心商圈',
      sourceChannel: '官网线索',
      sourceCampaign: '2026Q1 数字化专题活动',
      acquisitionMethod: '内容营销 + SEM',
      status: '持续跟进中',
      lifecycle: '意向评估',
      riskLevel: '低风险',
      valueScore: 89,
      potential: '高潜力',
      churnRisk: 18,
    },
    conversion: {
      orderCount: 3,
      orderAmount: 228000,
      orderFrequency: '每 48 天 1 单',
      conversionPath: ['首次触达', '产品演示', '试用开通', '商务谈判', '签约成交'],
      repurchaseCount: 2,
      repurchaseAmount: 136000,
      repurchaseCycleDays: 57,
      avgOrderValue: 76000,
      spendingPower: '高',
      purchasePreference: ['年度订阅', '企业版功能', 'API 扩展包'],
      productPreference: ['客户数据分析', '智能外呼', '自动化 SOP'],
      priceSensitivity: '中等敏感',
    },
    score: {
      overall: 90,
      activity: 88,
      value: 93,
      risk: 24,
      trend: [
        { date: '01-08', score: 82 },
        { date: '01-15', score: 85 },
        { date: '01-22', score: 88 },
        { date: '01-29', score: 90 },
        { date: '02-05', score: 89, alert: '沟通频次下降 12%' },
      ],
    },
  },
  2: {
    id: 2,
    name: '王芳',
    avatar: 'linear-gradient(135deg, #08979c, #13c2c2)',
    gender: '女',
    age: 30,
    birthday: '1995-03-22',
    zodiac: '白羊座',
    phone: '156****9012',
    wechat: 'wangfang_pm',
    email: 'wangfang@example.com',
    address: '深圳市南山区科技园科苑路 8 号',
    company: '腾讯科技',
    industryLabel: '软件服务',
    companyScale: '5000-10000 人',
    position: '产品经理',
    workYears: '8 年',
    region: '华南',
    cityLabel: '深圳',
    language: '中文/英文',
    timezone: 'GMT+8',
    addTime: '2026-01-20 14:08',
    addChannel: '线上直播活动',
    owner: '张顾问',
    interaction: {
      chatCount: 37,
      messageCount: 214,
      replyRate: 86,
      firstReplyMinutes: 11,
      dailyActive: 5,
      weeklyActive: 4,
      monthlyActive: 14,
      avgOnlineMinutes: 26,
      heatmap: [
        1, 2, 1, 3, 0, 1, 2, 3, 2, 1, 0, 2, 3, 2, 1, 1, 2, 2, 3, 1, 3, 3, 2, 1, 1, 2, 2, 3, 2, 1,
      ],
      topicPreferences: ['产品路线图', '私域运营', '自动化报表'],
      replyPositivity: 79,
      emotion: '中性',
      emotionScore: 72,
    },
    attribute: {
      industry: '互联网软件',
      companySize: '大型企业',
      stage: '稳定发展期',
      province: '广东省',
      city: '深圳市',
      areaHeat: '高新技术区',
      sourceChannel: '活动投放线索',
      sourceCampaign: '年度增长峰会',
      acquisitionMethod: '直播引流 + 社群沉淀',
      status: '方案评估中',
      lifecycle: '方案比选',
      riskLevel: '中风险',
      valueScore: 81,
      potential: '中高潜力',
      churnRisk: 31,
    },
    conversion: {
      orderCount: 2,
      orderAmount: 126000,
      orderFrequency: '每 63 天 1 单',
      conversionPath: ['活动报名', '线索培育', 'POC 验证', '商务沟通', '成交'],
      repurchaseCount: 1,
      repurchaseAmount: 58000,
      repurchaseCycleDays: 73,
      avgOrderValue: 63000,
      spendingPower: '中高',
      purchasePreference: ['季度套餐', '数据权限管理'],
      productPreference: ['会话归档', '客户标签', '流程自动化'],
      priceSensitivity: '偏敏感',
    },
    score: {
      overall: 82,
      activity: 80,
      value: 84,
      risk: 35,
      trend: [
        { date: '01-08', score: 76 },
        { date: '01-15', score: 78 },
        { date: '01-22', score: 81 },
        { date: '01-29', score: 83 },
        { date: '02-05', score: 82 },
      ],
    },
  },
}

const defaultPortrait = mockPortraits[1] as CustomerPortrait
const customerId = computed(() => Number(route.params.id) || 1)
const profile = computed<CustomerPortrait>(() => mockPortraits[customerId.value] ?? defaultPortrait)

const emotionTagColor = computed(() => {
  if (profile.value.interaction.emotion === '积极') {
    return 'success'
  }
  if (profile.value.interaction.emotion === '中性') {
    return 'processing'
  }
  return 'error'
})

const scoreStatus = computed(() => (profile.value.score.risk <= 30 ? 'normal' : 'exception'))

const heatColor = (value: number) => {
  if (value === 0) {
    return '#f1f5f9'
  }
  const colors = ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9']
  return colors[Math.min(value, colors.length - 1)]
}

const handleBack = () => {
  router.push({ name: 'customer-list' })
}
</script>

<template>
  <div class="customer-portrait-page">
    <a-card :bordered="false" class="profile-overview-card">
      <div class="profile-overview-header">
        <a-button type="text" class="back-btn" @click="handleBack">
          <template #icon>
            <LeftOutlined />
          </template>
          返回客户列表
        </a-button>
        <div class="title-block">
          <h1 class="page-title">客户画像</h1>
          <p class="page-description">从互动、属性、转化和风险维度查看客户全景洞察</p>
        </div>
      </div>
      <div class="profile-overview-content">
        <div class="identity-block">
          <div class="avatar-wrapper">
            <a-avatar :size="80" :style="{ background: profile.avatar }">
              {{ profile.name.charAt(0) }}
            </a-avatar>
          </div>
          <div>
            <div class="identity-name">{{ profile.name }}</div>
            <div class="identity-meta">
              <span>{{ profile.company }}</span>
              <a-divider type="vertical" />
              <span>{{ profile.position }}</span>
            </div>
            <a-space :size="8" wrap>
              <a-tag :bordered="false" color="cyan"
                >{{ profile.gender }} · {{ profile.age }} 岁</a-tag
              >
              <a-tag :bordered="false" color="blue">{{ profile.cityLabel }}</a-tag>
              <a-tag :bordered="false" color="orange">{{ profile.attribute.lifecycle }}</a-tag>
            </a-space>
          </div>
        </div>
        <div class="score-block">
          <div class="score-label">客户健康度评分</div>
          <div class="score-value">{{ profile.score.overall }}</div>
          <a-progress
            :percent="profile.score.overall"
            :show-info="false"
            :stroke-width="10"
            :stroke-color="{
              '0%': '#0891b2',
              '100%': '#22d3ee',
            }"
          />
        </div>
      </div>
    </a-card>

    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :xl="10">
        <a-card title="客户基本信息" :bordered="false" class="portrait-card">
          <template #extra>
            <a-tag color="processing">ID {{ profile.id }}</a-tag>
          </template>
          <div class="group-title">
            <UserOutlined />
            <span>个人资料</span>
          </div>
          <a-descriptions :column="1" size="small" class="desc-list">
            <a-descriptions-item label="姓名">{{ profile.name }}</a-descriptions-item>
            <a-descriptions-item label="生日">{{ profile.birthday }}</a-descriptions-item>
            <a-descriptions-item label="星座">{{ profile.zodiac }}</a-descriptions-item>
          </a-descriptions>

          <div class="group-title">
            <PhoneOutlined />
            <span>联系方式</span>
          </div>
          <a-descriptions :column="1" size="small" class="desc-list">
            <a-descriptions-item label="手机">{{ profile.phone }}</a-descriptions-item>
            <a-descriptions-item label="微信">{{ profile.wechat }}</a-descriptions-item>
            <a-descriptions-item label="邮箱">
              <span class="inline-icon"><MailOutlined /></span>{{ profile.email }}
            </a-descriptions-item>
            <a-descriptions-item label="地址">
              <span class="inline-icon"><EnvironmentOutlined /></span>{{ profile.address }}
            </a-descriptions-item>
          </a-descriptions>

          <div class="group-title">
            <LineChartOutlined />
            <span>职业与社交属性</span>
          </div>
          <a-descriptions :column="1" size="small" class="desc-list">
            <a-descriptions-item label="公司/行业">
              {{ profile.company }} / {{ profile.industryLabel }}
            </a-descriptions-item>
            <a-descriptions-item label="规模/职位">
              {{ profile.companyScale }} / {{ profile.position }}
            </a-descriptions-item>
            <a-descriptions-item label="工龄">{{ profile.workYears }}</a-descriptions-item>
            <a-descriptions-item label="地区/城市">
              {{ profile.region }} / {{ profile.cityLabel }}
            </a-descriptions-item>
            <a-descriptions-item label="语言/时区">
              {{ profile.language }} / {{ profile.timezone }}
            </a-descriptions-item>
            <a-descriptions-item label="添加信息">
              {{ profile.addTime }} · {{ profile.addChannel }} · {{ profile.owner }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>

      <a-col :xs="24" :xl="14">
        <a-card title="互动行为统计" :bordered="false" class="portrait-card">
          <div class="metric-grid">
            <div class="metric-item">
              <div class="metric-label">互动次数</div>
              <div class="metric-value">{{ profile.interaction.chatCount }}</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">发消息数</div>
              <div class="metric-value">{{ profile.interaction.messageCount }}</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">回复率</div>
              <div class="metric-value">{{ profile.interaction.replyRate }}%</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">首复时长</div>
              <div class="metric-value">{{ profile.interaction.firstReplyMinutes }}m</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">活跃度(D/W/M)</div>
              <div class="metric-value">
                {{ profile.interaction.dailyActive }}/{{ profile.interaction.weeklyActive }}/{{
                  profile.interaction.monthlyActive
                }}
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-label">日均在线</div>
              <div class="metric-value">{{ profile.interaction.avgOnlineMinutes }}m</div>
            </div>
          </div>

          <div class="sub-section">
            <div class="sub-title">最近 30 天互动热度图</div>
            <div class="heatmap-grid">
              <div
                v-for="(point, index) in profile.interaction.heatmap"
                :key="index"
                class="heatmap-cell"
                :style="{ background: heatColor(point) }"
                :title="`Day ${index + 1}: ${point}`"
              ></div>
            </div>
          </div>

          <div class="behavior-row">
            <div class="behavior-col">
              <div class="sub-title">内容偏好</div>
              <a-space wrap>
                <a-tag
                  v-for="topic in profile.interaction.topicPreferences"
                  :key="topic"
                  color="blue"
                >
                  {{ topic }}
                </a-tag>
              </a-space>
              <div class="progress-label">
                回复积极性 {{ profile.interaction.replyPositivity }}%
              </div>
              <a-progress
                :percent="profile.interaction.replyPositivity"
                :show-info="false"
                :stroke-color="{ from: '#1e40af', to: '#3b82f6' }"
              />
            </div>
            <div class="behavior-col">
              <div class="sub-title">情绪分析</div>
              <a-tag :color="emotionTagColor">{{ profile.interaction.emotion }}</a-tag>
              <div class="progress-label">情绪稳定度 {{ profile.interaction.emotionScore }}%</div>
              <a-progress
                :percent="profile.interaction.emotionScore"
                :show-info="false"
                status="active"
              />
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :xl="12">
        <a-card title="客户属性分析" :bordered="false" class="portrait-card">
          <div class="sub-title">行业 / 地域 / 来源</div>
          <a-descriptions :column="1" size="small" class="desc-list compact">
            <a-descriptions-item label="行业分布">
              {{ profile.attribute.industry }} · {{ profile.attribute.companySize }} ·
              {{ profile.attribute.stage }}
            </a-descriptions-item>
            <a-descriptions-item label="地域分布">
              {{ profile.attribute.province }} · {{ profile.attribute.city }} ·
              {{ profile.attribute.areaHeat }}
            </a-descriptions-item>
            <a-descriptions-item label="来源分析">
              {{ profile.attribute.sourceChannel }} · {{ profile.attribute.sourceCampaign }} ·
              {{ profile.attribute.acquisitionMethod }}
            </a-descriptions-item>
            <a-descriptions-item label="状态分析">
              {{ profile.attribute.status }} · {{ profile.attribute.lifecycle }} ·
              {{ profile.attribute.riskLevel }}
            </a-descriptions-item>
          </a-descriptions>

          <div class="score-line">
            <span>客户价值评分</span>
            <span>{{ profile.attribute.valueScore }}</span>
          </div>
          <a-progress :percent="profile.attribute.valueScore" :show-info="false" />

          <div class="score-line">
            <span>流失风险</span>
            <span>{{ profile.attribute.churnRisk }}%</span>
          </div>
          <a-progress
            :percent="profile.attribute.churnRisk"
            :show-info="false"
            :status="profile.attribute.churnRisk > 30 ? 'exception' : 'normal'"
          />

          <div class="hint-row">
            <a-tag color="gold">潜力评估：{{ profile.attribute.potential }}</a-tag>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :xl="12">
        <a-card title="购买 / 转化数据" :bordered="false" class="portrait-card">
          <div class="metric-grid three-col">
            <div class="metric-item">
              <div class="metric-label">订单量</div>
              <div class="metric-value">{{ profile.conversion.orderCount }}</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">总金额</div>
              <div class="metric-value">
                ¥{{ (profile.conversion.orderAmount / 1000).toFixed(1) }}k
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-label">消费频次</div>
              <div class="metric-value">48d</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">复购数</div>
              <div class="metric-value">{{ profile.conversion.repurchaseCount }}</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">复购金额</div>
              <div class="metric-value">
                ¥{{ (profile.conversion.repurchaseAmount / 1000).toFixed(1) }}k
              </div>
            </div>
            <div class="metric-item">
              <div class="metric-label">复购周期</div>
              <div class="metric-value">{{ profile.conversion.repurchaseCycleDays }}d</div>
            </div>
          </div>

          <div class="score-line">
            <span>平均客单价</span>
            <span>¥{{ profile.conversion.avgOrderValue.toLocaleString() }}</span>
          </div>
          <div class="score-line">
            <span>消费能力评估</span>
            <span>{{ profile.conversion.spendingPower }}</span>
          </div>
          <div class="score-line">
            <span>价格敏感度</span>
            <span>{{ profile.conversion.priceSensitivity }}</span>
          </div>

          <div class="sub-section">
            <div class="sub-title">转化路径</div>
            <a-steps size="small" :current="profile.conversion.conversionPath.length - 1">
              <a-step v-for="node in profile.conversion.conversionPath" :key="node" :title="node" />
            </a-steps>
          </div>

          <div class="sub-section">
            <div class="sub-title">偏好分析</div>
            <div class="tag-group">
              <a-tag v-for="item in profile.conversion.purchasePreference" :key="item" color="cyan">
                {{ item }}
              </a-tag>
            </div>
            <div class="tag-group">
              <a-tag
                v-for="item in profile.conversion.productPreference"
                :key="item"
                color="geekblue"
              >
                {{ item }}
              </a-tag>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24">
        <a-card title="客户评分" :bordered="false" class="portrait-card">
          <div class="score-panel">
            <div class="score-main">
              <div class="score-chip">
                <ShoppingOutlined />
                <span>综合评分 {{ profile.score.overall }}</span>
              </div>
              <div class="score-progress">
                <div class="score-line">
                  <span>活跃度评分</span>
                  <span>{{ profile.score.activity }}</span>
                </div>
                <a-progress :percent="profile.score.activity" :show-info="false" />

                <div class="score-line">
                  <span>价值评分</span>
                  <span>{{ profile.score.value }}</span>
                </div>
                <a-progress :percent="profile.score.value" :show-info="false" />

                <div class="score-line">
                  <span>风险评分</span>
                  <span>{{ profile.score.risk }}</span>
                </div>
                <a-progress
                  :percent="profile.score.risk"
                  :show-info="false"
                  :status="scoreStatus"
                />
              </div>
            </div>

            <div class="score-trend">
              <div class="sub-title">
                <MessageOutlined />
                <span>评分趋势与预警</span>
              </div>
              <div class="trend-list">
                <div v-for="item in profile.score.trend" :key="item.date" class="trend-item">
                  <div class="trend-date">{{ item.date }}</div>
                  <div class="trend-score">得分 {{ item.score }}</div>
                  <div class="trend-alert">
                    <a-tag v-if="item.alert" color="warning" :bordered="false">
                      <WarningOutlined />
                      {{ item.alert }}
                    </a-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.customer-portrait-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: #f8fafc;
  min-height: 100%;
}

.profile-overview-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.7) 100%);
  backdrop-filter: blur(20px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.portrait-card {
  border-radius: 20px;
  border: 1px solid rgba(241, 245, 249, 0.8);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.back-btn {
  color: #64748b;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: #0891b2;
  background: rgba(8, 145, 178, 0.1);
}

.title-block {
  text-align: right;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #1e293b;
}

.page-description {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.profile-overview-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.identity-block {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-wrapper {
  position: relative;
  padding: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0891b2, #22d3ee);
}

.identity-name {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 2px;
  letter-spacing: -0.5px;
}

.identity-meta {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-block {
  min-width: 240px;
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.score-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #64748b;
  margin-bottom: 8px;
}

.score-value {
  font-size: 48px;
  line-height: 1;
  font-weight: 800;
  color: #0891b2;
  margin-bottom: 12px;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.score-value::after {
  content: 'pts';
  font-size: 16px;
  color: #94a3b8;
  font-weight: 500;
}

.portrait-card :deep(.ant-card-head) {
  border-bottom: 1px solid #f8fafc;
  padding: 0 24px;
  min-height: 56px;
}

.portrait-card :deep(.ant-card-head-title) {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: #334155;
  margin: 24px 0 12px;
  font-size: 14px;
}

.group-title :deep(.anticon) {
  color: #0891b2;
}

.desc-list {
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.three-col {
  grid-template-columns: repeat(3, 1fr);
}

.metric-item {
  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.metric-item:hover {
  border-color: #bae6fd;
  background: #f0f9ff;
}

.metric-label {
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 8px;
}

.metric-value {
  color: #0f172a;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.sub-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 16px;
}

.heatmap-cell {
  aspect-ratio: 1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.heatmap-cell:hover {
  transform: scale(1.2);
  z-index: 10;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.behavior-row {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.behavior-col {
  background: #f8fafc;
  padding: 20px;
  border-radius: 16px;
}

.score-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.score-main,
.score-trend {
  background: #f8fafc;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
}

.trend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid #f1f5f9;
}

.trend-date {
  font-weight: 600;
  color: #64748b;
  width: 60px;
}

.trend-score {
  font-weight: 700;
  color: #0f172a;
}

@media (max-width: 1280px) {
  .metric-grid.three-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .score-panel {
    grid-template-columns: 1fr;
  }
  .profile-overview-content {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 640px) {
  .metric-grid,
  .behavior-row {
    grid-template-columns: 1fr;
  }
  .heatmap-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>

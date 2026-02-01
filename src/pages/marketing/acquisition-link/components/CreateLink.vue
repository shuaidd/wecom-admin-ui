<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useAcquisitionLinkStore, type LinkType, type JumpType } from '@/stores/acquisition-link'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const store = useAcquisitionLinkStore()
const currentStep = ref(0)
const confirmLoading = ref(false)

const formState = reactive({
  name: '',
  type: 'short' as LinkType,
  customSuffix: '',
  jumpType: 'add' as JumpType,
  jumpTarget: '',
  channel: '官网',
  source: '',
  validType: 'permanent' as 'permanent' | 'date' | 'duration',
  validUntil: '',
  validDays: 30,
  maxClicks: undefined as number | undefined,
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  encryptParams: false,
  enableWhiteList: false,
  whiteList: [] as string[],
  enableBlackList: false,
  blackList: [] as string[],
})

const steps = [
  {
    title: '基础配置',
    description: '设置链接类型与跳转',
  },
  {
    title: '渠道参数',
    description: '配置渠道与UTM参数',
  },
  {
    title: '有效性控制',
    description: '设置有效期与访问限制',
  },
  {
    title: '访问控制',
    description: '配置白名单与黑名单',
  },
]

const handleNext = () => {
  if (currentStep.value === 0 && !formState.name) {
    message.error('请输入链接名称')
    return
  }
  if (currentStep.value === 0 && formState.type === 'short' && !formState.customSuffix) {
    message.error('请输入自定义后缀')
    return
  }
  currentStep.value++
}

const handlePrev = () => {
  currentStep.value--
}

const handleFinish = () => {
  confirmLoading.value = true
  setTimeout(() => {
    const shortUrl = `https://s.example.com/${formState.customSuffix || Math.random().toString(36).substr(2, 8)}`

    store.addLink({
      name: formState.name,
      type: formState.type,
      status: 'active',
      originalUrl: formState.jumpTarget || 'https://example.com',
      shortUrl,
      customSuffix: formState.customSuffix,
      jumpType: formState.jumpType,
      jumpTarget: formState.jumpTarget,
      channel: formState.channel,
      source: formState.source,
      validType: formState.validType,
      validUntil: formState.validType === 'date' ? formState.validUntil : undefined,
      validDays: formState.validType === 'duration' ? formState.validDays : undefined,
      maxClicks: formState.maxClicks,
      utmParams:
        formState.utmSource || formState.utmMedium || formState.utmCampaign || formState.utmContent
          ? {
              source: formState.utmSource,
              medium: formState.utmMedium,
              campaign: formState.utmCampaign,
              content: formState.utmContent,
            }
          : undefined,
      whiteList: formState.enableWhiteList ? formState.whiteList : undefined,
      blackList: formState.enableBlackList ? formState.blackList : undefined,
    })

    message.success('创建成功')
    confirmLoading.value = false
    emit('update:open', false)
    currentStep.value = 0

    Object.assign(formState, {
      name: '',
      type: 'short' as LinkType,
      customSuffix: '',
      jumpType: 'add' as JumpType,
      jumpTarget: '',
      channel: '官网',
      source: '',
      validType: 'permanent' as 'permanent' | 'date' | 'duration',
      validUntil: '',
      validDays: 30,
      maxClicks: undefined,
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      encryptParams: false,
      enableWhiteList: false,
      whiteList: [] as string[],
      enableBlackList: false,
      blackList: [] as string[],
    })
  }, 1000)
}

const handleCancel = () => {
  emit('update:open', false)
}
</script>

<template>
  <a-modal
    :open="open"
    title="新建获客链接"
    width="720px"
    :confirm-loading="confirmLoading"
    @cancel="handleCancel"
  >
    <div class="py-4">
      <a-steps :current="currentStep" class="mb-8">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>

      <div class="step-content mt-8">
        <a-form v-if="currentStep === 0" :model="formState" layout="vertical">
          <a-form-item label="链接名称" required>
            <a-input
              v-model:value="formState.name"
              placeholder="例如：官网首页推广、微信社群引流"
            />
          </a-form-item>

          <a-form-item label="链接类型" required>
            <a-radio-group v-model:value="formState.type">
              <a-radio-button value="short">短链接</a-radio-button>
              <a-radio-button value="original">原始链接</a-radio-button>
              <a-radio-button value="qrcode">二维码</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            v-if="formState.type === 'short'"
            label="自定义后缀"
            required
            help="支持拼音、数字、字母，不要使用中文"
          >
            <a-input-group compact style="display: flex">
              <a-input style="width: 120px" value="https://s.example.com/" disabled />
              <a-input
                v-model:value="formState.customSuffix"
                placeholder="home-promo"
                style="flex: 1"
              />
            </a-input-group>
          </a-form-item>

          <a-form-item label="跳转方式" required>
            <a-radio-group v-model:value="formState.jumpType">
              <a-radio value="add">企微添加好友</a-radio>
              <a-radio value="contact">联系我</a-radio>
              <a-radio value="web">跳转到网页</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item v-if="formState.jumpType === 'web'" label="跳转目标地址" required>
            <a-input
              v-model:value="formState.jumpTarget"
              placeholder="https://example.com/product"
            />
          </a-form-item>
        </a-form>

        <a-form v-if="currentStep === 1" :model="formState" layout="vertical">
          <a-form-item label="渠道">
            <a-select v-model:value="formState.channel">
              <a-select-option value="官网">官网</a-select-option>
              <a-select-option value="公众号">公众号</a-select-option>
              <a-select-option value="朋友圈">朋友圈</a-select-option>
              <a-select-option value="线下">线下</a-select-option>
              <a-select-option value="其他">其他</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="来源标识">
            <a-input v-model:value="formState.source" placeholder="例如：首页Banner、朋友圈广告" />
          </a-form-item>

          <a-divider orientation="left">UTM 参数</a-divider>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Source">
                <a-input v-model:value="formState.utmSource" placeholder="来源渠道" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Medium">
                <a-input v-model:value="formState.utmMedium" placeholder="营销媒介" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Campaign">
                <a-input v-model:value="formState.utmCampaign" placeholder="活动名称" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Content">
                <a-input v-model:value="formState.utmContent" placeholder="广告内容" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item>
            <a-checkbox v-model:checked="formState.encryptParams">加密传输参数</a-checkbox>
            <span class="ml-2 text-xs text-gray-400">防止参数被篡改和泄露</span>
          </a-form-item>
        </a-form>

        <a-form v-if="currentStep === 2" :model="formState" layout="vertical">
          <a-form-item label="有效期类型" required>
            <a-radio-group v-model:value="formState.validType">
              <a-radio value="permanent">永久有效</a-radio>
              <a-radio value="date">指定日期</a-radio>
              <a-radio value="duration">指定天数</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item v-if="formState.validType === 'date'" label="过期日期" required>
            <a-date-picker
              v-model:value="formState.validUntil"
              style="width: 100%"
              placeholder="选择过期日期"
            />
          </a-form-item>

          <a-form-item v-if="formState.validType === 'duration'" label="有效天数" required>
            <a-input-number
              v-model:value="formState.validDays"
              :min="1"
              :max="365"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item label="最大点击次数">
            <a-input-number
              v-model:value="formState.maxClicks"
              :min="1"
              style="width: 100%"
              placeholder="不填则不限制"
            />
            <div class="text-xs text-gray-400 mt-1">达到次数后自动停用链接</div>
          </a-form-item>
        </a-form>

        <a-form v-if="currentStep === 3" :model="formState" layout="vertical">
          <a-form-item>
            <a-checkbox v-model:checked="formState.enableWhiteList">启用白名单</a-checkbox>
            <span class="ml-2 text-xs text-gray-400">仅允许指定IP/地区访问</span>
          </a-form-item>

          <a-form-item v-if="formState.enableWhiteList" label="白名单IP/地区">
            <a-select
              v-model:value="formState.whiteList"
              mode="tags"
              placeholder="输入IP地址或地区名称并回车"
              style="width: 100%"
            >
              <a-select-option value="北京">北京</a-select-option>
              <a-select-option value="上海">上海</a-select-option>
              <a-select-option value="广州">广州</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-checkbox v-model:checked="formState.enableBlackList">启用黑名单</a-checkbox>
            <span class="ml-2 text-xs text-gray-400">禁止指定IP/地区访问</span>
          </a-form-item>

          <a-form-item v-if="formState.enableBlackList" label="黑名单IP/地区">
            <a-select
              v-model:value="formState.blackList"
              mode="tags"
              placeholder="输入IP地址或地区名称并回车"
              style="width: 100%"
            >
              <a-select-option value="IP: 192.168.1.100">IP: 192.168.1.100</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </div>

    <template #footer>
      <a-button v-if="currentStep > 0" @click="handlePrev">上一步</a-button>
      <a-button v-if="currentStep < steps.length - 1" type="primary" @click="handleNext">
        下一步
      </a-button>
      <a-button
        v-if="currentStep === steps.length - 1"
        type="primary"
        :loading="confirmLoading"
        @click="handleFinish"
      >
        完成
      </a-button>
    </template>
  </a-modal>
</template>

<style scoped>
.mb-8 {
  margin-bottom: 32px;
}
.mt-8 {
  margin-top: 32px;
}
</style>

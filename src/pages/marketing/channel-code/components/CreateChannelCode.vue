<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useChannelCodeStore } from '@/stores/channel-code'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const store = useChannelCodeStore()
const currentStep = ref(0)
const confirmLoading = ref(false)

const formState = reactive({
  name: '',
  type: 'single' as 'single' | 'multi' | 'group',
  channel: '官网',
  staff: [] as string[],
  welcomeMsg: '',
  tags: [] as string[],
})

const steps = [
  {
    title: '基础信息',
    description: '设置活码名称与类型',
  },
  {
    title: '接待配置',
    description: '配置接待人员与规则',
  },
  {
    title: '欢迎语',
    description: '设置自动回复与标签',
  },
]

const handleNext = () => {
  if (currentStep.value === 0 && !formState.name) {
    message.error('请输入活码名称')
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
    store.addChannelCode({
      name: formState.name,
      type: formState.type,
      channel: formState.channel,
      staff: formState.staff.length ? formState.staff : ['默认员工'],
      status: 'active',
      tags: formState.tags,
    })
    message.success('创建成功')
    confirmLoading.value = false
    emit('update:open', false)
    currentStep.value = 0
    // Reset form
    formState.name = ''
    formState.type = 'single'
    formState.staff = []
    formState.welcomeMsg = ''
    formState.tags = []
  }, 1000)
}

const handleCancel = () => {
  emit('update:open', false)
}
</script>

<template>
  <a-modal
    :open="open"
    title="新建渠道活码"
    width="700px"
    :confirm-loading="confirmLoading"
    @cancel="handleCancel"
  >
    <div class="py-4">
      <a-steps :current="currentStep" class="mb-8">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>

      <div class="step-content mt-8">
        <!-- 步骤1: 基础信息 -->
        <a-form v-if="currentStep === 0" :model="formState" layout="vertical">
          <a-form-item label="活码名称" required help="给活码起个名字，方便管理">
            <a-input v-model:value="formState.name" placeholder="例如：官网咨询、门店活动" />
          </a-form-item>

          <a-form-item label="活码类型" required>
            <a-radio-group v-model:value="formState.type">
              <a-radio-button value="single">单人活码</a-radio-button>
              <a-radio-button value="multi">多人活码</a-radio-button>
              <a-radio-button value="group">群活码</a-radio-button>
            </a-radio-group>
            <div class="mt-2 text-gray-400 text-xs">
              <span v-if="formState.type === 'single'">客户扫码后添加指定的一名员工</span>
              <span v-if="formState.type === 'multi'">客户扫码后随机/轮询添加多名员工中的一位</span>
              <span v-if="formState.type === 'group'">客户扫码后直接加入指定的群聊</span>
            </div>
          </a-form-item>

          <a-form-item label="渠道来源">
            <a-select v-model:value="formState.channel">
              <a-select-option value="官网">官网</a-select-option>
              <a-select-option value="公众号">公众号</a-select-option>
              <a-select-option value="线下门店">线下门店</a-select-option>
              <a-select-option value="朋友圈">朋友圈</a-select-option>
              <a-select-option value="其他">其他</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>

        <!-- 步骤2: 接待配置 -->
        <a-form v-if="currentStep === 1" :model="formState" layout="vertical">
          <template v-if="formState.type !== 'group'">
            <a-form-item label="接待人员" required>
              <a-select
                v-model:value="formState.staff"
                mode="multiple"
                placeholder="请选择接待员工"
                style="width: 100%"
              >
                <a-select-option value="张三">张三</a-select-option>
                <a-select-option value="李四">李四</a-select-option>
                <a-select-option value="王五">王五</a-select-option>
                <a-select-option value="赵六">赵六</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="轮替规则" v-if="formState.type === 'multi'">
              <a-radio-group value="random">
                <a-radio value="random">随机分配</a-radio>
                <a-radio value="sequence">顺序轮替</a-radio>
              </a-radio-group>
            </a-form-item>

            <a-divider orientation="left" style="font-size: 14px; color: #666">高级设置</a-divider>

            <a-form-item label="接待上限 (每日)">
              <a-input-number placeholder="如果不填则不限制" style="width: 100%" :min="1" />
              <div class="text-xs text-gray-400 mt-1">
                员工每日最大接待客户数，达到上限后自动下线
              </div>
            </a-form-item>

            <a-form-item label="备用员工">
              <a-select placeholder="请选择备用接待员工" style="width: 100%" allow-clear>
                <a-select-option value="备用A">备用A</a-select-option>
                <a-select-option value="备用B">备用B</a-select-option>
              </a-select>
              <div class="text-xs text-gray-400 mt-1">
                当所有主接待人员下线或失效时，自动切换至备用员工
              </div>
            </a-form-item>
          </template>

          <template v-else>
            <a-form-item label="关联群聊" required>
              <a-upload list-type="picture-card">
                <div>
                  <PlusOutlined />
                  <div style="margin-top: 8px">上传群二维码</div>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="群人数上限">
              <a-input-number :value="200" :min="1" :max="500" />
            </a-form-item>
          </template>
        </a-form>

        <!-- 步骤3: 欢迎语 -->
        <a-form v-if="currentStep === 2" :model="formState" layout="vertical">
          <a-form-item label="好友欢迎语">
            <a-textarea
              v-model:value="formState.welcomeMsg"
              placeholder="客户添加后自动发送的欢迎语"
              :rows="4"
              show-count
              :maxlength="200"
            />
          </a-form-item>

          <a-form-item label="自动打标签">
            <a-select
              v-model:value="formState.tags"
              mode="tags"
              placeholder="输入标签并回车"
              style="width: 100%"
            >
              <a-select-option value="新客户">新客户</a-select-option>
              <a-select-option value="意向强烈">意向强烈</a-select-option>
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

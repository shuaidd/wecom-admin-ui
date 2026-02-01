<script setup lang="ts">
import { ref } from 'vue'
import { useMarketingStore } from '@/stores/marketing'
import { storeToRefs } from 'pinia'
import { message } from 'ant-design-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import {
  InboxOutlined,
  FileImageOutlined,
  PlusOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue'

const store = useMarketingStore()
const { currentMessage, targetSettings, scheduleSettings } = storeToRefs(store)

const messageTypes = [
  { label: '文本', value: 'text' },
  { label: '图片', value: 'image' },
  { label: '视频', value: 'video' },
  { label: '文件', value: 'file' },
  { label: '图文', value: 'news' },
  { label: '链接', value: 'link' },
  { label: '小程序', value: 'miniprogram' },
]

const targetTypes = [
  { label: '全部客户', value: 'all' },
  { label: '按标签', value: 'tags' },
  { label: '按部门', value: 'department' },
  { label: '按成员', value: 'member' },
]

// Mock data for selectors
const mockTags = [
  { label: 'VIP客户', value: 'vip' },
  { label: '潜在客户', value: 'potential' },
  { label: '已成交', value: 'deal' },
]

const mockDepts = [
  { label: '销售部', value: 'sales', key: 'sales' },
  { label: '市场部', value: 'marketing', key: 'marketing' },
]

const loading = ref(false)

const handleSend = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('群发任务创建成功')
    store.resetForm()
  }, 1500)
}

const handleUploadChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 上传成功`)
    // In real app, set mediaUrl here
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 上传失败`)
  }
}
</script>

<template>
  <div class="create-mass-message">
    <a-row :gutter="24">
      <!-- Left Column: Form -->
      <a-col :span="16">
        <a-card title="消息内容" class="section-card">
          <a-form layout="vertical">
            <a-form-item label="消息类型">
              <a-radio-group v-model:value="currentMessage.type" button-style="solid">
                <a-radio-button v-for="type in messageTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </a-radio-button>
              </a-radio-group>
            </a-form-item>

            <!-- Text Message -->
            <a-form-item v-if="currentMessage.type === 'text'" label="内容">
              <a-textarea
                v-model:value="currentMessage.text"
                :rows="6"
                placeholder="请输入消息内容，支持插入昵称"
                show-count
                :maxlength="2000"
              />
              <div class="helper-text">支持插入 emoji，点击 <a href="#">插入昵称</a></div>
            </a-form-item>

            <!-- Image/Video/File -->
            <a-form-item
              v-if="['image', 'video', 'file'].includes(currentMessage.type)"
              label="上传附件"
            >
              <a-upload-dragger
                name="file"
                :multiple="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleUploadChange"
              >
                <p class="ant-upload-drag-icon">
                  <InboxOutlined v-if="currentMessage.type === 'file'" />
                  <FileImageOutlined v-else />
                </p>
                <p class="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p class="ant-upload-hint">
                  支持
                  {{
                    currentMessage.type === 'image'
                      ? 'JPG, PNG'
                      : currentMessage.type === 'video'
                        ? 'MP4'
                        : 'PDF, Word, Excel'
                  }}
                </p>
              </a-upload-dragger>
            </a-form-item>

            <!-- Link/News Message -->
            <template v-if="['link', 'news'].includes(currentMessage.type)">
              <a-form-item label="标题">
                <a-input v-model:value="currentMessage.title" placeholder="请输入标题" />
              </a-form-item>
              <a-form-item label="描述">
                <a-textarea
                  v-model:value="currentMessage.description"
                  :rows="3"
                  placeholder="请输入描述"
                />
              </a-form-item>
              <a-form-item label="链接地址">
                <a-input v-model:value="currentMessage.linkUrl" placeholder="https://" />
              </a-form-item>
              <a-form-item label="封面图">
                <a-upload list-type="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style="margin-top: 8px">上传</div>
                  </div>
                </a-upload>
              </a-form-item>
            </template>

            <!-- Mini Program -->
            <template v-if="currentMessage.type === 'miniprogram'">
              <a-form-item label="小程序AppID">
                <a-input v-model:value="currentMessage.appid" placeholder="wx..." />
              </a-form-item>
              <a-form-item label="小程序路径">
                <a-input v-model:value="currentMessage.pagepath" placeholder="pages/index/index" />
              </a-form-item>
              <a-form-item label="标题">
                <a-input v-model:value="currentMessage.title" placeholder="请输入标题" />
              </a-form-item>
              <a-form-item label="封面图">
                <a-upload list-type="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style="margin-top: 8px">上传</div>
                  </div>
                </a-upload>
              </a-form-item>
            </template>
          </a-form>
        </a-card>

        <a-card title="发送对象" class="section-card">
          <a-form layout="vertical">
            <a-form-item label="选择客户">
              <a-radio-group v-model:value="targetSettings.type">
                <a-radio v-for="t in targetTypes" :key="t.value" :value="t.value">
                  {{ t.label }}
                </a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item v-if="targetSettings.type === 'tags'" label="选择标签">
              <a-select
                v-model:value="targetSettings.tags"
                mode="multiple"
                style="width: 100%"
                placeholder="请选择标签"
                :options="mockTags"
              ></a-select>
            </a-form-item>

            <a-form-item v-if="targetSettings.type === 'department'" label="选择部门">
              <a-tree-select
                v-model:value="targetSettings.departments"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择部门"
                allow-clear
                multiple
                tree-default-expand-all
                :tree-data="mockDepts"
              >
              </a-tree-select>
            </a-form-item>

            <a-form-item label="排除客户 (可选)">
              <a-select
                mode="multiple"
                style="width: 100%"
                placeholder="选择要排除的标签"
                :options="mockTags"
              ></a-select>
            </a-form-item>
          </a-form>
        </a-card>

        <a-card title="发送设置">
          <a-form layout="vertical">
            <a-form-item label="发送时间">
              <a-radio-group v-model:value="scheduleSettings.type">
                <a-radio value="immediate">立即发送</a-radio>
                <a-radio value="scheduled">定时发送</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item v-if="scheduleSettings.type === 'scheduled'" label="选择时间">
              <a-date-picker show-time placeholder="选择发送时间" style="width: 100%" />
            </a-form-item>
          </a-form>
        </a-card>

        <div class="fixed-footer">
          <a-space>
            <a-button>存为草稿</a-button>
            <a-button type="primary" :loading="loading" @click="handleSend">确认发送</a-button>
          </a-space>
        </div>
      </a-col>

      <!-- Right Column: Preview -->
      <a-col :span="8">
        <div class="preview-phone">
          <div class="phone-header">
            <div class="phone-time">12:00</div>
            <div class="phone-title">预览效果</div>
          </div>
          <div class="phone-body">
            <div class="msg-bubble">
              <div v-if="currentMessage.type === 'text'">
                {{ currentMessage.text || '请输入消息内容' }}
              </div>
              <div v-else-if="currentMessage.type === 'image'" class="media-placeholder">
                <FileImageOutlined class="media-icon" />
                <div class="media-text">图片消息</div>
              </div>
              <div v-else-if="currentMessage.type === 'video'" class="media-placeholder">
                <VideoCameraOutlined class="media-icon" />
                <div class="media-text">视频消息</div>
              </div>
              <div
                v-else-if="currentMessage.type === 'link' || currentMessage.type === 'news'"
                class="link-card"
              >
                <div class="card-title">{{ currentMessage.title || '链接标题' }}</div>
                <div class="card-desc">{{ currentMessage.description || '链接描述' }}</div>
                <div class="card-cover">封面图</div>
              </div>
              <div v-else-if="currentMessage.type === 'miniprogram'" class="mini-card">
                <div class="mini-header">
                  <div class="mini-icon"></div>
                  <span class="mini-label">小程序</span>
                </div>
                <div class="card-title">{{ currentMessage.title || '小程序标题' }}</div>
                <div class="card-cover-large">封面图</div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.section-card {
  margin-bottom: 16px;
}
.helper-text {
  margin-top: 8px;
  color: #999;
  font-size: 12px;
}
.fixed-footer {
  margin-top: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  text-align: right;
}

/* Phone Preview Styles */
.preview-phone {
  width: 320px;
  height: 600px;
  background: #f5f5f5;
  border-radius: 24px;
  border: 8px solid #333;
  margin: 0 auto;
  position: sticky;
  top: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.phone-header {
  height: 44px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.phone-time {
  position: absolute;
  left: 20px;
  font-size: 12px;
  font-weight: bold;
}

.phone-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #ededed;
}

.msg-bubble {
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  max-width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.media-placeholder {
  height: 150px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
}

.media-icon {
  font-size: 32px;
}

.media-text {
  font-size: 14px;
  margin-top: 8px;
}

.link-card,
.mini-card {
  width: 100%;
}

.card-title {
  font-weight: bold;
  font-size: 14px;
}

.card-desc {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.card-cover {
  height: 100px;
  background: #e0e0e0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
}

.card-cover-large {
  height: 150px;
  background: #e0e0e0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
}

.mini-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.mini-icon {
  width: 16px;
  height: 16px;
  background: #1890ff;
  border-radius: 50%;
}

.mini-label {
  font-size: 12px;
  color: #666;
}
</style>

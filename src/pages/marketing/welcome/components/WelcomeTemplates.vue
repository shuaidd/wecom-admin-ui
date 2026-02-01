<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue'

const templates = ref([
  {
    id: 1,
    name: '通用欢迎语',
    type: 'text',
    content: '你好，欢迎咨询！',
    updateTime: '2023-10-01 12:00:00',
  },
  {
    id: 2,
    name: '活动推广图文',
    type: 'link',
    content: '[图文] 双11大促开启...',
    updateTime: '2023-10-05 09:30:00',
  },
])

const columns = [
  { title: '模板名称', dataIndex: 'name', key: 'name' },
  { title: '消息类型', dataIndex: 'type', key: 'type' },
  { title: '内容预览', dataIndex: 'content', key: 'content' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
  { title: '操作', key: 'action' },
]

const visible = ref(false)
const formData = ref({
  name: '',
  type: 'text',
  text: '',
  imageUrl: '',
  link: { title: '', desc: '', url: '', picUrl: '' },
  miniprogram: { appid: '', page: '', title: '', picUrl: '' },
})

const showModal = () => {
  visible.value = true
}

const handleOk = () => {
  visible.value = false
}
</script>

<template>
  <div class="welcome-templates">
    <div class="header-actions">
      <a-button type="primary" @click="showModal">
        <template #icon><PlusOutlined /></template>
        新建模板
      </a-button>
    </div>

    <a-table :columns="columns" :dataSource="templates" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'type'">
          <a-tag v-if="record.type === 'text'" color="blue">文本</a-tag>
          <a-tag v-else-if="record.type === 'image'" color="green">图片</a-tag>
          <a-tag v-else-if="record.type === 'link'" color="orange">图文/链接</a-tag>
          <a-tag v-else-if="record.type === 'miniprogram'" color="purple">小程序</a-tag>
          <a-tag v-else-if="record.type === 'video'" color="cyan">视频</a-tag>
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button type="text" size="small"
              ><template #icon><EyeOutlined /></template>预览</a-button
            >
            <a-button type="text" size="small"
              ><template #icon><EditOutlined /></template>编辑</a-button
            >
            <a-button type="text" danger size="small"
              ><template #icon><DeleteOutlined /></template>删除</a-button
            >
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="visible" title="新建欢迎语模板" width="800px" @ok="handleOk">
      <div class="template-editor">
        <div class="form-section">
          <a-form layout="vertical">
            <a-form-item label="模板名称" required>
              <a-input v-model:value="formData.name" placeholder="请输入模板名称" />
            </a-form-item>
            <a-form-item label="消息类型" required>
              <a-radio-group v-model:value="formData.type">
                <a-radio-button value="text">文本</a-radio-button>
                <a-radio-button value="image">图片</a-radio-button>
                <a-radio-button value="link">链接/图文</a-radio-button>
                <a-radio-button value="miniprogram">小程序</a-radio-button>
                <a-radio-button value="video">视频</a-radio-button>
              </a-radio-group>
            </a-form-item>

            <template v-if="formData.type === 'text'">
              <a-form-item label="消息内容">
                <a-textarea
                  v-model:value="formData.text"
                  :rows="5"
                  show-count
                  :maxlength="500"
                  placeholder="请输入欢迎语内容，支持插入昵称"
                />
                <div class="insert-vars">
                  <a-tag color="processing">插入客户昵称</a-tag>
                  <a-tag color="processing">插入添加时间</a-tag>
                </div>
              </a-form-item>
            </template>

            <template v-if="formData.type === 'image'">
              <a-form-item label="上传图片">
                <a-upload-dragger>
                  <p class="ant-upload-text">点击或拖拽上传图片</p>
                </a-upload-dragger>
              </a-form-item>
            </template>

            <template v-if="formData.type === 'link'">
              <a-form-item label="链接标题"
                ><a-input v-model:value="formData.link.title"
              /></a-form-item>
              <a-form-item label="链接简介"
                ><a-textarea v-model:value="formData.link.desc"
              /></a-form-item>
              <a-form-item label="跳转链接"
                ><a-input v-model:value="formData.link.url"
              /></a-form-item>
              <a-form-item label="封面图"
                ><a-upload-dragger style="height: 100px"
                  ><p>上传封面</p></a-upload-dragger
                ></a-form-item
              >
            </template>
          </a-form>
        </div>
        <div class="preview-section">
          <div class="preview-phone">
            <div class="preview-content">
              <!-- Preview logic here -->
              <div v-if="formData.type === 'text'" class="msg-bubble text">
                {{ formData.text || '预览内容' }}
              </div>
              <div v-if="formData.type === 'image'" class="msg-bubble image">[图片预览]</div>
              <div v-if="formData.type === 'link'" class="msg-bubble link">
                <h4>{{ formData.link.title || '标题' }}</h4>
                <p>{{ formData.link.desc || '描述' }}</p>
              </div>
            </div>
          </div>
          <div class="preview-label">实时预览</div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
.welcome-templates {
  padding: 0;
}
.header-actions {
  margin-bottom: 16px;
}
.template-editor {
  display: flex;
  gap: 24px;
}
.form-section {
  flex: 1;
}
.preview-section {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview-phone {
  width: 260px;
  height: 450px;
  border: 1px solid #ddd;
  border-radius: 24px;
  background: #f5f5f5;
  padding: 16px;
  overflow: hidden;
  position: relative;
}
.preview-content {
  margin-top: 40px;
}
.msg-bubble {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
}
.msg-bubble.link {
  background: #fff;
  border: 1px solid #eee;
}
.insert-vars {
  margin-top: 8px;
}
.insert-vars .ant-tag {
  cursor: pointer;
}
</style>

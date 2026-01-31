<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SettingsPage',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'

const formState = ref({
  siteName: 'Admin System',
  siteDescription: '管理系统',
  email: 'admin@example.com',
  enableRegistration: true,
  enableComments: true,
})

const handleSave = () => {
  console.log('保存设置', formState.value)
}
</script>

<template>
  <div class="settings-page">
    <a-card title="系统设置">
      <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="网站名称">
          <a-input v-model:value="formState.siteName" />
        </a-form-item>
        <a-form-item label="网站描述">
          <a-textarea v-model:value="formState.siteDescription" :rows="3" />
        </a-form-item>
        <a-form-item label="联系邮箱">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="启用注册">
          <a-switch v-model:checked="formState.enableRegistration" />
        </a-form-item>
        <a-form-item label="启用评论">
          <a-switch v-model:checked="formState.enableComments" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
          <a-button type="primary" @click="handleSave">保存设置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.settings-page {
  padding: 0;
}
</style>

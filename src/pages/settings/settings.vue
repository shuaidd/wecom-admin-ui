<script lang="ts">
export default {
  name: 'SettingsPage',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SaveOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  BellOutlined,
  MailOutlined,
} from '@ant-design/icons-vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const activeTab = ref('general')

const generalSettings = ref({
  siteName: 'WeCom Admin',
  siteDescription: '企业微信管理系统',
  logo: '',
  favicon: '',
})

const emailSettings = ref({
  smtpServer: 'smtp.example.com',
  smtpPort: 587,
  smtpUser: 'admin@example.com',
  smtpPassword: '',
  senderName: 'WeCom Admin',
  senderEmail: 'noreply@example.com',
})

const notificationSettings = ref({
  emailNotification: true,
  browserNotification: false,
  dailyReport: true,
  weeklyReport: false,
})
</script>

<template>
  <div class="settings-page">
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">系统设置</h1>
        <p class="page-subtitle">配置系统参数和个性化选项</p>
      </div>
      <div class="header-right">
        <a-button type="primary" class="save-btn">
          <SaveOutlined />
          保存设置
        </a-button>
      </div>
    </div>

    <div class="settings-layout">
      <!-- Settings Sidebar -->
      <div class="settings-sidebar">
        <div
          class="settings-nav-item"
          :class="{ active: activeTab === 'general' }"
          @click="activeTab = 'general'"
        >
          <GlobalOutlined class="nav-icon" />
          <span class="nav-label">基本设置</span>
        </div>
        <div
          class="settings-nav-item"
          :class="{ active: activeTab === 'email' }"
          @click="activeTab = 'email'"
        >
          <MailOutlined class="nav-icon" />
          <span class="nav-label">邮件设置</span>
        </div>
        <div
          class="settings-nav-item"
          :class="{ active: activeTab === 'notification' }"
          @click="activeTab = 'notification'"
        >
          <BellOutlined class="nav-icon" />
          <span class="nav-label">通知设置</span>
        </div>
        <div
          class="settings-nav-item"
          :class="{ active: activeTab === 'security' }"
          @click="activeTab = 'security'"
        >
          <SafetyCertificateOutlined class="nav-icon" />
          <span class="nav-label">安全设置</span>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="settings-content">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="settings-section">
          <h2 class="section-title">基本设置</h2>
          <div class="form-group">
            <label class="form-label">网站名称</label>
            <a-input v-model:value="generalSettings.siteName" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">网站描述</label>
            <a-textarea
              v-model:value="generalSettings.siteDescription"
              :rows="3"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">主题模式</label>
            <div class="theme-options">
              <div
                class="theme-option"
                :class="{ active: themeStore.theme === 'light' }"
                @click="themeStore.setTheme('light')"
              >
                <div class="theme-preview light-preview">
                  <div class="preview-header"></div>
                  <div class="preview-content"></div>
                </div>
                <span class="theme-label">浅色模式</span>
              </div>
              <div
                class="theme-option"
                :class="{ active: themeStore.theme === 'dark' }"
                @click="themeStore.setTheme('dark')"
              >
                <div class="theme-preview dark-preview">
                  <div class="preview-header"></div>
                  <div class="preview-content"></div>
                </div>
                <span class="theme-label">深色模式</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Settings -->
        <div v-if="activeTab === 'email'" class="settings-section">
          <h2 class="section-title">邮件设置</h2>
          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">SMTP 服务器</label>
              <a-input v-model:value="emailSettings.smtpServer" class="form-input" />
            </div>
            <div class="form-group half">
              <label class="form-label">SMTP 端口</label>
              <a-input-number
                v-model:value="emailSettings.smtpPort"
                class="form-input"
                style="width: 100%"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">SMTP 用户名</label>
            <a-input v-model:value="emailSettings.smtpUser" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">SMTP 密码</label>
            <a-input-password v-model:value="emailSettings.smtpPassword" class="form-input" />
          </div>
          <div class="form-row">
            <div class="form-group half">
              <label class="form-label">发件人名称</label>
              <a-input v-model:value="emailSettings.senderName" class="form-input" />
            </div>
            <div class="form-group half">
              <label class="form-label">发件人邮箱</label>
              <a-input v-model:value="emailSettings.senderEmail" class="form-input" />
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeTab === 'notification'" class="settings-section">
          <h2 class="section-title">通知设置</h2>
          <div class="switch-list">
            <div class="switch-item">
              <div class="switch-info">
                <span class="switch-label">邮件通知</span>
                <span class="switch-desc">接收重要事件的邮件通知</span>
              </div>
              <a-switch v-model:checked="notificationSettings.emailNotification" />
            </div>
            <div class="switch-item">
              <div class="switch-info">
                <span class="switch-label">浏览器通知</span>
                <span class="switch-desc">允许浏览器推送通知</span>
              </div>
              <a-switch v-model:checked="notificationSettings.browserNotification" />
            </div>
            <div class="switch-item">
              <div class="switch-info">
                <span class="switch-label">日报</span>
                <span class="switch-desc">每天发送数据汇总报告</span>
              </div>
              <a-switch v-model:checked="notificationSettings.dailyReport" />
            </div>
            <div class="switch-item">
              <div class="switch-info">
                <span class="switch-label">周报</span>
                <span class="switch-desc">每周发送数据汇总报告</span>
              </div>
              <a-switch v-model:checked="notificationSettings.weeklyReport" />
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="settings-section">
          <h2 class="section-title">安全设置</h2>
          <div class="security-card">
            <div class="security-item">
              <div class="security-info">
                <span class="security-label">双重认证</span>
                <span class="security-desc">启用 Google Authenticator 增强账户安全</span>
              </div>
              <a-button type="primary">启用</a-button>
            </div>
            <div class="security-item">
              <div class="security-info">
                <span class="security-label">登录历史</span>
                <span class="security-desc">查看最近的登录活动</span>
              </div>
              <a-button>查看</a-button>
            </div>
            <div class="security-item">
              <div class="security-info">
                <span class="security-label">修改密码</span>
                <span class="security-desc">定期更换密码以保护账户安全</span>
              </div>
              <a-button>修改</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin: 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--text-secondary, #64748b);
  margin: 0;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 24px;
  border-radius: 10px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* Settings Layout */
.settings-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
}

/* Settings Sidebar */
.settings-sidebar {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #e2e8f0);
  height: fit-content;
}

.settings-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 4px;
}

.settings-nav-item:hover {
  background: var(--hover-bg, #f1f5f9);
}

.settings-nav-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
}

.nav-icon {
  font-size: 18px;
}

.nav-label {
  font-size: 14px;
  font-weight: 500;
}

/* Settings Content */
.settings-content {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, #e2e8f0);
}

.settings-section {
  max-width: 600px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
}

/* Form Styles */
.form-group {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #1e293b);
  margin-bottom: 8px;
}

.form-input {
  border-radius: 8px;
}

/* Theme Options */
.theme-options {
  display: flex;
  gap: 16px;
}

.theme-option {
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.theme-option:hover {
  transform: translateY(-2px);
}

.theme-option.active .theme-preview {
  box-shadow:
    0 0 0 2px #667eea,
    0 4px 12px rgba(102, 126, 234, 0.3);
}

.theme-preview {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.light-preview {
  background: #ffffff;
}

.light-preview .preview-header {
  height: 20px;
  background: #f1f5f9;
}

.light-preview .preview-content {
  height: 60px;
  background: #ffffff;
}

.dark-preview {
  background: #1e293b;
}

.dark-preview .preview-header {
  height: 20px;
  background: #0f172a;
}

.dark-preview .preview-content {
  height: 60px;
  background: #1e293b;
}

.theme-label {
  font-size: 13px;
  color: var(--text-secondary, #64748b);
}

.theme-option.active .theme-label {
  color: #667eea;
  font-weight: 500;
}

/* Switch List */
.switch-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--hover-bg, #f8fafc);
  border-radius: 10px;
}

.switch-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.switch-label {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary, #1e293b);
}

.switch-desc {
  font-size: 13px;
  color: var(--text-muted, #94a3b8);
}

/* Security Card */
.security-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.security-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: var(--hover-bg, #f8fafc);
  border-radius: 10px;
}

.security-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.security-label {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary, #1e293b);
}

.security-desc {
  font-size: 13px;
  color: var(--text-muted, #94a3b8);
}

/* Dark theme variables */
:global([data-theme='dark']) {
  --card-bg: #1e293b;
  --hover-bg: #334155;
}

:global([data-theme='light']) {
  --card-bg: #ffffff;
  --hover-bg: #f8fafc;
}
</style>

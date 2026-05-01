<template>
  <main class="login-v2">
    <img class="login-bg" :src="loginBg" alt="" aria-hidden="true" />

    <div class="login-stage">
      <div class="login-panel-fill" aria-hidden="true"></div>
      <img class="login-frame" :src="loginContainer" alt="" aria-hidden="true" />

      <section class="login-card" aria-labelledby="login-title">
        <div class="panel-status">
          <span class="status-dot"></span>
          <span>SECURE LOGIN</span>
        </div>

        <div class="panel-heading">
          <h1 id="login-title">企微扫码登录</h1>
          <p><span>安全</span><i></i><span>高效</span><i></i><span>便捷</span></p>
        </div>

        <div class="qrcode-frame">
          <a-qrcode :value="qrCodeUrl" :status="qrStatus" :size="252" @refresh="refreshQrCode" />
        </div>

        <p class="scan-tip">请使用<span>企业微信</span>扫描二维码登录</p>

        <div class="qr-meta">
          <span>二维码有效期 2 分钟</span>
          <button type="button" @click="refreshQrCode">
            <ReloadOutlined />
            <span>刷新二维码</span>
          </button>
        </div>

        <div class="mode-divider">
          <span>其他登录方式</span>
        </div>

        <button class="account-switch" type="button" @click="showAccountPanel">
          <LockOutlined />
          <span>账号密码登录</span>
        </button>

        <p class="legal">
          登录即代表你已同意
          <a href="javascript:void(0)">《用户协议》</a>
          和
          <a href="javascript:void(0)">《隐私政策》</a>
        </p>
      </section>
    </div>

    <a-drawer
      v-model:open="accountPanelOpen"
      placement="right"
      width="420"
      root-class-name="login-v2-drawer"
      :closable="false"
    >
      <template #title>
        <div class="drawer-title">
          <span>账号密码登录</span>
          <button type="button" aria-label="关闭账号密码登录" @click="accountPanelOpen = false">
            ×
          </button>
        </div>
      </template>

      <a-form
        :model="formState"
        name="login-v2-account"
        autocomplete="off"
        class="account-form"
        @finish="handleLogin"
      >
        <a-alert v-if="errorMsg" :message="errorMsg" type="error" show-icon class="login-alert" />

        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="formState.username" placeholder="用户名：admin" size="large">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password
            v-model:value="formState.password"
            placeholder="密码：123456"
            size="large"
            @pressEnter="handleLogin"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="form-options">
          <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
          <a-button type="link" size="small">忘记密码</a-button>
        </div>

        <a-button
          type="primary"
          html-type="submit"
          block
          size="large"
          :loading="loading"
          class="login-submit"
        >
          登录
        </a-button>
      </a-form>
    </a-drawer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPageV2',
})
</script>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LockOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import loginBg from '@/images/login/bg.png'
import loginContainer from '@/images/login/login-container.png'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const accountPanelOpen = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const qrCodeUrl = ref('https://work.weixin.qq.com/')
const qrStatus = ref<'active' | 'expired' | 'loading'>('active')

const formState = reactive({
  username: 'admin',
  password: '',
  remember: true,
})

const refreshQrCode = () => {
  qrStatus.value = 'loading'

  window.setTimeout(() => {
    qrCodeUrl.value = `https://work.weixin.qq.com/?ts=${Date.now()}`
    qrStatus.value = 'active'
  }, 500)
}

const showAccountPanel = () => {
  errorMsg.value = ''
  accountPanelOpen.value = true
}

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''

  await new Promise((resolve) => window.setTimeout(resolve, 500))

  const success = userStore.login({
    username: formState.username,
    password: formState.password,
  })

  if (success) {
    message.success('登录成功')
    router.push('/')
  } else {
    errorMsg.value = '用户名或密码错误，请使用 admin / 123456'
  }

  loading.value = false
}
</script>

<style scoped>
.login-v2 {
  position: relative;
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  height: 100dvh;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  color: #d8efff;
  background: #040813;
}

.login-v2 *,
.login-v2 *::before,
.login-v2 *::after {
  box-sizing: border-box;
}

:global(html),
:global(body),
:global(#app) {
  width: 100%;
  min-width: 100%;
  min-height: 100%;
  margin: 0;
  background: #040813;
}

:global(.__vue-devtools-container__),
:global(.vue-devtools__anchor),
:global(.vue-devtools__panel),
:global([data-vue-devtools]) {
  display: none !important;
}

.login-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  user-select: none;
  pointer-events: none;
}

.login-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: min(100vw, 1672px, calc((100vh - 48px) * 1672 / 941));
  height: min(calc(100vh - 48px), 941px, calc(100vw * 941 / 1672));
  min-width: 920px;
  min-height: 518px;
  overflow: visible;
  transform: translate(-50%, -50%);
}

.login-frame {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  user-select: none;
  clip-path: inset(6.2% 26.2% 6.2% 26.2%);
  mix-blend-mode: lighten;
  pointer-events: none;
}

.login-panel-fill {
  position: absolute;
  top: 8.2%;
  left: 28.6%;
  z-index: 1;
  width: 43%;
  height: 82.4%;
  background:
    radial-gradient(circle at 12% 28%, rgba(159, 35, 197, 0.22), transparent 38%),
    radial-gradient(circle at 86% 38%, rgba(9, 206, 255, 0.2), transparent 42%),
    linear-gradient(180deg, rgba(5, 10, 24, 0.82), rgba(3, 11, 22, 0.9));
  box-shadow:
    0 0 68px rgba(0, 0, 0, 0.72),
    inset 0 0 58px rgba(12, 220, 255, 0.06);
  clip-path: polygon(5% 0, 95% 0, 100% 5.5%, 100% 90%, 94% 100%, 6% 100%, 0 91%, 0 5.5%);
}

.login-card {
  position: absolute;
  top: 9.9%;
  left: 50%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(36.5%, 560px);
  min-width: 430px;
  transform: translateX(-50%);
}

.panel-status {
  align-self: flex-start;
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 3.8%;
  color: rgba(216, 239, 255, 0.46);
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #25dcff;
  border-radius: 50%;
  box-shadow: 0 0 16px #25dcff;
}

.panel-heading {
  margin-top: 40px;
  text-align: center;
}

.panel-heading h1 {
  margin: 0;
  color: transparent;
  font-size: clamp(46px, 4.2vw, 66px);
  font-weight: 900;
  line-height: 1.1;
  text-shadow: 0 0 22px rgba(40, 216, 255, 0.45);
  background: linear-gradient(90deg, #28e9ff 6%, #84b8ff 48%, #ff61f6 92%);
  -webkit-background-clip: text;
  background-clip: text;
}

.panel-heading p {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  margin: 18px 0 0;
  color: #bac4d2;
  font-size: 21px;
  font-weight: 650;
}

.panel-heading p span:first-child {
  color: #25e5ff;
}

.panel-heading i {
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 50%;
}

.qrcode-frame {
  position: relative;
  display: grid;
  width: 292px;
  height: 292px;
  margin-top: 32px;
  place-items: center;
  background: #ffffff;
  border: 1px solid rgba(39, 220, 255, 0.92);
  border-radius: 8px;
  box-shadow:
    0 0 0 16px rgba(25, 213, 255, 0.08),
    0 0 34px rgba(37, 222, 255, 0.48);
}

.qrcode-frame::before,
.qrcode-frame::after {
  position: absolute;
  width: 70px;
  height: 70px;
  content: '';
  border-color: #24dcff;
  filter: drop-shadow(0 0 8px #24dcff);
}

.qrcode-frame::before {
  top: -18px;
  left: -18px;
  border-top: 3px solid;
  border-left: 3px solid;
}

.qrcode-frame::after {
  right: -18px;
  bottom: -18px;
  border-right: 3px solid;
  border-bottom: 3px solid;
}

.scan-tip {
  margin: 33px 0 8px;
  color: #f4fbff;
  font-size: 19px;
  font-weight: 650;
}

.scan-tip span {
  margin: 0 2px;
  color: #28e4ff;
  font-weight: 800;
}

.qr-meta {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  color: rgba(216, 239, 255, 0.72);
  font-size: 16px;
}

.qr-meta button {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  padding: 0;
  color: #23dcff;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.mode-divider {
  display: flex;
  gap: 18px;
  align-items: center;
  width: 330px;
  margin: 30px 0 14px;
  color: rgba(216, 239, 255, 0.66);
  font-size: 14px;
}

.mode-divider::before,
.mode-divider::after {
  flex: 1;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, transparent, rgba(216, 239, 255, 0.36));
}

.mode-divider::after {
  background: linear-gradient(90deg, rgba(216, 239, 255, 0.36), transparent);
}

.account-switch {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 52px;
  color: #2fe6ff;
  cursor: pointer;
  background: rgba(9, 29, 55, 0.58);
  border: 1px solid rgba(39, 220, 255, 0.2);
  border-radius: 6px;
  box-shadow: inset 0 0 20px rgba(44, 205, 255, 0.08);
}

.account-switch:hover {
  color: #ffffff;
  border-color: rgba(39, 220, 255, 0.62);
  box-shadow:
    inset 0 0 20px rgba(44, 205, 255, 0.12),
    0 0 20px rgba(39, 220, 255, 0.18);
}

.legal {
  margin: 26px 0 0;
  color: rgba(216, 239, 255, 0.48);
  font-size: 13px;
  text-align: center;
}

.legal a {
  color: #168fde;
}

:global(.login-v2-drawer .ant-drawer-content) {
  color: #d8efff;
  background:
    linear-gradient(rgba(6, 17, 34, 0.94), rgba(5, 9, 24, 0.96)) padding-box,
    linear-gradient(135deg, #e75bff, #20dcff) border-box;
  border-left: 1px solid transparent;
  box-shadow: -18px 0 50px rgba(10, 205, 255, 0.2);
}

:global(.login-v2-drawer .ant-drawer-header) {
  background: transparent;
  border-bottom-color: rgba(39, 220, 255, 0.2);
}

:global(.login-v2-drawer .ant-drawer-title) {
  color: #d8efff;
}

.drawer-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #35e8ff;
  font-size: 18px;
  font-weight: 700;
}

.drawer-title button {
  width: 32px;
  height: 32px;
  color: rgba(216, 239, 255, 0.78);
  cursor: pointer;
  background: rgba(36, 222, 255, 0.08);
  border: 1px solid rgba(36, 222, 255, 0.25);
  border-radius: 4px;
}

.account-form {
  padding-top: 16px;
}

.login-alert {
  margin-bottom: 18px;
}

.account-form :deep(.ant-input-affix-wrapper) {
  height: 48px;
  color: #d8efff;
  background: rgba(3, 11, 26, 0.68);
  border-color: rgba(41, 220, 255, 0.28);
  border-radius: 6px;
  box-shadow: inset 0 0 22px rgba(34, 213, 255, 0.05);
}

.account-form :deep(.ant-input-affix-wrapper:hover),
.account-form :deep(.ant-input-affix-wrapper-focused) {
  border-color: #25dfff;
  box-shadow: 0 0 18px rgba(37, 223, 255, 0.22);
}

.account-form :deep(.ant-input),
.account-form :deep(.ant-input-password-icon),
.account-form :deep(.ant-input-prefix) {
  color: #d8efff;
  background: transparent;
}

.account-form :deep(.ant-input::placeholder) {
  color: rgba(216, 239, 255, 0.44);
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -4px 0 22px;
}

.form-options :deep(.ant-checkbox-wrapper) {
  color: rgba(216, 239, 255, 0.74);
}

.form-options :deep(.ant-btn-link) {
  color: #25dfff;
}

.login-submit {
  height: 48px;
  font-weight: 700;
  background: linear-gradient(90deg, #10cde8, #7d66ff 52%, #ef58ff);
  border: 0;
  border-radius: 6px;
  box-shadow: 0 0 22px rgba(39, 218, 255, 0.3);
}

@media (min-width: 1800px), (min-height: 1040px) {
  .login-card {
    width: 560px;
  }

  .panel-heading h1 {
    font-size: 66px;
  }
}

@media (max-width: 1280px) {
  .login-stage {
    min-width: min(100vw, 920px);
  }

  .login-card {
    width: 470px;
    min-width: 0;
  }

  .panel-heading h1 {
    font-size: 52px;
  }

  .qrcode-frame {
    width: 270px;
    height: 270px;
  }

  .qrcode-frame :deep(canvas) {
    width: 232px !important;
    height: 232px !important;
  }
}

@media (max-width: 720px) {
  .login-stage {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    min-width: 0;
    min-height: 0;
  }

  .login-frame {
    width: auto;
    min-width: 100%;
    object-fit: cover;
  }

  .login-panel-fill {
    top: 2.5%;
    left: 4%;
    width: 92%;
    height: 86%;
  }

  .login-card {
    top: 6.5%;
    width: 86vw;
    min-width: 0;
  }

  .panel-status {
    font-size: 11px;
  }

  .panel-heading {
    margin-top: 28px;
  }

  .panel-heading h1 {
    font-size: 42px;
  }

  .panel-heading p {
    font-size: 17px;
  }

  .qrcode-frame {
    width: 252px;
    height: 252px;
    margin-top: 28px;
  }

  .qrcode-frame :deep(canvas) {
    width: 214px !important;
    height: 214px !important;
  }

  .scan-tip {
    font-size: 17px;
  }

  .qr-meta {
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
  }

  .mode-divider,
  .account-switch {
    width: min(100%, 310px);
  }
}
</style>

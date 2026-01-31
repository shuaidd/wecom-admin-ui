<template>
  <div class="login-container">
    <canvas ref="canvasRef" class="login-bg"></canvas>

    <div class="login-content">
      <div class="login-header">
        <div class="logo-box">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
            <defs>
              <linearGradient id="loginLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #6366f1; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #8b5cf6; stop-opacity: 1" />
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="6" fill="url(#loginLogoGradient)" />
            <path
              d="M7 10L12 17L17 10"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="title">WeCom Admin</span>
      </div>
      <div class="login-desc">智能驱动的新一代客户管理解决方案</div>

      <a-card class="login-card" :bordered="false">
        <a-tabs v-model:activeKey="activeTab" centered>
          <a-tab-pane key="account" tab="账号登录">
            <a-form
              :model="formState"
              name="basic"
              autocomplete="off"
              class="login-form"
              @finish="handleLogin"
            >
              <a-alert
                v-if="errorMsg"
                :message="errorMsg"
                type="error"
                show-icon
                class="login-alert"
              />

              <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
                <a-input
                  v-model:value="formState.username"
                  placeholder="用户名：admin"
                  size="large"
                  class="glass-input"
                >
                  <template #prefix>
                    <UserOutlined class="icon-prefix" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
                <a-input-password
                  v-model:value="formState.password"
                  placeholder="密码：123456"
                  size="large"
                  class="glass-input"
                  @pressEnter="handleLogin"
                >
                  <template #prefix>
                    <LockOutlined class="icon-prefix" />
                  </template>
                </a-input-password>
              </a-form-item>

              <div class="login-options">
                <a-checkbox v-model:checked="formState.remember" class="glass-checkbox"
                  >记住密码</a-checkbox
                >
                <a class="forgot-password">忘记密码</a>
              </div>

              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  block
                  size="large"
                  :loading="loading"
                  class="login-button"
                >
                  登录
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>

          <a-tab-pane key="qrcode" tab="扫码登录">
            <div class="qrcode-container">
              <div class="qrcode-wrapper">
                <a-qrcode
                  :value="qrCodeUrl"
                  :status="qrStatus"
                  @refresh="refreshQrCode"
                  :size="180"
                />
              </div>
              <p class="qrcode-desc">请使用 <span class="highlight">企业微信</span> 扫码登录</p>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>

      <div class="login-footer">Copyright &copy; 2026 WeCom Admin UI</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPage',
})
</script>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'

const router = useRouter()
const userStore = useUserStore()

const activeTab = ref('account')
const loading = ref(false)
const errorMsg = ref('')
const qrCodeUrl = ref('https://work.weixin.qq.com/')
const qrStatus = ref<'active' | 'expired' | 'loading'>('active')

const formState = reactive({
  username: 'admin',
  password: '',
  remember: true,
})

// Canvas Animation Logic
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let particles: Particle[] = []
const mouse = { x: 0, y: 0, isActive: false }

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.size = Math.random() * 2 + 1
    // 科技蓝/青色系
    const colors = ['rgba(99, 102, 241, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(6, 182, 212, 0.5)']
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update(width: number, height: number) {
    this.x += this.vx
    this.y += this.vy

    // Bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas.width, canvas.height)
  }

  const initParticles = (width: number, height: number) => {
    particles = []
    const count = Math.floor((width * height) / 10000) // Density
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(width, height))
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update(canvas.width, canvas.height)
      particle.draw(ctx)
    })

    // Draw connections
    connectParticles(ctx)

    // Draw mouse connections
    if (mouse.isActive) {
      connectMouse(ctx)
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  const connectParticles = (ctx: CanvasRenderingContext2D) => {
    const maxDist = 100
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDist) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * (1 - dist / maxDist)})`
          ctx.lineWidth = 1
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  const connectMouse = (ctx: CanvasRenderingContext2D) => {
    const maxDist = 150
    particles.forEach((particle) => {
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < maxDist) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 * (1 - dist / maxDist)})`
        ctx.lineWidth = 1.5
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(particle.x, particle.y)
        ctx.stroke()
      }
    })
  }

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.isActive = true
  })
  window.addEventListener('mouseleave', () => {
    mouse.isActive = false
  })

  resize()
  animate()
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''

  await new Promise((resolve) => setTimeout(resolve, 800))

  const success = userStore.login({
    username: formState.username,
    password: formState.password,
  })

  if (success) {
    message.success('登录成功')
    router.push('/')
  } else {
    errorMsg.value = '用户名或密码错误 (admin/123456)'
  }

  loading.value = false
}

const refreshQrCode = () => {
  qrStatus.value = 'loading'
  setTimeout(() => {
    qrStatus.value = 'active'
  }, 1000)
}
</script>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  overflow: hidden;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.login-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  padding: 0 20px;
  animation: fadeIn 0.8s ease-out;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.logo-box {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-svg {
  width: 42px;
  height: 42px;
}

.login-header .title {
  font-size: 36px;
  background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  font-weight: 700;
  letter-spacing: 1px;
}

.login-desc {
  text-align: center;
  margin-bottom: 40px;
  color: #94a3b8;
  font-size: 16px;
  margin-top: -30px;
  font-weight: 300;
}

.login-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}

/* Tabs Styling Override */
:deep(.ant-tabs-nav) {
  margin-bottom: 24px;
}

:deep(.ant-tabs-nav::before) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.ant-tabs-tab) {
  padding: 12px 0;
  margin: 0 32px 0 0;
  color: #64748b;
  font-size: 16px;
  transition: all 0.3s;
}

:deep(.ant-tabs-tab:hover) {
  color: #94a3b8;
}

:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #fff;
  font-weight: 500;
}

:deep(.ant-tabs-ink-bar) {
  background: #6366f1;
  height: 3px;
  border-radius: 3px;
}

/* Form Styling */
.login-form {
  margin-top: 10px;
}

.glass-input {
  /* Customize Ant Input */
  background: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  border-radius: 8px;
}

.glass-input:hover,
:deep(.glass-input:focus) {
  border-color: #6366f1 !important;
  background: rgba(0, 0, 0, 0.3) !important;
}

:deep(.ant-input),
:deep(.ant-input-password-icon) {
  background: transparent !important;
  color: #fff !important;
}

:deep(.ant-input-password-icon) {
  color: rgba(255, 255, 255, 0.4) !important;
}

:deep(.ant-input-password-icon:hover) {
  color: #fff !important;
}

:deep(.ant-input-prefix) {
  color: rgba(255, 255, 255, 0.4);
}

:deep(.ant-input::placeholder) {
  color: rgba(255, 255, 255, 0.3);
}

.login-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.glass-checkbox {
  color: #94a3b8;
}

:deep(.ant-checkbox-inner) {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.3);
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #6366f1;
  border-color: #6366f1;
}

.forgot-password {
  color: #6366f1;
}

.forgot-password:hover {
  color: #818cf8;
}

.login-button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s;
}

.login-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
  opacity: 0.9;
}

.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 380px;
  margin: 0 auto;
}

.qrcode-wrapper {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-wrapper {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-desc {
  margin-top: 20px;
  color: #94a3b8;
  font-size: 14px;
}

.highlight {
  color: #6366f1;
  font-weight: 500;
}

.login-footer {
  text-align: center;
  margin-top: 48px;
  color: #64748b;
  font-size: 13px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

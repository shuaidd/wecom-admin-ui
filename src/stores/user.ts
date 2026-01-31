import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const router = useRouter()

  function login(payload: { username: string; password?: string }) {
    // Mock login logic
    if (payload.username === 'admin' && (payload.password === '123456' || !payload.password)) {
      token.value = 'mock-token-123'
      localStorage.setItem('token', 'mock-token-123')
      return true
    }
    return false
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  return {
    token,
    login,
    logout,
  }
})

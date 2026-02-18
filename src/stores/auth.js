import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // 使用者資訊
  const user = ref(null)
  const isAuthenticated = computed(() => user.value !== null)

  // 登入
  const login = (email, password) => {
    // 這裡可以連接後端 API
    // 目前先做簡單的模擬登入
    if (email && password) {
      // 從 email 提取使用者名稱（@ 前面的部分）
      const username = email.split('@')[0]
      user.value = {
        email,
        username: username.charAt(0).toUpperCase() + username.slice(1),
        name: username.charAt(0).toUpperCase() + username.slice(1)
      }
      // 儲存到 localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    }
    return { success: false, message: '請輸入帳號和密碼' }
  }

  // 註冊
  const register = (name, email, password, confirmPassword) => {
    // 驗證
    if (!name || !email || !password || !confirmPassword) {
      return { success: false, message: '請填寫所有欄位' }
    }
    if (password !== confirmPassword) {
      return { success: false, message: '密碼與確認密碼不一致' }
    }
    if (password.length < 6) {
      return { success: false, message: '密碼長度至少需要 6 個字元' }
    }

    // 這裡可以連接後端 API
    // 目前先做簡單的模擬註冊
    user.value = {
      email,
      username: name,
      name: name
    }
    // 儲存到 localStorage
    localStorage.setItem('user', JSON.stringify(user.value))
    return { success: true }
  }

  // 登出
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  // 從 localStorage 恢復使用者資訊
  const restoreUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Failed to parse user data:', e)
        localStorage.removeItem('user')
      }
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    restoreUser
  }
})
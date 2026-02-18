<template>
  <div v-if="show" class="auth-modal-overlay">
    <div class="auth-modal">
      <button class="close-btn" @click="$emit('close')" aria-label="關閉">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- 使用 Transition 組件包裹表單切換 -->
      <Transition name="form-slide" mode="out-in">
        <!-- 登入表單 -->
        <div v-if="mode === 'login'" key="login" class="auth-form">
          <h2 class="form-title">登入</h2>
          <p class="form-subtitle">歡迎回來</p>
          
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="login-email">電子郵件</label>
              <input
                id="login-email"
                v-model="loginForm.email"
                type="email"
                placeholder="請輸入您的電子郵件"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="login-password">密碼</label>
              <input
                id="login-password"
                v-model="loginForm.password"
                type="password"
                placeholder="請輸入您的密碼"
                required
              />
            </div>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <button type="submit" class="submit-btn">登入</button>
          </form>

          <p class="switch-mode">
            還沒有帳號？
            <a href="#" @click.prevent="mode = 'register'">立即註冊</a>
          </p>
        </div>

        <!-- 註冊表單 -->
        <div v-else-if="mode === 'register'" key="register" class="auth-form">
          <h2 class="form-title">註冊</h2>
          <p class="form-subtitle">加入鬆餅茶屋</p>
          
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label for="register-name">姓名</label>
              <input
                id="register-name"
                v-model="registerForm.name"
                type="text"
                placeholder="請輸入您的姓名"
                required
              />
            </div>

            <div class="form-group">
              <label for="register-email">電子郵件</label>
              <input
                id="register-email"
                v-model="registerForm.email"
                type="email"
                placeholder="請輸入您的電子郵件"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="register-password">密碼</label>
              <input
                id="register-password"
                v-model="registerForm.password"
                type="password"
                placeholder="請輸入密碼（至少 6 個字元）"
                required
              />
            </div>

            <div class="form-group">
              <label for="register-confirm">確認密碼</label>
              <input
                id="register-confirm"
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="請再次輸入密碼"
                required
              />
            </div>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <button type="submit" class="submit-btn">註冊</button>
          </form>

          <p class="switch-mode">
            已經有帳號了？
            <a href="#" @click.prevent="mode = 'login'">立即登入</a>
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success', 'register-success'])

const authStore = useAuthStore()
const mode = ref('login') // 'login' | 'register'
const errorMessage = ref('')

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 當模態框顯示時重置表單和錯誤訊息
watch(() => props.show, (newVal) => {
  if (newVal) {
    errorMessage.value = ''
    loginForm.value = { email: '', password: '' }
    registerForm.value = { name: '', email: '', password: '', confirmPassword: '' }
    mode.value = 'login'
  }
})

const handleLogin = () => {
  errorMessage.value = ''
  const result = authStore.login(loginForm.value.email, loginForm.value.password)
  
  if (result.success) {
    emit('success')
    emit('close')
  } else {
    errorMessage.value = result.message || '登入失敗，請檢查您的帳號和密碼'
  }
}

const handleRegister = () => {
  errorMessage.value = ''
  const result = authStore.register(
    registerForm.value.name,
    registerForm.value.email,
    registerForm.value.password,
    registerForm.value.confirmPassword
  )
  
  if (result.success) {
    // 先觸發註冊成功事件，顯示成功提示
    emit('register-success')
    // 延遲關閉模態框，讓用戶看到成功提示
    setTimeout(() => {
      emit('close')
    }, 500)
  } else {
    errorMessage.value = result.message || '註冊失敗，請檢查您的輸入'
  }
}

</script>

<style scoped>
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.auth-modal {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  width: 90%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #6c7059;
}

.auth-form {
  width: 100%;
}

.form-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: 2px;
}

.form-subtitle {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.9rem;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  color: #333;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #6c7059;
  box-shadow: 0 0 0 3px rgba(108, 112, 89, 0.1);
}

.form-group input::placeholder {
  color: #aaa;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Noto Sans TC', sans-serif;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #6c7059;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Noto Serif TC', serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background: #565a46;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 112, 89, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.switch-mode {
  text-align: center;
  margin-top: 1.5rem;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.9rem;
  color: #666;
}

.switch-mode a {
  color: #6c7059;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.switch-mode a:hover {
  color: #565a46;
  text-decoration: underline;
}

/* 表單切換動畫 */
.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

.form-slide-enter-to,
.form-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .auth-modal {
    padding: 2rem 1.5rem;
    width: 95%;
  }

  .form-title {
    font-size: 1.75rem;
  }

  .form-slide-enter-from {
    transform: translateX(20px) scale(0.98);
  }

  .form-slide-leave-to {
    transform: translateX(-20px) scale(0.98);
  }
}
</style>
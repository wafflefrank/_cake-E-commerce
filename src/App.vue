<template>
  <div class="app-container">
    <RouteLogoSplash :show="isRouteLoading" />
    <ToastNotification v-model:show="showToast" :message="toastMessage" />
    <!-- 導航欄 -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <div class="nav-left">
          <RouterLink to="/" class="brand-link">
            <div class="brand-logo">
              <div class="logo-icon">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="48" fill="#F2EFE9" stroke="#6C7059" stroke-width="2" />
                  <rect
                    x="25"
                    y="25"
                    width="50"
                    height="50"
                    rx="5"
                    fill="#Cbaacb"
                    style="fill: #d4a373"
                  />
                  <line x1="41" y1="25" x2="41" y2="75" stroke="#8B5E3C" stroke-width="3" />
                  <line x1="58" y1="25" x2="58" y2="75" stroke="#8B5E3C" stroke-width="3" />
                  <line x1="25" y1="41" x2="75" y2="41" stroke="#8B5E3C" stroke-width="3" />
                  <line x1="25" y1="58" x2="75" y2="58" stroke="#8B5E3C" stroke-width="3" />
                  <circle cx="65" cy="35" r="8" fill="#FFF8E7" />
                </svg>
              </div>

              <div class="logo-text">
                <span class="logo-en">Waffle</span>
                <span class="logo-zh">鬆餅屋</span>
              </div>
            </div>
          </RouterLink>
        </div>
        <div class="nav-right">
          <button class="hamburger" aria-label="menu" @click="isMenuOpen = !isMenuOpen">
            <span></span><span></span><span></span>
          </button>
          <div 
            class="nav-links" 
            :class="{ 'is-open': isMenuOpen }"
            @mouseleave="handleMenuMouseLeave"
          >
            <RouterLink to="/products" class="nav-link">商品</RouterLink>
            <RouterLink to="/about" class="nav-link">關於</RouterLink>
            <RouterLink to="/faq" class="nav-link">FAQ</RouterLink>
          </div>
          <!-- 登入後顯示使用者名稱 -->
          <div v-if="authStore.isAuthenticated" class="user-info">
            <span class="username">{{ authStore.user.name }}</span>
            <button class="logout-btn" @click="handleLogout" aria-label="登出">登出</button>
          </div>
          <!-- 未登入顯示帳戶圖標 -->
          <button v-else class="icon-btn ms-3" aria-label="account" @click="showAuthModal = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path
                d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"
              ></path>
            </svg>
          </button>
          <button class="icon-btn" aria-label="cart" @click="toggleCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"
              ></path>
            </svg>
            <span class="cart-count" v-if="cartStore.totalItems > 0">{{
              cartStore.totalItems
            }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- 購物車側邊欄 -->
    <div class="cart-sidebar" :class="{ active: showCart }">
      <div class="cart-header">
        <h3>購物車預覽</h3>
        <button class="close-btn" @click="toggleCart">×</button>
      </div>
      <div class="cart-content">
        <div v-if="cartStore.isEmpty" class="empty-cart">
          <p>購物車是空的</p>
        </div>
        <div v-else>
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-details" style="flex: 1; min-width: 0;">
              <h4>{{ item.name }}</h4>
              <p>NT${{ item.price }}</p>
              <div class="quantity-controls">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="cartStore.removeFromCart(item.id)" aria-label="刪除商品">×</button>
          </div>
        </div>
      </div>
      <div class="cart-footer" v-if="!cartStore.isEmpty">
        <div class="cart-total">
          <p>總計: NT${{ cartStore.totalPrice }}</p>
        </div>
        <RouterLink to="/checkout" class="checkout-btn" @click="toggleCart">來結帳囉</RouterLink>
      </div>
    </div>

    <!-- 主內容區域 -->
    <main class="main-content" :class="{ 'content-hidden': isRouteLoading }">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>餅乾茶屋</h3>
            <p>呈現最驚豔的味</p>
          </div>
          <div class="footer-section">
            <h4>商品</h4>
            <ul>
              <li><RouterLink to="/products">夾餡餅乾</RouterLink></li>
              <li><RouterLink to="/products">造型餅乾</RouterLink></li>
              <li><RouterLink to="/products">禮盒</RouterLink></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>聯絡我們</h4>
            <p>
              Instagram: 
              <a href="https://www.instagram.com/yurayou.yu/" target="_blank" rel="noopener noreferrer">@yurayou.yu</a>
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright © 2025 鬆餅茶屋</p>
        </div>
      </div>
    </footer>

    <!-- 回到頂部按鈕 -->
    <button v-if="showBackToTop" class="back-to-top-btn" @click="scrollToTop" aria-label="回到頂部">
      <span class="back-to-top-text">page top</span>
      <span class="back-to-top-line"></span>
    </button>

    <!-- 登入/註冊模態框 -->
    <AuthModal 
      :show="showAuthModal" 
      @close="showAuthModal = false" 
      @success="handleAuthSuccess"
      @register-success="handleRegisterSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import RouteLogoSplash from '@/components/RouteLogoSplash.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import AuthModal from '@/components/AuthModal.vue'
import { useToast } from '@/composables/useToast'

const cartStore = useCartStore()
const authStore = useAuthStore()
const { showToast, toastMessage, triggerToast } = useToast()
const showCart = ref(false)
const showAuthModal = ref(false)
const isScrolled = ref(false)
const isMenuOpen = ref(false)
const showBackToTop = ref(false)
const isRouteLoading = ref(false)
const route = useRoute()
const router = useRouter()

// 監聽購物車最近操作，僅在「新增」時顯示通知
watch(
  () => cartStore.lastAction,
  (action) => {
    if (action === 'add') {
      triggerToast() // 使用默認訊息
      cartStore.lastAction = null // 重置，確保後續「新增」仍會觸發
    }
  }
)

const toggleCart = () => {
  showCart.value = !showCart.value
}

const handleMenuMouseLeave = () => {
  // 只在手機模式下（選單展開時）才自動收合
  // 使用 window.innerWidth 判斷是否為手機模式
  if (window.innerWidth <= 768 && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const checkScrollPosition = () => {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 10
    checkScrollPosition()
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  checkScrollPosition()
  
  // 恢復使用者登入狀態
  authStore.restoreUser()
})

const handleAuthSuccess = () => {
  // 登入成功後的處理
  triggerToast('歡迎回來！')
}

const handleRegisterSuccess = () => {
  // 註冊成功後的處理，顯示帶打勾圖標的成功提示
  triggerToast('註冊成功！')
}

const handleLogout = () => {
  authStore.logout()
  triggerToast('已成功登出')
}

// 監聽路由變化，自動關閉手機版選單
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  }
)

// 監聽路由變化，顯示/隱藏過場動畫
router.beforeEach(async (to, from, next) => {
  // 僅在實際切換頁面時觸發（from.path !== to.path），避免重新整理時觸發
  // 重新整理時 from.path === to.path，所以不會觸發
  if (from.path && from.path !== to.path) {
    // 立即顯示動畫遮罩，隱藏內容（在路由切換前）
    // 使用 nextTick 確保 DOM 更新完成
    isRouteLoading.value = true
    // 立即滾動到頂部
    window.scrollTo({ top: 0, behavior: 'instant' })
    // 等待 DOM 更新，確保遮罩已經顯示並覆蓋內容
    await nextTick()
    // 再等待一小段時間確保遮罩完全覆蓋
    await new Promise((resolve) => setTimeout(resolve, 10))
  }
  // 繼續路由導航
  next()
})

router.afterEach((to, from) => {
  // 等待動畫完成後才隱藏遮罩並顯示新頁面內容
  // logoIn 動畫：1200ms + 100ms delay = 1300ms，加上過渡效果 500ms，總共約 1800ms
  // 但為了確保動畫完全結束，我們等待足夠的時間
  setTimeout(() => {
    isRouteLoading.value = false
    // 移除滾動邏輯，讓 scrollBehavior 統一處理滾動行為
    // 這樣可以避免重新整理時不必要的滾動
  }, 1000) // 確保動畫完全結束後才顯示新頁面
})
</script>

<style scoped>
/* 確保 App 容器是 flex 佈局，且最小高度為整個視窗 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 主要內容區域，確保不會被固定的導航欄遮擋 */
.main-content {
  padding-top: 64px;
  flex: 1; /* 讓 main 區域填滿 header 和 footer 之間的剩餘空間 */
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

/* 在路由切換動畫期間隱藏內容 */
.main-content.content-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  /* 確保立即隱藏，避免閃現 */
  transition: opacity 0.1s ease, visibility 0.1s ease;
}

/* 導航欄樣式 (從 HomeView.vue 搬移) */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  z-index: 1000;
  height: 64px;
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
}

.navbar.scrolled {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.nav-right {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  list-style: none;
}

.brand-link {
  text-decoration: none;
}

/* --- Logo 樣式設計 --- */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-icon {
  width: 50px;
  height: 50px;
  transition: transform 0.3s ease;
}

.brand-logo:hover .logo-icon {
  transform: rotate(-25deg); /* 滑鼠移上去稍微俏皮轉動 */
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-align: left;
}

.logo-en {
  font-family: 'Noto Serif TC', serif; /* 使用襯線體 */
  font-size: 1.8rem;
  font-weight: 700;
  color: #8b5e3c; /* 焦糖色 */
  letter-spacing: 1px;
}

.logo-zh {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.9rem;
  color: #6c7059; /* 莫蘭迪綠，呼應按鈕 */
  letter-spacing: 4px; /* 字距拉開，更有質感 */
  margin-top: 4px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 400;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  padding: 0.5rem 0.25rem;
  position: relative;
}

.nav-link:hover {
  color: #6c7059;
}

/* 使用者資訊樣式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Noto Sans TC', sans-serif;
}

.username {
  font-size: 0.95rem;
  color: #4a4a4a;
  font-weight: 500;
}

.logout-btn {
  background: transparent;
  border: 1px solid #6c7059;
  color: #6c7059;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #6c7059;
  color: white;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  background: #6c7059;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.nav-link.router-link-active {
  color: #6c7059;
}

.icon-btn {
  background: transparent;
  border: none;
  color: #6c7059;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  padding: 0;
}

.icon-btn:hover {
  background: transparent;
  box-shadow: none;
}

.icon-btn svg {
  font-size: 1.4rem;
  color: #444;
  width: 1.4rem;
  height: 1.4rem;
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff6b6b;
  color: #fff;
  border-radius: 999px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
}

.hamburger {
  display: none;
}

@media (max-width: 768px) {
  .user-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .username {
    font-size: 0.85rem;
  }

  .logout-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .hamburger {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 8px;
    z-index: 1000;
  }
  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #333;
  }

  .nav-links {
    display: none;
  }
  .nav-links.is-open {
    display: grid;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    background: #fff;
    padding: 80px 16px 20px;
    grid-auto-flow: row;
    gap: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    z-index: 999;
    text-align: center;
  }
}

/* 購物車側邊欄樣式 (從 HomeView.vue 搬移) */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
}

.cart-sidebar.active {
  right: 0;
}

.cart-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.cart-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  position: relative;
  align-items: flex-start;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-controls button {
  background: #6c7059;
  color: white;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.remove-btn {
  position: absolute;
  top: 2rem;
  right: 0;
  background: #942424;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(255, 68, 68, 0.3);
  flex-shrink: 0;
}

.remove-btn:hover {
  background: #6b1b1b;
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(255, 68, 68, 0.4);
}

.remove-btn:active {
  transform: scale(0.95);
}

.cart-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
}

.checkout-btn {
  width: 100%;
  background: #6c7059;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  text-decoration: none;
  display: block;
  text-align: center;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 500;
  transition: background 0.3s ease;
}

.checkout-btn:hover {
  background: #565a46;
}

@media (max-width: 768px) {
  .cart-sidebar {
    width: 100%;
    right: -100%;
  }
}

/* Footer 樣式 (從 HomeView.vue 搬移) */
.footer {
  background: #333;
  color: white;
  padding: 3rem 0 1rem;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  color: #8b5e3c;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #6c7059;
}

.footer-section p a {
  color: #8b5e3c;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.footer-section p a:hover {
  border-bottom-color: #6c7059;
  opacity: 0.8;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #555;
  color: #ccc;
}

/* 回到頂部按鈕樣式 (從 HomeView.vue 搬移) */
.back-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  z-index: 999;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  padding: 0;
  flex-direction: row;
}

.back-to-top-text {
  color: #d3d3d3;
  font-size: 0.8rem;
  letter-spacing: 2px;
  font-weight: 400;
  transition: color 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  align-self: flex-end;
}

.back-to-top-line {
  width: 2px;
  height: 50px;
  background: #d3d3d3;
  display: block;
  transition:
    background 0.3s ease,
    height 0.3s ease;
  flex-shrink: 0;
  align-self: flex-end;
}

.back-to-top-btn:hover .back-to-top-text {
  color: #6c7059;
}

.back-to-top-btn:hover .back-to-top-line {
  background: #6c7059;
  height: 30px;
}

@media (max-width: 768px) {
  .back-to-top-btn {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>

<style>
/* 引入共用字體 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&family=Noto+Sans+TC:wght@400&display=swap');

/* 全域滾動條樣式 */
html::-webkit-scrollbar {
  width: 8px;
}

html::-webkit-scrollbar-track {
  background: #fdfaf5; /* 一個比白色稍暖的背景色 */
}

html::-webkit-scrollbar-thumb {
  background: #c5a68a; /* 一個比主題色稍淺的顏色 */
  border-radius: 4px;
}

html::-webkit-scrollbar-thumb:hover {
  background: #6c7059; /* 滑鼠懸停時使用主題色 */
}
</style>

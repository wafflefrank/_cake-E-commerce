<template>
  <div class="contact">
    <!-- 導航欄 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <h1>餅乾生產餡</h1>
        </div>
        <div class="nav-menu">
          <router-link to="/" class="nav-link">首頁</router-link>
          <router-link to="/products" class="nav-link">商品</router-link>
          <router-link to="/about" class="nav-link">關於</router-link>
          <router-link to="/contact" class="nav-link active">聯絡</router-link>
        </div>
        <div class="nav-cart">
          <button class="cart-btn" @click="toggleCart">
            <span class="cart-icon">🛒</span>
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
            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p>NT${{ item.price }}</p>
              <div class="quantity-controls">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="cartStore.removeFromCart(item.id)">×</button>
          </div>
        </div>
      </div>
      <div class="cart-footer" v-if="!cartStore.isEmpty">
        <div class="cart-total">
          <p>總計: NT${{ cartStore.totalPrice }}</p>
        </div>
        <button class="checkout-btn">來結帳囉</button>
      </div>
    </div>

    <!-- 主內容 -->
    <main>
      <!-- Hero Section -->
      <section class="contact-hero">
        <div class="container">
          <h1 class="hero-title">聯絡我們</h1>
          <p class="hero-subtitle">有任何問題或建議，歡迎與我們聯繫</p>
        </div>
      </section>

      <!-- 聯絡資訊 -->
      <section class="contact-info">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <h3>Instagram</h3>
              <p>@iiincookie</p>
              <a href="https://instagram.com/iiincookie" target="_blank" class="contact-link"
                >追蹤我們</a
              >
            </div>
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <h3>Email</h3>
              <p>info@iiincookie.com</p>
              <a href="mailto:info@iiincookie.com" class="contact-link">發送郵件</a>
            </div>
            <div class="contact-item">
              <div class="contact-icon">⏰</div>
              <h3>營業時間</h3>
              <p>週一至週五 9:00-18:00</p>
              <p class="contact-note">週末及國定假日休息</p>
            </div>
            <div class="contact-item">
              <div class="contact-icon">🚚</div>
              <h3>配送資訊</h3>
              <p>全台宅配服務</p>
              <p class="contact-note">3-5個工作天送達</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 常見問題 -->
      <section class="faq">
        <div class="container">
          <h2 class="section-title">常見問題</h2>
          <div class="faq-list">
            <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
              <button class="faq-question" @click="toggleFaq(index)">
                {{ faq.question }}
                <span class="faq-icon" :class="{ active: activeFaq === index }">+</span>
              </button>
              <div class="faq-answer" :class="{ active: activeFaq === index }">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 聯絡表單 -->
      <section class="contact-form">
        <div class="container">
          <h2 class="section-title">聯絡表單</h2>
          <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
              <label for="name">姓名 *</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="form-input"
                placeholder="請輸入您的姓名"
              />
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="form-input"
                placeholder="請輸入您的Email"
              />
            </div>
            <div class="form-group">
              <label for="phone">電話</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="form-input"
                placeholder="請輸入您的電話號碼"
              />
            </div>
            <div class="form-group">
              <label for="subject">主題 *</label>
              <select id="subject" v-model="form.subject" required class="form-select">
                <option value="">請選擇主題</option>
                <option value="商品詢問">商品詢問</option>
                <option value="訂單問題">訂單問題</option>
                <option value="配送問題">配送問題</option>
                <option value="客訴建議">客訴建議</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">訊息內容 *</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                class="form-textarea"
                placeholder="請詳細描述您的問題或建議"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? '送出中...' : '送出訊息' }}
            </button>
          </form>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>餅乾生產餡</h3>
            <p>呈現最驚豔的味</p>
          </div>
          <div class="footer-section">
            <h4>商品</h4>
            <ul>
              <li><router-link to="/products">夾餡餅乾</router-link></li>
              <li><router-link to="/products">造型餅乾</router-link></li>
              <li><router-link to="/products">禮盒</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>聯絡我們</h4>
            <p>Instagram: @iiincookie</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright © 2022 餅乾生產餡.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const showCart = ref(false)
const activeFaq = ref(null)
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const faqs = [
  {
    question: '如何下單？',
    answer: '您可以透過我們的網站直接下單，或透過Instagram私訊我們。我們會盡快回覆您的訂單。'
  },
  {
    question: '配送時間需要多久？',
    answer: '一般訂單會在3-5個工作天內送達。如遇特殊節日或大量訂單，配送時間可能會延長。'
  },
  {
    question: '可以客製化訂單嗎？',
    answer: '我們提供客製化服務，包括特殊包裝、賀卡等。請提前聯繫我們討論您的需求。'
  },
  {
    question: '如何保存餅乾？',
    answer: '請將餅乾存放在陰涼乾燥處，避免陽光直射。開封後請盡快食用，以保持最佳口感。'
  },
  {
    question: '有提供素食選項嗎？',
    answer: '我們有部分商品適合素食者，請在訂購時告知您的飲食需求，我們會為您推薦適合的商品。'
  }
]

const toggleCart = () => {
  showCart.value = !showCart.value
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const submitForm = async () => {
  isSubmitting.value = true

  // 模擬表單提交
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 重置表單
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })

  isSubmitting.value = false

  // 這裡可以加入成功提示
  alert('訊息已送出，我們會盡快回覆您！')
}

onMounted(() => {
  // 初始化動畫
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  })

  document.querySelectorAll('.contact-item, .faq-item').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* 導航欄樣式 - 與首頁相同 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-logo h1 {
  font-size: 1.5rem;
  color: #8b4513;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #8b4513;
}

.cart-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.cart-btn:hover {
  background: #a0522d;
  transform: translateY(-2px);
}

.cart-count {
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* 購物車側邊欄 - 與首頁相同 */
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
  background: #8b4513;
  color: white;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.cart-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
}

.checkout-btn {
  width: 100%;
  background: #8b4513;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

/* Contact Hero */
.contact-hero {
  background: linear-gradient(135deg, #f5f5dc 0%, #ffe4b5 100%);
  padding: 8rem 0 4rem;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  color: #8b4513;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #a0522d;
  animation: fadeInUp 1s ease 0.2s both;
}

/* 聯絡資訊 */
.contact-info {
  padding: 5rem 0;
  background: white;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-item {
  text-align: center;
  padding: 2rem;
  background: #f8f8f8;
  border-radius: 15px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.contact-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.contact-item:hover {
  background: #8b4513;
  color: white;
  transform: translateY(-5px);
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-item h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.contact-item p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.contact-item:hover p {
  color: rgba(255, 255, 255, 0.9);
}

.contact-note {
  font-size: 0.9rem;
  color: #999;
}

.contact-item:hover .contact-note {
  color: rgba(255, 255, 255, 0.7);
}

.contact-link {
  display: inline-block;
  background: #8b4513;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: #a0522d;
  transform: translateY(-2px);
}

.contact-item:hover .contact-link {
  background: white;
  color: #8b4513;
}

/* 常見問題 */
.faq {
  padding: 5rem 0;
  background: #f8f8f8;
}

.section-title {
  font-size: 2.5rem;
  color: #8b4513;
  text-align: center;
  margin-bottom: 3rem;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 10px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(30px);
}

.faq-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.faq-question {
  width: 100%;
  background: none;
  border: none;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #f8f8f8;
}

.faq-icon {
  font-size: 1.5rem;
  color: #8b4513;
  transition: transform 0.3s ease;
}

.faq-icon.active {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.active {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 1.5rem 1.5rem;
  color: #666;
  line-height: 1.6;
}

/* 聯絡表單 */
.contact-form {
  padding: 5rem 0;
  background: white;
}

.form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #8b4513;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
  background: #8b4513;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #a0522d;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Footer */
.footer {
  background: #333;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  color: #8b4513;
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
  color: #8b4513;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #555;
  color: #ccc;
}

/* 通用樣式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 動畫 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 響應式設計 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .nav-menu {
    display: none;
  }

  .hero-title {
    font-size: 2rem;
  }

  .cart-sidebar {
    width: 100%;
    right: -100%;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form {
    padding: 0 1rem;
  }
}
</style>

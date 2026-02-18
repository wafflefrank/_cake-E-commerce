<template>
  <div class="checkout-page">
    <div class="container">
      <!-- 頁面標題 -->
      <div class="page-header">
        <h1 class="main-title">結帳吃鬆餅</h1>
      </div>

      <!-- 進度條 -->
      <div class="stepper-container">
        <ul class="stepper">
          <li class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
            <div class="circle">1</div>
            <div class="label">商品資料確認</div>
          </li>
          <li class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
            <div class="circle">2</div>
            <div class="label">信用卡付款</div>
          </li>
          <li class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
            <div class="circle">3</div>
            <div class="label">付款完成</div>
          </li>
        </ul>
      </div>

      <!-- 步驟 1: 商品資料確認 -->
      <div v-if="currentStep === 1" class="checkout-content">
        <!-- 左側：訂單資訊 -->
        <div class="order-info-section">
          <h2 class="section-title">訂單資訊</h2>
          
          <form @submit.prevent="handleStep1Submit">
            <div class="form-group">
              <label for="name">姓名<span class="required">*</span></label>
              <input
                id="name"
                v-model="orderForm.name"
                type="text"
                placeholder="例:李餅乾"
                required
              />
            </div>

            <div class="form-group">
              <label for="phone">聯絡電話<span class="required">*</span></label>
              <input
                id="phone"
                v-model="orderForm.phone"
                type="tel"
                placeholder="例:0912-345-678"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">電子郵件<span class="required">*</span></label>
              <input
                id="email"
                v-model="orderForm.email"
                type="email"
                placeholder="例:iiincookie@gmail.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="address">寄送地址<span class="required">*</span></label>
              <input
                id="address"
                v-model="orderForm.address"
                type="text"
                placeholder="例:可收件地址,如要自取請填寫自取"
                required
              />
            </div>

            <div class="form-group">
              <label>運送方式</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input
                    v-model="orderForm.deliveryMethod"
                    type="radio"
                    value="home"
                  />
                  <span>宅配</span>
                </label>
                <label class="radio-label">
                  <input
                    v-model="orderForm.deliveryMethod"
                    type="radio"
                    value="pickup"
                  />
                  <span>自行取貨</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>付款方式</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input
                    v-model="orderForm.paymentMethod"
                    type="radio"
                    value="credit"
                  />
                  <span>信用卡</span>
                </label>
                <label class="radio-label">
                  <input
                    v-model="orderForm.paymentMethod"
                    type="radio"
                    value="transfer"
                  />
                  <span>ATM/網銀匯款</span>
                </label>
              </div>
            </div>

            <button type="submit" class="submit-btn">下一步</button>
          </form>
        </div>

        <!-- 右側：購物車 -->
        <div class="cart-section">
          <h2 class="section-title">購物車</h2>
          
          <RouterLink to="/products" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>還有想購買的商品嗎?</span>
          </RouterLink>

          <div class="cart-items">
            <div v-if="cartStore.isEmpty" class="empty-cart">
              <p>購物車是空的</p>
            </div>
            <div v-else>
              <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
                <img :src="item.image" :alt="item.name" class="item-image" />
                <div class="item-info">
                  <h4 class="item-name">{{ item.name }}</h4>
                  <p class="item-price">NT${{ item.price }}</p>
                  <div class="item-quantity">
                    <span>數量: {{ item.quantity }}</span>
                  </div>
                </div>
                <button class="remove-btn" @click="cartStore.removeFromCart(item.id)" aria-label="刪除">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="cart-summary" v-if="!cartStore.isEmpty">
            <div class="summary-row">
              <span>小計</span>
              <span>NT${{ cartStore.totalPrice }}</span>
            </div>
            <div class="summary-row">
              <span>運費</span>
              <span>NT${{ shippingFee }}</span>
            </div>
            <div class="summary-row total">
              <span>總計</span>
              <span>NT${{ totalWithShipping }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 步驟 2: 信用卡付款 -->
      <div v-if="currentStep === 2" class="payment-content">
        <div class="payment-section">
          <h2 class="section-title">信用卡付款</h2>
          <p class="payment-instruction">請輸入信用卡資訊進行付款</p>
          
          <form @submit.prevent="handleStep2Submit">
            <div class="form-group">
              <label for="card-number">信用卡帳號</label>
              <input
                id="card-number"
                v-model="paymentForm.cardNumber"
                type="text"
                placeholder="545445"
                maxlength="16"
                required
              />
            </div>

            <div class="form-group">
              <label for="security-code">安全碼</label>
              <input
                id="security-code"
                v-model="paymentForm.securityCode"
                type="password"
                placeholder="••••••"
                maxlength="6"
                required
              />
            </div>

            <div class="form-group">
              <label for="expiry-date">有效日期</label>
              <input
                id="expiry-date"
                v-model="paymentForm.expiryDate"
                type="text"
                placeholder="MM/YY"
                maxlength="5"
                required
              />
            </div>

            <div class="payment-amount">
              <span class="amount-label">付款金額</span>
              <span class="amount-value">NT${{ totalWithShipping }}</span>
            </div>

            <div class="payment-actions">
              <button type="button" class="back-btn" @click="currentStep = 1">上一步</button>
              <button type="submit" class="submit-btn">下一步</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 步驟 3: 付款完成 -->
      <div v-if="currentStep === 3" class="success-content">
        <div class="success-section">
          <h2 class="success-title">完成訂購!</h2>
          <p class="success-message">
            感謝您的訂購,我們會盡快出貨,希望你會喜歡,如有任何疑問可私訊我們~
          </p>
          <div class="success-image">
            <img :src="getPublicUrl('images/paysuccess.png')" alt="付款成功" />
          </div>
          <div class="success-actions">
            <RouterLink to="/products" class="back-to-shop-btn">繼續購物</RouterLink>
            <RouterLink to="/" class="back-to-home-btn">回到首頁</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { getPublicUrl } from '@/utils/getPublicUrl'

const router = useRouter()
const cartStore = useCartStore()

const currentStep = ref(1)

const orderForm = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  deliveryMethod: 'home',
  paymentMethod: 'credit'
})

const paymentForm = ref({
  cardNumber: '',
  securityCode: '',
  expiryDate: ''
})

const shippingFee = computed(() => {
  // 如果總額滿 2000 元免運，否則運費 130 元
  return cartStore.totalPrice >= 2000 ? 0 : 130
})

const totalWithShipping = computed(() => {
  return cartStore.totalPrice + shippingFee.value
})

const handleStep1Submit = () => {
  // 驗證表單
  if (!orderForm.value.name || !orderForm.value.phone || !orderForm.value.email || !orderForm.value.address) {
    alert('請填寫所有必填欄位')
    return
  }

  // 跳轉到第二步驟
  currentStep.value = 2
}

const handleStep2Submit = () => {
  // 驗證付款資訊
  if (!paymentForm.value.cardNumber || !paymentForm.value.securityCode || !paymentForm.value.expiryDate) {
    alert('請填寫所有付款資訊')
    return
  }

  // 模擬付款處理
  // 這裡可以連接後端 API 進行實際付款
  setTimeout(() => {
    // 清空購物車
    cartStore.clearCart()
    // 跳轉到第三步驟
    currentStep.value = 3
  }, 500)
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 2rem 0 4rem;
  font-family: 'Noto Sans TC', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 頁面標題 */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #4a4a4a;
  letter-spacing: 3px;
  margin: 0;
}

/* 進度條 */
.stepper-container {
  width: 100%;
  max-width: 800px;
  margin: 50px auto;
  font-family: "Microsoft JhengHei", sans-serif;
}

.stepper {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  position: relative;
}

.step {
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 1;
}

/* 在步驟之間繪製連接線 */
.step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 15px; /* 圓圈高度的一半 */
  left: calc(50% + 15px); /* 從圓圈右邊緣開始 */
  right: calc(-50% + 15px); /* 到下一個圓圈左邊緣結束 */
  height: 2px;
  background-color: #d0d0d0; /* 未完成狀態的淺灰色 */
  z-index: 0;
  transition: background-color 0.3s ease;
}

/* 已完成的連接線 */
.step.completed::after {
  background-color: #6c7059; /* 深橄欖綠色 */
}

/* 當前步驟的連接線（如果下一個步驟已完成） */
.step.active:not(:last-child)::after {
  background-color: #6c7059;
}

/* 數字圓圈樣式 - 預設為未完成狀態（淺灰色） */
.circle {
  width: 30px;
  height: 30px;
  background-color: #d0d0d0; /* 未完成狀態的淺灰色 */
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px auto;
  font-weight: bold;
  font-size: 14px;
  position: relative;
  z-index: 2;
  transition: background-color 0.3s ease;
}

/* 當前步驟或已完成的步驟 - 深色 */
.step.active .circle,
.step.completed .circle {
  background-color: #6c7059; /* 深橄欖綠色 */
}

/* 下方文字樣式 - 預設為淺灰色 */
.label {
  color: #999; /* 未完成狀態的淺灰色 */
  font-size: 16px;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

/* 當前步驟或已完成的步驟文字 - 深色 */
.step.active .label,
.step.completed .label {
  color: #666; /* 深灰色 */
}

/* 主要內容區域 */
.checkout-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* 訂單資訊區域 */
.order-info-section,
.cart-section {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #6c7059;
}

/* 表單樣式 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.required {
  color: #e74c3c;
  margin-left: 2px;
}

.form-group input[type="text"],
.form-group input[type="tel"],
.form-group input[type="email"],
.form-group input[type="password"] {
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

/* 單選按鈕組 */
.radio-group {
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  color: #4a4a4a;
}

.radio-label input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6c7059;
}

.radio-label span {
  user-select: none;
}

/* 提交按鈕 */
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
  margin-top: 1rem;
}

.submit-btn:hover {
  background: #565a46;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 112, 89, 0.3);
}

/* 購物車區域 */
.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c7059;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #565a46;
}

.cart-items {
  margin-bottom: 2rem;
  max-height: 400px;
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
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.item-price {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.9rem;
  color: #6c7059;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.item-quantity {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.85rem;
  color: #666;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
  flex-shrink: 0;
}

.remove-btn:hover {
  color: #e74c3c;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #999;
}

/* 購物車總計 */
.cart-summary {
  border-top: 2px solid #eee;
  padding-top: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  color: #666;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a4a4a;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
}

/* 付款頁面樣式 */
.payment-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.payment-section {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
}

.payment-instruction {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
}

.payment-amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  margin: 2rem 0;
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
}

.amount-label {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1.1rem;
  color: #4a4a4a;
  font-weight: 500;
}

.amount-value {
  font-family: 'Noto Serif TC', serif;
  font-size: 1.5rem;
  color: #6c7059;
  font-weight: 600;
}

.payment-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.back-btn {
  flex: 1;
  padding: 1rem;
  background: white;
  color: #6c7059;
  border: 2px solid #6c7059;
  border-radius: 8px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #6c7059;
  color: white;
}

.payment-actions .submit-btn {
  flex: 1;
  margin-top: 0;
}

/* 付款完成頁面樣式 */
.success-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 2rem 0;
}

.success-section {
  background: white;
  padding: 4rem 3rem;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.success-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
}

.success-message {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.success-image {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.success-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.back-to-shop-btn,
.back-to-home-btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.back-to-shop-btn {
  background: #6c7059;
  color: white;
}

.back-to-shop-btn:hover {
  background: #565a46;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 112, 89, 0.3);
}

.back-to-home-btn {
  background: white;
  color: #6c7059;
  border: 2px solid #6c7059;
}

.back-to-home-btn:hover {
  background: #6c7059;
  color: white;
}

/* 響應式設計 */
@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .order-info-section,
  .cart-section,
  .payment-section {
    padding: 1.5rem;
  }

  .radio-group {
    flex-direction: column;
    gap: 1rem;
  }

  .payment-actions {
    flex-direction: column;
  }

  .success-section {
    padding: 2rem 1.5rem;
  }

  .success-title {
    font-size: 2rem;
  }

  .success-actions {
    flex-direction: column;
  }

  .back-to-shop-btn,
  .back-to-home-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
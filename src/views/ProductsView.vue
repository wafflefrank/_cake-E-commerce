<template>
  <div class="products-page">
    <!-- 導航欄 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <h1>餅乾生產餡</h1>
        </div>
        <div class="nav-menu">
          <router-link to="/" class="nav-link">首頁</router-link>
          <router-link to="/products" class="nav-link active">商品</router-link>
          <router-link to="/about" class="nav-link">關於</router-link>
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
      <section class="products-hero">
        <div class="container">
          <h1 class="hero-title">精選商品</h1>
          <p class="hero-subtitle">精挑細選的口味，一定會有你喜愛的那味</p>
        </div>
      </section>

      <!-- 商品分類 -->
      <section class="product-categories">
        <div class="container">
          <div class="category-tabs">
            <button
              v-for="category in categories"
              :key="category.id"
              :class="['category-tab', { active: selectedCategory === category.id }]"
              @click="selectedCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </section>

      <!-- 商品列表 -->
      <section class="products-section">
        <div class="container">
          <div class="products-grid">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-card"
              @click="openProductModal(product)"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
                <div class="product-overlay">
                  <button class="quick-view-btn">快速查看</button>
                </div>
              </div>
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="product-name-en">{{ product.nameEn }}</p>
                <p class="product-price">NT${{ product.price }}</p>
                <button class="add-to-cart-btn" @click.stop="addToCart(product)">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 禮盒專區 -->
      <section class="gift-boxes-section">
        <div class="container">
          <h2 class="section-title">禮盒推薦</h2>
          <p class="section-subtitle">送禮最佳質感挑這盒</p>
          <div class="gift-grid">
            <div v-for="gift in productsStore.giftBoxes" :key="gift.id" class="gift-card">
              <div class="gift-image">
                <img :src="gift.image" :alt="gift.name" />
              </div>
              <div class="gift-info">
                <h3>{{ gift.name }}</h3>
                <p>{{ gift.description }}</p>
                <p class="gift-price">NT${{ gift.price }}</p>
                <button class="add-to-cart-btn" @click="addToCart(gift)">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 商品詳情 Modal -->
    <div v-if="selectedProduct" class="product-modal" @click="closeProductModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeProductModal">×</button>
        <div class="modal-body">
          <div class="product-image-large">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" />
          </div>
          <div class="product-details">
            <h2>{{ selectedProduct.name }}</h2>
            <p class="product-name-en">{{ selectedProduct.nameEn }}</p>
            <p class="product-description">{{ selectedProduct.description }}</p>
            <p class="product-price-large">NT${{ selectedProduct.price }}</p>
            <div class="quantity-selector">
              <label>數量：</label>
              <div class="quantity-controls">
                <button @click="quantity = Math.max(1, quantity - 1)">-</button>
                <input v-model.number="quantity" type="number" min="1" />
                <button @click="quantity++">+</button>
              </div>
            </div>
            <button class="add-to-cart-large" @click="addToCartWithQuantity">加入購物車</button>
          </div>
        </div>
      </div>
    </div>

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
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const showCart = ref(false)
const selectedProduct = ref(null)
const quantity = ref(1)
const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: '全部商品' },
  { id: '夾餡餅乾', name: '夾餡餅乾' },
  { id: '造型餅乾', name: '造型餅乾' },
  { id: '鹹味餅乾', name: '鹹味餅乾' },
  { id: '經典餅乾', name: '經典餅乾' }
]

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return productsStore.products
  }
  return productsStore.products.filter((product) => product.category === selectedCategory.value)
})

const toggleCart = () => {
  showCart.value = !showCart.value
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  // 可以加入動畫效果
}

const addToCartWithQuantity = () => {
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(selectedProduct.value)
  }
  closeProductModal()
}

const openProductModal = (product) => {
  selectedProduct.value = product
  quantity.value = 1
}

const closeProductModal = () => {
  selectedProduct.value = null
  quantity.value = 1
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

  document.querySelectorAll('.product-card, .gift-card').forEach((el) => {
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

/* Products Hero */
.products-hero {
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

/* 商品分類 */
.product-categories {
  padding: 2rem 0;
  background: white;
  border-bottom: 1px solid #eee;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-tab {
  background: transparent;
  border: 2px solid #8b4513;
  color: #8b4513;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.category-tab:hover,
.category-tab.active {
  background: #8b4513;
  color: white;
}

/* 商品列表 */
.products-section {
  padding: 4rem 0;
  background: #f8f8f8;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
}

.product-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.quick-view-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.quick-view-btn:hover {
  background: #a0522d;
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-name-en {
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.2rem;
  color: #8b4513;
  font-weight: bold;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  width: 100%;
  background: #8b4513;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background: #a0522d;
  transform: translateY(-2px);
}

/* 禮盒專區 */
.gift-boxes-section {
  padding: 5rem 0;
  background: white;
}

.section-title {
  font-size: 2.5rem;
  color: #8b4513;
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.gift-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.gift-card {
  background: #f8f8f8;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.gift-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.gift-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.gift-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.gift-info h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
}

.gift-price {
  font-size: 1.2rem;
  color: #8b4513;
  font-weight: bold;
  margin: 1rem 0;
}

/* 商品詳情 Modal */
.product-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  z-index: 1;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.product-image-large img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.product-details h2 {
  font-size: 2rem;
  color: #8b4513;
  margin-bottom: 0.5rem;
}

.product-name-en {
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
}

.product-description {
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.product-price-large {
  font-size: 2rem;
  color: #8b4513;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.quantity-selector {
  margin-bottom: 1.5rem;
}

.quantity-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  background: #8b4513;
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
}

.quantity-controls input {
  width: 60px;
  text-align: center;
  border: 2px solid #8b4513;
  border-radius: 5px;
  padding: 0.5rem;
}

.add-to-cart-large {
  width: 100%;
  background: #8b4513;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.add-to-cart-large:hover {
  background: #a0522d;
  transform: translateY(-2px);
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

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

  .products-grid,
  .gift-grid {
    grid-template-columns: 1fr;
  }

  .modal-body {
    grid-template-columns: 1fr;
  }

  .category-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
}
</style>

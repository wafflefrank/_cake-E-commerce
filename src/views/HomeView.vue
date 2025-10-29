<template>
  <div class="home">
    <!-- 導航欄 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <h1>餅乾生產餡</h1>
        </div>
        <div class="nav-menu">
          <a href="#home" class="nav-link">首頁</a>
          <a href="#products" class="nav-link">商品</a>
          <a href="#about" class="nav-link">關於</a>
          <a href="#contact" class="nav-link">聯絡</a>
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

    <!-- 主內容區域 -->
    <main>
      <!-- Hero Section -->
      <section id="home" class="hero">
        <div class="hero-content">
          <h1 class="hero-title" data-aos="fade-up">餅乾生產餡</h1>
          <h2 class="hero-subtitle" data-aos="fade-up" data-aos-delay="200">呈現最驚豔的味</h2>
          <button class="cta-btn" @click="scrollToProducts" data-aos="fade-up" data-aos-delay="400">
            探索商品
          </button>
        </div>
        <div class="hero-image">
          <img src="/src/assets/images/newbanner.jpg" alt="美味餅乾" />
        </div>
      </section>

      <!-- 緣起 Section -->
      <section class="origin" data-aos="fade-up" data-aos-duration="1000">
        <div class="container">
          <h2 class="section-title" data-aos="fade-up" data-aos-delay="200">緣起</h2>
          <div class="origin-content">
            <div class="origin-text" data-aos="fade-right" data-aos-delay="400">
              <p data-aos="fade-up" data-aos-delay="500">因緣際會幫忙朋友製作了餅乾，</p>
              <p data-aos="fade-up" data-aos-delay="600">變想要挑戰鐵盒餅乾，</p>
              <p data-aos="fade-up" data-aos-delay="700">朋友一吃驚艷，鼓勵我讓大家也能，</p>
              <p data-aos="fade-up" data-aos-delay="800">吃得到這美味的夾餡餅乾</p>
              <p data-aos="fade-up" data-aos-delay="900">變誤打誤撞開始生產餡這個品牌</p>
              <p data-aos="fade-up" data-aos-delay="1000">從沒想過餅乾會成為另一個事業，</p>
              <p data-aos="fade-up" data-aos-delay="1100">也希望每次你們收到餅乾時，</p>
              <p data-aos="fade-up" data-aos-delay="1200">看到包裝的花材時能感到暖心。</p>
            </div>
            <div class="origin-images">
              <div class="image-grid">
                <img src="/src/assets/images/earl grey.jpg" alt="伯爵巧克力夾餡" />
                <img src="/src/assets/images/handmade.jpg" alt="壓模餅乾" />
                <img src="/src/assets/images/cheese.JPG" alt="香辣起司條" />
                <img src="/src/assets/images/snowball2.jpg" alt="雪球餅乾" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 商品推薦 Section -->
      <section id="products" class="products" data-aos="fade-up">
        <div class="container">
          <h2 class="section-title">口味</h2>
          <p class="section-subtitle">
            精挑細選的口味，一定會有你喜愛的那味，讓你的味蕾享受無比的滿足
          </p>

          <div class="products-grid">
            <div
              v-for="(product, index) in productsStore.featuredProducts"
              :key="product.id"
              class="product-card"
              :data-aos="'fade-up'"
              :data-aos-delay="(index + 1) * 200"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
                <div class="product-overlay">
                  <button class="add-to-cart-btn" @click="addToCart(product)">加入購物車</button>
                </div>
              </div>
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="product-name-en">{{ product.nameEn }}</p>
                <p class="product-price">NT${{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 禮盒推薦 Section -->
      <section class="gift-boxes">
        <div class="container">
          <h2 class="section-title">禮盒推薦</h2>
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

      <!-- 客戶回饋 Section -->
      <section class="testimonials" data-aos="fade-up">
        <div class="container">
          <h2 class="section-title">客戶回饋</h2>
          <div class="testimonials-swiper">
            <SwiperComponent
              :modules="swiperModules"
              v-bind="swiperOptions"
              class="testimonials-slider"
            >
              <template v-for="testimonial in productsStore.testimonials" :key="testimonial.id">
                <SwiperSlide>
                  <div class="testimonial-card">
                    <div class="testimonial-content">
                      <p>"{{ testimonial.content }}"</p>
                      <div class="testimonial-author">
                        <span class="author-name">{{ testimonial.name }}</span>
                        <div class="rating">
                          <span v-for="i in testimonial.rating" :key="i">⭐</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </template>
            </SwiperComponent>
          </div>
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
              <li><a href="#products">夾餡餅乾</a></li>
              <li><a href="#products">造型餅乾</a></li>
              <li><a href="#products">禮盒</a></li>
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
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useAnimations } from '@/composables/useAnimations'
import { useSimpleSwiper } from '@/composables/useSimpleSwiper'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const showCart = ref(false)

// 初始化動畫
useAnimations()

// 初始化 Swiper
const { SwiperComponent, SwiperSlide, swiperModules, swiperOptions } = useSimpleSwiper()

const toggleCart = () => {
  showCart.value = !showCart.value
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  // 可以加入動畫效果
}

const scrollToProducts = () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
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

  document.querySelectorAll('.product-card, .gift-card, .testimonial-card').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* 導航欄樣式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(139, 69, 19, 0.1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
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

.nav-link:hover {
  color: #8b4513;
}

.cart-btn {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
  position: relative;
  overflow: hidden;
}

.cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.cart-btn:hover::before {
  left: 100%;
}

.cart-btn:hover {
  background: linear-gradient(135deg, #a0522d 0%, #8b4513 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
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

/* 購物車側邊欄 */
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

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f8f5f0 0%, #f0e6d2 50%, #e8dcc0 100%);
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23d4c4a8" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23d4c4a8" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23d4c4a8" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="%23d4c4a8" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="%23d4c4a8" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  z-index: 1;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 4rem;
  color: #8b4513;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 2px;
  animation: fadeInUp 1s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.8rem;
  color: #a0522d;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 1px;
  animation: fadeInUp 1s ease 0.2s both;
}

.cta-btn {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: fadeInUp 1s ease 0.4s both;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
}

.cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.cta-btn:hover::before {
  left: 100%;
}

.cta-btn:hover {
  background: linear-gradient(135deg, #a0522d 0%, #8b4513 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 35px rgba(139, 69, 19, 0.4);
}

.hero-image {
  flex: 1;
  text-align: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 通用樣式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

/* 緣起 Section */
.origin {
  padding: 5rem 0;
  background: white;
}

.origin-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.origin-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1rem;
}

.image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.image-grid img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.image-grid img:hover {
  transform: scale(1.05);
}

/* 商品 Section */
.products {
  padding: 5rem 0;
  background: #f8f8f8;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8b4513, #a0522d, #8b4513);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover::before {
  opacity: 1;
}

.product-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(139, 69, 19, 0.15);
  border-color: rgba(139, 69, 19, 0.2);
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

.add-to-cart-btn {
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
}

/* 禮盒 Section */
.gift-boxes {
  padding: 5rem 0;
  background: white;
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

/* 客戶回饋 Section */
.testimonials {
  padding: 5rem 0;
  background: #f8f8f8;
}

.testimonials-swiper {
  position: relative;
  padding: 2rem 0;
}

.testimonials-slider {
  overflow: hidden;
}

.testimonials-pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.testimonials-pagination .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #8b4513;
  opacity: 0.3;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonials-pagination .swiper-pagination-bullet-active {
  opacity: 1;
  transform: scale(1.2);
}

.testimonials-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
}

.testimonials-prev,
.testimonials-next {
  background: #8b4513;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonials-prev:hover,
.testimonials-next:hover {
  background: #a0522d;
  transform: scale(1.1);
}

.testimonials-prev {
  margin-left: -25px;
}

.testimonials-next {
  margin-right: -25px;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
  font-style: italic;
}

.author-name {
  font-weight: bold;
  color: #8b4513;
}

.rating {
  margin-top: 0.5rem;
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.hero-image img {
  animation: float 6s ease-in-out infinite;
}

.product-card:hover .product-image img {
  animation: pulse 2s ease-in-out infinite;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }

  .nav-menu {
    display: none;
  }

  .hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .origin-content {
    grid-template-columns: 1fr;
  }

  .cart-sidebar {
    width: 100%;
    right: -100%;
  }

  .products-grid,
  .gift-grid,
  .testimonials-slider {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="home">
    <!-- 導航欄 -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <div class="nav-left">
          <a href="#home" class="brand">餅乾生產餡</a>
        </div>
        <div class="nav-right">
          <button class="hamburger" aria-label="menu" @click="isMenuOpen = !isMenuOpen">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
            <a href="#products" class="nav-link" :class="{ active: activeLink === 'products' }" @click="isMenuOpen=false">商品</a>
            <a href="#about" class="nav-link" :class="{ active: activeLink === 'about' }" @click="isMenuOpen=false">關於</a>
            <a href="#faq" class="nav-link" :class="{ active: activeLink === 'faq' }" @click="isMenuOpen=false">FAQ</a>
            <a href="#custom" class="nav-link" :class="{ active: activeLink === 'custom' }" @click="isMenuOpen=false">鐵盒訂製</a>
            <a href="#contact" class="nav-link" :class="{ active: activeLink === 'contact' }" @click="isMenuOpen=false">聯絡</a>
          </div>
          <button class="icon-btn ms-3" aria-label="account">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"></path></svg>
          </button>
          <button class="icon-btn" aria-label="cart" @click="toggleCart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path></svg>
            <span class="cart-count" v-if="cartStore.totalItems > 0">{{ cartStore.totalItems }}</span>
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
      <!-- banner start -->
      <div class="banner orign" data-aos="fade" data-aos-duration="2000">
        <div class="pos-absolute top-20p end-12p vertical-rl">
          <h2 class="fs-md-1 fs-3 ms-6 fw-medium letterSpace-32 text-light banner-text_title font-serifTc">餅乾生產餡</h2>
          <h2 class="fs-md-2 fs-4 fw-medium letterSpace-16 text-light font-serifTc banner__text">呈現最驚豔的味</h2>
        </div>
      </div>
      <!-- banner end -->

      <!-- 緣起介紹 start -->
      <div class="container my-md-13 my-10">
        <div class="origin-content" data-aos="fade">
          <div class="origin-images" data-aos="fade-up">
            <div class="image-grid" style="align-items:center; justify-items:center;">
              <img src="/src/assets/images/boxflower-index.JPG" alt="" />
              <img src="/src/assets/images/indexswitchbox.JPG" alt="" />
            </div>
          </div>
          <div class="origin-text d-flex gap-4">
            <p class="fs-7 fs-md-6 vertical-rl lh-2 lh-md-3 letterSpace-4 font-serifTc">
              因緣際會幫忙朋友製作了餅乾，<br />
              變想要挑戰鐵盒餅乾，<br />
              朋友一吃驚艷，鼓勵我讓大家也能，<br />
              吃得到這美味的夾餡餅乾<br />
              變誤打誤撞開始生產餡這個品牌<br />
              從沒想過餅乾會成為另一個事業，<br />
              也希望每次你們收到餅乾時，<br />
              看到包裝的花材時能感到暖心。<br />
            </p>
            <div class="d-flex">
              <h3 class="fs-2 fs-md-2 fw-bold font-serifTc vertical-rl letterSpace-4">緣起</h3>
              <p class="fs-8 fw-light vertical-rl letterSpace-2 text-indent-3">ORIGIN</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 緣起介紹 end -->

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
const isScrolled = ref(false)
const isMenuOpen = ref(false)
const activeLink = ref('products')

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

  // 監聽滾動 - navbar 縮小
  const onScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  // 區塊觀察 - 選單高亮
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeLink.value = entry.target.id
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  )
  ;['products', 'about', 'faq', 'custom', 'contact'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) sectionObserver.observe(el)
  })
})
</script>

<style scoped>
/* 導航欄樣式（固定於最上方，與內容分離） */
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
  transition: height 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.navbar.scrolled {
  height: 56px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

/* .nav-left { justify-self: start; }
.nav-right { justify-self: end; display: flex; align-items: center; gap: 1.25rem; } */


/* 已移除中間選單與漢堡按鈕 */

/* 右側群組（桌面） */
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

.nav-links::before,
.nav-links::after {
  content: none;
}

.brand {
  font-size: 2rem;
  color: #2b2b2b;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: 600;
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

.nav-link::before {
  content: none !important;
  display: none !important;
}

.nav-link:first-child::before,
.nav-link:first-child::after {
  content: none !important;
  display: none !important;
}

.nav-link:hover {
  color: #8b4513;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  background: #8b4513;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}

.nav-link:hover::after { transform: scaleX(1); }
.nav-link.active { color: #8b4513; }
.nav-link.active::after { transform: scaleX(1); }

.icon-btn {
  background: transparent;
  border: none;
  color: #8b4513;
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

.icon-btn i, .icon-btn svg { font-size: 1.4rem; color: #444; width: 1.4rem; height: 1.4rem; }

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

/* 讓內容不被固定導覽列遮擋 */
.home {
  padding-top: 64px;
}

/* 桌面版隱藏漢堡按鈕 */
.hamburger {
  display: none;
}

/* 手機版：使用漢堡按鈕展開連結 */
@media (max-width: 768px) {
  .hamburger {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 8px;
  }
  .hamburger span { display: block; width: 22px; height: 2px; background: #333; }

  .nav-links { display: none; }
  .nav-links.is-open {
    display: grid;
    position: absolute;
    top: 64px;
    right: 0;
    left: 0;
    background: #fff;
    padding: 12px 16px;
    grid-auto-flow: row;
    gap: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 8px 20px rgba(0,0,0,0.06);
    z-index: 999;
  }
}

/* 錨點捲動對齊導覽列高度，避免被遮或留白 */
section { scroll-margin-top: 72px; }

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
  margin: 40px auto;
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

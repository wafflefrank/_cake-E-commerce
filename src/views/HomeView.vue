<template>
  <div>
    <main>
      <!-- banner start -->
      <div class="banner-wrapper" data-aos="fade" data-aos-duration="2000">
        <div
          id="bannerCarousel"
          class="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div
                class="banner-slide"
                :style="{ backgroundImage: `url(${getPublicUrl('images/banner_homePage_upscayl_4x.jpg')})` }"
              ></div>
            </div>
            <div class="carousel-item">
              <div
                class="banner-slide"
                :style="{ backgroundImage: `url(${getPublicUrl('images/banner_waffle.jpg')})` }"
              ></div>
            </div>
            <!-- 如果需要第三張圖片，可以在這裡添加 -->
            <!-- <div class="carousel-item">
              <div
                class="banner-slide"
                :style="{ backgroundImage: `url(${getPublicUrl('images/banner_third.jpg')})` }"
              ></div>
            </div> -->
          </div>
          <!-- 輪播控制按鈕（可選） -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          <!-- 輪播指示器（可選） -->
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <!-- 如果有第三張圖片，添加第三個指示器 -->
            <!-- <button
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button> -->
          </div>
        </div>
        <!-- 文字內容覆蓋在輪播上方 -->
        <div class="pos-absolute top-20p end-12p vertical-rl banner-text-overlay">
          <h2
            class="fs-md-1 fs-3 ms-6 fw-medium letterSpace-32 text-light banner-text_title font-serifTc"
          >
            鬆餅屋
          </h2>
          <h2 class="fs-md-2 fs-4 fw-medium letterSpace-16 text-light font-serifTc banner__text">
            呈現最驚豔的味
          </h2>
        </div>
      </div>
      <!-- banner end -->

      <!-- 緣起介紹 start -->
      <div class="container my-md-13 my-10">
        <div class="origin-content" data-aos="fade">
          <div class="origin-images" data-aos="fade-up">
            <div class="image-grid" style="align-items: center; justify-items: center">
              <img :src="getPublicUrl('images/waffle_1.jpg')" alt="" />
              <img :src="getPublicUrl('images/waffle_2.jpg')" alt="" />
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
            <div class="d-flex origin-title-group">
              <h3 class="fs-1 fs-md-2 fw-bold font-serifTc vertical-rl letterSpace-4">緣起</h3>
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
              <div class="product-image" @click="openProductModal(product)">
                <img :src="product.image" :alt="product.name" />
                <div class="product-overlay">
                  <span class="details-text">more detail</span>
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

    <!-- 商品詳情 Modal -->
    <transition name="modal">
      <div v-if="selectedProduct" class="modal-backdrop" @click="closeProductModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeProductModal">✕</button>
          <div class="modal-body">
            <div class="modal-image">
              <img :src="selectedProduct.image" :alt="selectedProduct.name" />
            </div>
            <div class="modal-details">
              <h2 class="modal-title">{{ selectedProduct.name }}</h2>
              <p class="modal-en-name">{{ selectedProduct.nameEn }}</p>
              <p class="modal-desc">{{ selectedProduct.description }}</p>
              <p class="modal-price">NT$ {{ selectedProduct.price }}</p>

              <div class="quantity-selector">
                <button @click="quantity = Math.max(1, quantity - 1)">-</button>
                <input v-model.number="quantity" type="number" min="1" readonly />
                <button @click="quantity++">+</button>
              </div>

              <button class="btn-primary-block large" @click="addToCartWithQuantity">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useAnimations } from '@/composables/useAnimations'
import { useSimpleSwiper } from '@/composables/useSimpleSwiper'
import { getPublicUrl } from '@/utils/getPublicUrl'

const productsStore = useProductsStore()
const cartStore = useCartStore()

// Modal 相關狀態
const selectedProduct = ref(null)
const quantity = ref(1)

// 初始化動畫
useAnimations()

// 初始化 Swiper
const { SwiperComponent, SwiperSlide, swiperModules, swiperOptions } = useSimpleSwiper()

const addToCart = (product) => {
  cartStore.addToCart(product)
  // 可以加入動畫效果
}

const openProductModal = (product) => {
  selectedProduct.value = product
  quantity.value = 1
}

const closeProductModal = () => {
  selectedProduct.value = null
  quantity.value = 1
}

const addToCartWithQuantity = () => {
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(selectedProduct.value)
  }
  closeProductModal()
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
/* Banner 輪播容器 */
.banner-wrapper {
  position: relative;
  height: 65vh;
  overflow: hidden;
  background-color: #fdfaf5;
}

/* 輪播容器 */
#bannerCarousel {
  height: 100%;
}

.carousel-inner {
  height: 100%;
}

.carousel-item {
  height: 100%;
}

/* 輪播圖片背景 */
.banner-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 文字內容覆蓋層 */
.banner-text-overlay {
  position: absolute;
  top: 20%;
  right: 12%;
  z-index: 10;
  pointer-events: none; /* 讓文字不阻擋輪播控制 */
}

/* 輪播控制按鈕樣式調整 */
.carousel-control-prev,
.carousel-control-next {
  z-index: 5;
  width: 5%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 輪播指示器樣式調整 */
.carousel-indicators {
  z-index: 5;
  margin-bottom: 1rem;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.carousel-indicators button.active {
  background-color: rgba(255, 255, 255, 0.9);
}
/* 錨點捲動對齊導覽列高度，避免被遮或留白 */
section {
  scroll-margin-top: 72px;
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
  color: #6c7059;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 2px;
  animation: fadeInUp 1s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.8rem;
  color: #6c7059;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 1px;
  animation: fadeInUp 1s ease 0.2s both;
}

.cta-btn {
  background: linear-gradient(135deg, #6c7059 0%, #565a46 100%);
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
  box-shadow: 0 8px 25px rgba(108, 112, 89, 0.3);
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
  background: linear-gradient(135deg, #565a46 0%, #6c7059 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 35px rgba(108, 112, 89, 0.4);
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
  color: #6c7059;
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
  /* 使用 mixed 讓文字選擇方向為水平（從左到右） */
  text-orientation: mixed;
}


/* 移除 h3 和 p 元素的 margin，減少左右間距 */
.origin-title-group h3,
.origin-title-group p {
  margin: 0 !important;
  /* padding: 0; */
  /* 對於垂直文字，使用負的 margin-left 來減少左右間距 */
  margin-left: -0.95rem !important;
}
.origin-title-group p{
  color: #9f9f9f;
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
  transition: all 0.15s ease;
  opacity: 0;
  /* transform: translateY(30px); */
  position: relative;
  border: 1px solid rgba(108, 112, 89, 0.1);
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6c7059, #565a46, #6c7059);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.product-card:hover::before {
  opacity: 1;
}

.product-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.product-card:hover {
  /* transform: translateY(-5px); */
  box-shadow: 0 20px 40px rgba(108, 112, 89, 0.15);
  border-color: rgba(108, 112, 89, 0.2);
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
  transition: all 0.3s ease;
  cursor: pointer;
  /* backdrop-filter: blur(4px); 新增：模糊效果 */
}

.product-card .product-image:hover .product-overlay {
  opacity: 1;
}

.details-text {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  /* 動畫初始狀態 */
  opacity: 0;
  /* transform: translateY(20px); */
  transition: all 0.5s ease;
}

.product-card:hover .details-text {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.1s; /* 讓文字在背景出現後再出現 */
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
  color: #6c7059;
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
  /* transform: translateY(-5px); */
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
  color: #6c7059;
  font-weight: bold;
  margin: 1rem 0;
}

.add-to-cart-btn {
  display: block;
  width: 100%;
  background-color: #6c7059; /* 莫蘭迪綠 */
  color: white;
  border: none;
  padding: 12px 0;
  font-size: 0.95rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px; /* 微圓角，接近直角 */
  margin-top: 1rem;
}

.add-to-cart-btn:hover {
  background-color: #565a46;
  box-shadow: 0 4px 12px rgba(108, 112, 89, 0.2);
  transform: translateY(-2px);
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
  background: #6c7059;
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
  background: #6c7059;
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
  background: #565a46;
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
  color: #6c7059;
}

.rating {
  margin-top: 0.5rem;
}

/* --- Modal 樣式 --- */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  width: 900px;
  max-width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  color: #666;
}

.modal-body {
  display: flex;
  padding: 40px;
  gap: 40px;
  overflow-y: auto;
}

.modal-image {
  flex: 1;
}

.modal-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.modal-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.modal-en-name {
  color: #888;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.modal-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.modal-price {
  font-size: 1.5rem;
  color: #6c7059;
  font-weight: bold;
  margin: 1rem 0 2rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border: 1px solid #ddd;
  width: fit-content;
}

.quantity-selector button {
  background: none;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1.2rem;
  color: #333;
}

.quantity-selector input {
  width: 50px;
  text-align: center;
  border: none;
  font-size: 1.1rem;
  outline: none;
  -moz-appearance: textfield;
  appearance: textfield;
}

.quantity-selector input::-webkit-outer-spin-button,
.quantity-selector input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-primary-block {
  display: block;
  width: 100%;
  background-color: #6c7059;
  color: white;
  border: none;
  padding: 12px 0;
  font-size: 0.95rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
}

.btn-primary-block:hover {
  background-color: #565a46;
  box-shadow: 0 4px 12px rgba(108, 112, 89, 0.2);
}

.btn-primary-block.large {
  padding: 15px 0;
  font-size: 1rem;
}

/* Modal 動畫 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
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
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%,
  100% {
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

  .products-grid,
  .gift-grid,
  .testimonials-slider {
    grid-template-columns: 1fr;
  }

  .modal-body {
    flex-direction: column;
    padding: 20px;
  }
}
</style>

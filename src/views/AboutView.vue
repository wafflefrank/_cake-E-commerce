<template>
  <div class="about">
    <!-- 主內容 -->
    <main>
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <span class="sub-title">About</span>
          <h1 class="main-title">關於 鬆餅茶屋</h1>
        </div>
      </section>

      <!-- 品牌故事 -->
      <section class="brand-story">
        <div class="container">
          <div class="story-content">
            <div class="story-text">
              <h2>品牌故事</h2>
              <div class="story-paragraphs">
                <p>因為本身喜歡吃鬆餅，</p>
                <p>起初只是各種探店，</p>
                <p>時間一久，吃出心得,想要自己動手做來試試</p>
                <p>希望將自身的心得分享給大家</p>
              </div>
            </div>
            <div class="story-image">
              <img src="/src/assets/images/boxflower.JPG" alt="品牌故事" />
            </div>
          </div>
        </div>
      </section>

      <!-- 製作理念 -->
      <section class="philosophy">
        <div class="container">
          <h2 class="section-title">製作理念</h2>
          <div class="philosophy-grid">
            <div class="philosophy-item">
              <div class="philosophy-icon">🌿</div>
              <h3>天然原料</h3>
              <p>嚴選優質天然原料，堅持無添加人工香料，讓每一口都是最純粹的美味。</p>
            </div>
            <div class="philosophy-item">
              <div class="philosophy-icon">👩‍🍳</div>
              <h3>手工製作</h3>
              <p>每一片餅乾都是手工精心製作，用心對待每一個細節，確保品質與口感。</p>
            </div>
            <div class="philosophy-item">
              <div class="philosophy-icon">💝</div>
              <h3>包裝用心</h3>
              <p>精心設計的包裝，搭配新鮮花材，讓收禮者感受到滿滿的溫暖與心意。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 製作過程 -->
      <section class="process">
        <div class="container">
          <h2 class="section-title">製作過程</h2>
          <div class="process-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>原料準備</h3>
                <p>嚴選優質原料，確保新鮮度與品質</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>手工製作</h3>
                <p>按照傳統工法，手工精心製作每一片餅乾</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>烘烤成型</h3>
                <p>控制溫度與時間，烘烤出完美的口感</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>包裝出貨</h3>
                <p>精心包裝，搭配花材，送到您手中</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 客戶見證 -->
      <section class="testimonials">
        <div class="container">
          <h2 class="section-title">客戶見證</h2>
          <div class="testimonials-grid">
            <div
              v-for="testimonial in productsStore.testimonials"
              :key="testimonial.id"
              class="testimonial-card"
            >
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
          </div>
        </div>
      </section>

      <!-- 聯絡我們 -->
      <section class="contact-info">
        <div class="container">
          <h2 class="section-title">聯絡我們</h2>
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <h3>Instagram</h3>
              <p>
                <a href="https://www.instagram.com/yurayou.yu/" target="_blank" rel="noopener noreferrer">@yurayou.yu</a>
              </p>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <h3>Email</h3>
              <p>
                <a href="mailto:info@iiincookie.com">wafflecake@gmail.com</a>
              </p>
            </div>
            <div class="contact-item">
              <div class="contact-icon">⏰</div>
              <h3>營業時間</h3>
              <p>週一至週五 9:00-18:00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

onMounted(() => {
  // 初始化動畫
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  })

  document
    .querySelectorAll('.philosophy-item, .step, .testimonial-card, .contact-item')
    .forEach((el) => {
      observer.observe(el)
    })
})
</script>

<style scoped>
/* Page Header */
.page-header {
  padding: 2rem 0 1rem;
  text-align: center;
}

.sub-title {
  display: block;
  font-family: 'Noto Serif TC', serif;
  font-size: 0.9rem;
  letter-spacing: 2px;
  color: #888;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.main-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #4a4a4a;
  letter-spacing: 3px;
  margin: 0;
}

/* 品牌故事 */
.brand-story {
  padding: 5rem 0;
  background: white;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.story-text h2 {
  font-size: 2.5rem;
  color: #6c7059;
  margin-bottom: 2rem;
}

.story-paragraphs p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1rem;
}

.story-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 製作理念 */
.philosophy {
  padding: 5rem 0;
  background: #f8f8f8;
}

.section-title {
  font-size: 2.5rem;
  color: #6c7059;
  text-align: center;
  margin-bottom: 3rem;
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.philosophy-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.philosophy-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.philosophy-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.philosophy-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.philosophy-item h3 {
  font-size: 1.5rem;
  color: #6c7059;
  margin-bottom: 1rem;
}

.philosophy-item p {
  color: #666;
  line-height: 1.6;
}

/* 製作過程 */
.process {
  padding: 5rem 0;
  background: white;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: #f8f8f8;
  border-radius: 15px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.step.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.step:hover {
  background: #6c7059;
  color: white;
  transform: translateY(-5px);
}

.step-number {
  background: #6c7059;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step:hover .step-number {
  background: white;
  color: #6c7059;
}

.step-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #666;
  line-height: 1.6;
}

.step:hover .step-content p {
  color: rgba(255, 255, 255, 0.9);
}

/* 客戶見證 */
.testimonials {
  padding: 5rem 0;
  background: #f8f8f8;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.testimonial-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
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
  background: #6c7059;
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
}

.contact-item:hover p {
  color: rgba(255, 255, 255, 0.9);
}

.contact-item a {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.contact-item a:hover {
  border-bottom-color: currentColor;
  opacity: 0.8;
}

.contact-item:hover a {
  color: rgba(255, 255, 255, 0.9);
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

  .main-title {
    font-size: 2rem;
  }

  .story-content {
    grid-template-columns: 1fr;
  }

  .philosophy-grid,
  .process-steps,
  .testimonials-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>

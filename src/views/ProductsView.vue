<template>
  <div class="products-page">
    <main>
      <section class="page-header">
        <div class="container">
          <span class="sub-title">Product</span>
          <h1 class="main-title">商品一覽</h1>
        </div>
      </section>

      <section class="filter-section">
        <div class="container">
          <div class="category-list">
            <button
              v-for="category in categories"
              :key="category.id"
              :class="['category-btn', { active: selectedCategory === category.id }]"
              @click="selectedCategory = category.id"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </section>

      <section class="products-section">
        <div class="container">
          <transition-group name="fade" tag="div" class="products-grid">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-card"
              @click="openProductModal(product)"
            >
              <div class="product-image-wrapper">
                <img :src="product.image" :alt="product.name" />
                <div class="hover-overlay">
                  <span>more detail</span>
                </div>
              </div>

              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <div class="product-meta">
                  <p class="price">NT$ {{ product.price }}</p>
                </div>
                <button class="btn-primary-block" @click.stop="addToCart(product)">
                  加入購物車
                </button>
              </div>
            </div>
          </transition-group>
        </div>
      </section>
    </main>

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
import { ref, computed, onMounted, watch, nextTick } from 'vue'
// 請確認你的 store 路徑是否正確，若無 store 請維持原本的假資料邏輯
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const selectedProduct = ref(null)
const quantity = ref(1)
const selectedCategory = ref('all')

// 模擬分類資料
const categories = [
  { id: 'all', name: '全部商品' },
  { id: '夾餡餅乾', name: '夾餡餅乾' },
  { id: '造型餅乾', name: '造型餅乾' },
  { id: '鹹味餅乾', name: '鹹味餅乾' },
  { id: '經典餅乾', name: '經典餅乾' }
]

// 過濾邏輯
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return productsStore.products
  }
  return productsStore.products.filter((product) => product.category === selectedCategory.value)
})

// 購物車邏輯
const addToCart = (product) => {
  cartStore.addToCart(product)
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

// --- 動畫偵測邏輯 (已修復) ---
let observer = null

const setupObserver = () => {
  // 如果舊的 observer 存在，先停止它，避免重複偵測
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  // 抓取所有卡片並開始偵測
  const cards = document.querySelectorAll('.product-card')
  cards.forEach((el) => observer.observe(el))
}

onMounted(() => {
  setupObserver()
})

// 關鍵修復：監聽 filteredProducts 的變化
watch(filteredProducts, async () => {
  // 等待 Vue 更新完 DOM (畫面元素)
  await nextTick()
  // 重新綁定動畫偵測
  setupObserver()
})
</script>

<style scoped>
/* 引入襯線字體，增加日系感 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600&family=Noto+Sans+TC:wght@300;400;500&display=swap');

:root {
  /* 定義日系簡約色票 */
  --bg-color: #f9f9f9; /* 極淡的灰白背景 */
  --primary-green: #6c7059; /* 參考圖的莫蘭迪綠 */
  --primary-hover: #565a46;
  --text-main: #333333;
  --text-light: #666666;
  --font-serif: 'Noto Serif TC', serif;
  --font-sans: 'Noto Sans TC', sans-serif;
}

.products-page {
  background-color: #f9f9f9; /* 確保整體背景色 */
  min-height: 100vh;
  font-family: 'Noto Sans TC', sans-serif;
  color: #333;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

/* --- Page Header (日系標題) --- */
.page-header {
  padding: 2rem 0 1rem;
  text-align: center;
}

.sub-title {
  display: block;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  letter-spacing: 2px;
  color: #888;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.main-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 600;
  color: #4a4a4a;
  letter-spacing: 3px;
  margin: 0;
}

/* --- Category Filter (極簡選單) --- */
.filter-section {
  margin-bottom: 3rem;
  text-align: center;
}

.category-list {
  display: inline-flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  background: none;
  border: none;
  font-size: 1rem;
  color: #888;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  font-family: var(--font-serif);
}

.category-btn:hover,
.category-btn.active {
  color: #333;
}

/* 底部線條動畫 */
.category-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background-color: #333;
  transition:
    width 0.3s ease,
    left 0.3s ease;
}

.category-btn.active::after {
  width: 100%;
  left: 0;
}

/* --- Product Grid --- */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem 2rem; /* 增加間距讓畫面呼吸 */
  padding-bottom: 4rem;
}

/* --- Product Card (核心修改) --- */
.product-card {
  background: transparent; /* 移除白色背景卡片感，讓圖片突出 */
  cursor: pointer;
  transition: transform 0.4s ease;
  opacity: 0; /* 配合 Observer 做進場動畫 */
}

.product-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.product-card:hover {
  transition: all 0.5s ease;
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 正方形圖片 */
  overflow: hidden;
  margin-bottom: 1.2rem;
  /* 圖片載入前的背景色 */
  background-color: #eaeaea;
}

.product-image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

/* 簡約遮罩 */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 變更：深色遮罩 */
  opacity: 0;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  /* backdrop-filter: blur(4px); 新增：模糊效果 */
}

.hover-overlay span {
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

.product-image-wrapper:hover .hover-overlay {
  opacity: 1;
}
.product-image-wrapper:hover span {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.01s; /* 讓文字在背景出現後再出現 */
}

.product-info {
  text-align: center;
}

.product-title {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 0.5rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.product-meta {
  margin-bottom: 1rem;
}

.price {
  color: #6c7059; /* 價格使用主題色 */
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 1px;
}

/* --- 按鈕樣式 (參考截圖) --- */
.btn-primary-block {
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
}

.btn-primary-block:hover {
  background-color: #565a46;
  box-shadow: 0 4px 12px rgba(108, 112, 89, 0.2);
}

/* --- Modal 樣式優化 --- */
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
  backdrop-filter: blur(4px); /* 背景模糊效果 */
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
  font-family: var(--font-serif);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.modal-en-name {
  color: #888;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.modal-price {
  font-size: 1.5rem;
  color: var(--primary-green);
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
  /* padding: 0;
  margin: 0; */
  /* box-sizing: border-box; */
  -moz-appearance: textfield;
  appearance: textfield;
}

.quantity-selector input::-webkit-outer-spin-button,
.quantity-selector input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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

/* 響應式 */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); /* 手機版一排兩個 */
    gap: 1.5rem 1rem;
  }

  .modal-body {
    flex-direction: column;
    padding: 20px;
  }

  .main-title {
    font-size: 1.8rem;
  }
}
</style>

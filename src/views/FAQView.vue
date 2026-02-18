<template>
  <div class="faq">
    <main>
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <span class="sub-title">FAQ</span>
          <h1 class="main-title">常見問題</h1>
        </div>
      </section>

      <!-- FAQ 內容 -->
      <section class="faq-content">
        <div class="container">
          <!-- 訂購相關 -->
          <div class="faq-category mb-5">
            <h2 class="category-title mb-4">
              <span class="category-icon">🛒</span>
              訂購相關
            </h2>
            <div class="accordion" :id="'accordionOrder'">
              <div
                v-for="(item, index) in orderFaqs"
                :key="index"
                class="accordion-item"
              >
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapseOrder' + index"
                    aria-expanded="false"
                    :aria-controls="'collapseOrder' + index"
                  >
                    {{ item.question }}
                  </button>
                </h2>
                <div
                  :id="'collapseOrder' + index"
                  class="accordion-collapse collapse"
                  :data-bs-parent="'#accordionOrder'"
                >
                  <div class="accordion-body">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 配送相關 -->
          <div class="faq-category mb-5">
            <h2 class="category-title mb-4">
              <span class="category-icon">🚚</span>
              配送相關
            </h2>
            <div class="accordion" :id="'accordionDelivery'">
              <div
                v-for="(item, index) in deliveryFaqs"
                :key="index"
                class="accordion-item"
              >
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: !item.isOpen }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapseDelivery' + index"
                    :aria-expanded="item.isOpen ? 'true' : 'false'"
                    :aria-controls="'collapseDelivery' + index"
                  >
                    {{ item.question }}
                  </button>
                </h2>
                <div
                  :id="'collapseDelivery' + index"
                  class="accordion-collapse collapse"
                  :class="{ show: item.isOpen }"
                  :data-bs-parent="'#accordionDelivery'"
                >
                  <div class="accordion-body">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 產品相關 -->
          <div class="faq-category mb-5">
            <h2 class="category-title mb-4">
              <span class="category-icon">🍪</span>
              產品相關
            </h2>
            <div class="accordion" :id="'accordionProduct'">
              <div
                v-for="(item, index) in productFaqs"
                :key="index"
                class="accordion-item"
              >
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    :class="{ collapsed: !item.isOpen }"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapseProduct' + index"
                    :aria-expanded="item.isOpen ? 'true' : 'false'"
                    :aria-controls="'collapseProduct' + index"
                  >
                    {{ item.question }}
                  </button>
                </h2>
                <div
                  :id="'collapseProduct' + index"
                  class="accordion-collapse collapse"
                  :class="{ show: item.isOpen }"
                  :data-bs-parent="'#accordionProduct'"
                >
                  <div class="accordion-body">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 其他問題 -->
          <div class="faq-category mb-5">
            <h2 class="category-title mb-4">
              <span class="category-icon">💬</span>
              其他問題
            </h2>
            <div class="accordion" :id="'accordionOther'">
              <div
                v-for="(item, index) in otherFaqs"
                :key="index"
                class="accordion-item"
              >
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapseOther' + index"
                    aria-expanded="false"
                    :aria-controls="'collapseOther' + index"
                  >
                    {{ item.question }}
                  </button>
                </h2>
                <div
                  :id="'collapseOther' + index"
                  class="accordion-collapse collapse"
                  :data-bs-parent="'#accordionOther'"
                >
                  <div class="accordion-body">
                    {{ item.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 聯絡我們 -->
      <section class="contact-section">
        <div class="container">
          <div class="contact-card">
            <h2>還有其他問題？</h2>
            <p>如果您在常見問題中找不到答案，歡迎隨時與我們聯繫</p>
            <div class="contact-buttons">
              <a href="mailto:contact@waffle.com" class="contact-btn">
                <span class="btn-icon">✉️</span>
                發送郵件
              </a>
              <RouterLink to="/about" class="contact-btn">
                <span class="btn-icon">ℹ️</span>
                了解更多
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 訂購相關 FAQ
const orderFaqs = ref([
  {
    question: '如何下單購買？',
    answer: '您可以透過網站選購商品，加入購物車後進行結帳。我們接受信用卡、轉帳等多種付款方式。'
  },
  {
    question: '訂單成立後可以修改或取消嗎？',
    answer: '訂單成立後24小時內可以聯繫客服進行修改或取消。超過24小時的訂單已進入製作流程，無法取消，但可以協助修改配送地址。',
  },
  {
    question: '付款方式有哪些？',
    answer: '我們提供信用卡付款、ATM轉帳、貨到付款等多種付款方式。選擇轉帳的客戶請於下單後3天內完成付款。',
  },
  {
    question: '有最低訂購數量嗎？',
    answer: '我們沒有設定最低訂購數量，但建議至少訂購一盒以上，以確保最佳的新鮮度和包裝品質。',
  }
])

// 配送相關 FAQ
const deliveryFaqs = ref([
  {
    question: '運費如何計算？',
    answer: '本島運費為150元，外島運費為250元。單筆訂單滿2000元即可享有免運優惠。',
  },
  {
    question: '多久可以收到商品？',
    answer: '一般訂單約3-5個工作天出貨，製作完成後會以宅配方式寄出，約1-2個工作天可送達。如需指定日期送達，請在訂單備註中註明。',
  },
  {
    question: '可以指定配送時間嗎？',
    answer: '可以！請在訂單備註中註明希望的配送日期和時段，我們會盡力配合。建議提前3-5天訂購以確保能準時送達。',
  },
  {
    question: '商品如何保存？',
    answer: '我們的餅乾建議在收到後盡快食用，以享受最佳口感。未開封可常溫保存7-10天，開封後請密封保存並盡快食用完畢。',
  }
])

// 產品相關 FAQ
const productFaqs = ref([
  {
    question: '產品是手工製作的嗎？',
    answer: '是的！我們的每一片餅乾都是手工精心製作，使用天然原料，無添加人工香料，確保每一口都是最純粹的美味。',
  },
  {
    question: '可以客製化口味嗎？',
    answer: '我們提供多種經典口味，如需客製化口味或特殊需求，歡迎聯繫我們討論。我們也提供鐵盒訂製服務，可根據您的需求設計專屬包裝。',
  },
  {
    question: '產品有添加防腐劑嗎？',
    answer: '我們的產品堅持無添加防腐劑和人工香料，使用天然原料製作，因此建議收到後盡快食用以確保最佳品質。',
  },
  {
    question: '包裝可以客製化嗎？',
    answer: '可以！我們提供鐵盒訂製服務，可以根據您的需求設計專屬包裝，並搭配新鮮花材，讓收禮者感受到滿滿的溫暖與心意。',
  }
])

// 其他問題 FAQ
const otherFaqs = ref([
  {
    question: '可以到店自取嗎？',
    answer: '目前我們主要提供線上訂購和宅配服務。如需自取，請提前聯繫我們預約時間和地點。',
  },
  {
    question: '有提供企業團購優惠嗎？',
    answer: '有的！企業團購滿50盒以上可享有優惠價格，歡迎聯繫我們討論詳細方案。我們也提供客製化包裝和專屬服務。',
  },
  {
    question: '如何追蹤訂單狀態？',
    answer: '訂單成立後，我們會發送確認郵件。出貨時會再次發送通知，並提供物流追蹤號碼，您可透過該號碼追蹤配送狀態。',
  },
  {
    question: '如果收到商品有問題怎麼辦？',
    answer: '如收到商品有任何問題，請立即拍照並聯繫我們的客服。我們會盡快為您處理，確保您的購物體驗。',
  }
])

// Bootstrap 會自動處理 accordion 的展開/收合
// 不需要手動初始化，因為我們使用了 data-bs-toggle 和 data-bs-target
</script>

<style scoped>
.faq {
  min-height: 100vh;
  background: #f8f8f8;
}

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

/* FAQ 內容 */
.faq-content {
  padding: 5rem 0;
  background: #f8f8f8;
}

.category-title {
  font-size: 2.2rem;
  color: #6c7059;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #6c7059;
}

.category-icon {
  font-size: 2.5rem;
}

/* Bootstrap Accordion 自訂樣式 */
.accordion {
  --bs-accordion-border-radius: 15px;
  --bs-accordion-border-color: transparent;
  --bs-accordion-btn-padding-x: 2rem;
  --bs-accordion-btn-padding-y: 1.5rem;
  --bs-accordion-body-padding-x: 2rem;
  --bs-accordion-body-padding-y: 1.5rem;
  --bs-accordion-active-color: white;
  --bs-accordion-active-bg: #6c7059;
  --bs-accordion-btn-focus-box-shadow: 0 0 0 0.25rem rgba(108, 112, 89, 0.25);
}

.accordion-item {
  background-color: white;
  border: none;
  border-radius: 15px !important;
  margin-bottom: 1rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-item:hover {
  box-shadow: 0 5px 20px rgba(108, 112, 89, 0.15);
  transform: translateY(-2px);
}

.accordion-button {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  background-color: white;
  border: none;
  box-shadow: none;
}

.accordion-button:not(.collapsed) {
  color: white;
  background-color: #6c7059;
  box-shadow: none;
}

.accordion-button:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0.25rem rgba(108, 112, 89, 0.25);
}

.accordion-button::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%236c7059'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  transition: transform 0.3s ease;
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  transform: rotate(180deg);
}

.accordion-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  background-color: #f8f8f8;
}

/* 聯絡我們 */
.contact-section {
  padding: 5rem 0;
  background: white;
}

.contact-card {
  background: linear-gradient(135deg, #f2efe9 0%, #e8e0d6 100%);
  padding: 4rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.contact-card h2 {
  font-size: 2.5rem;
  color: #6c7059;
  margin-bottom: 1rem;
}

.contact-card p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.contact-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2.5rem;
  background: #6c7059;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 112, 89, 0.3);
}

.contact-btn:hover {
  background: #5a5e4a;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(108, 112, 89, 0.4);
  color: white;
}

.btn-icon {
  font-size: 1.3rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .category-title {
    font-size: 1.8rem;
  }

  .accordion-button {
    font-size: 1.1rem;
    padding: 1.2rem 1.5rem;
  }

  .accordion-body {
    padding: 1.2rem 1.5rem;
  }

  .contact-card {
    padding: 2.5rem 2rem;
  }

  .contact-card h2 {
    font-size: 2rem;
  }

  .contact-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .contact-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
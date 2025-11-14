# 動畫使用指南

## 📌 目前實作方式

你的專案使用了 **AOS (Animate On Scroll)** 動畫庫，透過 `useAnimations` composable 來初始化。

### 基本寫法（目前的方式）

```javascript
// 在 HomeView.vue 中
import { useAnimations } from '@/composables/useAnimations'

// 在 setup 中初始化
useAnimations()
```

### 在 HTML 中使用

```html
<!-- 基本用法 -->
<div data-aos="fade-up">內容</div>

<!-- 帶延遲 -->
<div data-aos="fade-up" data-aos-delay="200">內容</div>

<!-- 自訂持續時間 -->
<div data-aos="fade-up" data-aos-duration="2000">內容</div>
```

---

## 🔧 可自訂的選項

**寫法不是固定的**，你可以根據需求調整 `useAnimations.js`：

```javascript
// src/composables/useAnimations.js
export function useAnimations() {
  onMounted(() => {
    AOS.init({
      // 動畫持續時間（毫秒）
      duration: 1200,  // 可改為 500, 1000, 2000 等
      
      // 動畫緩動效果
      easing: 'ease-out-cubic',  // 可改為 'ease-in', 'ease-out', 'ease-in-out' 等
      
      // 是否只播放一次（滾動離開後再滾回來不會重複播放）
      once: true,  // true: 只播放一次, false: 每次進入視窗都播放
      
      // 觸發距離（元素距離視窗底部多少像素時觸發）
      offset: 80,  // 可調整為 0-300
      
      // 初始延遲（毫秒）
      delay: 100,  // 可改為 0, 50, 200 等
      
      // 觸發位置
      anchorPlacement: 'top-bottom'  // 'top-bottom', 'top-center', 'center-bottom' 等
    })
  })
  
  return { AOS }
}
```

---

## 🎨 AOS 動畫類型範例

### 1. Fade 淡入淡出
```html
<div data-aos="fade">淡入</div>
<div data-aos="fade-up">從下往上淡入</div>
<div data-aos="fade-down">從上往下淡入</div>
<div data-aos="fade-left">從右往左淡入</div>
<div data-aos="fade-right">從左往右淡入</div>
```

### 2. Zoom 縮放
```html
<div data-aos="zoom-in">縮放進入</div>
<div data-aos="zoom-out">縮放出</div>
<div data-aos="zoom-in-up">從下縮放進入</div>
```

### 3. Slide 滑動
```html
<div data-aos="slide-up">往上滑</div>
<div data-aos="slide-down">往下滑</div>
<div data-aos="slide-left">往左滑</div>
<div data-aos="slide-right">往右滑</div>
```

### 4. Flip 翻轉
```html
<div data-aos="flip-left">從左翻轉</div>
<div data-aos="flip-right">從右翻轉</div>
<div data-aos="flip-up">從上翻轉</div>
<div data-aos="flip-down">從下翻轉</div>
```

---

## 📝 完整範例

### 範例 1：簡單使用
```vue
<template>
  <section id="home" class="hero">
    <h1 data-aos="fade-up">餅乾生產餡</h1>
    <h2 data-aos="fade-up" data-aos-delay="200">呈現最驚豔的味</h2>
    <button data-aos="fade-up" data-aos-delay="400">探索商品</button>
  </section>
</template>

<script setup>
import { useAnimations } from '@/composables/useAnimations'
useAnimations()
</script>
```

### 範例 2：自訂參數
```vue
<template>
  <div>
    <!-- 每個元素可以獨立設定 -->
    <div data-aos="fade-right" 
         data-aos-duration="2000" 
         data-aos-delay="300"
         data-aos-easing="ease-in-out">
      慢慢從右邊滑入（2秒，延遲300ms）
    </div>
  </div>
</template>
```

### 範例 3：列表動畫（依次出現）
```vue
<template>
  <div class="products-grid">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      :data-aos="'fade-up'"
      :data-aos-delay="index * 100"
    >
      {{ product.name }}
    </div>
  </div>
</template>
```

### 範例 4：進階使用（手動控制）
```vue
<script setup>
import { useAnimations } from '@/composables/useAnimations'
import { onMounted } from 'vue'

const { AOS } = useAnimations()

onMounted(() => {
  // 手動觸發動畫刷新（例如動態載入內容後）
  AOS.refresh()
  
  // 手動觸發特定動畫
  // AOS.refreshHard()
})
</script>
```

---

## 🔄 修改 useAnimations Composable

如果你想改變動畫行為，可以這樣修改：

```javascript
// src/composables/useAnimations.js
export function useAnimations(options = {}) {
  const defaultOptions = {
    duration: 1200,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    delay: 100,
    anchorPlacement: 'top-bottom'
  }
  
  const config = { ...defaultOptions, ...options }
  
  onMounted(() => {
    AOS.init(config)
  })
  
  onUnmounted(() => {
    AOS.refresh()
  })
  
  return { AOS }
}
```

這樣就可以在使用時傳入自訂選項：

```javascript
// 在某些頁面使用不同的設定
useAnimations({
  duration: 2000,
  once: false  // 這個頁面的動畫可以重複播放
})
```

---

## 🎯 你目前的用法（HomeView.vue）

```vue
<script setup>
import { useAnimations } from '@/composables/useAnimations'

// 初始化動畫（全域設定）
useAnimations()
</script>

<template>
  <!-- 使用 data-aos 屬性 -->
  <section class="origin" data-aos="fade-up" data-aos-duration="1000">
    <h2 data-aos="fade-up" data-aos-delay="200">緣起</h2>
    <!-- ... -->
  </section>
</template>
```

---

## 💡 常見問題

**Q: 動畫沒有出現？**
- 確認已經呼叫 `useAnimations()`
- 檢查元素是否有 `data-aos` 屬性
- 確認 AOS CSS 已正確引入

**Q: 想在不同頁面使用不同動畫設定？**
- 可以建立多個 composable，例如 `useAnimationsFast()`, `useAnimationsSlow()`
- 或傳入選項參數自訂

**Q: 動態載入內容後動畫不觸發？**
- 使用 `AOS.refresh()` 手動刷新

**Q: 不想用 AOS，想用其他動畫庫？**
- 可以改用 Framer Motion、GSAP、或純 CSS 動畫
- 只需要修改 `useAnimations.js` 的實作即可

---

## 📚 參考資源

- [AOS 官方文檔](https://michalsnik.github.io/aos/)
- [AOS GitHub](https://github.com/michalsnik/aos)


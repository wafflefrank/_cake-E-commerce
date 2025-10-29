<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #fff;
  transition: background 0.2s;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
}

/* 全域樣式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 按鈕樣式 */
.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #8b4513;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #a0522d;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
  }

  &.btn-outline {
    background: transparent;
    color: #8b4513;
    border: 2px solid #8b4513;

    &:hover {
      background: #8b4513;
      color: white;
    }
  }
}

/* 標題樣式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #8b4513;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

/* 段落樣式 */
p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* 連結樣式 */
a {
  color: #8b4513;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #a0522d;
  }
}

/* 輸入框樣式 */
input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}

/* 動畫效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 工具類 */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.mb-1 {
  margin-bottom: 0.5rem;
}
.mb-2 {
  margin-bottom: 1rem;
}
.mb-3 {
  margin-bottom: 1.5rem;
}
.mb-4 {
  margin-bottom: 2rem;
}

.mt-1 {
  margin-top: 0.5rem;
}
.mt-2 {
  margin-top: 1rem;
}
.mt-3 {
  margin-top: 1.5rem;
}
.mt-4 {
  margin-top: 2rem;
}

.p-1 {
  padding: 0.5rem;
}
.p-2 {
  padding: 1rem;
}
.p-3 {
  padding: 1.5rem;
}
.p-4 {
  padding: 2rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }
}

/* 滾動條樣式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #8b4513;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0522d;
}

/* 選擇文字樣式 */
::selection {
  background: #8b4513;
  color: white;
}

::-moz-selection {
  background: #8b4513;
  color: white;
}

/* 頁面轉場動畫 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 載入動畫 */
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #8b4513;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 工具提示 */
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

/* 卡片樣式 */
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
}

/* 網格系統 */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* 彈性布局 */
.flex {
  display: flex;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  flex-direction: column;
}

/* 間距工具 */
.gap-1 {
  gap: 0.5rem;
}
.gap-2 {
  gap: 1rem;
}
.gap-3 {
  gap: 1.5rem;
}
.gap-4 {
  gap: 2rem;
}
</style>

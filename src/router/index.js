import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
  ],
  // 設定滾動行為：只在路由切換時滾動到頂部，重新整理時保持位置
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如瀏覽器的前進/後退），則使用保存的位置
    if (savedPosition) {
      return savedPosition
    }
    // 只在真正的路由切換時才滾動到頂部
    // 檢查條件：from 存在 且 from.path !== to.path（確保是不同路由）
    // 重新整理時 from.path === to.path，所以不會滾動
    if (from && from.path !== to.path) {
      return { top: 0, behavior: 'smooth' }
    }
    // 重新整理時（from.path === to.path 或 from 不存在）不滾動，保持當前位置
    return undefined
  }
})

export default router

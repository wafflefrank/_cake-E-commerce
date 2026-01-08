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
  ],
  // 設定滾動行為：每次路由切換時都滾動到頂部
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如瀏覽器的前進/後退），則使用保存的位置
    if (savedPosition) {
      return savedPosition
    }
    // 否則滾動到頂部
    return { top: 0, behavior: 'smooth' }
  }
})

export default router

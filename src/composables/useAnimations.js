import { onMounted, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function useAnimations() {
  onMounted(() => {
    // 初始化 AOS 動畫
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 100,
      anchorPlacement: 'top-bottom'
    })
  })

  onUnmounted(() => {
    AOS.refresh()
  })

  return {
    AOS
  }
}

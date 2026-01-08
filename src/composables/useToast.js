import { ref } from 'vue'

const showToast = ref(false)
const toastMessage = ref('已加入購物車')

export function useToast() {
  const triggerToast = (message = '已加入購物車') => {
    toastMessage.value = message
    showToast.value = true
  }

  return {
    showToast,
    toastMessage,
    triggerToast
  }
}


import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  // 購物車項目
  const items = ref([])

  // 計算屬性
  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  // 方法
  const addToCart = (product, quantity = 1) => {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        nameEn: product.nameEn,
        price: product.price,
        image: product.image,
        quantity: quantity
      })
    }
  }

  const removeFromCart = (productId) => {
    const index = items.value.findIndex((item) => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((item) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const getItemQuantity = (productId) => {
    const item = items.value.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  }
})

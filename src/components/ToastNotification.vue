<template>
  <Transition name="toast">
    <div v-if="show" class="toast-notification">
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
      <span class="toast-message">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: '已加入成功'
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const emit = defineEmits(['update:show'])

let timeoutId = null

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        emit('update:show', false)
      }, props.duration)
    }
  },
  { immediate: true }
)

onMounted(() => {
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.toast-notification {
  position: fixed;
  top: 80px;
  right: 20px;
  background: white;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2000;
  min-width: 200px;
  border: 1px solid #e0e0e0;
}

.toast-icon {
  width: 24px;
  height: 24px;
  color: #4caf50;
  flex-shrink: 0;
}

.toast-icon svg {
  width: 100%;
  height: 100%;
}

.toast-message {
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
}

/* 動畫效果 */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .toast-notification {
    right: 10px;
    top: 70px;
    min-width: 180px;
    padding: 12px 16px;
  }
}
</style>


<script setup>
import { defineProps } from 'vue'
defineProps({ show: { type: Boolean, default: false } })
</script>

<template>
  <transition name="splash-fade">
    <div v-if="show" class="splash-overlay">
      <div class="splash-logo font-serifTc">Waffle & Tea</div>
    </div>
  </transition>
</template>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.splash-logo {
  font-size: 2rem;
  letter-spacing: 0.2em;
  color: #8b4513;
  opacity: 0;
  /* 慢慢浮現 */
  animation: logoIn 1200ms 100ms cubic-bezier(.22,.61,.36,1) forwards;
}
.splash-fade-enter-active,
.splash-fade-leave-active { transition: opacity 500ms ease; }
.splash-fade-enter-from,
.splash-fade-leave-to { opacity: 0; }

@keyframes logoIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>



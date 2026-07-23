<script setup lang="ts">
// App
import { useToastsStore } from '@/stores/toasts'
// Components
import CompUiToast from '@/components/ui/ui-toast.vue'

const toastsStore = useToastsStore()
</script>

<template>
  <div class="toasts-anchor">
    <CompUiToast
      v-for="toast in toastsStore.toasts"
      :key="toast.id"
      :toast="toast"
      @dismiss="toastsStore.dismiss(toast.id)" />
  </div>
</template>

<style lang="scss" scoped>
.toasts-anchor {
  z-index: var(--z-toasts);
  flex-direction: column;
  bottom: var(--s-lg);
  right: var(--s-lg);
  gap: var(--s-xs);
  position: fixed;
  display: flex;
}
</style>
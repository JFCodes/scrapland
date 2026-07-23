import { defineStore } from 'pinia'
import { ref } from 'vue'
// App
import type { UIToast } from '@/components/types'

export const useToastsStore = defineStore('toasts', () => {
  const toasts = ref<Array<UIToast>>([])

  const dismiss = (toastId: string): void => {
    const index = toasts.value.findIndex(t => t.id === toastId)
    if (index !== -1) toasts.value.splice(index, 1)
  }

  const launch = (toast: Omit<UIToast, 'id'>, coolDown = 8000): void => {
    const id = crypto.randomUUID()
    toasts.value.push({
      ...toast,
      id
    })

    window.setTimeout(() => dismiss(id), coolDown)
  }

  return {
    dismiss,
    launch,
    toasts,
  }
})

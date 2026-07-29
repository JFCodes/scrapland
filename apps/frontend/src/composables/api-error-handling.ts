import type { T_API_RESPONSE_Error } from '@scrapland/data-model'
// App
import { useToastsStore } from '@/stores/toasts'

export function useApiErrorHandling () {
  const toastsStore = useToastsStore()

  const onApiError = (error: unknown): void => {
    if (typeof error !== 'object') return
    if (error === null) return
    if (!('type' in error)) return

    const apiError = error as T_API_RESPONSE_Error
    const type = apiError.level ?? 'danger'
    const messages = !apiError.details || apiError.details.length === 0
      ? [`Api error #${apiError.code}`]
      : apiError.details


    toastsStore.launch({ type, messages, title: apiError.message })
  }

  return { onApiError }
}

import type { T_API_RESPONSE_Error } from '@scrapland/data-model'
import { useI18n } from 'vue-i18n'
// App
import { useToastsStore } from '@/stores/toasts'
import { err } from 'cron-validate/lib/result'

export function useApiErrorHandling () {
  const toastsStore = useToastsStore()
  const { t } = useI18n()

  const onUnknownError = (error: unknown): void => {
    const errorCode = Number(error)
    const code = !isNaN(errorCode) && isFinite(errorCode)
      ? errorCode
      : ''

    const title = t('sentences.unknownApiError', { code })
    toastsStore.launch({ title, type: 'danger' })
  }

  const onApiError = (error: unknown): void => {
    const parsed = parseApiError(error)
    if (parsed === null) return onUnknownError(error)

    const type = parsed.level ?? 'danger'
    const messages = !parsed.details || parsed.details.length === 0
      ? [`Api error #${parsed.code}`]
      : parsed.details

    toastsStore.launch({ type, messages, title: parsed.message })
  }

  const parseApiError = (error: unknown): null | T_API_RESPONSE_Error => {
    if (typeof error !== 'object') return null
    if (error === null) return null
    if (!('type' in error)) return null

    return error as T_API_RESPONSE_Error
  }

  return { onApiError }
}

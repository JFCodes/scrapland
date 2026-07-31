import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '@/i18n/locales/_schema'

export function useAppI18n() {
  return useI18n<{ message: MessageSchema }>({
    useScope: 'global',
  })
}

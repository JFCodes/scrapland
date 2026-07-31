import { createI18n } from 'vue-i18n'
// App
import type { MessageSchema, AppLocale } from '@/i18n/locales/_schema'

import en from './locales/en'
// import pt from './locales/pt'

export const i18n = createI18n<[MessageSchema], AppLocale>({
  globalInjection: true,
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',

  messages: { en },
})

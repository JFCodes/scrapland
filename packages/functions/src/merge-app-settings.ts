import { type T_AppSettings, DEFAULT_APP_SETTINGS } from '@scrapland/data-model'

export function T_MergeAppSettings (settings: Partial<T_AppSettings>): T_AppSettings {
  return {
    ...DEFAULT_APP_SETTINGS,
    ...settings
  }
}

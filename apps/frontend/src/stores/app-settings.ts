import { DEFAULT_APP_SETTINGS, type T_AppSettings } from '@scrapland/data-model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// App
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { API } from '@/api'

export const useAppSettings = defineStore('app-settings', () => {
  const { onApiError } = useApiErrorHandling()

  const settings = ref<T_AppSettings>(DEFAULT_APP_SETTINGS)

  const initialize = async (): Promise<void> => {
    await API
      .appSettings()
      .then(result => {
        API.setServerPort(result.BACKEND_SERVER_PORT)
        settings.value = result
        console.log({ result })
      })
      .catch(onApiError)
  }

  return {
    initialize,
    settings
  }
})

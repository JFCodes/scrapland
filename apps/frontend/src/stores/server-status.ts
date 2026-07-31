import { onMounted, watch, ref } from 'vue'
import { defineStore } from 'pinia'
// App
import { useAppSettings } from '@/stores/app-settings'
import { API } from '@/api'

const OFFLINE_CHECK_TIMING = 2000
const ONLINE_CHECK_TIMING = 5000

export const useServerStatusStore = defineStore('server-status', () => {
  const appSettings = useAppSettings()

  let checkInterval: null | number = null
  const isInitializing = ref(true)
  const serverOk = ref(true)

  const checkStatus = async (): Promise<void> => {
    const status = await API.ping()
      .then(result =>result.status === 'ok')
      .catch(() => false)

    if (serverOk.value !== status) serverOk.value = status
  }

  // Private
  async function initialize (): Promise<void> {
    await appSettings.initialize()
    await checkStatus()

    isInitializing.value = false
  }

  function setupInterval (status: boolean): void {
    if (checkInterval !== null) window.clearInterval(checkInterval)
    const timing = status ? ONLINE_CHECK_TIMING : OFFLINE_CHECK_TIMING
    checkInterval = window.setInterval(() => checkStatus(), timing)
  }

  watch(serverOk, setupInterval, { immediate: true })
  onMounted(initialize)

  return {
    isInitializing,
    serverOk
  }
})

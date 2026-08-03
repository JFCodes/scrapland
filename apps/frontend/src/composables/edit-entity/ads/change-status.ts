import type { E_AD_STATUS } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import { useAdsStore } from '@/stores/ads'

export function useAdChangStatus () {
  const isChangingStatus = ref(false)

  const changeStatus = (adId: string, status: E_AD_STATUS): void => {
    const adsStore = useAdsStore()

    isChangingStatus.value = true
    adsStore
      .patchAdHousing(adId, { _ad_status: status })
      .finally(() => isChangingStatus.value = false)
  }

  return { changeStatus, isChangingStatus }
}

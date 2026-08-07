import { E_AD_ENTITY_TYPE, type E_AD_STATUS } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import { useAdsStore } from '@/stores/ads'

export function useAdChangStatus (addEntityType: E_AD_ENTITY_TYPE) {
  const adsStore = useAdsStore()

  const isChangingStatus = ref(false)

  const changeStatus = (adId: string, status: E_AD_STATUS): void => {
    isChangingStatus.value = true

    if (addEntityType === E_AD_ENTITY_TYPE.HOUSING) {
      adsStore
        .patchAdHousing(adId, { _ad_status: status })
        .finally(() => isChangingStatus.value = false)
    } else if (addEntityType === E_AD_ENTITY_TYPE.VEHICLE) {
      adsStore
        .patchAdVehicle(adId, { _ad_status: status })
        .finally(() => isChangingStatus.value = false)
    }
  }

  return { changeStatus, isChangingStatus }
}

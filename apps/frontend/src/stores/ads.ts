import type { T_Ad_Housing, T_Ad_Housing_Patch, T_Ad_Vehicle } from '@scrapland/data-model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// App
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { usePaginated } from '@/composables/paginated'
import { useAppI18n } from '@/composables/use-i18n'
import { API } from '@/api'

export const useAdsStore = defineStore('ads', () => {
  const { onApiError } = useApiErrorHandling()
  const { t } = useAppI18n()

  const adsHousing = ref<Array<T_Ad_Housing>>([])
  const adsVehicle = ref<Array<T_Ad_Vehicle>>([])

  const {
    isLoadingMore: isLoadingMoreAdsHousing,
    isLoading: isLoadingAdsHousing,
    totalItems: totalAdsHousing,
    loadMore: loadMoreAdsHousing,
    load: loadAdsHousing,
  } = usePaginated({ data: adsHousing, request: API.ads.housing.all })

  const {
    isLoadingMore: isLoadingMoreAdsVehicle,
    isLoading: isLoadingAdsVehicle,
    totalItems: totalAdsVehicle,
    loadMore: loadMoreAdsVehicle,
    load: loadAdsVehicle,
  } = usePaginated({ data: adsVehicle, request: API.ads.vehicle.all })


  const patchAdHousing = (adId: string, payload: T_Ad_Housing_Patch): Promise<null | T_Ad_Housing> => {
    return API.ads.housing
      .patch(adId, payload)
      .then(result => updateAdHousing(result))
      .catch(error => {
        onApiError(error)
        return null
      })
  }

  const updateAdHousing = (ad: T_Ad_Housing): null | T_Ad_Housing => {
    const updateIndex = adsHousing.value.findIndex(item => item._id === ad._id)
    if (updateIndex === -1) return null

    adsHousing.value[updateIndex] = ad
    return ad
  }

  return {
    // Housing
    loadMoreAdsHousing,
    patchAdHousing,
    loadAdsHousing,
    isLoadingMoreAdsHousing,
    isLoadingAdsHousing,
    totalAdsHousing,
    adsHousing,
    // Vehicle
    loadMoreAdsVehicle,
    loadAdsVehicle,
    isLoadingMoreAdsVehicle,
    isLoadingAdsVehicle,
    totalAdsVehicle,
    adsVehicle,
  }
})

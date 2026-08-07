import type { T_Ad_Housing, T_Ad_Housing_Patch, T_Ad_Vehicle, T_Ad_Vehicle_Patch } from '@scrapland/data-model'
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

  // HOUSING
  const adsHousing = ref<Array<T_Ad_Housing>>([])
  const {
    isLoadingMore: isLoadingMoreAdsHousing,
    isLoading: isLoadingAdsHousing,
    totalItems: totalAdsHousing,
    loadMore: loadMoreAdsHousing,
    load: loadAdsHousing,
  } = usePaginated({ data: adsHousing, request: API.ads.housing.all })

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

  // VEHICLE
  const adsVehicle = ref<Array<T_Ad_Vehicle>>([])

  const {
    isLoadingMore: isLoadingMoreAdsVehicle,
    isLoading: isLoadingAdsVehicle,
    totalItems: totalAdsVehicle,
    loadMore: loadMoreAdsVehicle,
    load: loadAdsVehicle,
  } = usePaginated({ data: adsVehicle, request: API.ads.vehicle.all })

  const patchAdVehicle = (adId: string, payload: T_Ad_Vehicle_Patch): Promise<null | T_Ad_Vehicle> => {
    return API.ads.vehicle
      .patch(adId, payload)
      .then(result => updateAdVehicle(result))
      .catch(error => {
        onApiError(error)
        return null
      })
  }

  const updateAdVehicle = (ad: T_Ad_Vehicle): null | T_Ad_Vehicle => {
    const updateIndex = adsVehicle.value.findIndex(item => item._id === ad._id)
    if (updateIndex === -1) return null

    adsVehicle.value[updateIndex] = ad
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
    patchAdVehicle,
    loadAdsVehicle,
    isLoadingMoreAdsVehicle,
    isLoadingAdsVehicle,
    totalAdsVehicle,
    adsVehicle,
  }
})

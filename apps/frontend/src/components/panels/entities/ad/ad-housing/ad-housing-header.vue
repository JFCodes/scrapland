<script setup lang="ts">
import type { E_AD_STATUS, T_Ad_Housing } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import { useAdsStore } from '@/stores/ads'
// Components
import CompEntityAdHousingBuildingTypesBadges from '@/components/entity/ad/housing/ad-building-types-badges.vue'
import CompEntityTasksTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompEntityAdStatusPicker from '@/components/entity/ad/ad-status-picker.vue'
import CompUiPrice from '@/components/ui/ui-price.vue'

const emits = defineEmits<{ 'update-ad': [ad: T_Ad_Housing] }>()
const props = defineProps<{ adHousing: T_Ad_Housing }>()

const adsStore = useAdsStore()

const isChangingStatus = ref(false)

const changeStatus = async (status: E_AD_STATUS): Promise<void> => {
  isChangingStatus.value = true

  const patched = await adsStore
    .patchAdHousing(props.adHousing._id, { _ad_status: status })
    .finally(() => isChangingStatus.value = false)

  if (patched) emits('update-ad', patched)
}
</script>

<template>
  <div class="--group --group--spread --pr-3xl">
    <div class="--group --mb-xs">
      <CompEntityTasksTargetBadge :target="adHousing._ad_target" />
      <CompEntityAdHousingBuildingTypesBadges :ad-building-types="adHousing._ad_housing_buildingTypes" />
    </div>

    <CompEntityAdStatusPicker
      :is-options-loading="isChangingStatus"
      :status="adHousing._ad_status"
      :change-status="changeStatus" />
  </div>

  <div class="--group --group--spread  --pr-3xl">
    <div class="--group --font-bold --text-md">
      <p>{{ adHousing._ad_targetId }}:</p>
      <p>{{ adHousing.descriptionShort }}</p>
    </div>

    <CompUiPrice class="--text-lg" currency="EUR" :icon-size="20" :price="adHousing.price" />
  </div>
</template>
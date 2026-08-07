<script setup lang="ts">
import { E_AD_ENTITY_TYPE, type T_Ad_Housing } from '@scrapland/data-model'
// App
import { useAdChangStatus } from '@/composables/edit-entity/ads/change-status'
import type { PanelAdHousingProps } from '@/components/panels/types'
import { useModals } from '@/composables/modals'
import { usePanelStore } from '@/stores/panel'
// Components
import CompEntityAdHousingBuildingTypesBadges from '@/components/entity/ad/housing/ad-building-types-badges.vue'
import CompEntityAdHousingOperationBadge from '@/components/entity/ad/housing/ad-operation-badge.vue'
import CompEntityTasksTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompEntityAdStatusPicker from '@/components/entity/ad/ad-status-picker.vue'
import CompPanelAdHousing from '@/components/panels/entities/ad/ad-housing.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiPrice from '@/components/ui/ui-price.vue'
import { ExternalLink, Eye } from '@lucide/vue'

const props = defineProps<{
  index: number,
  adHousing: T_Ad_Housing
}>()

const { isChangingStatus, changeStatus } = useAdChangStatus(E_AD_ENTITY_TYPE.HOUSING)

const showAdHousingPanel = () => {
  const panelStore = usePanelStore()

  panelStore.show<PanelAdHousingProps>(CompPanelAdHousing, {
    housingAd: props.adHousing
  })
}

</script>

<template>
  <td>{{ index + 1 }}</td>
  <td>
    <button
      class="--thumbnail --pointer"
      @click="useModals().adHousingGallery({ images: adHousing.images, activeIndex: 0 })">
      <img v-if="adHousing.imageMain" :src="adHousing.imageMain" />
    </button>
  </td>
  <td>
    <CompEntityTasksTargetBadge :target="adHousing._ad_target" />
  </td>
  <td>
    <CompEntityAdHousingOperationBadge :operation="adHousing._ad_housing_operation" />
  </td>
  <td>{{ adHousing._ad_targetId }}</td>
  <td>
    <CompUiPrice currency="EUR" :price="adHousing.price" />
  </td>
  <td>
    <CompEntityAdHousingBuildingTypesBadges :ad-building-types="adHousing._ad_housing_buildingTypes" />
  </td>
  <td>
    <CompEntityAdStatusPicker
      :is-loading="isChangingStatus"
      :status="adHousing._ad_status"
      @status-change="status => changeStatus(adHousing._id, status)" />
  </td>
  <td>
    <div class="--group">
      <CompUiIconButton :href="adHousing.url" :icon="ExternalLink" :is-active="false" />
      <CompUiIconButton :icon="Eye" :is-active="false" @click="showAdHousingPanel" />
    </div>
  </td>
</template>

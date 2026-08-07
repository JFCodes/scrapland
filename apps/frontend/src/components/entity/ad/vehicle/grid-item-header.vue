<script setup lang="ts">
import { E_AD_ENTITY_TYPE, type T_Ad_Vehicle } from '@scrapland/data-model'
// App
import { useAdChangStatus } from '@/composables/edit-entity/ads/change-status'
// import { usePanelStore } from '@/stores/panel'
// Components
import CompEntityAdStatusPicker from '@/components/entity/ad/ad-status-picker.vue'
import CompEntityTaskTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiPrice from '@/components/ui/ui-price.vue'
import { ExternalLink, Hammer } from '@lucide/vue'

defineProps<{ adVehicle: T_Ad_Vehicle }>()

const { isChangingStatus, changeStatus } = useAdChangStatus(E_AD_ENTITY_TYPE.VEHICLE)
// const panelStore = usePanelStore()

// const showPanel = () => {
//   panelStore.show<PanelAdHousingProps>(CompPanelAdHousing, {
//     housingAd: props.adHousing
//   })
// }
</script>

<template>
  <div class="--group --group--spread --mb-sm">
    <CompEntityTaskTargetBadge :target="adVehicle._ad_target" />
    <CompEntityAdStatusPicker
      :is-loading="isChangingStatus"
      :status="adVehicle._ad_status"
      @status-change="status => changeStatus(adVehicle._id, status)" />
  </div>

  <div class="--group --group--spread">
    <div class="--no-overflow">
      <p class="--truncate">{{ adVehicle.brand }} / {{ adVehicle.model }}</p>
      <div class="--group --font-bold">
        <template v-if="adVehicle.year">
          <Hammer :size="16" />
          <p>{{ adVehicle.year }}</p>
        </template>
        <CompUiPrice currency="EUR" :decimal-places="2" :price="adVehicle.price" />
      </div>
    </div>
    <div class="--group">
      <CompUiIconButton :href="adVehicle.url" :icon="ExternalLink" :is-active="false" />
      <!-- <CompUiIconButton :icon="Eye" :is-active="false" @click="showPanel" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { E_AD_ENTITY_TYPE, type T_Ad_Vehicle } from '@scrapland/data-model'
// App
import { useAdChangStatus } from '@/composables/edit-entity/ads/change-status'
// Components
import CompEntityAdVehicleEngineBadge from '@/components/entity/ad/vehicle/engine-badge.vue'
import CompEntityTasksTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompEntityAdStatusPicker from '@/components/entity/ad/ad-status-picker.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiPrice from '@/components/ui/ui-price.vue'
import { ExternalLink } from '@lucide/vue'

defineProps<{
  adVehicle: T_Ad_Vehicle
  index: number
}>()

const { isChangingStatus, changeStatus } = useAdChangStatus(E_AD_ENTITY_TYPE.VEHICLE)

</script>

<template>
  <td>{{ index + 1 }}</td>
  <td>
    <button class="--thumbnail --pointer">
      <img v-if="adVehicle.images[0]" :src="adVehicle.images[0]" />
    </button>
  </td>
  <td>
    <CompEntityTasksTargetBadge :target="adVehicle._ad_target" />
  </td>
  <td>
    <CompUiPrice currency="EUR" :decimal-places="2" :price="adVehicle.price" />
  </td>
  <td>
    <p>{{ adVehicle.brand }} / {{ adVehicle.model }}</p>
  </td>
  <td>
    <CompEntityAdVehicleEngineBadge :ad-vehicle="adVehicle" />
  </td>
  <td>
    <p>{{ adVehicle.year }} / {{ adVehicle.mileage }}</p>
  </td>
  <td>
    <CompEntityAdStatusPicker
      :is-loading="isChangingStatus"
      :status="adVehicle._ad_status"
      @status-change="status => changeStatus(adVehicle._id, status)" />
  </td>
  <td>
    <div class="--group">
      <CompUiIconButton :href="adVehicle.url" :icon="ExternalLink" :is-active="false" />
      <!-- <CompUiIconButton :icon="Eye" :is-active="false" @click="showAdHousingPanel" /> -->
    </div>
  </td>
</template>

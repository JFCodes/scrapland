<script setup lang="ts">
import type { T_Ad_Housing } from '@scrapland/data-model'
// App
import type { PanelAdHousingProps } from '@/components/panels/types'
import { usePanelStore } from '@/stores/panel'
// Components
import CompEntityAdHousingBuildingTypesBadges from '@/components/entity/ad/housing/ad-building-types-badges.vue'
import CompEntityTasksTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompEntityAdStatusBadge from '@/components/entity/ad/ad-status-badge.vue'
import CompPanelAdHousing from '@/components/panels/entities/ad/ad-housing.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { ExternalLink, Euro, Eye } from '@lucide/vue'

const props = defineProps<{
  index: number,
  housingAd: T_Ad_Housing
}>()

const panelStore = usePanelStore()

const showAdHousingPanel = () => {
  panelStore.show<PanelAdHousingProps>(CompPanelAdHousing, {
    housingAd: props.housingAd
  })
}
</script>

<template>
  <td>{{ index + 1 }}</td>
  <td>
    <CompEntityTasksTargetBadge :target="housingAd._ad_target" />
  </td>
  <td>{{ housingAd._ad_targetId }}</td>
  <td>
    <div class="--group">
      <p class="--font-bold --text-md">{{ housingAd.price.toLocaleString() }}</p>
      <Euro :size="16" />
    </div>
  </td>
  <td>
    <CompEntityAdHousingBuildingTypesBadges :ad-building-types="housingAd._ad_housing_buildingTypes" />
  </td>
  <td>
    <CompEntityAdStatusBadge :ad-status="housingAd._ad_status" />
  </td>
  <td>
    <div class="--group">
      <CompUiIconButton :href="housingAd.url" :icon="ExternalLink" :is-active="false" />
      <CompUiIconButton :icon="Eye" :is-active="false" @click="showAdHousingPanel" />
    </div>
  </td>
</template>

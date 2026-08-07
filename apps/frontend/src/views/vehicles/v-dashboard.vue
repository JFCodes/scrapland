<script setup lang="ts">
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
// Components
import CompPagesVehicleDashboardSectionMostRecent from '@/components/pages/vehicle/dashboard/section-most-recent.vue'
import CompPagesAdsDashboardSectionByStatus from '@/components/pages/ad-dashboard/section-by-status.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
</script>

<template>
  <CompLayoutCenterContainer>
    <CompPagesAdsDashboardSectionByStatus
      class="--mb-xl"
      :ad-entity-type="E_AD_ENTITY_TYPE.VEHICLE" />

    <CompPagesVehicleDashboardSectionMostRecent />
  </CompLayoutCenterContainer>
</template>

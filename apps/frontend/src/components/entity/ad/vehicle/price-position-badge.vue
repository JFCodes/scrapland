<script setup lang="ts">
import type { T_Ad_Vehicle_PricePosition } from '@scrapland/data-model'
// App
import {
  AD_VEHICLE_PRICE_POSITION_BADGE_TYPE,
  AD_VEHICLE_PRICE_POSITION_ICON
} from '@/components/constants'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ position: T_Ad_Vehicle_PricePosition }>()

</script>

<template>
  <CompUiTypeBadge :type="AD_VEHICLE_PRICE_POSITION_BADGE_TYPE[position]">
    <component :is="AD_VEHICLE_PRICE_POSITION_ICON[position]" :size="14" />
    {{ $t(`enums.adVehiclePricePosition.${position}`) }}
  </CompUiTypeBadge>
</template>
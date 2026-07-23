<script setup lang="ts">
import type { T_Ad_Housing_BuildingType } from '@scrapland/data-model'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'


defineProps<{ adBuildingTypes: Array<T_Ad_Housing_BuildingType> }>()
</script>

<template>
  <CompUiTypeBadge
    v-for="buildingType in adBuildingTypes"
    :key="buildingType" type="light">
    {{ $t(`enums.adHousingBuildingTypes.${buildingType}`) }}
  </CompUiTypeBadge>
</template>
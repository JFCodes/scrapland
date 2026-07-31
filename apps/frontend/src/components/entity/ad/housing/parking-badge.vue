<script setup lang="ts">
import type { T_Ad_Housing } from '@scrapland/data-model'
import { useAppI18n } from '@/composables/use-i18n'
import { computed } from 'vue'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import { SquareParkingOff, SquareParking, Car } from '@lucide/vue'

const props = defineProps<{ adHousing: T_Ad_Housing }>()

const { t } = useAppI18n()

const hasParking = computed(() => {
  if (props.adHousing.typologyHasParking) return true
  if (props.adHousing.typologyHasGarage) return true
}) 
</script>

<template>
  <CompUiTypeBadge v-if="hasParking" type="success">
    <p>{{ adHousing.typologyParkingSpots }}</p>
    <Car v-if="adHousing.typologyHasGarage" :size="18" />
    <SquareParking v-else-if="adHousing.typologyHasParking" :size="18" />
  </CompUiTypeBadge>

  <CompUiTypeBadge v-else type="warning">
    <SquareParkingOff :size="18" />
    {{ t('global.noParking') }}
  </CompUiTypeBadge>
</template>

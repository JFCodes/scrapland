<script setup lang="ts">
import type { T_Ad_Vehicle } from '@scrapland/data-model'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import { CircleGauge, ChessKnight } from '@lucide/vue'

defineProps<{ adVehicle: T_Ad_Vehicle }>()
</script>
<template>
  <CompUiTypeBadge type="secondary">
    <p>{{ adVehicle.engineSize }}</p>
    <CircleGauge :size="18" />
    <p>{{ adVehicle.enginePower }}</p>
    <ChessKnight :size="18" />
  </CompUiTypeBadge>
</template>

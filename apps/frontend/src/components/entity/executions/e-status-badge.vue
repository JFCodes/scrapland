<script setup lang="ts">
import type { E_EXECUTION_STATUS } from '@scrapland/data-model'
// App
import { EXECUTION_STATUS_BADGE_TYPE, EXECUTION_STATUS_ICONS } from '@/components/constants'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ status: E_EXECUTION_STATUS }>()
</script>

<template>
  <CompUiTypeBadge :type="EXECUTION_STATUS_BADGE_TYPE[status]">
    <component :is="EXECUTION_STATUS_ICONS[status]" :size="14" />
    {{ $t(`enums.executionStatus.${status}`) }}
  </CompUiTypeBadge>
</template>

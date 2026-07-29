<script setup lang="ts">
import { E_TASK_STATUS } from '@scrapland/data-model'
// App
import { TASK_STATUS_BADGE_TYPE, TASK_STATUS_BADGE_ICON } from '@/components/constants'
// Component
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ taskStatus: E_TASK_STATUS }>()
</script>

<template>
  <CompUiTypeBadge :type="TASK_STATUS_BADGE_TYPE[taskStatus]">
    <component :is="TASK_STATUS_BADGE_ICON[taskStatus]" :size="14" />
    {{ $t(`enums.taskStatus.${taskStatus}`) }}

    <slot name="after-icon"></slot>
  </CompUiTypeBadge>
</template>

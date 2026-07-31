<script setup lang="ts">
import type { E_TASK_TYPE } from '@scrapland/data-model'
// App
import { TASK_TYPE_ICONS } from '@/components/constants'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ taskType: E_TASK_TYPE }>()
</script>

<template>
  <CompUiTypeBadge type="light">
    <component :is="TASK_TYPE_ICONS[taskType]" :size="14" />
    {{ $t(`enums.taskType.${taskType}`) }}
  </CompUiTypeBadge>
</template>
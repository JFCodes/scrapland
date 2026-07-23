<script setup lang="ts">
import type { E_TARGET } from '@scrapland/data-model'
import { F_Entity_Task_PrintTarget } from '@scrapland/functions'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ target: E_TARGET }>()
</script>

<template>
  <CompUiTypeBadge filled type="info">
    {{ F_Entity_Task_PrintTarget(target) }}
  </CompUiTypeBadge>
</template>

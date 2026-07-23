<script setup lang="ts">
import type { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
// App
import { AD_ENTITY_ICON } from '@/components/constants'
// Component
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ adEntity: E_AD_ENTITY_TYPE }>()

</script>

<template>
  <CompUiTypeBadge type="warning">
    <component :is="AD_ENTITY_ICON[adEntity]" :size="14" />
    {{ $t(`enums.adEntityType.${adEntity}`) }}
  </CompUiTypeBadge>
</template>
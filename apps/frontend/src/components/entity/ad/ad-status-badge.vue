<script setup lang="ts">
import type { E_AD_STATUS } from '@scrapland/data-model'
// App
import { AD_STATUS_BADGE_TYPE, AD_STATUS_BADGE_ICON } from '@/components/constants'
// Component
import CompUiLoadingHint from '@/components/ui/ui-loading-hint.vue'
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

withDefaults(
  defineProps<{
    adStatus: E_AD_STATUS,
    isLoading?: boolean
    filled?: boolean
  }>(),
  { filled: true }
)
</script>

<template>
  <CompUiTypeBadge
    :type="AD_STATUS_BADGE_TYPE[adStatus]"
    :filled="filled">

    <slot name="before-icon">
      <CompUiLoadingHint v-if="isLoading" />
    </slot>

    <component :is="AD_STATUS_BADGE_ICON[adStatus]" :size="14" />
    {{ $t(`enums.adStatus.${adStatus}`) }}

    <slot name="after-icon"></slot>
  </CompUiTypeBadge>
</template>

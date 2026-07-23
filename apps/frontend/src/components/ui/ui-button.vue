<script setup lang="ts">
// App
import type { UiButtonType } from '@/components/types'
// Components
import CompUiLoadingHint from '@/components/ui/ui-loading-hint.vue'

withDefaults(
  defineProps<{
    label: string
    // Optional
    type?: UiButtonType
    isLoading?: boolean
    disabled?: boolean
    filled?: boolean
  }>(),
  { type: 'link' }
)

</script>

<template>
  <button
    class="--base-button --text-sm --px-sm"
    :class="[
      { '--base-button--filled': filled },
      `--base-button--${type}`,
    ]"
    :disabled="disabled || isLoading">
    <CompUiLoadingHint v-if="isLoading" />
    <span>{{ label }}</span>
  </button>
</template>

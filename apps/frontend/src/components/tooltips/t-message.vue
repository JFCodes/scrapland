<script setup lang="ts">
import type { TooltipMessageProps } from '@/components/tooltips/types'

defineProps<TooltipMessageProps>()
</script>

<template>
  <div class="tooltip --text-xs">
    <p v-for="(message, index) in messages" :key="index">
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  padding: var(--s-2xs) var(--s-sm);
}
</style>

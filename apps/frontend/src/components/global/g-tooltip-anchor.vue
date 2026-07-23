<script setup lang="ts">
import { computed } from 'vue'
// App
import { GetTooltipStyle } from '@/stores/tooltip/get-tooltip-style'
import { useTooltipStore } from '@/stores/tooltip'

const tooltipStore = useTooltipStore()

const style = computed<string>(() => {
  if (!tooltipStore.activeTooltip) return ''

  const { element, tooltip } = tooltipStore.activeTooltip

  return GetTooltipStyle(element, tooltip.position)
})
</script>

<template>
  <div v-if="tooltipStore.activeTooltip" class="tooltip-anchor" :style="style">
    <component
      :is="tooltipStore.activeTooltip.tooltip.component"
      v-bind="(tooltipStore.activeTooltip.tooltip.props as object)" />
  </div>
</template>

<style lang="scss" scoped>
.tooltip-anchor {
  box-shadow: 0 0 4px rgba(229, 231, 235, 0.04);
  border: solid 1px var(--c-tooltip-border-color);
  background-color: var(--c-tooltip-background);
  border-radius: var(--radius-sm);
  color: var(--c-tooltip-color);
  z-index: var(--z-tooltips);
  overflow: hidden;
  position: fixed;
}
</style>

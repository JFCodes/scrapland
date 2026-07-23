<script setup lang="ts">
// Components
import CompUiLoading from '@/components/ui/ui-loading.vue'

const slots = defineSlots<{
  default(): void
  tabs(): void
  nav(): void
}>()

defineProps<{ isLoading?: boolean }>()

</script>

<template>
  <div class="nav-menu-and-tabs">
    <CompUiLoading v-if="isLoading" />

    <div :class="{ 'nav-menu-and-tabs__nav': !!slots['nav'] }">
      <slot name="nav"></slot>
    </div>

    <div :class="{ 'nav-menu-and-tabs__tabs': !!slots['tabs'] }">
      <slot name="tabs"></slot>
    </div>

    <div class="nav-menu-and-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu-and-tabs {
  grid-template-rows: auto auto 1fr;
  max-height: 100%;
  display: grid;
  height: 100%;
  width: 100%;

  &__nav {
    background-color: var(--c-background-surface);
    border-bottom: solid 1px var(--c-border);
    overflow: hidden;
  }

  &__tabs {
    background-color: var(--c-background-surface);
    border-bottom: solid 1px var(--c-border);
    overflow: hidden;
  }

  &__content {
    max-height: 100%;
    overflow-y: auto;
  }
}
</style>
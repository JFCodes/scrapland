<script setup lang="ts">
// App
import type { UiPageTab, UiPageTabRoute } from '@/components/types'
// Components
import CompUiPageTags from '@/components/ui/ui-page-tabs.vue'

defineProps<{ tabs: Array<UiPageTab | UiPageTabRoute> }>()
</script>

<template>
  <div class="top-tabs">
    <div class="top-tabs__top">
      <div class="--container-page">
        <CompUiPageTags :tabs="tabs" />
      </div>
    </div>

    <div class="top-tabs__content --container-page">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-tabs {
  grid-template-rows: auto 1fr;
  gap: var(--s-md);
  max-height: 100%;
  display: grid;
  height: 100%;
  width: 100%;

  &__top {
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
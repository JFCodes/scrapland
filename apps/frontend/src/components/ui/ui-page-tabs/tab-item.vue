<script setup lang="ts">
// App
import type { UiPageTab, UiPageTabRoute } from '@/components/types'
// Components
import { RouterLink } from 'vue-router'

defineProps<{
  tab: UiPageTab | UiPageTabRoute
  isActive: boolean
}>()

</script>

<template>
  <component
    class="tab-item"
    :class="{ 'tab-item--active': isActive }"
    :to="'to' in tab ? tab.to : undefined"
    :is="'to' in tab ? RouterLink : 'div'"
    :key="tab.key">

    <div class="tab-item__icon">
      <component v-if="tab.icon" :is="tab.icon" :size="18" />
    </div>

    <p class="--font-bold">{{ tab.label }}</p>

    <div v-if="tab.badge" class="tab-item__badge --text-xs --font-bold">
      {{ tab.badge }}
    </div>

  </component>
</template>

<style lang="scss" scoped>
.tab-item {
  border-bottom: solid 4px transparent;
  padding: 0 var(--s-sm);
  align-items: center;
  white-space: nowrap;
  margin-bottom: -1px;
  gap: var(--s-xs);
  display: flex;
  height: 55px;

  &__icon {
    min-width: 18px;
  }

  &__badge {
    background-color: var(--c-border-active);
    padding: 0 var(--s-2xs);
    color: var(--c-white);
    border-radius: 11px;
    text-align: center;
    line-height: 20px;
    min-width: 20px;
    height: 20px;
  }

  &--active {
    border-bottom-color: var(--c-border-active);
  }
}
</style>
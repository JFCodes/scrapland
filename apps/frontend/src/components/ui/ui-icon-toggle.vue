<script setup lang="ts" generic="K extends string">
import type { UiIconToggleItem } from '@/components/types'

defineProps<{ items: Array<UiIconToggleItem<K>> }>()

const active = defineModel<K>()
</script>

<template>
  <div v-if="items.length > 1" class="icon-toggle">
    <div
      v-for="(item, index) in items"
      class="icon-toggle__item --pointer"
      :class="{ 'icon-toggle__item--active': item.isActive }"
      :key="`icon-${index}`"
      @click="active = item.key">

      <component :is="item.icon" :size="20" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-toggle {
  height: 38px;

  &__item {
    display: inline-block;
    padding: var(--s-xs);
    border: solid 1px var(--c-gray-500);

    &--active {
      background-color: color-mix(in oklab, var(--c-blue-1), transparent 90%);
      border-color: var(--c-blue-1);
      color: var(--c-blue-1);
    }

    &:first-child {
      border-bottom-left-radius: var(--radius-md);
      border-top-left-radius: var(--radius-md);
    }

    &:last-child {
      border-bottom-right-radius: var(--radius-md);
      border-top-right-radius: var(--radius-md);
    }
  }
}
</style>
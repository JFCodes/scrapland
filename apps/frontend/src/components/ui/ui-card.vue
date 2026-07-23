<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
// Component
import CompUiLoading from '@/components/ui/ui-loading.vue'

const slots = defineSlots<{
  default(): void
  header(): void
  footer(): void
}>()

defineProps<{
  showHighlighOnHover?: boolean
  linkTo?: RouteLocationRaw
  noPadding?: boolean
  highlight?: boolean
  isLoading?: boolean
}>()
</script>

<template>
  <component
    v-bind="linkTo ? { to: linkTo } : {}"
    class="card"
    :is="linkTo ? RouterLink : 'div'"
    :class="{
      'card--hover-highlight --pointer': showHighlighOnHover,
      'card--highlight': highlight
    }">
    <CompUiLoading v-if="isLoading" />

    <div v-if="slots['header']" class="card__header">
      <slot name="header"></slot>
    </div>

    <div class="card__content" :class="{ 'card__content--no-padding': noPadding }">
      <slot></slot>
    </div>

    <div v-if="slots['footer']" class="card__footer">
      <slot name="footer"></slot>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0 4px rgba(229, 231, 235, 0.04);
  border: solid 1px var(--c-card-border-color);
  background-color: var(--c-card-background);
  border-radius: var(--radius-md);
  flex-direction: column;
  position: relative;
  overflow: hidden;
  display: flex;

  &__header {
    padding: var(--s-sm) var(--s-md);
    border-bottom: solid 1px var(--c-card-border-color);
  }

  &__content {
    padding: var(--s-sm) var(--s-md);
    //   flex: 1;

    //   &--no-padding {
    //     padding: 0;
    //   }
  }

  &__footer {
    border-top: solid 1px var(--c-card-border-color);
    padding: var(--s-sm) var(--s-md);
  }

  &--highlight {
    border-color: var(--c-card-active-border-color);
  }

  &--hover-highlight:hover {
    border-color: var(--c-card-active-border-color);
  }
}
</style>

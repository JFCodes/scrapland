<script setup lang="ts">
// App
import type { UiSelectOption } from '../types'
// Components
import { X } from '@lucide/vue'

defineProps<{
  option: UiSelectOption
  isActive: boolean
  clearable?: boolean
}>()
</script>

<template>
  <div
    class="select-option --px-sm --pointer"
    :class="{ 'select-option--active': isActive }">
    <p>{{ option.label }}</p>
    <X v-if="isActive && clearable" class="select-option__delete" :size="22" />
  </div>
</template>
<style lang="scss" scoped>
.select-option {
  padding: 0 var(--s-sm);
  position: relative;
  line-height: 38px;

  &__delete {
    transform: translateY(-50%);
    right: var(--s-xs);
    position: absolute;
    top: 50%;
  }

  &--active {
    background-color: var(--c-gray-700);
  }

  &:hover {
    background-color: var(--c-gray-600);
  }
}
</style>
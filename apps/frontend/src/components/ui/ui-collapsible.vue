<script setup lang="ts">
import { ref } from 'vue'
// Components
import { ChevronDown, ChevronUp } from '@lucide/vue'

const props = defineProps<{ startOpen?: boolean }>()

const isOpen = ref(props.startOpen ?? false)
</script>

<template>
  <div class="collapsible">
    <div class="collapsible__header --text-white --pointer" @click="isOpen = !isOpen">
      <div class="collapsible__header-toggle">
        <ChevronUp v-if="isOpen" />
        <ChevronDown v-else />
      </div>

      <slot name="header"></slot>
    </div>

    <div v-if="isOpen" class="collapsible__content">
      <slot name="collapsible"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.collapsible {
  border: solid 1px var(--c-border);
  border-radius: var(--radius-sm);

  &__header {
    padding: var(--s-xs) var(--s-md);
    position: relative;

    &-toggle {
      transform: translateY(-50%);
      padding: var(--s-2xs);
      position: absolute;
      right: var(--s-2xs);
      top: 50%;
    }
  }

  &__content {
    padding: 0 var(--s-md) var(--s-xs);
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
// App
import { useOnScrollEnd } from '@/composables/on-scroll-end'

const emits = defineEmits<{ 'on-content-scroll-end': [] }>()
defineProps<{ maxWidth?: number }>()

const contentRef = ref<null | HTMLElement>(null)
useOnScrollEnd(contentRef, () => emits('on-content-scroll-end'))
</script>

<template>
  <div class="vertical-scroll" :style="maxWidth ? `max-width:${maxWidth}px;` : ''">
    <div class="vertical-scroll__top">
      <slot name="top"></slot>
    </div>

    <div ref="contentRef" class="vertical-scroll__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vertical-scroll {
  padding: 0 var(--s-sm);
  flex-direction: column;
  gap: var(--s-md);
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  height: 100%;

  &__top {
    flex-shrink: 0;
  }

  &__content {
    overflow-y: auto;
    flex: 1;
  }
}
</style>

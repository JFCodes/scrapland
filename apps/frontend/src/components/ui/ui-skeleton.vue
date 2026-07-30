<script setup lang="ts">
defineProps<{ rounded?: string, h: number, w?: number }>()
</script>

<template>
  <div
    class="skeleton"
    :style="{
      ...(rounded && { 'border-radius': `var(${rounded})` }),
      ...(h && { height: `${h}px` }),
      width: w ? `${w}px` : '100%',
    }"></div>
</template>

<style lang="scss" scoped>
.skeleton {
  background-color: var(--c-background-surface);
  position: relative;
  overflow: hidden;
  border: solid 1px var(--c-gray-700);

  &::after {
    content: "";
    position: absolute;
    inset: 0;

    transform: translateX(-100%);

    background-image: linear-gradient(90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.15) 50%,
        transparent 100%);

    animation: skeleton-shimmer 1.5s infinite;
  }
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
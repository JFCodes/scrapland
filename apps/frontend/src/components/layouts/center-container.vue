<script setup lang="ts">
defineProps < { width?: number } > ()
</script>
<template>
  <div
    class="center-container --container-page"
    :style="{ ...(width && { width: `${width}px` }) }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.center-container {
  padding-top: var(--s-md);
  overflow-y: auto;
  height: 100%;
}
</style>

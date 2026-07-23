<script setup lang="ts">
// Components
import CompGlobalPageHeader from '@/components/global/g-page-header.vue'
</script>

<template>
  <div class="page">
    <div class="page__grid">
      <CompGlobalPageHeader />

      <div class="page__grid-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  overflow: hidden;
  height: 100%;
  width: 100%;

  &__grid {
    grid-template-rows: auto 1fr;
    overflow: hidden;
    display: grid;
    height: 100%;
    width: 100%;

    &-content {
      position: relative;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
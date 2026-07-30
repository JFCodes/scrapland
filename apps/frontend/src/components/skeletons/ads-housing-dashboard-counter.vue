<script setup lang="ts">
// Components
import CompUiSkeleton from '@/components/ui/ui-skeleton.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
</script>

<template>
  <CompUiCard class="skeleton-layout">
    <div class="--group">
      <CompUiSkeleton rounded="--radius-md" :w="42" :h="42" />
      <div>
        <CompUiSkeleton class="--mb-2xs" rounded="--radius-sm" :w="38" :h="20" />
        <CompUiSkeleton rounded="--radius-sm" :w="110" :h="20" />
      </div>
    </div>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.skeleton-layout {
  width: 280px;
}
</style>
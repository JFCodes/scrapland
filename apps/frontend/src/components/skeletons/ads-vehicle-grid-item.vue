<script setup lang="ts">
// Components
import CompUiSkeleton from '@/components/ui/ui-skeleton.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
</script>

<template>
  <CompUiCard class="skeleton-layout">
    <template #header>
      <div class="--group --group--spread --mb-xs">
        <CompUiSkeleton rounded="--radius-sm" :h="30" :w="185" />

        <CompUiSkeleton rounded="--radius-sm" :h="32" :w="200" />
      </div>
      <div class="--group --group--spread">
        <div>
          <CompUiSkeleton rounded="--radius-sm" :h="22" :w="220" />
          <CompUiSkeleton rounded="--radius-sm" :h="22" :w="120" />
        </div>
        <div class="--group">
          <CompUiSkeleton rounded="--radius-sm" :h="36" :w="36" />
        </div>
      </div>
    </template>

    <template #default>
      <div class="--group --group--top">
        <CompUiSkeleton rounded="--radius-md" :h="170" :w="190" />
        <div>
          <div class="--group --mb-2xs">
            <div class="skeleton-layout__title">
              <CompUiSkeleton rounded="--radius-md" :h="30" :w="65" />
            </div>
            <CompUiSkeleton rounded="--radius-md" :h="28" :w="55" />
            <CompUiSkeleton rounded="--radius-md" :h="28" :w="125" />
          </div>

          <div class="--group --mb-2xs">
            <div class="skeleton-layout__title">
              <CompUiSkeleton rounded="--radius-md" :h="30" :w="65" />
            </div>
            <CompUiSkeleton rounded="--radius-md" :h="28" :w="125" />
          </div>

          <div class="--group --mb-2xs">
            <div class="skeleton-layout__title">
              <CompUiSkeleton rounded="--radius-md" :h="30" :w="65" />
            </div>
            <CompUiSkeleton rounded="--radius-md" :h="28" :w="95" />
          </div>

          <div class="--group --mb-2xs">
            <div class="skeleton-layout__title">
              <CompUiSkeleton rounded="--radius-md" :h="30" :w="65" />
            </div>
            <CompUiSkeleton rounded="--radius-md" :h="28" :w="95" />
            <CompUiSkeleton rounded="--radius-md" :h="28" :w="95" />
          </div>

          <div class="--group --mb-2xs">
            <div class="skeleton-layout__title">
              <CompUiSkeleton rounded="--radius-md" :h="30" :w="65" />
            </div>
            <CompUiSkeleton rounded="--radius-md" :h="28" :w="140" />
          </div>
        </div>
      </div>
    </template>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.skeleton-layout {
  width: 280px;

  &__title {
    width: 80px;
  }
}
</style>
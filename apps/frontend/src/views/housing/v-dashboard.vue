<script setup lang="ts">
// Components
import CompPagesHousingDashboardSectionMostRecent from '@/components/pages//housing/dashboard/section-most-recent.vue'
import CompPagesHousingDashboardSectionByStatus from '@/components/pages//housing/dashboard/section-by-status.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
</script>

<template>
  <CompLayoutCenterContainer>
    <CompPagesHousingDashboardSectionByStatus class="--mb-xl" />
    <CompPagesHousingDashboardSectionMostRecent />
  </CompLayoutCenterContainer>
</template>

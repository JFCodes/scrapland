<script setup lang="ts">
import { onMounted, computed } from 'vue'
// App
import { useAppI18n } from '@/composables/use-i18n'
import { useAdsStore } from '@/stores/ads'
// Components
import CompEntityAdHousingGridItem from '@/components/entity/ad/vehicle/grid-item.vue'
import CompSkeleton from '@/components/skeletons/ads-vehicle-grid-item.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'

const MOST_RECENT_COUNT = 10

const { t } = useAppI18n()
const adsStore = useAdsStore()

const mostRecent = computed(() => adsStore.adsVehicle.slice(0, MOST_RECENT_COUNT))

onMounted(adsStore.loadAdsVehicle)
</script>

<template>
  <div>
    <CompUiTitleMain class="--mb-md" :title="t('sentences.mostRecent', { count: MOST_RECENT_COUNT })" />

    <section class="section">
      <template v-if="adsStore.isLoadingAdsVehicle">
        <CompSkeleton
          v-for="i in MOST_RECENT_COUNT"
          class="section__ad"
          :key="i" />
      </template>

      <CompEntityAdHousingGridItem
        v-for="ad in mostRecent"
        class="section__ad"
        :key="ad._id"
        :ad-vehicle="ad" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.section {
  gap: var(--s-sm);
  flex-wrap: nowrap;
  overflow-x: auto;
  display: flex;

  &__ad {
    min-width: 550px;
    width: 550px;
  }
}
</style>
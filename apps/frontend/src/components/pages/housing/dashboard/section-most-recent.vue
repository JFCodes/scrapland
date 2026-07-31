<script setup lang="ts">
import type { T_Ad_Housing } from '@scrapland/data-model'
import { onMounted, ref } from 'vue'
// App
import { API } from '@/api'
// Components
import CompEntityAdHousingGridItem from '@/components/entity/ad/housing/grid-item.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'
import CompSkeleton from '@/components/skeletons/ads-housing-grid-item.vue'

const MOST_RECENT_COUNT = 10

const isLoading = ref(false)
const ads = ref<Array<T_Ad_Housing>>([])

const pullData = async (): Promise<void> => {
  isLoading.value = true
  await API.ads.housing
    .all({ size: MOST_RECENT_COUNT, page: 1 })
    .then(result => ads.value = result.data)
    .finally(() => isLoading.value = false)
}

onMounted(pullData)
</script>

<template>
  <div>
    <CompUiTitleMain class="--mb-md" :title="$t('sentences.mostRecent', { count: MOST_RECENT_COUNT })" />

    <section class="section">
      <template v-if="isLoading">
        <CompSkeleton
          v-for="i in MOST_RECENT_COUNT"
          class="section__ad"
          :key="i" />
      </template>

      <CompEntityAdHousingGridItem
        v-for="ad in ads"
        class="section__ad"
        :key="ad._id"
        :ad-housing="ad" />
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
<script setup lang="ts">
import { E_AD_STATUS } from '@scrapland/data-model'
import { onMounted, ref } from 'vue'
// App
import { AD_STATUS_ORDERED, AD_STATUS_BADGE_ICON, AD_STATUS_BADGE_TYPE } from '@/components/constants'
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { E_ROUTER_PAGES, E_ROUTER_QUERIES } from '@/router/enums'
import { API } from '@/api'
// Components
import CompSkeleton from '@/components/skeletons/ads-housing-dashboard-counter.vue'
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

const { onApiError } = useApiErrorHandling()

const statusCounters = ref<null | Record<E_AD_STATUS, number>>(null)
const isLoading = ref(false)
const essentialStatus = AD_STATUS_ORDERED.filter(s => {
  if (s === E_AD_STATUS.DELETED) return false
  if (s === E_AD_STATUS.PROPOSAL_REJECTED) return false
  if (s === E_AD_STATUS.COMPLETED) return false
  return true
})

const loadData = async () => {
  isLoading.value = true
  await API.ads.housing
    .statusCounter()
    .then(result => statusCounters.value = result.counters)
    .catch(onApiError)
    .finally(() => isLoading.value = false)
}

onMounted(loadData)
</script>

<template>
  <div>
    <h3 class="--text-white --text-lg --font-bold --mb-md">
      {{ $t('pages.adsHousingDashboard.sectionByStatusTitle') }}
    </h3>
    <section class="section">
      <template v-if="isLoading">
        <CompSkeleton v-for="i in essentialStatus.length" :key="i" />
      </template>

      <template v-if="!isLoading && statusCounters">
        <RouterLink
          v-for="status in essentialStatus"
          :key="status"
          :to="{
            query: { [E_ROUTER_QUERIES.AD_STATUS]: status },
            name: E_ROUTER_PAGES.HOUSING_ADS_ALL,
          }">

          <CompUiCard class="section__card">

            <div class="section__card-content">
              <CompUiTypeBadge
                filled
                :height="42"
                :width="42"
                :type="AD_STATUS_BADGE_TYPE[status]">
                <component :is="AD_STATUS_BADGE_ICON[status]" :size="28" />
              </CompUiTypeBadge>

              <div>
                <p class="section__card-counter --text-xl --font-bold">{{ statusCounters[status] }}</p>
                <p>{{ $t(`enums.adStatus.${status}`) }}</p>
              </div>
            </div>

          </CompUiCard>
        </RouterLink>
      </template>
    </section>
  </div>
</template>

<style lang="scss">
.section {
  position: relative;
  min-height: 65px;
  gap: var(--s-md);
  display: flex;

  &__card {
    min-width: 280px;

    &-content {
      align-items: center;
      gap: var(--s-sm);
      display: flex;
    }

    &-counter {
      line-height: var(--s-lg);
    }
  }
}
</style>
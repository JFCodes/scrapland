<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
// App
import type { UiTableHeader, UiSelectOption } from '@/components/types'
import { useRouterUtils } from '@/composables/router-utils'
import { AD_STATUS_ORDERED } from '@/components/constants'
import { useAppI18n } from '@/composables/use-i18n'
import { E_ROUTER_QUERIES } from '@/router/enums'
import { useAdsStore } from '@/stores/ads'
// Components
import CompEntityAdHousingTableRow from '@/components/entity/ad/housing/table-row.vue'
import CompEntityAdHousingGridItem from '@/components/entity/ad/housing/grid-item.vue'
import CompEntityGridOrTable from '@/components/entity/grid-or-table.vue'
import CompLayoutIndexView from '@/components/layouts/index-view.vue'
import CompFormSelect from '@/components/forms/f-select.vue'
import { E_AD_STATUS } from '@scrapland/data-model'
import CompUiLoading from '@/components/ui/ui-loading.vue'

const { writableQueryArray } = useRouterUtils()
const { t } = useAppI18n()
const adsStore = useAdsStore()

let loadDebounceTime: null | ReturnType<typeof window.setTimeout> = null

const filterStatus = writableQueryArray(E_ROUTER_QUERIES.AD_STATUS)

const showing = computed(() => t('pages.adsHousingAll.showing', {
  loaded: adsStore.adsHousing.length,
  total: adsStore.totalAdsHousing,
}))

const filterStatusOptions: Array<UiSelectOption<E_AD_STATUS>> = AD_STATUS_ORDERED.map(status => ({
  label: t(`enums.adStatus.${status}`),
  value: status,
  key: status
}))

const tableHeaders: Array<UiTableHeader> = [
  { label: '#' },
  { label: '' },
  { label: t('global.target') },
  { label: t('global.operation') },
  { label: t('global.targetId') },
  { label: t('global.askingPrice') },
  { label: t('global.buildingTypes') },
  { label: t('global.status') },
  { label: '' },
]

const searchAds = () => adsStore.loadAdsHousing({ adStatus: filterStatus.value })
const searchAdsDebounced = () => {
  if (loadDebounceTime) window.clearTimeout(loadDebounceTime)

  loadDebounceTime = window.setTimeout(() => {
    adsStore.loadAdsHousing({ adStatus: filterStatus.value })
    loadDebounceTime = null
  }, 250)
}

watch(filterStatus, searchAdsDebounced)
onMounted(searchAds)
</script>

<template>
  <CompUiLoading v-if="adsStore.isLoadingAdsHousing" />

  <CompLayoutIndexView
    :title="t('pages.adsHousingAll.indexTitle')"
    :sub-title="showing"
    @on-content-scroll-end="() => adsStore.loadMoreAdsHousing()">

    <template #quick-filters>
      <div class="status-filter">
        <CompFormSelect
          close-on-click-outside
          v-model="filterStatus"
          multi
          label=""
          :options="filterStatusOptions" />
      </div>
    </template>

    <template #default="{ listView }">
      <CompEntityGridOrTable
        :items="adsStore.adsHousing"
        :grid-item-width="550"
        :list-view="listView"
        :table="{
          headers: tableHeaders
        }">

        <!-- Table row template -->
        <template #table-row="{ index, item }">
          <CompEntityAdHousingTableRow :index="index" :ad-housing="item" />
        </template>

        <!-- Grid item template -->
        <template #grid-item="{ item }">
          <CompEntityAdHousingGridItem :ad-housing="item" />
        </template>

      </CompEntityGridOrTable>
    </template>

  </CompLayoutIndexView>
</template>

<style lang="scss" scoped>
.status-filter {
  width: 420px;
}
</style>
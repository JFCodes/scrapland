<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { markRaw } from 'vue'
// App
import type { UiPageTabRoute } from '@/components/types'
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import CompLayoutTopTabs from '@/components/layouts/top-tabs.vue'
import { MousePointerClick, List } from '@lucide/vue'

const { t } = useI18n()

const tabs: Array<UiPageTabRoute> = [
  {
    to: { name: E_ROUTER_PAGES.HOUSING_ADS_ALL },
    key: E_ROUTER_PAGES.HOUSING_ADS_ALL,
    label: t('global.all'),
    icon: markRaw(List),
  },
  {
    to: { name: E_ROUTER_PAGES.HOUSING_ADS_CLASSIFY },
    key: E_ROUTER_PAGES.HOUSING_ADS_CLASSIFY,
    icon: markRaw(MousePointerClick),
    label: t('global.classify'),
  },
]

</script>

<template>
  <CompLayoutTopTabs :tabs="tabs">
    <RouterView />
  </CompLayoutTopTabs>
</template>

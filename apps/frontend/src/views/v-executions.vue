<script setup lang="ts">
import { E_ENTITY_TYPE } from '@scrapland/data-model'
import { onMounted, computed, type Component } from 'vue'
// App
import { useExecutionsStore } from '@/stores/executions'
import type { UiNavBarLink } from '@/components/types'
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import CompLayoutNavMenuAndTabs from '@/components/layouts/nav-menu-and-tabs.vue'
import CompUiNavBar from '@/components/ui/ui-nav-bar.vue'
import {
  LaptopMinimalCheck,
  TvMinimalPlay,
  OctagonMinus,
  ListOrdered,
  FileClock,
  RefreshCw,
  CircleX,
} from '@lucide/vue'

const executionsStore = useExecutionsStore()

const linksData: Array<{ name: E_ROUTER_PAGES, icon: Component, separator?: boolean }> = [
  { name: E_ROUTER_PAGES.EXECUTIONS_HISTORY, icon: FileClock, separator: true },
  { name: E_ROUTER_PAGES.EXECUTIONS_ALL, icon: TvMinimalPlay },
  { name: E_ROUTER_PAGES.EXECUTIONS_QUEUE, icon: ListOrdered },
  { name: E_ROUTER_PAGES.EXECUTIONS_RUNNING, icon: RefreshCw },
  { name: E_ROUTER_PAGES.EXECUTIONS_ABORTED, icon: OctagonMinus },
  { name: E_ROUTER_PAGES.EXECUTIONS_FAILED, icon: CircleX },
  { name: E_ROUTER_PAGES.EXECUTIONS_COMPLETED, icon: LaptopMinimalCheck },
]

const links = computed<Array<UiNavBarLink>>(() => {
  return linksData.map(data => ({
    separatorLeft: data.separator,
    linkTo: { name: data.name },
    name: data.name,
    icon: data.icon,
  }))
})

onMounted(executionsStore.load)
</script>

<template>
  <CompLayoutNavMenuAndTabs :is-loading="executionsStore.isLoading">
    <template #nav>
      <CompUiNavBar
        :title="$t(`enums.entityTypes.${E_ENTITY_TYPE.EXECUTION}`)"
        :links="links" />
    </template>

    <RouterView />
  </CompLayoutNavMenuAndTabs>
</template>

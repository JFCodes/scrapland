<script setup lang="ts">
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
// App
import type { UiNavBarLink } from '@/components/types'
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import CompLayoutNavMenuAndTabs from '@/components/layouts/nav-menu-and-tabs.vue'
import CompUiNavBar from '@/components/ui/ui-nav-bar.vue'
import { LayoutDashboard, IdCard, Cctv } from '@lucide/vue'

const links: Array<UiNavBarLink> = [
  {
    linkTo: { name: E_ROUTER_PAGES.VEHICLES_DASHBOARD },
    name: E_ROUTER_PAGES.VEHICLES_DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    linkTo: { name: E_ROUTER_PAGES.VEHICLES_ADS },
    name: E_ROUTER_PAGES.VEHICLES_ADS,
    icon: IdCard
  },
  {
    linkTo: { name: E_ROUTER_PAGES.VEHICLES_TASKS },
    name: E_ROUTER_PAGES.VEHICLES_TASKS,
    icon: Cctv,
  },
]
</script>

<template>
  <CompLayoutNavMenuAndTabs>
    <template #nav>
      <CompUiNavBar
        :title="$t(`enums.adEntityType.${E_AD_ENTITY_TYPE.VEHICLE}`)"
        :links="links" />
    </template>

    <RouterView />
  </CompLayoutNavMenuAndTabs>
</template>

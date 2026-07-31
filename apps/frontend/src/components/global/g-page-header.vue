<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'
// App
import { AD_ENTITY_ICON } from '@/components/constants'
import { useRouterUtils } from '@/composables/router-utils'
import { useTooltips } from '@/composables/tooltips'
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { TvMinimalPlay, MonitorCog, BellDot, Home } from '@lucide/vue'
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'

type Link = {
  to: RouteLocationRaw,
  name: E_ROUTER_PAGES,
  icon: Component
}

// const discoveryTasksStore = useDiscoveryTasksStore()
const { routeIsActive } = useRouterUtils()
const { linkTooltip } = useTooltips()

const globalLinks: Array<Link> = [
  { name: E_ROUTER_PAGES.HOME, icon: Home, to: { name: E_ROUTER_PAGES.HOME } },
  { name: E_ROUTER_PAGES.EXECUTIONS, icon: TvMinimalPlay, to: { name: E_ROUTER_PAGES.EXECUTIONS } },
  { name: E_ROUTER_PAGES.NOTIFICATIONS, icon: MonitorCog, to: { name: E_ROUTER_PAGES.NOTIFICATIONS } },
  { name: E_ROUTER_PAGES.SETTINGS, icon: BellDot, to: { name: E_ROUTER_PAGES.SETTINGS } },
]

const adEntityTypeLinks: Array<Link> = [
  { name: E_ROUTER_PAGES.HOUSING, icon: AD_ENTITY_ICON[E_AD_ENTITY_TYPE.HOUSING], to: { name: E_ROUTER_PAGES.HOUSING } },
  { name: E_ROUTER_PAGES.VEHICLES, icon: AD_ENTITY_ICON[E_AD_ENTITY_TYPE.VEHICLE], to: { name: E_ROUTER_PAGES.VEHICLES } },
]

</script>

<template>
  <header class="header">
    <div class="header__content --container-page">

      <p class="header__content-title --text-md --font-bold --text-white">
        HOUSE HUNTER
      </p>

      <div class="header__content-middle --group">
        <CompUiIconButton
          v-for="link in adEntityTypeLinks"
          :type="routeIsActive(link.name) ? 'light' : 'link'"
          :link-to="link.to"
          :icon="link.icon"
          :key="link.name"
          @mouseenter="(event: MouseEvent) => linkTooltip(event, link.name)" />
        <!-- <DiscoverTaskActiveExecution
          v-if="discoveryTasksStore.activeTaskExecution"
          :execution="discoveryTasksStore.activeTaskExecution" /> -->

        <!-- <DiscoverTaskLastExecution
          v-else-if="discoveryTasksStore.lastTaskExecution"
          :execution="discoveryTasksStore.lastTaskExecution.execution"
          :result="discoveryTasksStore.lastTaskExecution.result" /> -->
      </div>

      <div class="--group">
        <CompUiIconButton
          v-for="link in globalLinks"
          :type="routeIsActive(link.name) ? 'light' : 'link'"
          :link-to="link.to"
          :icon="link.icon"
          :key="link.name"
          @mouseenter="(event: MouseEvent) => linkTooltip(event, link.name)" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--c-background-surface);
  border-bottom: solid 1px var(--c-border);

  &__content {
    align-items: center;
    gap: var(--s-sm);
    display: flex;

    &-title {
      width: var(--header-left-width);
    }

    &-middle {
      border-left: solid 1px var(--c-border);
      padding: var(--s-sm);
      height: 52px;
      flex: 1;
    }
  }
}
</style>

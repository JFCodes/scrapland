<script setup lang="ts">
import type { UiNavBarLink } from '@/components/types'
// App
import { useRouterUtils } from '@/composables/router-utils'
import { useTooltips } from '@/composables/tooltips'
// Components
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'

defineProps<{
  links: Array<UiNavBarLink>
  title: string
}>()

const { routeIsActive } = useRouterUtils()
const { linkTooltip } = useTooltips()
</script>

<template>
  <nav class="nav-bar --container-page">
    <p class="nav-bar__title --text-md --font-bold --text-white">{{ title }}</p>

    <div class="nav-bar__links --group">
      <CompUiIconButton
        v-for="link in links"
        :link-to="link.linkTo"
        :type="routeIsActive(link.name) ? 'light' : 'link'"
        :icon="link.icon"
        :key="link.name"
        @mouseenter="(event: MouseEvent) => linkTooltip(event, link.name)" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-bar {
  align-items: center;
  gap: var(--s-sm);
  display: flex;
  height: 50px;

  &__title {
    width: var(--header-left-width);
  }

  &__links {
    border-left: solid 1px var(--c-border);
    padding: var(--s-sm);
    height: 52px;
  }
}
</style>

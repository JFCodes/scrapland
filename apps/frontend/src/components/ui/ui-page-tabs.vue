<script setup lang="ts">
import { useRoute } from 'vue-router'
// App
import type { UiPageTab, UiPageTabRoute } from '@/components/types'
import { tabIsActive } from '@/components/ui/ui-page-tabs/tab-is-active'
// Components
import CompUiPageTabsItem from '@/components/ui/ui-page-tabs/tab-item.vue'

defineProps<{
  tabs: Array<UiPageTab | UiPageTabRoute>
  activeKey?: string
}>()

const route = useRoute()
</script>

<template>
  <div class="tabs">
    <CompUiPageTabsItem
      v-for="tab in tabs"
      :is-active="tabIsActive(route, tab, activeKey)"
      :key="tab.key"
      :tab="tab" />
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  border-bottom: solid 1px var(--c-border);
  justify-content: start;
  align-items: start;
  flex-wrap: nowrap;
  overflow-x: auto;
  display: flex;
}
</style>

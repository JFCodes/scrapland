<script setup lang="ts">
// App
import type { UiPageTabRoute } from '@/components/types'
// Components
import CompLayoutTopTabs from '@/components/layouts/top-tabs.vue'

const tabs: Array<UiPageTabRoute> = []
</script>

<template>
  <CompLayoutTopTabs :tabs="tabs">
    <RouterView />
  </CompLayoutTopTabs>
</template>

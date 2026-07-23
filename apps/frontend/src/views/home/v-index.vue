<script setup lang="ts">
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
// App
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import CompEntityAdEntityCard from '@/components/entity/ad/ad-entity-card.vue'
</script>

<template>
  <div class="home-index">
    <CompEntityAdEntityCard
      :link-to="{ name: E_ROUTER_PAGES.HOUSING }"
      :ad-entity="E_AD_ENTITY_TYPE.HOUSING" />

    <CompEntityAdEntityCard
      :link-to="{ name: E_ROUTER_PAGES.VEHICLES }"
      :ad-entity="E_AD_ENTITY_TYPE.VEHICLE" />
  </div>
</template>

<style lang="scss" scoped>
.home-index {
  grid-template-columns: repeat(auto-fit, 400px);
  gap: var(--s-md);
  display: grid;
}
</style>
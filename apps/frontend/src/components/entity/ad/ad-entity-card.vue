<script setup lang="ts">
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
import type { RouteLocationRaw } from 'vue-router'
// App
import { AD_ENTITY_ICON } from '@/components/constants'
// Components
import CompUiCard from '@/components/ui/ui-card.vue'

defineProps<{
  adEntity: E_AD_ENTITY_TYPE
  linkTo: RouteLocationRaw
}>()

</script>

<template>
  <CompUiCard show-highligh-on-hover :link-to="linkTo">
    <div class="ad-entity">

      <component :is="AD_ENTITY_ICON[adEntity]" class="ad-entity__icon" size="42" />

      <div>
        <p class="ad-entity__title --text-xl">
          {{ $t(`enums.adEntityType.${adEntity}`) }}
        </p>
      </div>
    </div>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.ad-entity {
  align-items: center;
  gap: var(--s-sm);
  display: flex;

  &:hover {
    .ad-entity__title {
      color: var(--c-white);
      font-weight: 700;
    }

    .ad-entity__icon {
      color: var(--c-card-active-border-color);
    }
  }
}
</style>
<script setup lang="ts">
import type { T_Ad_Vehicle } from '@scrapland/data-model'
// App
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompEntityVehiclePricePositionBadge from '@/components/entity/ad/vehicle/price-position-badge.vue'
import CompEntityVehicleGridItemHeader from '@/components/entity/ad/vehicle/grid-item-header.vue'
import CompUiPrice from '@/components/ui/ui-price.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import {
  ChessKnight,
  CircleGauge,
  Fuel
} from '@lucide/vue'

defineProps<{ adVehicle: T_Ad_Vehicle }>()

const { t } = useAppI18n()

</script>

<template>
  <CompUiCard>
    <template #header>
      <CompEntityVehicleGridItemHeader :ad-vehicle="adVehicle" />
    </template>

    <div class="grid-item">
      <div class="grid-item__thumbnail">
        <img v-if="adVehicle.images[0]" class="grid-item__thumbnail-img" :src="adVehicle.images[0]" />
      </div>

      <div>
        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ t('global.price') }}</p>
          <CompUiPrice currency="EUR" :price="adVehicle.price" />
          <CompEntityVehiclePricePositionBadge v-if="adVehicle.pricePosition" :position="adVehicle.pricePosition" />
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ t('global.brand') }}</p>
          <p>{{ adVehicle.brand }}</p>
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ t('global.model') }}</p>
          <p>{{ adVehicle.model }}</p>
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ t('global.engine') }}</p>
          <CircleGauge :size="22" />
          <p>{{ adVehicle.engineSize }}</p>
          <ChessKnight :size="22" />
          <p>{{ adVehicle.enginePower }}</p>
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ t('global.fuelType') }}</p>
          <Fuel :size="22" />
          <p>{{ adVehicle.fuelType }}</p>
        </div>
      </div>
    </div>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.grid-item {
  gap: var(--s-sm);
  display: flex;

  &__thumbnail {
    height: 170px;
    width: 200px;
    border-radius: var(--radius-sm);
    overflow: hidden;

    &-img {
      object-position: center center;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__title {
    width: 80px;
  }
}
</style>
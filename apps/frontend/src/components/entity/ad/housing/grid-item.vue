<script setup lang="ts">
import type { T_Ad_Housing } from '@scrapland/data-model'
// App
import { useAppI18n } from '@/composables/use-i18n'
import { useModals } from '@/composables/modals'
// Components
import CompEntityAdHousingGridItemHeader from '@/components/entity/ad/housing/grid-item-header.vue'
import CompEntityAdHousingParkingBadge from '@/components/entity/ad/housing/parking-badge.vue'
import CompEntityAdHousingContactBadge from '@/components/entity/ad/housing/contact-badge.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import {
  BrickWall,
  BedSingle,
  MapPin,
  Sigma,
  House,
  Bath,
} from '@lucide/vue'

const props = defineProps<{ adHousing: T_Ad_Housing }>()

const { adHousingGallery } = useModals()
const { t } = useAppI18n()

const showGalleryModal = () => {
  if (props.adHousing.images.length === 0) return
  adHousingGallery({
    images: props.adHousing.images,
    activeIndex: 0
  })
}

</script>

<template>
  <CompUiCard>
    <template #header>
      <CompEntityAdHousingGridItemHeader :ad-housing="adHousing" />
    </template>

    <div class="grid-item">
      <div class="grid-item__thumbnail --pointer" @click="showGalleryModal">
        <img v-if="adHousing.imageMain" class="grid-item__thumbnail-img" :src="adHousing.imageMain" />
      </div>

      <div>
        <div class="--group --mb-md">
          <MapPin :size="22" />
          <p class="--font-bold">{{ adHousing.locationRegion }}</p>
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ t('global.area') }}</p>
          <House :size="22" />
          <p>{{ adHousing.areaLiving }}</p>
          <BrickWall :size="22" />
          <p>{{ adHousing.areaBuilt }}</p>
          <Sigma :size="22" />
          <p>{{ adHousing.areaTotal }}</p>
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ t('global.rooms') }}</p>
          <BedSingle :size="22" />
          <p>{{ adHousing.typologyBedrooms }}</p>
          <Bath :size="22" />
          <p>{{ adHousing.typologyBathrooms }}</p>
          <Sigma :size="22" />
          <p>{{ adHousing.typologyTotalRooms }}</p>
        </div>

        <div class="--group --md-sm">
          <CompEntityAdHousingParkingBadge :ad-housing="adHousing" />
          <CompEntityAdHousingContactBadge :ad-housing="adHousing" />
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
    width: 170px;
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
    width: 90px;
  }
}
</style>
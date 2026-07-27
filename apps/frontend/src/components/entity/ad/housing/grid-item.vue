<script setup lang="ts">
import type { T_Ad_Housing } from '@scrapland/data-model'
// App
import type { PanelAdHousingProps } from '@/components/panels/types'
import { usePanelStore } from '@/stores/panel'
import { useModals } from '@/composables/modals'
// Components
import CompEntityAdHousingParkingBadge from '@/components/entity/ad/housing/parking-badge.vue'
import CompEntityAdHousingContactBadge from '@/components/entity/ad/housing/contact-badge.vue'
import CompPanelAdHousing from '@/components/panels/entities/ad/ad-housing.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import {
  ExternalLink,
  BrickWall,
  BedSingle,
  MapPin,
  Sigma,
  House,
  Bath,
  Euro,
  Eye,
  Hammer
} from '@lucide/vue'

const props = defineProps<{ adHousing: T_Ad_Housing }>()

const { adHousingGallery } = useModals()
const panelStore = usePanelStore()

const showGalleryModal = () => {
  if (props.adHousing.images.length === 0) return
  adHousingGallery({
    images: props.adHousing.images,
    activeIndex: 0
  })
}

const showAdHousingPanel = () => {
  panelStore.show<PanelAdHousingProps>(CompPanelAdHousing, {
    housingAd: props.adHousing
  })
}
</script>

<template>
  <CompUiCard>
    <template #header>
      <div class="--group --group--spread">
        <div>
          <p>{{ adHousing.descriptionShort }}</p>
          <div class="--group --font-bold">
            <template v-if="adHousing.constructionYear">
              <Hammer :size="16" />
              <p>{{ adHousing.constructionYear }} - </p>
            </template>
            <p>{{ adHousing.price.toLocaleString() }}</p>
            <Euro :size="16" />
          </div>
        </div>
        <div class="--group">
          <CompUiIconButton :href="adHousing.url" :icon="ExternalLink" :is-active="false" />
          <CompUiIconButton :icon="Eye" :is-active="false" @click="showAdHousingPanel" />
        </div>
      </div>
    </template>

    <div class="grid-item">
      <div class="grid-item__thumbnail --pointer" @click="showGalleryModal">
        <img v-if="adHousing.imageMain" class="grid-item__thumbnail-img" :src="adHousing.imageMain" />
      </div>

      <div>
        <div class="--group --mb-sm">
          <MapPin :size="22" />
          <p class="--font-bold">{{ adHousing.locationRegion }}</p>
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ $t('global.area') }}</p>
          <House :size="22" />
          <p>{{ adHousing.areaLiving }}</p>
          <BrickWall :size="22" />
          <p>{{ adHousing.areaBuilt }}</p>
          <Sigma :size="22" />
          <p>{{ adHousing.areaTotal }}</p>
        </div>

        <div class="--group --mb-sm">
          <p class="grid-item__title --font-bold">{{ $t('global.rooms') }}</p>
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
    height: 160px;
    width: 160px;
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
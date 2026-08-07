<script setup lang="ts">
import type { T_Ad_Housing } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import type { PanelAdHousingProps, OverLayExposed } from '@/components/panels/types'
// Components
import CompPanelAdHousingHeader from '@/components/panels/entities/ad/ad-housing/ad-housing-header.vue'
import CompUiImageGallery from '@/components/ui/ui-image-gallery.vue'
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'

const props = defineProps<PanelAdHousingProps>()

const overlayRef = ref<null | OverLayExposed>(null)

// Create clone because panel props aren't reactive
const ad = ref<T_Ad_Housing>(JSON.parse(JSON.stringify(props.housingAd)))

const update = (updated: T_Ad_Housing): void => { ad.value = updated }

</script>

<template>
  <CompPanelsOverlay
    close-on-overlay-click
    show-close-icon
    ref="overlayRef"
    :width="720">

    <template #header>
      <CompPanelAdHousingHeader :ad-housing="ad" @update-ad="update" />
    </template>

    <CompUiImageGallery can-maximize :images="housingAd.images" />

  </CompPanelsOverlay>
</template>
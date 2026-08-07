<script setup lang="ts">
import type { T_Ad_Vehicle } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import type { PanelAdVehicleProps, OverLayExposed } from '@/components/panels/types'
// Components
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'

const props = defineProps<PanelAdVehicleProps>()

const overlayRef = ref<null | OverLayExposed>(null)

// Create clone because panel props aren't reactive
const ad = ref<T_Ad_Vehicle>(JSON.parse(JSON.stringify(props.housingAd)))

</script>

<template>
  <CompPanelsOverlay
    close-on-overlay-click
    show-close-icon
    ref="overlayRef"
    :width="720">

    <template #header>
      the header
    </template>

    the content

  </CompPanelsOverlay>
</template>

<script setup lang="ts">
import type { T_Ad_Vehicle } from '@scrapland/data-model'
// Components
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { ExternalLink } from '@lucide/vue'

defineProps<{
  adVehicle: T_Ad_Vehicle
  index: number
}>()

</script>

<template>
  <td>{{ index + 1 }}</td>

  <td>
    <button class="--thumbnail --pointer">
      <img v-if="adVehicle.images[0]" :src="adVehicle.images[0]" />
    </button>
  </td>

  <td>
    <div class="--group">
      <CompUiIconButton :href="adVehicle.url" :icon="ExternalLink" :is-active="false" />
      <!-- <CompUiIconButton :icon="Eye" :is-active="false" @click="showAdHousingPanel" /> -->
    </div>
  </td>
</template>

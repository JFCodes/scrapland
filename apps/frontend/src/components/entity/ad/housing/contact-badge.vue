<script setup lang="ts">
import type { T_Ad_Housing } from '@scrapland/data-model'
import { computed } from 'vue'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import { Phone } from '@lucide/vue'

const props = defineProps<{ adHousing: T_Ad_Housing }>()

const hasContact = computed(() => {
  if (props.adHousing.contactUserContact) return true
  if (props.adHousing.contactAgencyContact) return true
})

</script>


<template>
  <CompUiTypeBadge v-if="hasContact" type="light">
    <Phone :size="18" />
    {{ adHousing.contactUserContact || adHousing.contactAgencyContact }}
  </CompUiTypeBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// Components
import { Euro } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    currency: 'EUR'
    price: number
    // Optional
    decimalPlaces?: number
    iconSize?: number
  }>(),
  {
    decimalPlaces: 0,
    iconSize: 16
  }
)

const priceString = computed<string>(() => {
  return props.price.toLocaleString(undefined, {
    minimumFractionDigits: props.decimalPlaces,
    maximumFractionDigits: props.decimalPlaces
  })
})

</script>

<template>
  <p class="--group --font-bold">
    {{ priceString }}
    <Euro v-if="currency === 'EUR'" :size="iconSize" />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// App
import type { UiValueRange } from '@/components/types'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompFormValueRange from '@/components/forms/f-value-range.vue'

defineProps<{
  maxValue: number
  step: number
}>()

const { t } = useAppI18n()

const minPrice = defineModel<number>('price-min', { default: 0 })
const maxPrice = defineModel<number>('price-max', { default: Infinity })

const range = computed<UiValueRange>(() => ([minPrice.value, maxPrice.value]))

const updateModels = (range: UiValueRange): void => {
  minPrice.value = range[0]
  maxPrice.value = range[1]
}
</script>

<template>
  <CompFormValueRange
    optional
    :label="t('global.priceRange')"
    :max-value="maxValue"
    :model-value="range"
    :min-value="0"
    :step="step"
    @update:model-value="updateModels" />
</template>
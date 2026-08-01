<script setup lang="ts">
import { computed } from 'vue'
// App
import type { UiValueRange } from '@/components/types'
import { useAppSettings } from '@/stores/app-settings'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompFormValueRange from '@/components/forms/f-value-range.vue'

const appSettings = useAppSettings()
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
    :max-value="appSettings.settings.HOUSING_TASK_PRICE_MAX_VALUE"
    :step="appSettings.settings.HOUSING_TASK_PRICE_RANGE_STEP"
    :label="t('global.priceRange')"
    :model-value="range"
    :min-value="0"
    @update:model-value="updateModels" />
</template>
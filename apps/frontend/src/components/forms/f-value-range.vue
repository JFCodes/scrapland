<script setup lang="ts">
// App
import type { UiValueRange } from '@/components/types'
// Components
import CompFormsValueRangeComponent from '@/components/forms/value-range/range-component.vue'
import CompFormsFormField from '@/components/forms/f-form-field.vue'

defineProps<{
  optional?: boolean
  minValue: number
  maxValue: number
  step?: number
  label: string
}>()

const value = defineModel<UiValueRange>({ default: () => ([0, Infinity]) })
</script>

<template>
  <CompFormsFormField
    :optional="optional"
    :label="label">

    <CompFormsValueRangeComponent
      v-model="value"
      :snap-width="30"
      :min="minValue"
      :max="maxValue"
      :step="step" />

  </CompFormsFormField>
</template>

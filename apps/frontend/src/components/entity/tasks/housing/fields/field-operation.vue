<script setup lang="ts">
import type { T_Ad_Housing_Operation } from '@scrapland/data-model'
// App
import type { UiSelectOption } from '@/components/types'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompFormSelect from '@/components/forms/f-select.vue'

const { t } = useAppI18n()

const operation = defineModel<null | T_Ad_Housing_Operation>({ default: 'buy' })

const options: Array<UiSelectOption<T_Ad_Housing_Operation>> = [
  { label: t('enums.adHousingOperation.buy'), value: 'buy' },
  { label: t('enums.adHousingOperation.rent'), value: 'rent' },
]

const updateModel = (value: null | string | Array<string>) => {
  if (Array.isArray(value)) return

  operation.value = value as null | T_Ad_Housing_Operation
}
</script>

<template>
  <CompFormSelect
    close-on-click-outside
    close-on-option-click
    :label="t('global.operation')"
    :model-value="operation"
    :options="options"
    @update:model-value="updateModel" />
</template>

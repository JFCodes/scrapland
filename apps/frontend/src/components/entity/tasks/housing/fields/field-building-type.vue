<script setup lang="ts">
import type { T_Ad_Housing_BuildingType } from '@scrapland/data-model'
// App
import type { UiSelectOption } from '@/components/types'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompFormSelect from '@/components/forms/f-select.vue'

defineProps<{ error?: null | string }>()

const { t } = useAppI18n()

const buildingTypes = defineModel<null | undefined | Array<T_Ad_Housing_BuildingType>>({ default: () => [] })

const adTypeOptions: Array<UiSelectOption<T_Ad_Housing_BuildingType>> = [
  { label: t(`enums.adHousingBuildingTypes.${'single-house'}`), value: 'single-house' },
  { label: t(`enums.adHousingBuildingTypes.${'apartment'}`), value: 'apartment' },
]

const updateModel = (values: null | string | Array<string>) => {
  if (typeof values === 'string') return
  if (values === null) return

  buildingTypes.value = values as Array<T_Ad_Housing_BuildingType>
}
</script>

<template>
  <CompFormSelect
    close-on-click-outside
    multi
    :label="t('global.buildingTypes')"
    :model-value="buildingTypes ?? []"
    :options="adTypeOptions"
    :has-error="!!error"
    :error="error"
    @update:model-value="updateModel" />
</template>

<script setup lang="ts">
import { E_AD_ENTITY_TYPE, E_TARGET } from '@scrapland/data-model'
import { F_ReadableEnum } from '@scrapland/functions'
// App
import type { UiSelectOption } from '@/components/types'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompFormSelect from '@/components/forms/f-select.vue'
import { computed } from 'vue'

const props = defineProps<{
  adEntityType: E_AD_ENTITY_TYPE
  error?: null | string
}>()

const { t } = useAppI18n()

const target = defineModel<null | E_TARGET>({ default: null })

// Only list targets that are capable of housing/find-new
const targetOptions = computed<Array<UiSelectOption<E_TARGET>>>(() => {
  switch (props.adEntityType) {
    case E_AD_ENTITY_TYPE.HOUSING:
      return [
        { label: F_ReadableEnum(E_TARGET.IMOVIRTUAL_PORTUGAL), value: E_TARGET.IMOVIRTUAL_PORTUGAL },
        { label: F_ReadableEnum(E_TARGET.REMAX_PORTUGAL), value: E_TARGET.REMAX_PORTUGAL },
      ]

    case E_AD_ENTITY_TYPE.VEHICLE:
      return [
        { label: F_ReadableEnum(E_TARGET.STAND_VIRTUAL_PORTUGAL), value: E_TARGET.STAND_VIRTUAL_PORTUGAL },

      ]
  }
})

const updateModel = (value: null | string | Array<string>) => {
  if (typeof value !== 'string' || !value) return

  target.value = value as E_TARGET
}
</script>

<template>
  <CompFormSelect
    close-on-click-outside
    close-on-option-click
    :label="t('global.target')"
    :model-value="target"
    :options="targetOptions"
    :has-error="!!error"
    :error="error"
    @update:model-value="updateModel" />
</template>

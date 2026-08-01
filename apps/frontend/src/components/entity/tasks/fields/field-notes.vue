<script setup lang="ts">
// App
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompFormTextarea from '@/components/forms/f-textarea.vue'

const { t } = useAppI18n()

const notes = defineModel<null | string>({ default: '' })

const updateValue = (value: null | string): void => {
  notes.value = value === null || value.trim() === ''
    ? null
    : value
}

</script>

<template>
  <CompFormTextarea
    v-model:model-value="notes"
    optional
    :label="t('global.notes')"
    :attributes="{ rows: 5 }"
    @update:model-value="updateValue" />
</template>

<script setup lang="ts">
// App
import { useTooltips } from '@/composables/tooltips'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompFormInput from '@/components/forms/f-input.vue'
import { BadgeInfo } from '@lucide/vue'

defineProps<{ error?: null | string }>()

const { sourceLocationInfo } = useTooltips()
const { t } = useAppI18n()

const location = defineModel<string>({ default: '' })

const showLocationTooltip = (event: MouseEvent): void => {
  sourceLocationInfo(event, {
    messages: [
      t('tooltips.targetLocation1'),
      t('tooltips.targetLocation2'),
    ]
  })
}
</script>

<template>
  <CompFormInput
    v-model="location"
    :has-error="!!error"
    :error="error"
    :label="t('global.location')">
    <template #after-label>
      <BadgeInfo class="--help" :size="16" @mouseenter="showLocationTooltip" />
    </template>
  </CompFormInput>
</template>

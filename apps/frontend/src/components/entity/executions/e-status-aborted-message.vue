<script setup lang="ts">
import { E_EXECUTION_STATUS } from '@scrapland/data-model'
// App
import { EXECUTION_STATUS_ICONS } from '@/components/constants'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompUiMessage from '@/components/ui/ui-message.vue'

defineProps<{ abortReason: null | string }>()

const { t } = useAppI18n()

</script>

<template>
  <CompUiMessage class="--mb-xs" :type="'warning'">

    <template #icon>
      <component :is="EXECUTION_STATUS_ICONS[E_EXECUTION_STATUS.ABORTED]" :size="20" />
    </template>

    <template #message>
      <p class="--font-bold">{{ t('entities.execution.aborted') }}</p>
      <p>{{ abortReason || t('entities.execution.missingAbortedReason') }}</p>
    </template>

  </CompUiMessage>
</template>

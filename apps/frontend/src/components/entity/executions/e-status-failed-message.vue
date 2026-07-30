<script setup lang="ts">
import { E_EXECUTION_STATUS } from '@scrapland/data-model'
// App
import { EXECUTION_STATUS_ICONS } from '@/components/constants'
// Components
import CompUiMessage from '@/components/ui/ui-message.vue'

defineProps<{ failureReason: null | string }>()
</script>

<template>
  <CompUiMessage class="--mb-xs" :type="'danger'">

    <template #icon>
      <component :is="EXECUTION_STATUS_ICONS[E_EXECUTION_STATUS.FAILED]" :size="20" />
    </template>

    <template #message>
      <p class="--font-bold">{{ $t('entities.execution.aborted') }}</p>
      <p>{{ failureReason || $t('entities.execution.missingFailedReason') }}</p>
    </template>

  </CompUiMessage>
</template>

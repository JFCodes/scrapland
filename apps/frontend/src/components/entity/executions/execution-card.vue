<script setup lang="ts">
import { E_ENTITY_TYPE, type T_Execution, type T_Task } from '@scrapland/data-model'
import { computed } from 'vue'
import {
  F_TimeToDurationNoHours,
  F_GetLastUuidSegment,
  F_DateFormats,
} from '@scrapland/functions'
// Components
import CompEntityExecutionStatusBadge from '@/components/entity/executions/e-status-badge.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

const props = defineProps<{ execution: T_Execution, task: T_Task }>()

const getDateFormatted = (value: null | number): string => {
  return value !== null ? F_DateFormats.dateAndHour(value) : '-'
}

const finishedAt = computed<string>(() => getDateFormatted(props.execution.startedAt))
const startedAt = computed<string>(() => getDateFormatted(props.execution.startedAt))
const duration = computed<string>(() => {
  const fallback = '--:--'

  const { finishedAt, startedAt } = props.execution

  if (!finishedAt) return fallback
  if (!startedAt) return fallback
  if (startedAt > finishedAt) return fallback

  const durationTime = finishedAt - startedAt
  return F_TimeToDurationNoHours(durationTime)
})
</script>

<template>
  <CompUiCard>
    <template #header>
      <div class="--group --group--spread">
        <p>
          {{ $t(`enums.entityName.${E_ENTITY_TYPE.EXECUTION}`) }}:
          <span class="--font-bold">{{ F_GetLastUuidSegment(execution._id) }}</span>
        </p>
        <CompEntityExecutionStatusBadge :status="execution.status" />
      </div>
    </template>

    <p><span class="--font-bold">{{ $t('global.startedAt') }}: </span>{{ startedAt }}</p>
    <p><span class="--font-bold">{{ $t('global.finishedAt') }}: </span>{{ finishedAt }}</p>
    <p><span class="--font-bold">{{ $t('global.duration') }}: </span>{{ duration }}</p>
  </CompUiCard>
</template>

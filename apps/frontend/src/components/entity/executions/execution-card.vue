<script setup lang="ts">
import { F_TimeToDurationNoHours, F_GetLastUuidSegment, F_DateFormats, } from '@scrapland/functions'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import {
  type T_Execution_StatusHistory,
  type T_Execution,
  type T_Task,
  E_EXECUTION_STATUS,
  E_ENTITY_TYPE,
} from '@scrapland/data-model'
// Components
import CompEntityExecutionStatusAbortedMessage from '@/components/entity/executions/e-status-aborted-message.vue'
import CompEntityExecutionStatusFailedMessage from '@/components/entity/executions/e-status-failed-message.vue'
import CompEntityExecutionStatusBadge from '@/components/entity/executions/e-status-badge.vue'
import CompUiCollapsible from '@/components/ui/ui-collapsible.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

const { t } = useI18n()

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

const getStatusHistoryText = (entry: T_Execution_StatusHistory): string => {
  const status = t(`enums.executionStatus.${entry.status}`)
  const date = F_DateFormats.dateAndHour(entry.date)
  return t('global.atDate', { status, date })
}
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

    <CompEntityExecutionStatusAbortedMessage
      v-if="execution.status === E_EXECUTION_STATUS.ABORTED"
      :abort-reason="execution.abortReason" />

    <CompEntityExecutionStatusFailedMessage
      v-else-if="execution.status === E_EXECUTION_STATUS.FAILED"
      :failure-reason="execution.failureReason" />

    <div class="group-v --mb-md">
      <p><span class="--font-bold">{{ $t('global.startedAt') }}: </span>{{ startedAt }}</p>
      <p><span class="--font-bold">{{ $t('global.finishedAt') }}: </span>{{ finishedAt }}</p>
      <p><span class="--font-bold">{{ $t('global.duration') }}: </span>{{ duration }}</p>
    </div>

    <CompUiCollapsible>
      <template #header>{{ $t('entities.execution.executionStatusHistory') }}</template>
      <template #collapsible>
        <div class="--group-v">
          <p v-for="(entry, entryIndex) in execution.statusHistory" :key="entryIndex">
            <span class="--font-bold">{{ $t(`enums.executionStatus.${entry.status}`) }}</span>
            {{ getStatusHistoryText(entry) }}
          </p>
        </div>
      </template>
    </CompUiCollapsible>

  </CompUiCard>
</template>

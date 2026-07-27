<script setup lang="ts">
import { type T_Task_Schedule, E_TASK_SCHEDULE_TYPE } from '@scrapland/data-model'
// App
import { useCronValidation } from '@/composables/cron-validation'
import type { UiSelectOption } from '@/components/types'
// Components
import CompFormsFormField from '@/components/forms/f-form-field.vue'
import CompFormCronInput from '@/components/forms/f-cron-input.vue'
import CompFormSelect from '@/components/forms/f-select.vue'
import CompFormInput from '@/components/forms/f-input.vue'

const DEFAULT_INTERVAL_MS = 60 * 60 * 1000 // 1 hour

const schedule = defineModel<T_Task_Schedule>({ default: () => ({ type: E_TASK_SCHEDULE_TYPE.MANUAL }) })

const { cronDescription, cronIsInvalid, cronErrors } = useCronValidation(() => schedule.value)

const typeOptions: Array<UiSelectOption<E_TASK_SCHEDULE_TYPE>> = [
  { label: 'Manual', value: E_TASK_SCHEDULE_TYPE.MANUAL },
  { label: 'Interval', value: E_TASK_SCHEDULE_TYPE.INTERVAL },
  { label: 'cron', value: E_TASK_SCHEDULE_TYPE.CRON },
]

const updateType = (scheduleType: E_TASK_SCHEDULE_TYPE): void => {
  switch (scheduleType) {
    case E_TASK_SCHEDULE_TYPE.MANUAL:
      schedule.value = { type: E_TASK_SCHEDULE_TYPE.MANUAL }
      break
    case E_TASK_SCHEDULE_TYPE.INTERVAL:
      // 60 * 60 * 1000 // every hour 
      schedule.value = {
        type: E_TASK_SCHEDULE_TYPE.INTERVAL,
        everyMs: DEFAULT_INTERVAL_MS,
        startAt: new Date(),
      }
      break
    case E_TASK_SCHEDULE_TYPE.CRON:
      schedule.value = {
        type: E_TASK_SCHEDULE_TYPE.CRON,
        expression: '0 * * * * *',
      }
      break
  }
}

const parseEveryMs = (): void => {
  if (schedule.value.type !== 'interval') return

  const { everyMs } = schedule.value
  const minimumValue = 60 * 5 * 1000 // 5 minutes

  const isValid = !isNaN(everyMs) && isFinite(everyMs) && everyMs >= minimumValue
  if (!isValid) schedule.value.everyMs = minimumValue
}

</script>

<template>
  <div class="schedule-field">
    <CompFormSelect
      label="Schedule"
      close-on-click-outside
      close-on-option-click
      :model-value="schedule.type"
      :options="typeOptions"
      @update:model-value="scheduleType => updateType(scheduleType as E_TASK_SCHEDULE_TYPE)" />

    <CompFormInput
      v-if="schedule.type === 'interval'"
      v-model="schedule.everyMs"
      label="Interval (ms)"
      @on-blur="parseEveryMs" />

    <template v-if="schedule.type === 'cron'">
      <div>
        <CompFormCronInput
          v-model="schedule.expression"
          :is-invalid="cronIsInvalid"
          :errors="cronErrors" />
      </div>

      <CompFormsFormField label="Cron description">
        <p>{{ cronDescription }}</p>
      </CompFormsFormField>
    </template>

  </div>
</template>

<style lang="scss" scoped>
.schedule-field {
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--s-sm);
  display: grid;
}
</style>
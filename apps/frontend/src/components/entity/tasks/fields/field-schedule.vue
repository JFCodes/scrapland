<script setup lang="ts">
import { type T_Task_Schedule, E_TASK_SCHEDULE_TYPE } from '@scrapland/data-model'
import { computed } from 'vue'
// App
import { useScheduleInterval } from '@/composables/use-schedule-interval'
import { useCronValidation } from '@/composables/cron-validation'
import { useAppSettings } from '@/stores/app-settings'
import type { UiSelectOption } from '@/components/types'
// Components
import CompFormsFormField from '@/components/forms/f-form-field.vue'
import CompFormCronInput from '@/components/forms/f-cron-input.vue'
import CompFormSelect from '@/components/forms/f-select.vue'
import CompFormInput from '@/components/forms/f-input.vue'

const { getEveryMsError, forceValidEveryMs, getDescription } = useScheduleInterval()
const appSettings = useAppSettings()

const schedule = defineModel<T_Task_Schedule>({ default: () => ({ type: E_TASK_SCHEDULE_TYPE.MANUAL }) })
const { cronDescription, cronIsInvalid, cronErrors } = useCronValidation(() => schedule.value)

const typeOptions: Array<UiSelectOption<E_TASK_SCHEDULE_TYPE>> = [
  { label: 'Manual', value: E_TASK_SCHEDULE_TYPE.MANUAL },
  { label: 'Interval', value: E_TASK_SCHEDULE_TYPE.INTERVAL },
  { label: 'cron', value: E_TASK_SCHEDULE_TYPE.CRON },
]

const everyMsError = computed<null | string>(() => {
  if (schedule.value.type !== E_TASK_SCHEDULE_TYPE.INTERVAL) return null
  return getEveryMsError(schedule.value)
})

const intervalDescription = computed<string>(() => {
  if (schedule.value.type !== E_TASK_SCHEDULE_TYPE.INTERVAL) return ''
  return getDescription(schedule.value)
})

const onEveryMsBlur = (): void => {
  if (schedule.value.type !== 'interval') return

  const validValue = forceValidEveryMs(schedule.value.everyMs)
  if (validValue !== schedule.value.everyMs) schedule.value.everyMs = validValue
}

const updateType = (scheduleType: E_TASK_SCHEDULE_TYPE): void => {
  switch (scheduleType) {
    case E_TASK_SCHEDULE_TYPE.MANUAL:
      schedule.value = { type: E_TASK_SCHEDULE_TYPE.MANUAL }
      break
    case E_TASK_SCHEDULE_TYPE.INTERVAL:
      const { TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE } = appSettings.settings
      schedule.value = {
        everyMs: TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE,
        type: E_TASK_SCHEDULE_TYPE.INTERVAL,
        startAt: new Date(),
      }
      break
    case E_TASK_SCHEDULE_TYPE.CRON:
      schedule.value = {
        type: E_TASK_SCHEDULE_TYPE.CRON,
        expression: '0 * * * *',
      }
      break
  }
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

    <template v-if="schedule.type === 'interval'">
      <div>
        <CompFormInput
          v-model="schedule.everyMs"
          label="Interval (ms)"
          :attributes="{ type: 'number' }"
          :has-error="everyMsError !== null"
          :error="everyMsError"
          @on-blur="onEveryMsBlur" />
      </div>
      <CompFormsFormField label="Interval description">
        <p>{{ intervalDescription }}</p>
      </CompFormsFormField>
    </template>


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
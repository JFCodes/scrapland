<script setup lang="ts">
import { type T_Task_Schedule, E_TASK_SCHEDULE_TYPE } from '@scrapland/data-model'
// App
import { useFieldSchedule } from '@/composables/fields/task-schedule'
// Components
import CompFormsFormField from '@/components/forms/f-form-field.vue'
import CompFormCronInput from '@/components/forms/f-cron-input.vue'
import CompFormSelect from '@/components/forms/f-select.vue'
import CompFormInput from '@/components/forms/f-input.vue'

const schedule = defineModel<T_Task_Schedule>({ default: () => ({ type: E_TASK_SCHEDULE_TYPE.MANUAL }) })
const {
  onEveryMsBlur,
  updateType,
  intervalEveryMsDescription,
  intervalEveryMsError,
  cronDescription,
  cronIsInvalid,
  typeOptions,
  cronErrors,
} = useFieldSchedule(schedule)

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
          :has-error="intervalEveryMsError !== null"
          :error="intervalEveryMsError"
          @on-blur="onEveryMsBlur" />
      </div>
      <CompFormsFormField label="Interval description">
        <p>{{ intervalEveryMsDescription }}</p>
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
import { E_TASK_SCHEDULE_TYPE, type T_Task_Schedule } from '@scrapland/data-model'
import { type MaybeRefOrGetter, watch, ref, toValue  } from 'vue'
import { registerOptionPreset } from 'cron-validate/lib/option'
import cron from 'cron-validate'
// App
import { CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET } from '@/composables/cron-validation/preset'

registerOptionPreset(CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET)

export function useTaskScheduleValidation(schedule: MaybeRefOrGetter<T_Task_Schedule>) {
  const isValid = ref(true)

  const getIsValid = (value: T_Task_Schedule): boolean => {
    switch (value.type) {
      case E_TASK_SCHEDULE_TYPE.MANUAL: return true
      case E_TASK_SCHEDULE_TYPE.INTERVAL:
        if (isNaN(value.everyMs)) return false
        if (!isFinite(value.everyMs)) return false
        return value.everyMs > 0

      case E_TASK_SCHEDULE_TYPE.CRON:
        const result = cron(value.expression, { preset: CRON_VALIDATE_PRESET_ID })
        return result.isValid()
    }
  }

  watch(schedule, value => isValid.value = getIsValid(toValue(value)), { deep: true })

  return { isValid }
}
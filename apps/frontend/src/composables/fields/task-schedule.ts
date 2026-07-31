import { registerOptionPreset } from 'cron-validate/lib/option'
import { type ModelRef, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import cron from 'cron-validate'
import {
  CRON_VALIDATE_PRESET_ID,
  CRON_VALIDATE_PRESET,
  E_TASK_SCHEDULE_TYPE,
  type T_Task_Schedule
} from '@scrapland/data-model'
// App
import { getCronDescription } from '@/composables/cron-validation/get-cron-description'
import { useTaskScheduleValidation } from '@/composables/fields/task-schedule/validation'
import type { UiSelectOption } from '@/components/types'
import { useAppSettings } from '@/stores/app-settings'

registerOptionPreset(CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET)

export function useFieldSchedule (schedule: ModelRef<T_Task_Schedule>) {
  const { isValid } = useTaskScheduleValidation(schedule)
  const { t } = useI18n()
  const appSettings = useAppSettings()

  const typeOptions: Array<UiSelectOption<E_TASK_SCHEDULE_TYPE>> = [
    { label: 'Manual', value: E_TASK_SCHEDULE_TYPE.MANUAL },
    { label: 'Interval', value: E_TASK_SCHEDULE_TYPE.INTERVAL },
    { label: 'cron', value: E_TASK_SCHEDULE_TYPE.CRON },
  ]

  const intervalEveryMsError = computed<null | string>(() => {
    if (schedule.value.type !== E_TASK_SCHEDULE_TYPE.INTERVAL) return null

    const { TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE } = appSettings.settings
    const msValue = schedule.value.everyMs

    if (isNaN(msValue)) return t('errorMessages.taskScheduleIntervalEveryMs.invalid')
    if (!isFinite(msValue)) return t('errorMessages.taskScheduleIntervalEveryMs.invalid')
    if (msValue < 1) return t('errorMessages.taskScheduleIntervalEveryMs.mustBePositive')

    if (msValue < TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE) {
      return t('errorMessages.taskScheduleIntervalEveryMs.mustBeAtLeast', {
        min: TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE
      })
    }

    return null

  })

  const intervalEveryMsDescription = computed<string>(() => {
    if (schedule.value.type !== E_TASK_SCHEDULE_TYPE.INTERVAL) return ''

    const { everyMs } = schedule.value
    const isValid = intervalEveryMsIsValue(everyMs)
    if (!isValid) return ''

    const oneMinute = 1000 * 60
    const minutesMod = everyMs % oneMinute
    const minutes = Math.round(everyMs / oneMinute)

    if (minutes < 60) {
      return t('entities.task.schedule.intervalDescriptionMinutes', {
        tilde: minutesMod ? '~' : '',
        minutes
      })
    }

    const leftOverMinutes = minutes % 60
    const hours = Math.floor(minutes / 60)
    return leftOverMinutes
      ? t('entities.task.schedule.intervalDescriptionHourWithMinutes', { count: hours, minutes: leftOverMinutes })
      : t('entities.task.schedule.intervalDescriptionHour', { count: hours })
  })

  const cronResult = computed<null | ReturnType<typeof cron>>(() => {
    if (schedule.value.type !== 'cron') return null

    return cron(schedule.value.expression, { preset: CRON_VALIDATE_PRESET_ID })
  })

  const cronDescription = computed<string>(() => {
    if (schedule.value.type !== E_TASK_SCHEDULE_TYPE.CRON) return ''
    if (!cronResult.value) return ''
    if (!cronResult.value.isValid()) return ''

    return getCronDescription(schedule.value)
  })

  const cronIsInvalid = computed(() => {
    return cronResult.value === null ? false : cronResult.value.isError()
  })

  const cronIsValid = computed(() => {
    return cronResult.value === null ? false : cronResult.value.isValid()
  })

  const cronErrors = computed<Array<string>>(() => {
    if (!cronResult.value || !cronResult.value.isError()) return []
    return cronResult.value.getError()
  })

  const updateType = (scheduleType: E_TASK_SCHEDULE_TYPE): void => {
    switch (scheduleType) {
      case E_TASK_SCHEDULE_TYPE.INTERVAL: return setAsInterval()
      case E_TASK_SCHEDULE_TYPE.MANUAL: return setAsManual()
      case E_TASK_SCHEDULE_TYPE.CRON: return setAsCron()
    }
  }

  const onEveryMsBlur = (): void => {
    if (schedule.value.type !== 'interval') return

    const validValue = intervalEveryMsValidOrDefault(schedule.value.everyMs)
    if (validValue !== schedule.value.everyMs) schedule.value.everyMs = validValue
  }

  const intervalEveryMsIsValue = (everyMs: number): boolean => {
    const { TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE } = appSettings.settings

    if (isNaN(everyMs)) return false
    if (!isFinite(everyMs)) return false
    if (everyMs < TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE) return false
    return true
  }

  const intervalEveryMsValidOrDefault = (everyMs: number): number => {
    const { TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE } = appSettings.settings

    return !intervalEveryMsIsValue(everyMs)
      ? TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE
      : everyMs
  }

  const setAsManual = () => {
    schedule.value = { type: E_TASK_SCHEDULE_TYPE.MANUAL }
  }

  const setAsInterval = () => {
    const { TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE } = appSettings.settings
    schedule.value = {
      everyMs: TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE,
      type: E_TASK_SCHEDULE_TYPE.INTERVAL,
    }
  }

  const setAsCron = () => {
    schedule.value = {
      type: E_TASK_SCHEDULE_TYPE.CRON,
      expression: '0 * * * *',
    }
  }

  return {
    onEveryMsBlur,
    updateType,
    intervalEveryMsDescription,
    intervalEveryMsError,
    cronDescription,
    cronIsInvalid,
    cronIsValid,
    typeOptions,
    cronResult,
    cronErrors,
    isValid
  }
}

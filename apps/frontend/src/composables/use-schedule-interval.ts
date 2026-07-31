import type { T_Task_ScheduleInterval } from "@scrapland/data-model"
import { useI18n } from 'vue-i18n'
// App
import { useAppSettings } from '@/stores/app-settings'

export function useScheduleInterval () {
  const appSettings = useAppSettings()
  const { t } = useI18n()

  const validateEveryMs = (everyMs: number): boolean => {
    const { TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE } = appSettings.settings

    if (isNaN(everyMs)) return false
    if (!isFinite(everyMs)) return false
    if (everyMs < TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE) return false
    return true
  }

  const forceValidEveryMs = (value: number): number => {
    const { TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE } = appSettings.settings

    return !validateEveryMs(value)
      ? TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE
      : value
  }

  const getEveryMsError = (interval: T_Task_ScheduleInterval): null | string => {
    const { TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE } = appSettings.settings
    const msValue = interval.everyMs

    if (isNaN(msValue)) return t('errorMessages.taskScheduleIntervalEveryMs.invalid')
    if (!isFinite(msValue)) return t('errorMessages.taskScheduleIntervalEveryMs.invalid')
    if (msValue < 1) return t('errorMessages.taskScheduleIntervalEveryMs.mustBePositive')

    if (msValue < TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE) {
      return t('errorMessages.taskScheduleIntervalEveryMs.mustBeAtLeast', {
        min: TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE
      })
    }

    return null
  }

  const getDescription = (interval: T_Task_ScheduleInterval): string => {
    const isValid = validateEveryMs(interval.everyMs)
    if (!isValid) return ''

    const { everyMs } = interval
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
  }

  return {
    forceValidEveryMs,
    getEveryMsError,
    validateEveryMs,
    getDescription,
  }
}

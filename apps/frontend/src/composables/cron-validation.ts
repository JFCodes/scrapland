import type { T_Task_Schedule } from '@scrapland/data-model'
import { registerOptionPreset } from 'cron-validate/lib/option'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import cron from 'cron-validate'
// App
import { CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET } from '@/composables/cron-validation/preset'
import { getCronDescription } from '@/composables/cron-validation/get-cron-description'

registerOptionPreset(CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET)

export function useCronValidation (schedule: MaybeRefOrGetter<T_Task_Schedule>) {
  const cronResult = computed<null | ReturnType<typeof cron>>(() => {
    const scheduleValue = toValue(schedule)
    if (scheduleValue.type !== 'cron') return null

    return cron(scheduleValue.expression, { preset: CRON_VALIDATE_PRESET_ID })
  })

  const cronDescription = computed<string>(() => {
    if (!cronResult.value) return ''
    if (!cronResult.value.isValid()) return ''

    const scheduleValue = toValue(schedule)
    if (scheduleValue.type !== 'cron') return ''

    return getCronDescription(scheduleValue)
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

  return {
    cronDescription,
    cronIsInvalid,
    cronIsValid,
    cronResult,
    cronErrors
  }
}
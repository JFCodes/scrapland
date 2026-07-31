import type { OptionPreset } from 'cron-validate/lib/types'

export const CRON_VALIDATE_PRESET_ID = 'house-hunter-cron-options'
export const CRON_VALIDATE_PRESET: OptionPreset = {
  presetId: 'npm-cron-schedule',
  useSeconds: false,
  useYears: false,
  useAliases: true,
  useBlankDay: false,
  allowOnlyOneBlankDayField: false,
  mustHaveBlankDayField: false,
  useLastDayOfMonth: false,
  useLastDayOfWeek: false,
  useNearestWeekday: false,
  useNthWeekdayOfMonth: false,
  seconds: {
    minValue: 0,
    maxValue: 59,
  },
  minutes: {
    minValue: 0,
    maxValue: 59,
  },
  hours: {
    minValue: 0,
    maxValue: 23,
  },
  daysOfMonth: {
    minValue: 1,
    maxValue: 31,
  },
  months: {
    minValue: 1,
    maxValue: 12,
  },
  daysOfWeek: {
    minValue: 0,
    maxValue: 7,
  },
  years: {
    minValue: 1970,
    maxValue: 2099,
  },
}

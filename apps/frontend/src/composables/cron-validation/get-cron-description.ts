import { CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET } from '@scrapland/data-model'
import { registerOptionPreset } from 'cron-validate/lib/option'
import cronstrue from 'cronstrue'
// App
import type { T_Task_ScheduleCron } from '@scrapland/data-model'

registerOptionPreset(CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET)

export function getCronDescription (schedule: T_Task_ScheduleCron): string {
  return cronstrue.toString(schedule.expression, {
    throwExceptionOnParseError: false,
    use24HourTimeFormat: true,
  })
}
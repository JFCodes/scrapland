import { type T_Task_Schedule, E_TASK_SCHEDULE_TYPE } from '@scrapland/data-model'
// App
export { isCronExpression } from './is-cron-expression'
import { isEnumValue } from './is-enum-value'
import { isNumber } from './is-number'
import { isCronExpression } from './is-cron-expression'

type Options = {
  minIntervalEveryMs: number
}

export function isTaskSchedule (value: unknown, options: Options): null | T_Task_Schedule {
  const { minIntervalEveryMs } = options

  if (typeof value !== 'object') return null
  if (Array.isArray(value)) return null
  if (value === null) return null

  if (!('type' in value)) return null
  const type = isEnumValue(value.type, E_TASK_SCHEDULE_TYPE)
  if (type === null) return null

  // VALIDATE INTERVAL
  if (type === E_TASK_SCHEDULE_TYPE.INTERVAL) {
    if (!('everyMs' in value)) return null

    const everyMs = isNumber(value.everyMs, { minValue: minIntervalEveryMs })
    if (everyMs === null) return null

    return { type: E_TASK_SCHEDULE_TYPE.INTERVAL, everyMs }
  }

  if (type === E_TASK_SCHEDULE_TYPE.CRON) {
    if (!('expression' in value)) return null

    const expression = isCronExpression(value.expression)
    if (expression === null) return null

    return { type: E_TASK_SCHEDULE_TYPE.CRON, expression }
  }

  // Manual type doesn't have other options
  return { type: E_TASK_SCHEDULE_TYPE.MANUAL }
}

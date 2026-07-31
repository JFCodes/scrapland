import { CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET } from '@scrapland/data-model'
import { registerOptionPreset } from 'cron-validate/lib/option'
import cron from 'cron-validate'
// App
import { isNonEmptyString } from './is-non-empty-string'

registerOptionPreset(CRON_VALIDATE_PRESET_ID, CRON_VALIDATE_PRESET)

export function isCronExpression (value: unknown): null | string {
  const expression = isNonEmptyString(value)
  if (expression === null) return null

  const result = cron(expression, { preset: CRON_VALIDATE_PRESET_ID })
  if (!result.isValid()) return null

  return expression
}
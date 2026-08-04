import {
  type T_Task_Ad_Vehicle_FindNew_Insert,
  CONST_T_AD_HOUSING_BUILDING_TYPE,
  CONST_T_AD_HOUSING_OPERATION,
  E_AD_ENTITY_TYPE,
  E_TARGET,
} from '@scrapland/data-model'
// App
import {
  isNonEmptyString,
  isTaskSchedule,
  isValueOfArray,
  isEnumValue,
  isArrayOf,
  isNumber,
} from '../validators'

type Options = {
  minIntervalEveryMs: number
  maxPriceValue: number
}

// TODO: custom target validations
// Example: some targets don't allow not having building types, or only allow one, etc...

export function F_PARSER_TaskAdVehicleInsertPayload (body: any, options: Options): T_Task_Ad_Vehicle_FindNew_Insert {
  const { maxPriceValue } = options

  if (typeof body !== 'object') throw Error('body is not an object structure')

  const _task_target = isEnumValue(body._task_target, E_TARGET)
  if (!_task_target) throw Error('Missing or invalid target')

  const _task_adEntityType = isEnumValue(body._task_adEntityType, E_AD_ENTITY_TYPE)
  if (!_task_adEntityType) throw Error('Missing or invalid ad entity')

  const _task_schedule = isTaskSchedule(body._task_schedule, options)
  if (_task_schedule === null) throw Error('Missing or invalid task schedule object')

  // Optional - can be null
  const _task_notes = isNonEmptyString(body._task_notes)

  const _price_min = isNumber(body._price_min, { minValue: 0 })
  const _price_max = isNumber(body._price_max, { minValue: _price_min ?? 1, maxValue: maxPriceValue })

  return {
    _task_adEntityType,
    _task_schedule,
    _task_target,
    _task_notes,
    _price_min,
    _price_max,
  }
}

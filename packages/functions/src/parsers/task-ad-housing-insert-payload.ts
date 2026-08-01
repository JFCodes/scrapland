import {
  type T_Task_Ad_Housing_FindNew_Insert,
  CONST_T_AD_HOUSING_BUILDING_TYPE,
  E_AD_ENTITY_TYPE,
  E_TARGET,
} from '@scrapland/data-model'
// App
import { isNonEmptyString,  isEnumValue, isArrayOf, isTaskSchedule } from '../validators'

type Options = {
  minIntervalEveryMs: number
}

// TODO: custom target validations
// Example: some targets don't allow not having building types, or only allow one, etc...

export function F_PARSER_TaskAdHousingInsertPayload (body: any, options: Options): T_Task_Ad_Housing_FindNew_Insert {
  if (typeof body !== 'object') throw Error('body is not an object structure')

  const _task_target = isEnumValue(body._task_target, E_TARGET)
  if (!_task_target) throw Error('Missing or invalid target')

  const _task_adEntityType = isEnumValue(body._task_adEntityType, E_AD_ENTITY_TYPE)
  if (!_task_adEntityType) throw Error('Missing or invalid ad entity')

  const location = isNonEmptyString(body.location)
  if (location === null) throw Error('Task must provide a non empty location value')

  const buildingTypes = isArrayOf(body.buildingTypes, CONST_T_AD_HOUSING_BUILDING_TYPE)
  if (buildingTypes === null) throw Error('Missing or invalid set of building type values')

  const _task_schedule = isTaskSchedule(body._task_schedule, options)
  if (_task_schedule === null) throw Error('Missing or invalid task schedule object')

  // Optional - can be null
  const _task_notes = isNonEmptyString(body._task_notes)

  return {
    _task_adEntityType,
    _task_schedule,
    _task_target,
    _task_notes,
    buildingTypes,
    location,
  }
}

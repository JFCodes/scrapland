import { integer, text } from 'drizzle-orm/sqlite-core'
// App
import { getEntityBaseSchemaFields } from '../base-schema-fields'
import { E_TASK_STATUS, E_TASK_TYPE } from './enums'
import { E_TARGET } from '../targets/enums'
import { T_Task_Schedule } from './types'
import { E_ENTITY_TYPE } from '../enums'
import { E_AD_ENTITY_TYPE } from '../ads'

export function getTaskBaseSchemaFields (adEntityType: E_AD_ENTITY_TYPE, taskType: E_TASK_TYPE) {
  return {
    ...getEntityBaseSchemaFields(E_ENTITY_TYPE.TASK),
    _task_adEntityType: text('_task_adEntityType').notNull().$type<E_AD_ENTITY_TYPE>().$default(() => adEntityType),
    _task_status: text('_task_status').notNull().$type<E_TASK_STATUS>().$default(() => E_TASK_STATUS.DRAFT),
    _task_running: integer('isRunning', { mode: 'boolean' }).notNull().$default(() => false),
    _task_type: text('_task_type').notNull().$type<E_TASK_TYPE>().$default(() => taskType),
    _task_schedule: text('', { mode: 'json' }).notNull().$type<T_Task_Schedule>(),
    _task_target: text('_task_target').notNull().$type<E_TARGET>(),
    _task_notes: text('_task_notes'),
  }
}

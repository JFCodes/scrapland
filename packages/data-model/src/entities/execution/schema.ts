import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
// App
import type { T_Execution_StatusHistory, T_Execution_Summary } from './types'
import { getEntityBaseSchemaFields } from '../base-schema-fields'
import { E_EXECUTION_STATUS } from './enums'
import { E_ENTITY_TYPE } from '../enums'

export const DBSchema_Execution = sqliteTable('execution', {
  ...getEntityBaseSchemaFields(E_ENTITY_TYPE.EXECUTION),
  statusHistory: text('statusHistory', { mode: 'json' }).notNull().$type<Array<T_Execution_StatusHistory>>().$default(() => []),
  summary: text('summary', { mode: 'json' }).$type<T_Execution_Summary>(),
  status: text('status').notNull().$type<E_EXECUTION_STATUS>(),
  failureReason: text('failureReason'),
  finishedAt: integer('finishedAt'),
  abortReason: text('abortReason'),
  taskId: text('taskId').notNull(),
  startedAt: integer('startedAt'),
})

export type T_Execution = typeof DBSchema_Execution.$inferSelect
export type T_Execution_Insert =  typeof DBSchema_Execution.$inferInsert
export type T_Execution_Patch = Partial<Omit<T_Execution,
  | '_id'
  | '_entityType'
  | '_createdAt'
  | '_updatedAt'
  | 'statusHistory'
>>

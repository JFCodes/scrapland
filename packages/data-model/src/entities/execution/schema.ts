import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
// // App
import { getEntityBaseSchemaFields } from '../base-schema-fields'
import { E_EXECUTION_STATUS } from './enums'
import { E_ENTITY_TYPE } from '../enums'

export const DBSchema_Execution = sqliteTable('execution', {
  ...getEntityBaseSchemaFields(E_ENTITY_TYPE.EXECUTION),
  status: text('status').notNull().$type<E_EXECUTION_STATUS>(),
  taskId: text('taskId').notNull(),
})

export type T_Execution = typeof DBSchema_Execution.$inferSelect
export type T_Execution_Insert =  typeof DBSchema_Execution.$inferInsert
export type T_Execution_Patch = Partial<Omit<T_Execution,
  | '_id'
  | '_entityType'
  | '_createdAt'
  | '_updatedAt'
>>

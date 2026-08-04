import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
// App
import { E_AD_ENTITY_TYPE, type T_Ad_Housing_BuildingType, type T_Ad_Housing_Operation } from '../../ads'
import { getTaskPriceSchemaFields} from '../_price-schema-fields'
import { getTaskBaseSchemaFields } from '../_base-schema-fields'
import { E_TASK_TYPE } from '../enums'

export const DBSchema_Task_Ad_Housing_FindNew = sqliteTable('task-ad-housing-find-new', {
  ...getTaskBaseSchemaFields(E_AD_ENTITY_TYPE.HOUSING, E_TASK_TYPE.FIND_NEW_ADS),
  ...getTaskPriceSchemaFields(),
  buildingTypes: text('buildingTypes', { mode: 'json' }).$type<Array<T_Ad_Housing_BuildingType>>(),
  operation: text('operation').$type<T_Ad_Housing_Operation>(),
  location: text('location').notNull(),  
})

export type T_Task_Ad_Housing_FindNew = typeof DBSchema_Task_Ad_Housing_FindNew.$inferSelect
export type T_Task_Ad_Housing_FindNew_Insert =  typeof DBSchema_Task_Ad_Housing_FindNew.$inferInsert
export type T_Task_Ad_Housing_FindNew_Patch = Partial<Omit<T_Task_Ad_Housing_FindNew,
  | '_id'
  | '_entityType'
  | '_createdAt'
  | '_updatedAt'
  | '_task_running'
  | '_task_type'
  | '_task_target'
>>

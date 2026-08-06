import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
// App
import { E_AD_ENTITY_TYPE } from '../../ads'
import { getTaskPriceSchemaFields} from '../_price-schema-fields'
import { getTaskBaseSchemaFields } from '../_base-schema-fields'
import { E_TASK_TYPE } from '../enums'

export const DBSchema_Task_Ad_Vehicle_FindNew = sqliteTable('task-ad-vehicle-find-new', {
  ...getTaskBaseSchemaFields(E_AD_ENTITY_TYPE.VEHICLE, E_TASK_TYPE.FIND_NEW_ADS),
  ...getTaskPriceSchemaFields(),
  brand: text('brand'),
  model: text('model'),
})

export type T_Task_Ad_Vehicle_FindNew = typeof DBSchema_Task_Ad_Vehicle_FindNew.$inferSelect
export type T_Task_Ad_Vehicle_FindNew_Insert =  typeof DBSchema_Task_Ad_Vehicle_FindNew.$inferInsert
export type T_Task_Ad_Vehicle_FindNew_Patch = Partial<Omit<T_Task_Ad_Vehicle_FindNew,
  | '_id'
  | '_entityType'
  | '_createdAt'
  | '_updatedAt'
  | '_task_running'
  | '_task_type'
  | '_task_target'
>>

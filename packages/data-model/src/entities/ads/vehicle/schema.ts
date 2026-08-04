import { sqliteTable } from 'drizzle-orm/sqlite-core'
// App
import { getAdBaseSchemaFields } from '../base-schema-fields'
import { E_AD_ENTITY_TYPE } from '../enums'

export const DBSchema_Ad_Vehicle = sqliteTable('ad-vehicle-schema', {
  ...getAdBaseSchemaFields(E_AD_ENTITY_TYPE.HOUSING),
})

export type T_Ad_Vehicle = typeof DBSchema_Ad_Vehicle.$inferSelect
export type T_Ad_Vehicle_Insert =  typeof DBSchema_Ad_Vehicle.$inferInsert
export type T_Ad_Vehicle_Patch = Partial<Omit<T_Ad_Vehicle,
  | '_id'
  | '_entityType'
  | '_createdAt'
  | '_updatedAt'
  | '_ad_targetAndId'
  | '_ad_target'
  | '_ad_targetId'
  | '_ad_housing_buildingTypes'
  | '_ad_housing_operation'
>>

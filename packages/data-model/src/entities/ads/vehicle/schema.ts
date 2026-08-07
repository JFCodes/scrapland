import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
// App
import { getAdBaseSchemaFields } from '../base-schema-fields'
import type { T_Ad_Vehicle_PricePosition } from './types'
import { E_AD_ENTITY_TYPE } from '../enums'

export const DBSchema_Ad_Vehicle = sqliteTable('ad-vehicle-schema', {
  ...getAdBaseSchemaFields(E_AD_ENTITY_TYPE.VEHICLE),
  // META fields
  _ad_vehicle_brand: text('_ad_vehicle_brand'),
  _ad_vehicle_model: text('_ad_vehicle_model'),
  // Proper fields
  images: text('images', { mode: 'json' }).notNull().$type<Array<string>>(),
  pricePosition: text('pricePosition').$type<T_Ad_Vehicle_PricePosition>(),
  sellerWebsite: text('sellerWebsite'),
  price: integer('price').notNull(),
  enginePower: text('enginePower'),
  engineSize: text('engineSize'),
  sellerName: text('sellerName'),
  fuelType: text('fuelType'),
  url: text('url').notNull(),
  gearbox: text('gearbox'),
  version: text('version'),
  mileage: text('mileage'),
  brand: text('brand'),
  title: text('title'),
  model: text('model'),
  year: text('year'),
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

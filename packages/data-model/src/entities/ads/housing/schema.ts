import { sqliteTable, integer, text} from 'drizzle-orm/sqlite-core'
// App
import { getAdBaseSchemaFields } from '../base-schema-fields'
import { T_Ad_Housing_BuildingType, T_Ad_Housing_Operation } from './types'
import { E_AD_ENTITY_TYPE } from '../enums'

export const DBSchema_Ad_Housing = sqliteTable('ad-housing-schema', {
  ...getAdBaseSchemaFields(E_AD_ENTITY_TYPE.HOUSING),
  // META fields
  _ad_housing_buildingTypes: text('_ad_housing_buildingTypes', { mode: 'json' }).notNull().$type<Array<T_Ad_Housing_BuildingType>>(),
  _ad_housing_operation: text('adOperation').notNull().$type<T_Ad_Housing_Operation>(),
  // Actual ad fields - Only fields to update on upsert
  active: integer('active', { mode: 'boolean' }).notNull().$default(() => true),
  descriptionShort: text('descriptionShort').notNull(),
  constructionYear: integer('constructionYear'),
  price: integer('price').notNull(),
  url: text('url').notNull(),
  // Area
  areaBuilt: integer('areaBuildArea'),
  areaLiving: integer('areaLiving').notNull(),
  areaTotal: integer('totalArea').notNull(),
  // Location
  locationIsExact: integer('locationIsExact', { mode: 'boolean' }).notNull(),
  locationLocalZone: text('locationLocalZone').notNull(),
  locationZipCode: text('locationZipCode').notNull(),
  locationAddress: text('locationAddress').notNull(),
  locationRegion: text('locationRegion').notNull(),
  locationLongitude: integer('locationLongitude'),
  locationLatitude: integer('locationLatitude'),
  // Typology
  typologyHasParking: integer('typologyHasParking', { mode: 'boolean' }),
  typologyHasGarage: integer('typologyHasGarage', { mode: 'boolean' }),
  typologyBedrooms: integer('typologyBedrooms').notNull(),
  typologyBathrooms: integer('typologyBathrooms'),
  typologyOtherRooms: integer('typologyOtherRooms'),
  typologyTotalRooms: integer('typologyTotalRooms'),
  typologyParkingSpots: integer('typologyParkingSpots'),
  // Contacts
  contactAgencyContact: text('contactAgencyContact').notNull(),
  contactAgencyName: text('contactAgencyName').notNull(),
  contactUserContact: text('contactUserContact').notNull(),
  contactUsername: text('contactUsername').notNull(),
  // Images
  images: text('images', { mode: 'json' }).notNull().$type<Array<string>>(),
  imageMain: text('imageMain'),
})

export type T_Ad_Housing = typeof DBSchema_Ad_Housing.$inferSelect
export type T_Ad_Housing_Insert =  typeof DBSchema_Ad_Housing.$inferInsert
export type T_Ad_Housing_Patch = Partial<Omit<T_Ad_Housing,
  | '_id'
  | '_entityType'
  | '_createdAt'
  | '_updatedAt'
  | '_ad_entityType'
  | '_ad_targetAndId'
  | '_ad_target'
  | '_ad_targetId'
  | '_ad_housing_buildingTypes'
  | '_ad_housing_operation'
>>

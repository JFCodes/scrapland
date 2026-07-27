import { integer, text } from 'drizzle-orm/sqlite-core'
// App
import { getEntityBaseSchemaFields } from '../base-schema-fields'
import { E_AD_ENTITY_TYPE, E_AD_STATUS } from './enums'
import { E_ENTITY_TYPE } from '../enums'
import { E_TARGET } from '../targets/enums'

export function getAdBaseSchemaFields (adType: E_AD_ENTITY_TYPE) {
  return {
    ...getEntityBaseSchemaFields(E_ENTITY_TYPE.AD),
    _ad_status: text('_ad_status').notNull().$type<E_AD_STATUS>().$default(() => E_AD_STATUS.NEW),
    _ad_type: text('_ad_type').notNull().$type<E_AD_ENTITY_TYPE>().$default(() => adType),
    _ad_targetAndId: text('_ad_targetAndId').notNull().unique(),
    _ad_target: text('_ad_target').notNull().$type<E_TARGET>(),
    _ad_targetId: text('_ad_targetId').notNull(),
    _ad_proposalBid: integer('_ad_proposalBig'),
    _ad_taskId: text('_ad_taskId').notNull(),
    _ad_notes: text('_ad_notes'),
  }
}

import { integer, text } from 'drizzle-orm/sqlite-core'
// App
import { E_ENTITY_TYPE } from './enums'

export function getEntityBaseSchemaFields (scraplandEntityType: E_ENTITY_TYPE) {
  return {
    _id: text('_id').primaryKey().$default(() => crypto.randomUUID()),
    _entityType: text('_entityType').notNull().$type<E_ENTITY_TYPE>().$default(() => scraplandEntityType),
    _createdAt: integer('_createdAt').notNull().$default(() => new Date().getTime()),
    _updatedAt: integer('_updatedAt').notNull().$default(() => new Date().getTime()),
    _deletedAt: integer('_deletedAt'),
  }
}

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
// App
import { getEntityBaseSchemaFields } from '../base-schema-fields'
import type { T_AppSettings } from './types'
import { E_ENTITY_TYPE } from '../enums'

export const DBSchema_AppSettings = sqliteTable('settings', {
  ...getEntityBaseSchemaFields(E_ENTITY_TYPE.APP_SETTINGS),

  overrides: text('overrides', { mode: 'json' })
    .$type<Partial<T_AppSettings>>()
    .notNull(),

  updatedAt: integer('updatedAt')
    .notNull()
    .$defaultFn(() => Date.now()),
})

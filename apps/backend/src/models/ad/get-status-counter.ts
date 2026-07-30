import type { AnySQLiteColumn, AnySQLiteTable } from 'drizzle-orm/sqlite-core'
import { count } from 'drizzle-orm'
// App
import { db } from '../../database'

type SchemaWithAdStatus = AnySQLiteTable & { _ad_status: AnySQLiteColumn }
type AdStatusOf<TSchema extends SchemaWithAdStatus> = TSchema['_ad_status']['_']['data']
type Result<TSchema extends SchemaWithAdStatus> = Map<AdStatusOf<TSchema>, number>

export function getStatusCounter <TSchema extends SchemaWithAdStatus>(schema: TSchema): Result<TSchema> {
  const result = db
    .select({ status: schema._ad_status, count: count() })
    .from(schema)
    .groupBy(schema._ad_status)
    .all()

  const map = new Map<AdStatusOf<TSchema>, number>()
  result.forEach(row => map.set(row.status, row.count))

  return map
}
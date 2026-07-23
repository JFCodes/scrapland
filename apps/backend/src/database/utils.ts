import type { SQLiteColumn } from 'drizzle-orm/sqlite-core'
import { sql, type SQL } from 'drizzle-orm'

export function excluded<TColumn extends SQLiteColumn>(column: TColumn): SQL<TColumn['_']['data']> {
  return sql.raw(`excluded.${column.name}`)
}

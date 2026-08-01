import { integer } from 'drizzle-orm/sqlite-core'

export function getTaskPriceSchemaFields () {
  return {
    _price_min: integer('_price_min'),
    _price_max: integer('_price_max'),
  }
}

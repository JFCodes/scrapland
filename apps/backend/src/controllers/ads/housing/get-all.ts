import type { E_AD_STATUS, T_API_RESPONSE_Ads_Housing } from '@scrapland/data-model'
import { DBSchema_Ad_Housing } from '@scrapland/data-model'
import type { Request, Response } from 'express'
import { desc, or, eq, type SQL } from 'drizzle-orm'
// App
import { getPaginatedResponse } from '../../../utils/get-paginated-response'
import { getPagination } from '../../../utils/get-pagination-query'
import { db } from '../../../database'

export function controller(req: Request, res: Response<T_API_RESPONSE_Ads_Housing>) {
  const adsHousing = db
    .select()
    .from(DBSchema_Ad_Housing)
    .where(getWhereClause(req))
    .orderBy(desc(DBSchema_Ad_Housing._createdAt))
    .all()

  const pagination = getPagination(req)

  const paginated = getPaginatedResponse(adsHousing, pagination)
  res.status(200).json(paginated)
}

function getWhereClause (req: Request): undefined | SQL {
  const { adStatus: adStatusQuery } = req.query

  if (!adStatusQuery) return undefined

  const adStatus = Array.isArray(adStatusQuery)
    ? adStatusQuery.map(v => String(v))
    : typeof adStatusQuery === 'string' ? [adStatusQuery] : []
  if (adStatus.length === 0) return undefined

  const eqCondition = (status: string) => eq(DBSchema_Ad_Housing._ad_status, status as E_AD_STATUS)
  const conditions: Array<SQL> = []
  adStatus.forEach(status => conditions.push(eqCondition(status)))

  return or(...conditions)
}
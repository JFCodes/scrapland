import { E_AD_STATUS, type T_API_RESPONSE_Ads_StatusCounter } from '@scrapland/data-model'
import { DBSchema_Ad_Vehicle } from '@scrapland/data-model'
import { F_GetEnumCounters } from '@scrapland/functions'
import type { Request, Response } from 'express'
// App
import { getStatusCounter } from '../../../models/ad/get-status-counter'

export function controller(req: Request, res: Response<T_API_RESPONSE_Ads_StatusCounter>) {
  const map = getStatusCounter(DBSchema_Ad_Vehicle)
  const counters = F_GetEnumCounters(E_AD_STATUS, map)
  res.status(200).json({ counters: counters })
}

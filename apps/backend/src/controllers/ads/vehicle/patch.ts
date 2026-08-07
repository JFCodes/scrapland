import type { T_API_Response_Ad_Vehicle } from '@scrapland/data-model'
import { DBSchema_Ad_Vehicle } from '@scrapland/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../../../database'
import { eq } from 'drizzle-orm'

export function controller(req: Request, res: Response<T_API_Response_Ad_Vehicle>) {
  const adId = req.params.adId
  if (typeof adId !== 'string' || !adId) return res.sendStatus(400)

  // TODO: payload validation
  const payload = req.body
  if (typeof payload !== 'object') return res.sendStatus(400)

  const idMatchClause = eq(DBSchema_Ad_Vehicle._id, adId)

  const ad = db
    .select()
    .from(DBSchema_Ad_Vehicle)
    .where(idMatchClause)
    .all()[0]

  if (!ad) return res.sendStatus(404)

  const updated = db
    .update(DBSchema_Ad_Vehicle)
    .set(payload)
    .where(idMatchClause)
    .returning()
    .get()

  return res.status(200).json(updated)
}

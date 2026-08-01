import { DBSchema_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
import type { T_API_RESPONSE_Tasks } from '@scrapland/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../../database'

export function controller(_: Request, res: Response<T_API_RESPONSE_Tasks>) {
  const tasks = db.select().from(DBSchema_Task_Ad_Housing_FindNew).all()

  res.status(200).json(tasks)
}

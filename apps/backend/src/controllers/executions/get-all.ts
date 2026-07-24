import type { T_API_RESPONSE_Executions } from '@scrapland/data-model'
import { DBSchema_Execution } from '@scrapland/data-model'
import type { Request, Response } from 'express'
import { desc } from 'drizzle-orm'
// App
import { getPaginatedResponse } from '../../utils/get-paginated-response'
import { getPagination } from '../../utils/get-pagination-query'
import { db } from '../../database'

export function controller(req: Request, res: Response<T_API_RESPONSE_Executions>) {

  const executions = db
    .select()
    .from(DBSchema_Execution)
    .orderBy(desc(DBSchema_Execution._createdAt))
    .all()

  const pagination = getPagination(req)

  const paginated = getPaginatedResponse(executions, pagination)
  res.status(200).json(paginated)
}

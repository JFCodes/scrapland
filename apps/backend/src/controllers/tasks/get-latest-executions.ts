import type { T_API_RESPONSE_Executions } from '@scrapland/data-model'
import type { Request, Response } from 'express'
// App
import { getTaskLatestExecutions } from '../../models/execution/get-task-latests-executions'
import { getPaginatedResponse } from '../../utils/get-paginated-response'
import { missingOrInvalidQuery } from '../../utils/send-error-response'
import { getPagination } from '../../utils/get-pagination-query'

export function controller(req: Request, res: Response<T_API_RESPONSE_Executions>) {
  const taskId = req.query.taskId
  if (typeof taskId !== 'string' || !taskId) return missingOrInvalidQuery({ req, res, name: 'taskId' })

  const executions = getTaskLatestExecutions(taskId)

  const pagination = getPagination(req)
  const paginated = getPaginatedResponse(executions, pagination)

  res.status(200).json(paginated)
}

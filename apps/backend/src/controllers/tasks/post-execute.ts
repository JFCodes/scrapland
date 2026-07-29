import { DBSchema_Task_Ad_Housing_FindNew, E_ENTITY_TYPE, E_TASK_STATUS } from '@scrapland/data-model'
import type { T_API_RESPONSE_Execution } from '@scrapland/data-model'
import type { Request, Response } from 'express'
import { eq } from 'drizzle-orm'
// App
import { missingOrInvalidParam, missingResource, taskErrors } from '../../utils/send-error-response'
import { getWsClientIdHeader } from '../../utils/get-ws-client-id-header'
import { ExecutionQueue } from '../../instances/execution-queue'
import { WebsocketRegistry } from '../../websocket/registry'
import { db } from '../../database'

export async function controller(req: Request, res: Response<T_API_RESPONSE_Execution>) {

  const taskId = req.params.taskId
  if (!taskId || typeof taskId !== 'string') return missingOrInvalidParam({ req, res, param: 'task-id' })

  const task = db
    .select()
    .from(DBSchema_Task_Ad_Housing_FindNew)
    .where(eq(DBSchema_Task_Ad_Housing_FindNew._id, taskId))
    .all()[0]

  if (!task) return missingResource({ req, res, resource: E_ENTITY_TYPE.TASK, selector: taskId })
  if (task._task_status !== E_TASK_STATUS.PUBLISHED) {
    return taskErrors.cannotExecuteNonPublished({ req, res, taskId, status: task._task_status })
  }

  const wsClientId = getWsClientIdHeader(req)

  const execution = ExecutionQueue.queueTask(task)
  if (!execution) return taskErrors.failedToScheduleExecution({ req, res, taskId })

  if (wsClientId) {
    WebsocketRegistry.broadcast(wsClientId, {
      type: 'execution-queued',
      payload: execution,
    })
  }

  res.status(200).json(execution)
}

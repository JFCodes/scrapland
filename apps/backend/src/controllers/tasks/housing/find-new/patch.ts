import type { T_API_RESPONSE_Task_Housing_FindNew, T_Task_Ad_Housing_FindNew_Patch } from '@scrapland/data-model'
import { DBSchema_Task_Ad_Housing_FindNew, E_ENTITY_TYPE } from '@scrapland/data-model'
import type { Request, Response } from 'express'
import { eq } from 'drizzle-orm'
// App
import { missingOrInvalidParam, missingResource, taskErrors } from '../../../../utils/send-error-response'
import { db } from '../../../../database'

export async function controller(req: Request, res: Response<T_API_RESPONSE_Task_Housing_FindNew>) {

  const taskId = req.params.taskId
  if (!taskId || typeof taskId !== 'string') return missingOrInvalidParam({ req, res, name: 'task-id' })

  const taskQuery = db
    .select()
    .from(DBSchema_Task_Ad_Housing_FindNew)
    .where(eq(DBSchema_Task_Ad_Housing_FindNew._id, taskId))
    .all()

  const task = taskQuery[0]
  if (!task) return missingResource({ req, res, resource: E_ENTITY_TYPE.TASK, selector: taskId })

  // TODO: payload validation
  const payload = req.body as T_Task_Ad_Housing_FindNew_Patch

  const patched = await db
    .update(DBSchema_Task_Ad_Housing_FindNew)
    .set(payload)
    .where(eq(DBSchema_Task_Ad_Housing_FindNew._id, taskId))
    .returning()

  if (!patched[0]) return taskErrors.failedToPatch({req, res, taskId })

  res.status(200).json(patched[0])
}


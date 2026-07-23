import { DBSchema_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
import type { T_API_RESPONSE_Execution } from '@scrapland/data-model'
import type { Request, Response } from 'express'
import { eq } from 'drizzle-orm'
// App
import { ExecutionQueue } from '../../instances/execution-queue'
import { db } from '../../database'

export async function controller(req: Request, res: Response<T_API_RESPONSE_Execution>) {
  
  const taskId = req.params.taskId
  if (!taskId || typeof taskId !== 'string') return res.sendStatus(400)

  const task = db
    .select()
    .from(DBSchema_Task_Ad_Housing_FindNew)
    .where(eq(DBSchema_Task_Ad_Housing_FindNew._id, taskId))
    .all()[0]

  if (!task) return res.sendStatus(404)

  // await ExecutionQueue.resetExecutions()

  const execution = ExecutionQueue.queueTask(task)
  if (!execution) return res.sendStatus(500)

  res.status(200).json(execution)
}

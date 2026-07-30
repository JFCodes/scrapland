import {
  E_EXECUTION_STATUS,
  DBSchema_Execution,
  type T_Execution,
  type T_Task,
  T_Execution_StatusHistory
} from '@scrapland/data-model'
// App
import { db } from '../../database'

export function createTaskExecution (task: T_Task): null | T_Execution {

  const statusHistory: Array<T_Execution_StatusHistory> = [
    { date: new Date().getTime(), status: E_EXECUTION_STATUS.QUEUED }
  ]

  const executions = db
    .insert(DBSchema_Execution)
    .values({
      status: E_EXECUTION_STATUS.QUEUED,
      taskId: task._id,
      statusHistory,
    })
    .returning()
    .all()

  return executions[0] ?? null
}
import {
  E_EXECUTION_STATUS,
  DBSchema_Execution,
  type T_Execution,
  type T_Task
} from '@scrapland/data-model'
// App
import { db } from '../../database'

export function createTaskExecution (task: T_Task): null | T_Execution {
  const executions = db
    .insert(DBSchema_Execution)
    .values({ status: E_EXECUTION_STATUS.QUEUED, taskId: task._id })
    .returning()
    .all()

  return executions[0] ?? null
}
import { E_EXECUTION_STATUS, DBSchema_Execution, type T_Execution } from '@scrapland/data-model'
import { and, eq, or } from 'drizzle-orm'
// App
import { db } from '../../database'

export function getTaskInQueueOrRunning (taskId: string): null | T_Execution {
  const whereClause = and(
    eq(DBSchema_Execution.taskId, taskId),
    or(
      eq(DBSchema_Execution.status, E_EXECUTION_STATUS.RUNNING),
      eq(DBSchema_Execution.status, E_EXECUTION_STATUS.QUEUED),
    )
  )

  const executions = db
    .select()
    .from(DBSchema_Execution)
    .where(whereClause)
    .all()

  return executions[0] ?? null
}

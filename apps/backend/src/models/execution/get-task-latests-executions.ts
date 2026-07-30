import { DBSchema_Execution, type T_Execution } from '@scrapland/data-model'
import { eq } from 'drizzle-orm'
// App
import { db } from '../../database'

export function getTaskLatestExecutions (taskId: string): Array<T_Execution>  {
  return db
    .select()
    .from(DBSchema_Execution)
    .where(eq(DBSchema_Execution.taskId, taskId))
    .all()
}

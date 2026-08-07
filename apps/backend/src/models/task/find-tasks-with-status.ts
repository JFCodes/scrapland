import type { AnySQLiteColumn, AnySQLiteTable } from 'drizzle-orm/sqlite-core'
import { or, eq } from 'drizzle-orm'
import {
  type T_Task,
  DBSchema_Task_Ad_Housing_FindNew,
  DBSchema_Task_Ad_Vehicle_FindNew,
  E_TASK_STATUS,
} from '@scrapland/data-model'
// App
import { db } from '../../database'

type SchemaWithAdStatus = AnySQLiteTable & { _task_status: AnySQLiteColumn }

function queryStatusDb <TSchema extends SchemaWithAdStatus> (
  tableSchema: TSchema,
  status: Array<E_TASK_STATUS>
): Array<TSchema['$inferSelect']> {

  const orClauses = status.map(status => eq(tableSchema._task_status, status))
  return db
    .select()
    .from(tableSchema)
    .where(or(...orClauses))
    .all()
}

export function findTaskWithStatus <T> (status: Array<E_TASK_STATUS>): Array<T_Task> {

  const vehicleFindNewTasks = queryStatusDb(DBSchema_Task_Ad_Vehicle_FindNew, status)
  const housingFindNewTasks = queryStatusDb(DBSchema_Task_Ad_Housing_FindNew, status)

  return [
    ...vehicleFindNewTasks,
    ...housingFindNewTasks
  ]
}

import {
  type T_Task,
  DBSchema_Task_Ad_Housing_FindNew
} from '@scrapland/data-model'
import { eq } from 'drizzle-orm'
// App
import { db } from '../../database'

export function findTaskWithId (taskId: string): null | T_Task {
  // Ad housing find new
  const adHousingFindNew = db
    .select()
    .from(DBSchema_Task_Ad_Housing_FindNew)
    .where(eq(DBSchema_Task_Ad_Housing_FindNew._id, taskId))
    .all()[0]

  if(adHousingFindNew) return adHousingFindNew

  return null
}
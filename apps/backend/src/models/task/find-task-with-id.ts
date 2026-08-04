import {
  type T_Task,
  DBSchema_Task_Ad_Housing_FindNew,
  DBSchema_Task_Ad_Vehicle_FindNew
} from '@scrapland/data-model'
import { eq } from 'drizzle-orm'
// App
import { db } from '../../database'

export function findTaskWithId (taskId: string): null | T_Task {
  const housingQuery = db
    .select()
    .from(DBSchema_Task_Ad_Housing_FindNew)
    .where(eq(DBSchema_Task_Ad_Housing_FindNew._id, taskId))
    .get()
  
  if (housingQuery) return housingQuery

  const vehicleQuery = db
    .select()
    .from(DBSchema_Task_Ad_Vehicle_FindNew)
    .where(eq(DBSchema_Task_Ad_Vehicle_FindNew._id, taskId))
    .get()
  
  if (vehicleQuery) return vehicleQuery

  return null
}
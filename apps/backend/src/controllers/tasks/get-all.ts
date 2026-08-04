import { DBSchema_Task_Ad_Housing_FindNew, DBSchema_Task_Ad_Vehicle_FindNew } from '@scrapland/data-model'
import type { T_API_RESPONSE_Tasks } from '@scrapland/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../../database'

export function controller(_: Request, res: Response<T_API_RESPONSE_Tasks>) {
  const housingTasks = db.select().from(DBSchema_Task_Ad_Housing_FindNew).all()
  const vehicleTasks = db.select().from(DBSchema_Task_Ad_Vehicle_FindNew).all()

  const tasks = [...housingTasks, ...vehicleTasks]
  tasks.sort((a, b) => b._createdAt - a._createdAt)

  res.status(200).json(tasks)
}

import { F_PARSER_TaskAdVehicleInsertPayload } from '@scrapland/functions'
import type { Request, Response } from 'express'
import {
  type T_Task_Ad_Vehicle_FindNew_Insert,
  DBSchema_Task_Ad_Vehicle_FindNew,
  E_ENTITY_TYPE,
} from '@scrapland/data-model'
// App
import { failedToInsertEntity, taskErrors } from '../../../../utils/send-error-response'
import { AppSettings } from '../../../../instances/app-settings'
import { Scheduler } from '../../../../instances/scheduler'
import { db } from '../../../../database'

export async function controller(req: Request, res: Response) {
  let insert: T_Task_Ad_Vehicle_FindNew_Insert

  try {
    const minIntervalEveryMs = AppSettings.settings.TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE
    const maxPriceValue = AppSettings.settings.VEHICLE_TASK_PRICE_MAX_VALUE

    insert = F_PARSER_TaskAdVehicleInsertPayload(req.body, {
      minIntervalEveryMs,
      maxPriceValue
    })
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return taskErrors.failedToCreate({ req, res, errorMessage })
  }

  const inserted = db
    .insert(DBSchema_Task_Ad_Vehicle_FindNew)
    .values(insert)
    .returning()
    .get()

  if (!inserted) return failedToInsertEntity({ req, res, entity: E_ENTITY_TYPE.TASK })

  Scheduler.updateTask(inserted)
  res.status(201).json(inserted)
}

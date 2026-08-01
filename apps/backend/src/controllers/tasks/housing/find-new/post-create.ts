import { DBSchema_Task_Ad_Housing_FindNew, E_ENTITY_TYPE, T_Task_Ad_Housing_FindNew_Insert } from '@scrapland/data-model'
import { F_PARSER_TaskAdHousingInsertPayload } from '@scrapland/functions'
import type { Request, Response } from 'express'
// App
import { failedToInsertEntity, taskErrors } from '../../../../utils/send-error-response'
import { AppSettings } from '../../../../instances/app-settings'
import { db } from '../../../../database'

export async function controller(req: Request, res: Response) {
  let insert: T_Task_Ad_Housing_FindNew_Insert
  try {
    const minIntervalEveryMs = AppSettings.settings.TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE
    insert = F_PARSER_TaskAdHousingInsertPayload(req.body, { minIntervalEveryMs })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return taskErrors.failedToCreate({ req, res, errorMessage })
  }

  const inserted = db
    .insert(DBSchema_Task_Ad_Housing_FindNew)
    .values(insert)
    .returning()
    .get()

  if (!inserted) return failedToInsertEntity({ req, res, entity: E_ENTITY_TYPE.TASK })

  res.status(201).json(inserted)
}

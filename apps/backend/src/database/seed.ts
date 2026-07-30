import {
  DBSchema_Task_Ad_Housing_FindNew,
  E_TASK_SCHEDULE_TYPE,
  E_TARGET,
  E_TASK_STATUS
} from '@scrapland/data-model'
// App
import { db } from './'

export async function seedDatabase (): Promise<void> {
  const taskAdHousingFindNew = db.select().from(DBSchema_Task_Ad_Housing_FindNew).all()

  const hasRemaxPortugal = taskAdHousingFindNew.some(d => d._task_target === E_TARGET.REMAX_PORTUGAL)
  if (!hasRemaxPortugal) await seedRemaxPortugal()
}

async function seedRemaxPortugal (): Promise<void> {
  await db.insert(DBSchema_Task_Ad_Housing_FindNew).values({
    _task_target: E_TARGET.REMAX_PORTUGAL,
    _task_schedule: { type: E_TASK_SCHEDULE_TYPE.MANUAL },
    _task_status: E_TASK_STATUS.PUBLISHED,
    buildingTypes: ['single-house'],
    location: 'leiria/leiria/r',
    operation: 'buy'
  })
}
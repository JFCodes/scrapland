import {
  DBSchema_Task_Ad_Housing_FindNew,
  DBSchema_Ad_Housing,
  E_TASK_SCHEDULE_TYPE,
  E_TARGET
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
    buildingTypes: ['single-house'],
    location: 'leiria/leiria/r',
    operation: 'buy'
  })
}
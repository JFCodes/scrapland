import { eq } from 'drizzle-orm'
import {
  type T_Execution_StatusHistory,
  type T_Execution_Patch,
  type T_Execution,
  E_EXECUTION_STATUS,
  DBSchema_Execution,
} from '@scrapland/data-model'
// App
import { db } from '../../database'

const STARTING_STATUS = E_EXECUTION_STATUS.RUNNING
const FINISHING_STATUS: Array<E_EXECUTION_STATUS> = [
  E_EXECUTION_STATUS.COMPLETED,
  E_EXECUTION_STATUS.ABORTED,
  E_EXECUTION_STATUS.FAILED
]

type Options = {
  currentStatusHistory: Array<T_Execution_StatusHistory>
  otherFields?: Partial<T_Execution_Patch>
  toStatus: E_EXECUTION_STATUS
  executionId: string
}

export function setExecutionStatus (options: Options): T_Execution {
  const { currentStatusHistory, executionId, otherFields, toStatus } = options

  const statusHistory: Array<T_Execution_StatusHistory> = [
    ...currentStatusHistory,
    { status: toStatus, date: new Date().getTime() },
  ]

  const time = new Date().getTime()
  const isStarting = toStatus === STARTING_STATUS
  const isFinishing = FINISHING_STATUS.includes(toStatus)

  const payload = {
    ...otherFields,
    ...(isFinishing && { finishedAt: time }),
    ...(isStarting && { startedAt: time }),
    status: toStatus,
    statusHistory,
  }
  
  const execution = db
    .update(DBSchema_Execution)
    .set(payload)
    .where(eq(DBSchema_Execution._id, executionId))
    .returning()
    .get()

  if (!execution) throw new Error('Failed to set execution to status running')
  return execution
}
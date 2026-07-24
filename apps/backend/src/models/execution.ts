import { eq } from 'drizzle-orm'
import {
  type T_Execution_StatusHistory,
  type T_Execution,
  DBSchema_Task_Ad_Housing_FindNew,
  DBSchema_Execution,
  E_EXECUTION_STATUS,
  T_Execution_Patch,
  T_Task
} from '@scrapland/data-model'
// App
import { findTaskWithId } from './task/find-task-with-id'
import { WebsocketRegistry } from '../websocket/registry'
import { db } from '../database'

export class ExecutionModel {
  task: null | T_Task = null
  data: T_Execution

  constructor (execution: T_Execution) {
    this.data = execution
  }

  async loadTask (): Promise<void> {
    this.task = findTaskWithId(this.data.taskId)
  }

  async setRunning (): Promise<void> {
    return this
      .setStatus(E_EXECUTION_STATUS.RUNNING)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-running', payload: this.data }))
  }

  async setAborted (abortReason?: string): Promise<void> {
    const otherFields = { ...(abortReason && { abortReason })}
    return this
      .setStatus(E_EXECUTION_STATUS.ABORTED, otherFields)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-aborted', payload: this.data }))
  }

  async setFailed (failureReason?: string): Promise<void> {
    const otherFields = { ...(failureReason && { failureReason })}

    return this
      .setStatus(E_EXECUTION_STATUS.FAILED, otherFields)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-failed', payload: this.data }))
  }

  async setCompleted (): Promise<void> {
    return this
      .setStatus(E_EXECUTION_STATUS.COMPLETED)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-completed', payload: this.data }))
  }

  private async setStatus ( status: E_EXECUTION_STATUS, otherFields: Partial<T_Execution_Patch> = {}): Promise<void> {
    const statusHistory: Array<T_Execution_StatusHistory> = [
      ...this.data.statusHistory,
      { status, date: new Date().getTime() },
    ]

    const payload = { ...otherFields, statusHistory, status }
    const execution = await db
      .update(DBSchema_Execution)
      .set(payload)
      .where(eq(DBSchema_Execution._id, this.data._id))
      .returning()
      .all()[0]

    if (!execution) throw new Error('Failed to set execution to status running')
    this.data = execution
  }
}

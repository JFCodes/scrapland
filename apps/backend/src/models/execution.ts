import { eq } from 'drizzle-orm'
import {
  DBSchema_Execution,
  E_EXECUTION_STATUS,
  type T_Execution
} from '@scrapland/data-model'
// App
import { WebsocketRegistry } from '../websocket/registry'
import { db } from '../database'

export class ExecutionModel {
  data: T_Execution

  constructor (execution: T_Execution) {
    this.data = execution
  }

  async setRunning (): Promise<void> {
    return this
      .setStatus(E_EXECUTION_STATUS.RUNNING)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-running', payload: this.data }))
  }

  async setAborted (): Promise<void> {
    return this
      .setStatus(E_EXECUTION_STATUS.ABORTED)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-aborted', payload: this.data }))
  }

  async setFailed (): Promise<void> {
    return this
      .setStatus(E_EXECUTION_STATUS.FAILED)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-failed', payload: this.data }))
  }

  async setCompleted (): Promise<void> {
    return this
      .setStatus(E_EXECUTION_STATUS.COMPLETED)
      .then(() => WebsocketRegistry.broadcastAll({ type: 'execution-completed', payload: this.data }))
  }

  private async setStatus (status: E_EXECUTION_STATUS): Promise<void> {
    const execution = await db
      .update(DBSchema_Execution)
      .set({ status })
      .where(eq(DBSchema_Execution._id, this.data._id))
      .returning()
      .all()[0]

    if (!execution) throw new Error('Failed to set execution to status running')
    this.data = execution
  }
}

import {
  type T_Execution_Summary,
  type T_Execution,
  E_EXECUTION_STATUS,
  T_Execution_Patch,
  T_Task
} from '@scrapland/data-model'
// App
import { setExecutionStatus } from './execution/set-execution-status'
import { findTaskWithId } from './task/find-task-with-id'
import { WebsocketRegistry } from '../websocket/registry'

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
    this.setStatus(E_EXECUTION_STATUS.RUNNING)
    WebsocketRegistry.broadcastAll({ type: 'execution-running', payload: this.data })
  }

  async setAborted (abortReason?: string): Promise<void> {
    const otherFields = { ...(abortReason && { abortReason })}
    this.setStatus(E_EXECUTION_STATUS.ABORTED, otherFields)
    WebsocketRegistry.broadcastAll({ type: 'execution-aborted', payload: this.data })
  }

  async setFailed (failureReason?: string): Promise<void> {
    const otherFields = { ...(failureReason && { failureReason })}

    this.setStatus(E_EXECUTION_STATUS.FAILED, otherFields)
    WebsocketRegistry.broadcastAll({ type: 'execution-failed', payload: this.data })
  }

  async setCompleted (summary: T_Execution_Summary): Promise<void> {
    this.setStatus(E_EXECUTION_STATUS.COMPLETED, { summary })
    WebsocketRegistry.broadcastAll({ type: 'execution-completed', payload: this.data })
  }

  private setStatus (toStatus: E_EXECUTION_STATUS, otherFields: Partial<T_Execution_Patch> = {}): void {
    this.data = setExecutionStatus({
      executionId: this.data._id,
      currentStatusHistory: this.data.statusHistory,
      otherFields,
      toStatus,
    })
  }
}

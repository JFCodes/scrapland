import {
  DBSchema_Execution,
  E_EXECUTION_STATUS,
  type T_Execution,
  type T_Task,
} from '@scrapland/data-model'
import { and, asc, eq, or } from 'drizzle-orm'
// App
import { db } from '../database'
import { RunExecution } from './run-execution'


// TODO: this will come form a global configuration file
const MAX_CONCURRENCY = 2

class ExecutionQueueClass {
  isProcessingTick = false

  public async cleanRunningExecutions (): Promise<void> {
    await db
      .update(DBSchema_Execution)
      .set({ status: E_EXECUTION_STATUS.ABORTED })
      .where(eq(DBSchema_Execution.status, E_EXECUTION_STATUS.RUNNING))
  }

  public async resetExecutions (): Promise<void> {
    await db.delete(DBSchema_Execution)
  }

  public queueTask (task: T_Task): null | T_Execution {
    const execution = this.findTaskInQueue(task._id) || this.createTaskExecution(task)
    this.tick()
    return execution
  }

  public getRunningExecutions (): Array<T_Execution> {
    return db
      .select()
      .from(DBSchema_Execution)
      .where(eq(DBSchema_Execution.status, E_EXECUTION_STATUS.RUNNING))
      .all()
  }

  // Private
  private async tick (): Promise<void> {
    if(this.isProcessingTick) return
    const finishTick = (): void => { this.isProcessingTick = false }

    this.isProcessingTick = true

    const executingTasks = this.getRunningExecutions()
    if (executingTasks.length >= MAX_CONCURRENCY) return finishTick()

    const nextToExecute = this.nextToExecute()
    if (!nextToExecute) return finishTick()

    await this.execute(nextToExecute)
    finishTick()
    this.tick()
  }

  private async execute (execution: T_Execution): Promise<void> {
    // This update must be awaited so that tick doesn't retrigger
    // before execution status is RUNNING
    await this.setRunningStatus(execution._id)

    RunExecution(execution)
      .then(async () => {
        console.log('execution completed')
        await this.setCompletedStatus(execution._id)
        this.tick()
      })
      .catch(async () => {
        console.log('execution error')
        await this.setAbortedStatus(execution._id)
        this.tick()
      })
  }

  private findTaskInQueue (taskId: string): null | T_Execution {
    const execution = db
      .select()
      .from(DBSchema_Execution)
      .where(
        and(
          eq(DBSchema_Execution.taskId, taskId),
          or(
            eq(DBSchema_Execution.status, E_EXECUTION_STATUS.RUNNING),
            eq(DBSchema_Execution.status, E_EXECUTION_STATUS.QUEUED),
          )
        )
      ).all()

    return execution[0] ?? null
  }

  private createTaskExecution (task: T_Task): null | T_Execution {
    const created = db
      .insert(DBSchema_Execution)
      .values({
        status: E_EXECUTION_STATUS.QUEUED,
        taskId: task._id
      })
      .returning()

    return created.all()[0] ?? null
  }

  private nextToExecute (): null | T_Execution {
    // Oldest first
    return db
      .select()
      .from(DBSchema_Execution)
      .where(eq(DBSchema_Execution.status, E_EXECUTION_STATUS.QUEUED))
      .orderBy(asc(DBSchema_Execution._createdAt))
      .all()[0]
  }

  private async setRunningStatus (executionId: string): Promise<void> {
    await db
      .update(DBSchema_Execution)
      .set({ status: E_EXECUTION_STATUS.RUNNING })
      .where(eq(DBSchema_Execution._id, executionId))
  }

  private async setAbortedStatus (executionId: string): Promise<void> {
    await db
      .update(DBSchema_Execution)
      .set({ status: E_EXECUTION_STATUS.ABORTED })
      .where(eq(DBSchema_Execution._id, executionId))
  }

  private async setCompletedStatus (executionId: string): Promise<void> {
    await db
      .update(DBSchema_Execution)
      .set({ status: E_EXECUTION_STATUS.COMPLETED })
      .where(eq(DBSchema_Execution._id, executionId))
  }
}

export const ExecutionQueue = new ExecutionQueueClass()

import { asc, eq } from 'drizzle-orm'
import {
  DBSchema_Execution,
  E_EXECUTION_STATUS,
  E_TASK_STATUS,
  type T_Execution,
  type T_Task,
} from '@scrapland/data-model'
// App
import { getTaskInQueueOrRunning } from '../models/execution/get-task-in-queue-or-running'
import { createTaskExecution } from '../models/execution/create-task-execution'
import { ExecutionModel } from '../models/execution'
import { RunExecution } from './run-execution'
import { db } from '../database'

// TODO: this will come form a global configuration file
const MAX_CONCURRENCY = 2

class ExecutionQueueClass {
  isProcessingTick = false

  // When server stats, aborts all running execution.
  public async cleanRunningExecutions (): Promise<void> {
    const runningExecutions = await db
      .select()
      .from(DBSchema_Execution)
      .where(eq(DBSchema_Execution.status, E_EXECUTION_STATUS.RUNNING))

    runningExecutions.forEach(execution => {
      const model = new ExecutionModel(execution)
      model.setAborted('Server shutdown while execution was running.')
    })
  }

  // Add a task to execute.
  // Checks if a execution for the task is already queued or running.
  public queueTask (task: T_Task): null | T_Execution {
    if (task._task_status !== E_TASK_STATUS.PUBLISHED) return null

    const execution = getTaskInQueueOrRunning(task._id) || createTaskExecution(task)

    if (!execution) return null
    
    this.tick()
    return execution
  }

  // Private
  // Running tick, only one function active at a time so we can spam this.tick()
  // Executes until max concurrency reached or no executions to run
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

  private async execute (execute: T_Execution): Promise<void> {
    // This update must be awaited so that tick doesn't retrigger
    // before execution status is RUNNING
    const executionModel = new ExecutionModel(execute)
    await executionModel.setRunning()

    RunExecution(executionModel)
      .then(() => this.tick())
  }

  public getRunningExecutions (): Array<T_Execution> {
    return db
      .select()
      .from(DBSchema_Execution)
      .where(eq(DBSchema_Execution.status, E_EXECUTION_STATUS.RUNNING))
      .all()
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
}

export const ExecutionQueue = new ExecutionQueueClass()

import { E_TASK_STATUS, T_Task, T_Task_ScheduleCron, T_Task_ScheduleInterval } from '@scrapland/data-model'
import cron, { type ScheduledTask } from 'node-cron'
// App
import { findTaskWithStatus } from '../models/task/find-tasks-with-status'
import { findTaskWithId } from '../models/task/find-task-with-id'
import { ExecutionQueue } from './execution-queue'
import { AppSettings } from './app-settings'

type ScheduleItemType = 'interval' | 'cron'
type ScheduleItemBase<T extends ScheduleItemType> = {
  taskId: string
  type: T
}

type ScheduledItemInterval = ScheduleItemBase<'interval'> & { interval: NodeJS.Timeout }
type ScheduledItemCron = ScheduleItemBase<'cron'> & { task: ScheduledTask }
type ScheduledItem = ScheduledItemInterval | ScheduledItemCron

class SchedulerClass {
  activeTasks: Map<string, ScheduledItem> = new Map()

  public initialize (): void {
    if (AppSettings.settings.BACKEND_SERVER_BLOCK_ACTIVE_SCHEDULER) return
    this.seedTasks() // On server initialization - get all published tasks and add their items
  }

  public removeScheduleItem (taskId: string): void {
    const scheduled = this.activeTasks.get(taskId)
    if (!scheduled) return

    this.activeTasks.delete(taskId)
    switch (scheduled.type) {
      case 'interval': return clearInterval(scheduled.interval)
      case 'cron': return void scheduled.task.destroy()
    }
  }

  public registerTask (task: T_Task): void {
    if (AppSettings.settings.BACKEND_SERVER_BLOCK_ACTIVE_SCHEDULER) return
    if (task._task_status !== E_TASK_STATUS.PUBLISHED) return

    switch(task._task_schedule.type) {
      case 'interval': return this.registerIntervalTask(task, task._task_schedule)
      case 'cron': return this.registerCronTask(task, task._task_schedule)
      // Manual are ignored
    }
  }

  public updateTask (task: T_Task): void {
    console.log('UPDATING TASK ITEM', { task })
    this.removeScheduleItem(task._id)

    if (task._task_status !== E_TASK_STATUS.PUBLISHED) return
    this.registerTask(task)
  }

  public stopAll (): void {
    Object
      .values(this.activeTasks.values())
      .forEach(item => this.removeScheduleItem(item.taskId))
  }

  private seedTasks (): void {
    const publishedTasks = findTaskWithStatus([E_TASK_STATUS.PUBLISHED])
    publishedTasks.forEach(task => this.registerTask(task))
  }

  private registerIntervalTask (task: T_Task, schedule: T_Task_ScheduleInterval) {
    if (task._task_status !== E_TASK_STATUS.PUBLISHED) return

    const interval = setInterval(() => this.launchTask(task._id), schedule.everyMs)
    this.activeTasks.set(task._id, {
      taskId: task._id,
      type: 'interval',
      interval
    })
  }

  private registerCronTask (task: T_Task, schedule: T_Task_ScheduleCron) {
    if (task._task_status !== E_TASK_STATUS.PUBLISHED) return

    const cronTask = cron.schedule(schedule.expression, () => this.launchTask(task._id))
    this.activeTasks.set(task._id, {
      taskId: task._id,
      task: cronTask,
      type: 'cron',
    })
  }

  private launchTask (taskId: string): void {
    const task = findTaskWithId(taskId)
    if (!task) return
    ExecutionQueue.queueTask(task)
  }
}

export const Scheduler = new SchedulerClass()

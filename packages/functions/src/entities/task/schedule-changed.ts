import { E_TASK_SCHEDULE_TYPE, T_Task_Schedule } from "@scrapland/data-model";

export function F_Task_ScheduleChanged (from: T_Task_Schedule, to: T_Task_Schedule): boolean {
  if (from.type === E_TASK_SCHEDULE_TYPE.MANUAL && to.type === E_TASK_SCHEDULE_TYPE.MANUAL) return false

  if (from.type === E_TASK_SCHEDULE_TYPE.INTERVAL && to.type === E_TASK_SCHEDULE_TYPE.INTERVAL) {
    return from.everyMs !== to.everyMs
  }

  if (from.type === E_TASK_SCHEDULE_TYPE.CRON && to.type === E_TASK_SCHEDULE_TYPE.CRON) {
    return from.expression !== to.expression
  }

  // Type miss match
  return true
}
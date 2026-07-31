import { E_TASK_SCHEDULE_TYPE } from './enums'
import { T_Task_Ad_Housing_FindNew } from './ad-housing-find-new/schema'

type T_Task_ScheduleBase<T extends E_TASK_SCHEDULE_TYPE> = { type: T }

export type T_Task_ScheduleInterval = T_Task_ScheduleBase<E_TASK_SCHEDULE_TYPE.INTERVAL> & {
  everyMs: number
}

export type T_Task_ScheduleCron = T_Task_ScheduleBase<E_TASK_SCHEDULE_TYPE.CRON> & {
  expression: string
}

export type T_Task_ScheduleManual = T_Task_ScheduleBase<E_TASK_SCHEDULE_TYPE.MANUAL>

export type T_Task_Schedule =
  | T_Task_ScheduleInterval
  | T_Task_ScheduleManual
  | T_Task_ScheduleCron

export type T_Task =
  | T_Task_Ad_Housing_FindNew

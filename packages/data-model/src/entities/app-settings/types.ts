// These all global settings that define
// app behavior. They all start with sensible values but can
// be overwritten by the user:
//    - in the frontend settings page
//    - TODO: by starting command

export type T_AppSettings = {
  BACKEND_SERVER_PORT: number

  TASKS_SCHEDULE_CRON_DEFAULT_EXPRESSION: string
  TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE: number
  TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE: number
  
  HOUSING_TASK_PRICE_RANGE_STEP: number
  HOUSING_TASK_PRICE_MAX_VALUE: number
  VEHICLE_TASK_PRICE_RANGE_STEP: number
  VEHICLE_TASK_PRICE_MAX_VALUE: number
}

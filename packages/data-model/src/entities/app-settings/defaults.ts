import { T_AppSettings } from './types'

export const DEFAULT_APP_SETTINGS: T_AppSettings = {
  BACKEND_SERVER_PORT: 3000,

  TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE: 1000 * 60 * 5, // 5 minutes
  TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE: 1000 * 60 * 60 // 1 hour
}

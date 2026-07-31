import { T_AppSettings } from './types'

export const DEFAULT_APP_SETTINGS: T_AppSettings = {
  BACKEND_SERVER_PORT: 3000,

  TASKS_SCHEDULE_CRON_DEFAULT_EXPRESSION: '0 */2 * * *', // Every 2 hours
  TASKS_SCHEDULE_INTERVAL_DEFAULT_VALUE: 1000 * 60 * 60 * 2, // 2 hour
  TASKS_SCHEDULE_INTERVAL_MINIMUM_VALUE: 1000 * 60 * 5, // 5 minutes
}

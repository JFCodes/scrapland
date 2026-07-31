import type { T_API_Paginated } from './pagination'
import type {
  T_Task_Ad_Housing_FindNew,
  T_AppSettings,
  T_Ad_Housing,
  E_AD_STATUS,
  T_Execution,
  T_Task,
} from '../entities'

export type T_API_RESPONSE_Error = {
  level?: 'info' | 'success' | 'warning' | 'danger'
  details?: Array<string>
  type: 'api-error'
  message: string
  code: number
}

export type T_API_RESPONSE_Ping = { status: 'ok' }

export type T_API_RESPONSE_Task_Housing_FindNew = T_Task_Ad_Housing_FindNew
export type T_API_RESPONSE_Ads_StatusCounter = { counters: Record<E_AD_STATUS, number> }
export type T_API_RESPONSE_Ads_Housing = T_API_Paginated<T_Ad_Housing>
export type T_API_RESPONSE_Executions = T_API_Paginated<T_Execution>
export type T_API_Response_AppSettings = T_AppSettings
export type T_API_Response_Ad_Housing = T_Ad_Housing
export type T_API_RESPONSE_Execution = T_Execution
export type T_API_RESPONSE_Tasks = Array<T_Task>

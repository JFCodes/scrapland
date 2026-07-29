import type { T_Task_Ad_Housing_FindNew, T_Execution, T_Task, T_Ad_Housing } from '../entities'
import type { T_API_Paginated } from './pagination'

export type T_API_RESPONSE_Error = {
  level?: 'info' | 'success' | 'warning' | 'danger'
  details?: Array<string>
  type: 'api-error'
  message: string
  code: number
}

export type T_API_RESPONSE_Ping = { status: 'ok' }

export type T_API_RESPONSE_Task_Housing_FindNew = T_Task_Ad_Housing_FindNew
export type T_API_RESPONSE_Ads_Housing = T_API_Paginated<T_Ad_Housing>
export type T_API_RESPONSE_Executions = T_API_Paginated<T_Execution>
export type T_API_Response_Ad_Housing = T_Ad_Housing
export type T_API_RESPONSE_Execution = T_Execution
export type T_API_RESPONSE_Tasks = Array<T_Task>

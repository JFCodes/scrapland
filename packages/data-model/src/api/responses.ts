import type { T_Task_Ad_Housing_FindNew, T_Execution, T_Task } from '../entities'
import type { T_API_Paginated } from './pagination'

export type T_API_RESPONSE_Ping = { status: 'ok' }

export type T_API_RESPONSE_Task_Housing_FindNew = T_Task_Ad_Housing_FindNew
export type T_API_RESPONSE_Executions = T_API_Paginated<T_Execution>
export type T_API_RESPONSE_Execution = T_Execution
export type T_API_RESPONSE_Tasks = Array<T_Task>

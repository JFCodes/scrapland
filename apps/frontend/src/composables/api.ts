import {
  type T_API_PAYLOAD_Task_Housing_FindNEw_Patch,
  type T_API_RESPONSE_Task_Housing_FindNew,
  type T_Task_Ad_Housing_FindNew_Patch,
  type T_API_RESPONSE_Executions,
  type T_API_RESPONSE_Tasks,
  type T_API_RESPONSE_Ping,
  type T_API_Pagination,
} from '@scrapland/data-model'
import { request } from '@/composables/api/request'

const baseUrl = `http://localhost:3000/api`

export function useApi () {
  const ping = () => request<T_API_RESPONSE_Ping>({ baseUrl, path: 'ping', method: 'GET' })

  const tasks = {
    execute: (taskId: string) => request<unknown>({ baseUrl, path: `tasks/${taskId}/execute`, method: 'POST' }),
    all: () => request<T_API_RESPONSE_Tasks>({ baseUrl, path: 'tasks/all', method: 'GET' }),

    housing: {
      findNew: {
        patch: (taskId: string, payload: T_Task_Ad_Housing_FindNew_Patch) => {
          return request<T_API_RESPONSE_Task_Housing_FindNew, T_API_PAYLOAD_Task_Housing_FindNEw_Patch>({
            path: `tasks/housing/find-new/${taskId}`,
            method: 'PATCH',
            body: payload,
            baseUrl,
          })
        }
      }
    }
  }

  const executions = {
    all: (pagination: T_API_Pagination) => request<T_API_RESPONSE_Executions, never, T_API_Pagination>({
      path: 'executions/all',
      query: pagination,
      method: 'GET',
      baseUrl,
    }),
  }

  return {
    ping,
    executions,
    tasks,
  }
}

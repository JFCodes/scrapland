import {
  type T_API_PAYLOAD_Task_Housing_FindNEw_Create,
  type T_API_PAYLOAD_Task_Vehicle_FindNEw_Create,
  type T_API_PAYLOAD_Task_Housing_FindNEw_Patch,
  type T_API_PAYLOAD_Task_Vehicle_FindNEw_Patch,
  type T_API_RESPONSE_Task_Housing_FindNew,
  type T_API_RESPONSE_Task_Vehicle_FindNew,
  type T_API_RESPONSE_Ads_StatusCounter,
  type T_API_PAYLOAD_Ad_Housing_Patch,
  type T_API_PAYLOAD_Ad_Vehicle_Patch,
  type T_API_RESPONSE_Ads_Housing,
  type T_API_RESPONSE_Ads_Vehicle,
  type T_API_RESPONSE_AppSettings,
  type T_API_RESPONSE_Executions,
  type T_API_Response_Ad_Housing,
  type T_API_Response_Ad_Vehicle,
  type T_API_RESPONSE_Tasks,
  type T_API_RESPONSE_Ping,
  type T_API_Pagination,
} from '@scrapland/data-model'
// App
import type { RequestQueryValues, RequestOptions } from '@/api/types'

// TODO: we need a mechanism to launch the frontend
// with the actual setting for BACKEND_SERVER_PORT
// If the user has changed backend server port, we are initializing
// the api with the 3000 port and the ping/server-status/get-app-settings
// will fail and we never update the correct server port

class Api {
  wsClientId: null | string = null
  baseUrl = 'api'

  appSettings = () => this.request<T_API_RESPONSE_AppSettings>({ path: 'app-settings', method: 'GET' })
  ping = () => this.request<T_API_RESPONSE_Ping>({ method: 'GET', path: 'ping' })

  tasks = {
    all: () => this.request<T_API_RESPONSE_Tasks>({
      path: 'tasks/all',
      method: 'GET'
    }),
    execute: (taskId: string) => this.request<unknown>({
      path: `tasks/${taskId}/execute`,
      method: 'POST',
    }),
    latestsExecutions: (pagination: T_API_Pagination, query?: RequestQueryValues) => {
      return this.request<T_API_RESPONSE_Executions, never, T_API_Pagination>({
        query: { ...query, ...pagination },
        path: `tasks/latest-executions`,
        method: 'GET'
      })
    },
    housing: {
      findNew: {
        patch: (taskId: string, payload: T_API_PAYLOAD_Task_Housing_FindNEw_Patch) => {
          return this.request<T_API_RESPONSE_Task_Housing_FindNew, T_API_PAYLOAD_Task_Housing_FindNEw_Patch>({
            path: `tasks/housing/find-new/${taskId}`,
            method: 'PATCH',
            body: payload,
          })
        },
        create: (payload: T_API_PAYLOAD_Task_Housing_FindNEw_Create) => {
          return this.request<T_API_RESPONSE_Task_Housing_FindNew, T_API_PAYLOAD_Task_Housing_FindNEw_Create>({
            path: `tasks/housing/find-new`,
            method: 'POST', 
            body: payload,
          })
        },
      }
    },
    vehicle: {
      findNew: {
        patch: (taskId: string, payload: T_API_PAYLOAD_Task_Vehicle_FindNEw_Patch) => {
          return this.request<T_API_RESPONSE_Task_Vehicle_FindNew, T_API_PAYLOAD_Task_Vehicle_FindNEw_Patch>({
            path: `tasks/vehicle/find-new/${taskId}`,
            method: 'PATCH',
            body: payload,
          })
        },
        create: (payload: T_API_PAYLOAD_Task_Vehicle_FindNEw_Create) => {
          return this.request<T_API_RESPONSE_Task_Vehicle_FindNew, T_API_PAYLOAD_Task_Vehicle_FindNEw_Create>({
            path: `tasks/vehicle/find-new`,
            method: 'POST', 
            body: payload,
          })
        },
      }
    }
  }

  executions = {
    all: (pagination: T_API_Pagination, query?: RequestQueryValues) => this.request<T_API_RESPONSE_Executions, never, T_API_Pagination>({
      query: { ...query, ...pagination },
      path: 'executions/all',
      method: 'GET',
    }),
  }

  ads = {
    housing: {
      all: (pagination: T_API_Pagination, query?: RequestQueryValues) => this.request<T_API_RESPONSE_Ads_Housing, never, T_API_Pagination>({
        query: { ...query, ...pagination },
        path: 'ads/housing/all',
        method: 'GET'
      }),

      patch: (adId: string, payload: T_API_PAYLOAD_Ad_Housing_Patch) => this.request<T_API_Response_Ad_Housing, T_API_PAYLOAD_Ad_Housing_Patch>({
        path: `ads/housing/${adId}`,
        method: 'PATCH',
        body: payload,
      }),

      statusCounter: () => {
        return this.request<T_API_RESPONSE_Ads_StatusCounter>({
          path: 'ads/housing/status-counter',
          method: 'GET'
        })
      }
    },
    vehicle: {
      all: (pagination: T_API_Pagination, query?: RequestQueryValues) => this.request<T_API_RESPONSE_Ads_Vehicle, never, T_API_Pagination>({
        query: { ...query, ...pagination },
        path: 'ads/vehicle/all',
        method: 'GET'
      }),

      patch: (adId: string, payload: T_API_PAYLOAD_Ad_Vehicle_Patch) => this.request<T_API_Response_Ad_Vehicle, T_API_PAYLOAD_Ad_Vehicle_Patch>({
        path: `ads/vehicle/${adId}`,
        method: 'PATCH',
        body: payload,
      }),

      statusCounter: () => {
        return this.request<T_API_RESPONSE_Ads_StatusCounter>({
          path: 'ads/vehicle/status-counter',
          method: 'GET'
        })
      }
    }
  }

  public setWsClientId (clientId: string): void {
    this.wsClientId = clientId
  }

  private async request<Response, Body = never, Query extends RequestQueryValues = never> (
    options: RequestOptions<Body, Query>
  ): Promise<Response> {
    const { method, path } = options
  
    const body = 'body' in options ? JSON.stringify(options.body) : null
    const query = 'query' in options ? options.query : undefined
    const url = this.getUrl(path, query)
    const init: RequestInit = {
      headers: this.getHeaders(),
      method,
      body,
    }
  
    console.log(url)
    const response = await fetch(url, init)
    const responseText = await response.text()
    const contentType = response.headers.get('content-type') ?? ''
    const expectedJson = contentType.includes('application/json')
  
    if (!response.ok) {
      let errorJson: string
      try {
        errorJson = await JSON.parse(responseText)
      } catch (error) {
        throw response.status
      }
      throw errorJson
    }
  
    try {
      return JSON.parse(responseText) as Response
    } catch (error) {
      if (expectedJson) throw error
      return responseText as Response
    }
  }

  private getHeaders (): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...(this.wsClientId && { 'Ws-client-id': this.wsClientId })
    }
  }

  private getUrl (path: string, query?: RequestQueryValues): string {
    let url = `${this.baseUrl}/${path}`

    if(query) {
      const searchParams = new URLSearchParams()
  
      Object.entries(query).forEach(([key, value]) => {
        Array.isArray(value)
          ? value.forEach(v => searchParams.append(key, String(v)))
          : searchParams.set(key, String(value))
      })

      url += `?${searchParams.toString()}`
    }

    return url
  }
}

export const API = new Api()

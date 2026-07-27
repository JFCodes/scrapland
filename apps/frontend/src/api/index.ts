import {
  type T_API_PAYLOAD_Task_Housing_FindNEw_Patch,
  type T_API_RESPONSE_Task_Housing_FindNew,
  type T_Task_Ad_Housing_FindNew_Patch,
  type T_API_RESPONSE_Ads_Housing,
  type T_API_RESPONSE_Executions,
  type T_API_RESPONSE_Tasks,
  type T_API_RESPONSE_Ping,
  type T_API_Pagination,
  type T_API_PAYLOAD_Ad_Housing_Patch,
  type T_API_Response_Ad_Housing,
} from '@scrapland/data-model'
// App
import type { RequestQueryValues, RequestOptions } from '@/api/types'

class Api {
  baseUrl = 'http://localhost:3000/api'
  wsClientId: null | string = null

  ping = () => this.request<T_API_RESPONSE_Ping>({
    path: 'ping',
    method: 'GET'
  })

  tasks = {
    execute: (taskId: string) => this.request<unknown>({
      path: `tasks/${taskId}/execute`,
      method: 'POST',
    }),
    all: () => this.request<T_API_RESPONSE_Tasks>({
      path: 'tasks/all',
      method: 'GET'
    }),
    housing: {
      findNew: {
        patch: (taskId: string, payload: T_Task_Ad_Housing_FindNew_Patch) => {
          return this.request<T_API_RESPONSE_Task_Housing_FindNew, T_API_PAYLOAD_Task_Housing_FindNEw_Patch>({
            path: `tasks/housing/find-new/${taskId}`,
            method: 'PATCH',
            body: payload,
          })
        }
      }
    }
  }

  executions = {
    all: (pagination: T_API_Pagination) => this.request<T_API_RESPONSE_Executions, never, T_API_Pagination>({
      path: 'executions/all',
      query: pagination,
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
      })
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
  
    const response = await fetch(url, init)
    const responseText = await response.text()
    const contentType = response.headers.get('content-type') ?? ''
    const expectedJson = contentType.includes('application/json')
  
    if (!response.ok) {
      let errorJson: string
      try {
        errorJson = await response.json()
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
    const url = new URL(`${this.baseUrl}/${path}`)
  
    if(query) {
      Object.entries(query).forEach(([key, value]) => {
        Array.isArray(value)
          ? value.forEach(v => url.searchParams.append(key, String(v)))
          : url.searchParams.set(key, String(value))
      })
    }
  
    return url.href
  }
}

export const API = new Api()

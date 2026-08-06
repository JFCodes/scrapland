import type { Page } from 'playwright'

export type NetworkInterceptorOptions = {
  method: 'PUT' | 'GET' | 'DELETE' | 'PATCH' | 'POST'
  status?: number
  inUrl: string
}

export type NetworkInterceptorResult<T, ReqPayload = any> = {
  status: number
  data: null | T
  request: {
    query?: Map<string, string>
    payload?: ReqPayload
  }
}

export function getNetworkInterceptor <T, ReqPayload = any> (
  page: Page,
  options: NetworkInterceptorOptions,
): Promise<null | NetworkInterceptorResult<T, ReqPayload>> {
   
  return page
    .waitForResponse(response => {
      const url = response.url()

      if (options.status && response.status() !== options.status) return false
      if (response.request().method() !== options.method) return false
      if (!url.includes(options.inUrl)) return false

      return true
    }, { timeout: 10000 })
    .then(async response => {
      const request: NetworkInterceptorResult<T>['request'] = {}
      try {
        request.payload = response.request().postDataJSON()

        // Parse url query
        const url = new URL(response.request().url())
        const query = new Map<string, string>()
        url.searchParams.forEach((value, key) => query.set(key, value))
        request.query = query
      } catch(_) {}

      const json = await response.json()
      return json.appErrorCode === undefined
        ? { status: response.status(), data: json as T, request }
        : null
    })
}

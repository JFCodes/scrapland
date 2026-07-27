import type { Page } from 'playwright'
// App
import {
  type NetworkInterceptorOptions,
  type NetworkInterceptorResult,
  getNetworkInterceptor
} from './get-network-interceptor'

type Options = NetworkInterceptorOptions & {
  action: (page: Page) => Promise<void> 
  page: Page,
}

type Result<T, ReqPayload = any> = Promise<null | NetworkInterceptorResult<T, ReqPayload>>

export async function InterceptNetworkOnAction<T, ReqPayload = any>(options: Options ): Result<T, ReqPayload> {
  const { page, action } = options

  const [response] = await Promise.all([
    getNetworkInterceptor<T, ReqPayload>(page, options),
    action(page)
  ])

  return response
}

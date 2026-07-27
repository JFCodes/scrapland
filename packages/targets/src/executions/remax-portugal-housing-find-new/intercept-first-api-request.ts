// App
import type { MultiSearchPaginatedPayload, MultiSearchPaginated } from '../../targets/remax-portugal/types'
import type { NetworkInterceptorResult } from '../../engine/get-network-interceptor'
import { InterceptNetworkOnAction } from '../../engine/intercept-network-on-action'
import { CONFIG } from '../../targets/remax-portugal/config'
import { Page } from 'playwright'

const { API_SEARCH_PATH } = CONFIG

export async function InterceptFirstAPIRequest (
  page: Page,
  pageUrl: string
): Promise<{ data: MultiSearchPaginated, payload: MultiSearchPaginatedPayload }> {

  let response: null | NetworkInterceptorResult<MultiSearchPaginated, MultiSearchPaginatedPayload>

  try {
    response = await InterceptNetworkOnAction<MultiSearchPaginated, MultiSearchPaginatedPayload>({
      action: async (page) => { await page.goto(pageUrl) },
      inUrl: API_SEARCH_PATH,
      method: 'POST',
      status: 200,
      page,
    })

    if (response === null) throw new Error('Failed to fetch data in intercepted api request for search results')
    if (response.data === null) throw new Error('Failed to fetch data in intercepted api request for search results')
    if (response.data.results.length === 0) throw new Error('Intercepted search api request returned no results')
    if (!response.request.payload) throw new Error('Failed to capture intercepted api request payload for next api calls')

  } catch(_) {
    throw new Error('Error or timeout when intercepting network request of search results')
  }

  return {
    payload: response.request.payload,
    data: response.data,
  }
}

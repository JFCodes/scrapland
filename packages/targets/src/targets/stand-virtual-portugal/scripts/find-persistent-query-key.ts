import { Page } from 'playwright'
// App
import type { NetworkInterceptorResult } from '../../../engine/get-network-interceptor'
import { InterceptNetworkOnAction } from '../../../engine/intercept-network-on-action'
import { GraphqlExtensions } from '../types'
import { CONFIG } from '..'

export async function FindPersistentQueryKey (page: Page): Promise<GraphqlExtensions> {
  let response: null | NetworkInterceptorResult<unknown, unknown>

  try {
    response = await InterceptNetworkOnAction<unknown, unknown>({
      action: async (page) => {
        // We need to trigger an graphql with operationName = 'listingScreen'
        // Otherwise the graphql extension variables are not correct
        const brandFilter = page.locator(CONFIG.SELECTORS.filters.brandFilter)
        await brandFilter.isVisible()
        await brandFilter.click()

        const filterOption = page.locator(CONFIG.SELECTORS.filters.option)
        await filterOption.isVisible()
        await filterOption.click()

        // Click outside to trigger the request
        await page.locator('header').click()
      },
      inUrl: CONFIG.API_SEARCH_URL,
      method: 'GET',
      status: 200,
      page,
    })

    if (response === null) throw new Error('Failed to fetch data in intercepted api request for search results')
    if (!response.request.query) throw new Error('Failed to capture intercepted api request query')

    const extensions = response.request.query.get('extensions')
    if (!extensions) throw new Error('Failed to get extensions query parameter')

    try {
      const parsedExtensions = JSON.parse(extensions)
      return parsedExtensions as GraphqlExtensions
    } catch (_) {
      throw new Error('Failed to parse extensions query key')
    }

  } catch(_) {
    throw new Error('Error or timeout when intercepting network request of search results')
  }
}

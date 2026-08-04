import type { Page } from 'playwright'
// App
import { PageEvaluateFetch } from '../../../engine/page-evaluate-fetch'
import type { GraphqlVariables, GraphqlListing } from '../types'
import { CONFIG } from '../config'

const { API_SEARCH_URL } = CONFIG

export async function RequestResultsPage (
  page: Page,
  graphQlVariables: GraphqlVariables,
): Promise<null | Array<unknown>> {

  const url = new URL(API_SEARCH_URL)
  url.searchParams.set('operationName', 'listingScreen')
  url.searchParams.set('variables', JSON.stringify(graphQlVariables))

  const query = {
    "persistedQuery": {
      "sha256Hash": "a90b153d8e39134f21e246bb2c58bf62e3511c90498662de0f03b2041f853994",
      "version": 1
    }
  }
  url.searchParams.set('extensions', JSON.stringify(query))


  const response = await PageEvaluateFetch<GraphqlListing>(page, {
    url: url.href,
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    }
  }).catch(() => null)

  if (!response || typeof response === 'string') return null

  console.log(response.data.advertSearch.edges.length)
  return []
}

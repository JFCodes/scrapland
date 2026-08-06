import type { Page } from 'playwright'
// App
import type { GraphqlVariables, GraphqlListing, GraphqlExtensions } from '../types'
import type { GraphqlListingEdge } from '../types/edge'
import { PageEvaluateFetch } from '../../../engine/page-evaluate-fetch'
import { CONFIG } from '../config'

const { API_SEARCH_URL } = CONFIG

type Result = {
  totalCount: number
  results: Array<GraphqlListingEdge>
}

export async function RequestResultsPage (
  page: Page,
  graphQlVariables: GraphqlVariables,
  extensionsQuery: GraphqlExtensions
): Promise<Result> {

  const url = new URL(API_SEARCH_URL)
  url.searchParams.set('operationName', 'listingScreen')
  url.searchParams.set('variables', JSON.stringify(graphQlVariables))
  url.searchParams.set('extensions', JSON.stringify(extensionsQuery))

  const response = await PageEvaluateFetch<GraphqlListing>(page, {
    url: url.href,
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    }
  }).catch(() => null)

  if (!response || typeof response === 'string') throw Error('Failed to intercept graphql listing request')

  const results = response.data.advertSearch.edges.map(e => e.node)

  return {
    totalCount: response.data.advertSearch.totalCount,
    results,
  }
}

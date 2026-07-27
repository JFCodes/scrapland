import type { Page } from 'playwright'
// App
import { PageEvaluateFetch } from '../../engine/page-evaluate-fetch'
import { CONFIG } from '../../targets/remax-portugal/config'
import type {
  MultiSearchPaginatedPayload,
  MultiSearchPaginated,
  RawAd,
} from '../../targets/remax-portugal/types'

const { API_SEARCH } = CONFIG

export async function RequestResultsPage (
  page: Page,
  currentPayload: MultiSearchPaginatedPayload,
  pageNumber: number
): Promise<null | Array<RawAd>> {

  const response = await PageEvaluateFetch<MultiSearchPaginated>(page, {
    body: { ...currentPayload, pageNumber },
    url: API_SEARCH,
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    }
  }).catch(() => null)

  if (!response || typeof response === 'string') return null

  return response.results
}

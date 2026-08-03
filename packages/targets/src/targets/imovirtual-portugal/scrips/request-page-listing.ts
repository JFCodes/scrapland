import type { T_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
import type { Page } from 'playwright'
// App
import { PageEvaluateFetch } from '../../../engine'
import {
  type MultiSearchPaginated,
  type PageListingResult,
  PostingSearchItem,
  GetApiSearchUrl,
} from '..'

export async function RequestPageListing (
  page: Page,
  task: T_Task_Ad_Housing_FindNew,
  buildId: string,
  pageNumber: number
): Promise<PageListingResult> {

  const response = await PageEvaluateFetch<MultiSearchPaginated>(page, {
    url: GetApiSearchUrl(task, { pageNumber, buildId }),
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    }
  }).catch(() => null)

  if (response === null || typeof response === 'string') throw Error('Failed to request api page listing')
  if (!response.pageProps) throw Error('Failed to request api page listing')

  return {
    totalPages: response.pageProps.data.searchAds.pagination.totalPages,
    items: response.pageProps.data.searchAds.items,
  }
}

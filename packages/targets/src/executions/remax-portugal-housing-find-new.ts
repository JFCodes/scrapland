import {
  type T_RunOutcome_Ad_Housing_FindNew,
  type T_Task_Ad_Housing_FindNew,
  type T_Ad_Housing_Insert,
  E_RUN_OUTCOME_ERROR_TYPE,
} from '@scrapland/data-model'
// App
import { ReturnOutcomeWithError } from '../instances/return-outcome-with-error'
import { DismissCookieBanner, GetBrowserAndPage } from '../engine'
import { RunOutcomeModel } from '../instances/run-outcome-model'
import {
  type MultiSearchPaginatedPayload,
  type MultiSearchPaginated,
  InterceptFirstAPIRequest,
  RequestResultsPage,
  getSearchUrl,
  parseRawAd,
  CONFIG
} from '../targets/remax-portugal'

type OutcomeData = T_RunOutcome_Ad_Housing_FindNew['data']

// TODO: this should be a configuration setting
const MAX_AD_COUNT = 1000

const { BASE_URL, SELECTORS } = CONFIG

// All procedures wrapped in try catches and checks
// to handle all possible problems during execution

export async function TargetExecution_RemaxPortugal_Housing_FindNew (
  task: T_Task_Ad_Housing_FindNew
): Promise<T_RunOutcome_Ad_Housing_FindNew> {

  const { browser, page } = await GetBrowserAndPage()
  const outcome = new RunOutcomeModel<OutcomeData>({ ads: [] })

  // 1. Initialize browser/page
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  } catch (error) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.BROWSER_LAUNCH_OR_INITIAL_SETUP_ERROR
    return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  }
  
  // 2. Dismiss cookie banner
  try {
    await DismissCookieBanner(page, {
      bannerButtonSelection: SELECTORS.cookieBanner.allowButton,
      bannerSelector: SELECTORS.cookieBanner.banner
    })
  } catch (error) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.ROUTINE_EXECUTION_ERROR
    return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  }


  // 3. Get search url
  let searchUrl: string
  try {
    searchUrl = getSearchUrl(task)
  } catch (error) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_HOUSING_FIND_NEW_MISSING_NECESSARY_OPTIONS
    return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  }

  // 4. Intercept api search request
  let response: { data: MultiSearchPaginated, payload: MultiSearchPaginatedPayload }
  try {
    response = await InterceptFirstAPIRequest(page, searchUrl)
  } catch (error) {
    const fallback = 'Failed to fetch data in intercepted api request for search results'
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_HOUSING_FIND_NEW_EXECUTION_ERROR
    return await ReturnOutcomeWithError({ errorType, fallback, outcome, browser, error })
  }

  const totalPages = response.data.totalPages
  const currentPayload = response.payload
  const rawAds = response.data.results

  // 5. Use intercepted api payload to request all remaining pages
  if (totalPages > 1) {
    for (let nextPage = 2; nextPage <= totalPages; nextPage++) {
      const result = await RequestResultsPage(page, currentPayload, nextPage)
      if (result === null) break

      rawAds.push(...result)
      
      if (rawAds.length > MAX_AD_COUNT ){
        await browser.close()
        const errorType = E_RUN_OUTCOME_ERROR_TYPE.FIND_NEW_ADS_EXECUTION_MAX_RESULTS
        return outcome.withError(errorType, `Execution found more then ${MAX_AD_COUNT} ads`)
      }
    }
  }
  
  let ads: Array<T_Ad_Housing_Insert>
  try {
    ads = rawAds.map(item => parseRawAd(task, item))
  } catch(error) {
    await browser.close()
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_PARSING_ERROR
    return outcome.withError(errorType, `Failed to parse raw ad data into T_Ad_Housing fields`)
  }

  await browser.close()
  return outcome.complete({ ads })
}

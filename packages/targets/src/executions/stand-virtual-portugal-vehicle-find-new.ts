import {
  type T_RunOutcome_Ad_Vehicle_FindNew,
  type T_Task_Ad_Vehicle_FindNew,
  type T_Ad_Vehicle_Insert,
  E_RUN_OUTCOME_ERROR_TYPE,
} from '@scrapland/data-model'
// App
import { ReturnOutcomeWithError } from '../instances/return-outcome-with-error'
import { DismissCookieBanner, GetBrowserAndPage } from '../engine'
import { RunOutcomeModel } from '../instances/run-outcome-model'
import {
  type GraphqlListingEdge,
  type GraphqlExtensions,
  GetPageListingVariables,
  FindPersistentQueryKey,
  RequestResultsPage,
  parseRawAd,
  CONFIG
} from '../targets/stand-virtual-portugal'

type OutcomeData = T_RunOutcome_Ad_Vehicle_FindNew['data']

// TODO: this should be a configuration setting
const MAX_AD_COUNT = 1000

const { BASE_URL, SELECTORS } = CONFIG

// All procedures wrapped in try catches and checks
// to handle all possible problems during execution

export async function TargetExecution_StandVirtualPortugal_Vehicle_FindNew (
  task: T_Task_Ad_Vehicle_FindNew
): Promise<T_RunOutcome_Ad_Vehicle_FindNew> {

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

  // 1. Load page and intercept extensions query
  let extensionsQuery: GraphqlExtensions
  try {
    extensionsQuery = await FindPersistentQueryKey(page)
  } catch (error) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.ROUTINE_EXECUTION_ERROR
    return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  }
  
  // 3. Request first page
  const graphQlVariables = GetPageListingVariables(task, 1)
  let firstPageResult
  try {
    // firstPage = await RequestPageListing(page, task, buildId, 1)
    firstPageResult = await RequestResultsPage(page, graphQlVariables, extensionsQuery)
  } catch(error) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_HOUSING_FIND_NEW_EXECUTION_ERROR
    return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  }

  if(firstPageResult.totalCount > MAX_AD_COUNT) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.FIND_NEW_ADS_EXECUTION_MAX_RESULTS
    return outcome.withError(errorType, `Execution found more then ${MAX_AD_COUNT} ads`)
  }

  const pageSize = firstPageResult.results.length
  const totalPages = Math.ceil(firstPageResult.totalCount / pageSize)
  const rawAds: Array<GraphqlListingEdge> = firstPageResult.results

  // 5. Request all remaining pages
  if (totalPages > 1) {
    for (let nextPage = 2; nextPage <= totalPages; nextPage++) {
      const variables = GetPageListingVariables(task, nextPage)
      const request = await RequestResultsPage(page, variables, extensionsQuery) 

      rawAds.push(...request.results)
      if (nextPage === 4) break
    }
  }

  let ads: Array<T_Ad_Vehicle_Insert>
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

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
  type PageListingResult,
  type PostingSearchItem,
  RequestPageListing,
  ParseRawAd,
  GetBuildId,
  CONFIG,
} from '../targets/imovirtual-portugal'

type OutcomeData = T_RunOutcome_Ad_Housing_FindNew['data']

const { BASE_URL, SELECTORS } = CONFIG

// TODO: this should be a configuration setting
const MAX_AD_COUNT = 1000

export async function TargetExecution_ImovirtualPortugal_Housing_FindNew (
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

  // 3. Get build Id to feed into api requests
  let buildId: string
  try {
    buildId = await GetBuildId(page)
  } catch(error) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_HOUSING_FIND_NEW_EXECUTION_ERROR
    return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  }

  // 4. Fetch first page (it bring total page information)
  let firstPage: PageListingResult
  try {
    firstPage = await RequestPageListing(page, task, buildId, 1)
  } catch(error) {
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_HOUSING_FIND_NEW_EXECUTION_ERROR
    return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  }

  const rawAds: Array<PostingSearchItem> = [...firstPage.items]

  // 5. Loop remaining pages
  if (firstPage.totalPages > 1) {
    for (let nextPage = 2; nextPage <= firstPage.totalPages; nextPage++) {
      const result = await RequestPageListing(page, task, buildId, nextPage)
      if (result === null) break
      
      rawAds.push(...result.items)
            
      if (rawAds.length > MAX_AD_COUNT ){
        await browser.close()
        const errorType = E_RUN_OUTCOME_ERROR_TYPE.FIND_NEW_ADS_EXECUTION_MAX_RESULTS
        return outcome.withError(errorType, `Execution found more then ${MAX_AD_COUNT} ads`)
      }
    }
  }

  let ads: Array<T_Ad_Housing_Insert>
  try {
    ads = rawAds.map(item => ParseRawAd(task, item))
  } catch(error) {
    await browser.close()
    const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_PARSING_ERROR
    return outcome.withError(errorType, `Failed to parse raw ad data into T_Ad_Housing fields`)
  }

  await browser.close()
  return outcome.complete({ ads })
}

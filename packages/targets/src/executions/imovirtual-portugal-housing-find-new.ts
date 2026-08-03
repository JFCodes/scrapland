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
  RequestPageListing,
  GetBuildId,
  CONFIG,
} from '../targets/imovirtual-portugal'

type OutcomeData = T_RunOutcome_Ad_Housing_FindNew['data']

const { BASE_URL, SELECTORS } = CONFIG

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

  console.log({ firstPage, items: firstPage.items.length })

  await browser.close()
  return outcome.complete({ ads: [] })

}
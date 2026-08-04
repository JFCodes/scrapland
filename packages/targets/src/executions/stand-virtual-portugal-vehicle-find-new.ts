import {
  type T_RunOutcome_Ad_Vehicle_FindNew,
  type T_Task_Ad_Vehicle_FindNew,
  E_RUN_OUTCOME_ERROR_TYPE,
} from '@scrapland/data-model'
// App
import { ReturnOutcomeWithError } from '../instances/return-outcome-with-error'
import { DismissCookieBanner, GetBrowserAndPage } from '../engine'
import { RunOutcomeModel } from '../instances/run-outcome-model'
import {
  GetPageListingVariables,
  RequestResultsPage,
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

  // 3. Find persistent query key
  

  // const graphQlVariables = GetPageListingVariables(task, 0)

  // 3. Request first page
  // let firstPage: unknown
  // try {
  //   // firstPage = await RequestPageListing(page, task, buildId, 1)
  //   await RequestResultsPage(page, graphQlVariables)
  // } catch(error) {
  //   const errorType = E_RUN_OUTCOME_ERROR_TYPE.AD_HOUSING_FIND_NEW_EXECUTION_ERROR
  //   return await ReturnOutcomeWithError({ errorType, outcome, browser, error })
  // }

  await new Promise(r => setTimeout(r, 5_000))

  await browser.close()
  return outcome.complete({ ads: [] })
}

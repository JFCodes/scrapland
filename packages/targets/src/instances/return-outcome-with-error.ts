import { E_RUN_OUTCOME_ERROR_TYPE, type T_RunOutcomeBase } from '@scrapland/data-model'
import type { Browser } from "playwright"
// App
import type { RunOutcomeModel } from './run-outcome-model'

type Options<T> = {
  errorType: E_RUN_OUTCOME_ERROR_TYPE
  outcome: RunOutcomeModel<T>
  fallback?: string
  browser: Browser
  error: unknown
}

export async function ReturnOutcomeWithError<T> (options: Options<T>): Promise<T_RunOutcomeBase<T>> {
  const { errorType, fallback, outcome, browser, error } = options

  const message = error instanceof Error
    ? error.message
    : (fallback || String(error))

  await browser.close()
  return outcome.withError(errorType, message)
}
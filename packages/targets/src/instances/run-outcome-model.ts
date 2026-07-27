import { E_RUN_OUTCOME_ERROR_TYPE, E_RUN_OUTCOME_RESULT, type T_RunOutcomeBase } from '@scrapland/data-model'

export class RunOutcomeModel<D> {
  outcome: T_RunOutcomeBase<D>

  constructor (seedData: D) {
    this.outcome = {
      result: E_RUN_OUTCOME_RESULT.INITIALIZED,
      started: new Date().getTime(),
      data: seedData,
      ended: null,
    }
  }

  withError (errorType: E_RUN_OUTCOME_ERROR_TYPE, details: string): T_RunOutcomeBase<D> {
    this.outcome.result = E_RUN_OUTCOME_RESULT.FAILED
    this.outcome.ended = new Date().getTime()
    this.outcome.error = {
      type: errorType,
      details,
    }
    return this.outcome
  }

  complete (data: D): T_RunOutcomeBase<D> {
    this.outcome.result = E_RUN_OUTCOME_RESULT.COMPLETED
    this.outcome.ended = new Date().getTime()
    this.outcome.data = data
    return this.outcome
  }
}
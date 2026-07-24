import { E_RUN_OUTCOME_RESULT, type T_RunOutcomeBase } from '@scrapland/data-model'

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

  complete (data: D): T_RunOutcomeBase<D> {
    this.outcome.result = E_RUN_OUTCOME_RESULT.COMPLETED,
    this.outcome.data = data
    return this.outcome
  }
}
import type { T_RunOutcome_Ad_Housing_FindNew, T_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
// App
import { RunOutcomeModel } from '../instances/run-outcome-model'

type OutcomeData = T_RunOutcome_Ad_Housing_FindNew['data']

export async function TargetExecution_RemaxPortugal_Housing_FindNew (
  task: T_Task_Ad_Housing_FindNew
): Promise<T_RunOutcome_Ad_Housing_FindNew> {

  console.log({ task })
  const outcome = new RunOutcomeModel<OutcomeData>({ ads: [] })

  await new Promise(r => setTimeout(r, 5000))

  return outcome.complete({ ads: [] })
}


import {
  TargetExecution_ImovirtualPortugal_Housing_FindNew,
  TargetExecution_RemaxPortugal_Housing_FindNew
} from '@scrapland/targets'
import {
  type T_RunOutcome_Ad_Housing_FindNew,
  type T_Task_Ad_Housing_FindNew,
  E_TARGET,
} from '@scrapland/data-model'
// App
import { upsertAdsHousing } from '../../models/ad/upsert-ads-housing'
import { ExecutionOutcomeAndSummary } from '../_types'

type ExecutionFunction = (task: T_Task_Ad_Housing_FindNew) => Promise<T_RunOutcome_Ad_Housing_FindNew>

export async function ExecuteAdHousingFindNew (task: T_Task_Ad_Housing_FindNew): Promise<null | ExecutionOutcomeAndSummary> {
  const executionFunction = getTargetFunction(task._task_target)
  if (!executionFunction) return null

  const outcome = await executionFunction(task)
  const summary = await upsertAdsHousing(outcome.data.ads)

  return { outcome, summary }
}

function getTargetFunction (target: E_TARGET): null | ExecutionFunction {
  switch (target) {
    case E_TARGET.IMOVIRTUAL_PORTUGAL: return TargetExecution_ImovirtualPortugal_Housing_FindNew
    case E_TARGET.REMAX_PORTUGAL: return TargetExecution_RemaxPortugal_Housing_FindNew
    default: return null
  }
}
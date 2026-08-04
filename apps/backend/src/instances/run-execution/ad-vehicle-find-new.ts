
import {
  TargetExecution_StandVirtualPortugal_Vehicle_FindNew
} from '@scrapland/targets'
import {
  type T_RunOutcome_Ad_Vehicle_FindNew,
  type T_Task_Ad_Vehicle_FindNew,
  E_TARGET,
} from '@scrapland/data-model'
// App
import { ExecutionOutcomeAndSummary } from '../_types'

type ExecutionFunction = (task: T_Task_Ad_Vehicle_FindNew) => Promise<T_RunOutcome_Ad_Vehicle_FindNew>

export async function ExecuteAdVehicleFindNew (task: T_Task_Ad_Vehicle_FindNew): Promise<null | ExecutionOutcomeAndSummary> {
  const executionFunction = getTargetFunction(task._task_target)
  if (!executionFunction) return null

  const outcome = await executionFunction(task)

  // Upsert ads
  // const summary = await upsertAdsHousing(outcome.data.ads)

  return {
    summary: { newAdsCount: 0, updatedAdsCount: 0 },
    outcome,
  }
}

function getTargetFunction (target: E_TARGET): null | ExecutionFunction {
  switch (target) {
    case E_TARGET.STAND_VIRTUAL_PORTUGAL: return TargetExecution_StandVirtualPortugal_Vehicle_FindNew
    default: return null
  }
}
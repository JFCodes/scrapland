import {
  type T_RunOutcome_Ad_Housing_FindNew,
  type T_Task_Ad_Housing_FindNew,
  type T_RunOutcome,
  E_TARGET,
} from '@scrapland/data-model'
import { TargetExecution_RemaxPortugal_Housing_FindNew } from '@scrapland/targets'

type ExecutionFunction = (task: T_Task_Ad_Housing_FindNew) => Promise<T_RunOutcome_Ad_Housing_FindNew>

export async function ExecuteAdHousingFindNew (task: T_Task_Ad_Housing_FindNew): Promise<null | T_RunOutcome> {
  const executionFunction = getTargetFunction(task._task_target)
  if (!executionFunction) return null

  const outcome =  executionFunction(task)

  // Upsert ads!!!

  return outcome
}

function getTargetFunction (target: E_TARGET): null | ExecutionFunction {
  switch (target) {
    case E_TARGET.REMAX_PORTUGAL: return TargetExecution_RemaxPortugal_Housing_FindNew
    default: return null
  }
}
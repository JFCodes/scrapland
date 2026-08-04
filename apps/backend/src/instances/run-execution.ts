import {
  type T_Task_Ad_Housing_FindNew,
  type T_RunOutcome,
  type T_Task,
  E_RUN_OUTCOME_RESULT,
  E_AD_ENTITY_TYPE,
  E_TASK_TYPE,
  T_Task_Ad_Vehicle_FindNew,
} from '@scrapland/data-model'
// App
import { ExecuteAdHousingFindNew } from './run-execution/ad-housing-find-new'
import { ExecuteAdVehicleFindNew } from './run-execution/ad-vehicle-find-new'
import type { ExecutionOutcomeAndSummary  }from './_types'
import { ExecutionModel } from '../models/execution'

const getNoExecutionFunctionError = (task: T_Task): string => {
  const adEntityType = task._task_adEntityType
  const taskType = task._task_type
  const target = task._task_target
  return `No execution function for the combination of ad-entity-type=${adEntityType}, task-type=${taskType} on target=${target}`
}

export async function RunExecution (executionModel: ExecutionModel): Promise<void> {
  // Loading task to execute.
  // If no task, execution fails
  executionModel.loadTask()
  if (!executionModel.task) {
    await executionModel.setFailed(`No task with id ${executionModel.data.taskId}. Execution task is not longer available.`)
    return
  }

  const outcomeAndSummary = await getExecutionFunction(executionModel.task)
  if (outcomeAndSummary === null ) {
    await executionModel.setFailed(getNoExecutionFunctionError(executionModel.task))
  } else {
    const { outcome, summary } = outcomeAndSummary

    outcome.result === E_RUN_OUTCOME_RESULT.COMPLETED
      ? await executionModel.setCompleted(summary)
      : await executionModel.setFailed(outcome.error?.details ?? 'No reason provided')
  }
}

async function getExecutionFunction (task: T_Task): Promise<null | ExecutionOutcomeAndSummary> {
  switch (task._task_adEntityType) {

    case E_AD_ENTITY_TYPE.HOUSING:
      switch (task._task_type) {
        case E_TASK_TYPE.FIND_NEW_ADS: return ExecuteAdHousingFindNew(task as T_Task_Ad_Housing_FindNew)
        default: null
      }

    case E_AD_ENTITY_TYPE.VEHICLE:
      switch (task._task_type) {
        case E_TASK_TYPE.FIND_NEW_ADS: return ExecuteAdVehicleFindNew(task as T_Task_Ad_Vehicle_FindNew)
        default: null
      }

    default: return null
  }  
}

// App
import {
  E_AD_ENTITY_TYPE,
  E_TASK_TYPE,
  type T_Task_Ad_Housing_FindNew,
  type T_RunOutcome,
  type T_Task,
} from '@scrapland/data-model'
import { ExecutionModel } from '../models/execution'
import { ExecuteAdHousingFindNew } from './run-execution/ad-housing-find-new'

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

  const outcome = await getExecutionFunction(executionModel.task)
  outcome === null
    ? await executionModel.setFailed(getNoExecutionFunctionError(executionModel.task))
    : await executionModel.setCompleted()
}

async function getExecutionFunction (task: T_Task): Promise<null | T_RunOutcome> {
  switch (task._task_adEntityType) {

    case E_AD_ENTITY_TYPE.HOUSING:
      switch (task._task_type) {
        case E_TASK_TYPE.FIND_NEW_ADS: return ExecuteAdHousingFindNew(task as T_Task_Ad_Housing_FindNew)
        default: null
      }

    case E_AD_ENTITY_TYPE.VEHICLE:
      switch (task._task_type) {

        default: null
      }

    default: return null
  }  
}

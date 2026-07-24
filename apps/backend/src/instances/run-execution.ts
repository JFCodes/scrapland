// App
import { ExecutionModel } from '../models/execution'

export async function RunExecution (executionModel: ExecutionModel): Promise<void> {
  console.log('executing task', executionModel)
  await new Promise(r => setTimeout(r, 4000))

  await executionModel.setCompleted()
}

import { T_Execution } from '@scrapland/data-model'

export async function RunExecution (execution: T_Execution): Promise<void> {
  console.log('executing task', execution.taskId)
  await new Promise(r => setTimeout(r, 4000))
}

import type { T_Execution } from '@scrapland/data-model'
import { F_Entity_Task_PrintTarget } from '@scrapland/functions'
// App
import { i18n } from '@/i18n'
import { useToastsStore } from '@/stores/toasts'
import { useTasksStore } from '@/stores/tasks'

export function onMessage (execution: T_Execution): void {
  const task = useTasksStore().taskMap.get(execution.taskId)
  if (!task) return

  const { t } = i18n.global
  const taskType = t(`enums.taskType.${task._task_type}`)
  const adEntityType = t(`enums.adEntityType.${task._task_adEntityType}`)
  const target = F_Entity_Task_PrintTarget(task._task_target)

  useToastsStore().launch({
    type: 'success',
    title: t('toasts.executionCompleted.title'),
    messages: [
      t('toasts.executionCompleted.message', { taskType, adEntityType, target })
    ]
  })
}


import { E_TASK_STATUS } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { useAppI18n } from '@/composables/use-i18n'
import { useModals } from '@/composables/modals'
import { useTasksStore } from '@/stores/tasks'
import { API } from '@/api'

export function useTaskDelete () {
  const { onApiError } = useApiErrorHandling()
  const { prompt } = useModals()
  const { t } = useAppI18n()
  const tasksStore = useTasksStore()

  const isChangingStatus = ref(false)

  const deleteTask = async (taskId: string): Promise<void> => {
    const proceed = await promptDelete()
    if (!proceed) return

    isChangingStatus.value = true
    await API.tasks.housing.findNew
      .patch(taskId, { _task_status: E_TASK_STATUS.DELETED })
      .then(result => tasksStore.updateTask(result))
      .catch(onApiError)
      .finally(() => isChangingStatus.value = false)

  }

  const promptDelete = async (): Promise<null | boolean> => {
    const { resolution } = prompt({
      title: t('entities.task.deletePrompt.title'),
      messages: [
        t('entities.task.deletePrompt.message'),
        t('sentences.thisActionIsIrreversible'),
      ],
      confirmButtonType: 'danger',
      confirmText: t('global.delete')
    })

    return resolution
  }

  return {
    isChangingStatus,
    deleteTask,
  }
}
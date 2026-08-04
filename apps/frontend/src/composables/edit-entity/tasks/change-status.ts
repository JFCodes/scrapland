import { E_AD_ENTITY_TYPE, E_TASK_STATUS, type T_Task } from '@scrapland/data-model'
import { type MaybeRefOrGetter, toValue, ref } from 'vue'
// App
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { useAppI18n } from '@/composables/use-i18n'
import { useModals } from '@/composables/modals'
import { useTasksStore } from '@/stores/tasks'
import { API } from '@/api'

export function useTaskChangeStatus (task: MaybeRefOrGetter<T_Task>) {
  const { onApiError } = useApiErrorHandling()
  const { prompt } = useModals()
  const { t } = useAppI18n()
  const tasksStore = useTasksStore()
  
  const editableStatus = ref(toValue(task)._task_status)
  const isChangingStatus = ref(false)
  
  const changeStatus = async (status: E_TASK_STATUS): Promise<void> => {
    if (status === E_TASK_STATUS.DELETED) {
      const proceed = await promptDelete()
      if (!proceed) return
    }

    const taskValue = toValue(task)
    isChangingStatus.value = true

    await performChange(taskValue, status)
      .then(result => {
        editableStatus.value = result._task_status
        tasksStore.updateTask(result)
      })
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

  const performChange = (task: T_Task, status: E_TASK_STATUS): Promise<T_Task> => {
    const payload = { _task_status: status }

    switch (task._task_adEntityType) {
      case E_AD_ENTITY_TYPE.HOUSING:
        return API.tasks.housing.findNew.patch(task._id, payload)
      case E_AD_ENTITY_TYPE.VEHICLE:
        return API.tasks.vehicle.findNew.patch(task._id, payload)
    }
  }
    
  return {
    changeStatus,
    isChangingStatus,
    editableStatus,
  }
}
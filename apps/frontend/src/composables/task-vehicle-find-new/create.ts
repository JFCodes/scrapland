import { F_GetTaskPriceRange } from '@scrapland/functions'
import { computed, ref } from 'vue'
import {
  type T_Task_Ad_Vehicle_FindNew_Insert,
  type T_Task_Ad_Vehicle_FindNew,
  type T_Task_Schedule,
  E_TASK_SCHEDULE_TYPE,
  E_AD_ENTITY_TYPE,
  E_TARGET,
} from '@scrapland/data-model'
// App
import { useTaskScheduleValidation } from '@/composables/fields/task-schedule/validation'
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { useTasksStore } from '@/stores/tasks'
import { API } from '@/api'

export function useTaskVehicleFindNewCreate () {
  const { onApiError } = useApiErrorHandling()
  const tasksStore = useTasksStore()

  const isCreating = ref(false)

  const fieldTarget = ref<null | E_TARGET>(null)
  
  const fieldSchedule = ref<T_Task_Schedule>({ type: E_TASK_SCHEDULE_TYPE.MANUAL })
  const fieldNotes = ref<null | string>(null)
  const fieldPriceMax = ref<number>(Infinity)
  const fieldPriceMin = ref<number>(0)

  const { isValid: fieldScheduleIsValid } = useTaskScheduleValidation(fieldSchedule)

  const fieldTargetError = computed(() => fieldTarget.value === null ? 'You must pick a target' : '')
  
  const displayEquivalentTaskWarning = computed(() => {
    if (!fieldTarget.value) return false
    
    return tasksStore.housingFindNewTasks.some(t => {
      // Conditions to consider a equivalent task already exists
      if (t._task_target !== fieldTarget.value) return false
      return true
    })
  })

  const isValid = computed(() => {
    if (!fieldScheduleIsValid.value) return false
    if (!fieldTarget.value) return false

    return true
  })

  const createTask = async (): Promise<null | T_Task_Ad_Vehicle_FindNew> => {
    if (!isValid.value) return null
    if (!fieldTarget.value) return null

    const priceRange = F_GetTaskPriceRange(fieldPriceMin.value, fieldPriceMax.value)

    const payload: T_Task_Ad_Vehicle_FindNew_Insert = {
      _task_adEntityType: E_AD_ENTITY_TYPE.VEHICLE,
      _task_schedule: fieldSchedule.value,
      _task_target: fieldTarget.value,
      _task_notes: fieldNotes.value,
      _price_min: priceRange.min,
      _price_max: priceRange.max,
    }

    isCreating.value = true
    const created = await API.tasks.vehicle.findNew
      .create(payload)
      .catch(onApiError)
      .finally(() => isCreating.value = false)

    if (created) tasksStore.appendTask(created)
    return created || null
  }

  return {
    createTask,
    displayEquivalentTaskWarning,
    fieldTargetError,
    fieldSchedule,
    fieldPriceMin,
    fieldPriceMax,
    fieldTarget,
    isCreating,
    fieldNotes,
    isValid,
  }
}

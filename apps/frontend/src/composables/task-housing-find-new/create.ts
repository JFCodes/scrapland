import { F_GetTaskPriceRange } from '@scrapland/functions'
import { computed, ref } from 'vue'
import {
  type T_Task_Ad_Housing_FindNew_Insert,
  type T_Task_Ad_Housing_FindNew,
  type T_Ad_Housing_BuildingType,
  type T_Task_Schedule,
  E_TASK_SCHEDULE_TYPE,
  E_TARGET,
  E_AD_ENTITY_TYPE,
} from '@scrapland/data-model'
// App
import { useTaskScheduleValidation } from '@/composables/fields/task-schedule/validation'
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { useTasksStore } from '@/stores/tasks'
import { API } from '@/api'

export function useTaskHousingFindNewCreate () {
  const { onApiError } = useApiErrorHandling()
  const tasksStore = useTasksStore()

  const isCreating = ref(false)
  
  const fieldBuildingTypes = ref<Array<T_Ad_Housing_BuildingType>>([])
  const fieldSchedule = ref<T_Task_Schedule>({ type: E_TASK_SCHEDULE_TYPE.MANUAL })
  const fieldTarget = ref<null | E_TARGET>(null)
  const fieldNotes = ref<null | string>(null)
  const fieldPriceMax = ref<number>(Infinity)
  const fieldLocation = ref<string>('')
  const fieldPriceMin = ref<number>(0)

  const { isValid: fieldScheduleIsValid } = useTaskScheduleValidation(fieldSchedule)

  const fieldTargetError = computed(() => fieldTarget.value === null ? 'You must pick a target' : '')
  
  const fieldLocationError = computed(() => {
    if (fieldLocation.value.trim() !== '') return null
    return 'You must provide a location value'
  })

  // TODO: some targets accepts more then one, other do not!
  // We need to account this
  const fieldBuildingTypesError = computed(() => {
    if (fieldBuildingTypes.value.length > 0) return null
    return 'You must select at least one building type'
  })

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
    if (fieldBuildingTypes.value.length === 0) return false
    if (fieldLocation.value.trim() === '') return false
    if (!fieldTarget.value) return false

    return true
  })

  const createTask = async (): Promise<null | T_Task_Ad_Housing_FindNew> => {
    if (!isValid.value) return null
    if (!fieldTarget.value) return null

    const priceRange = F_GetTaskPriceRange(fieldPriceMin.value, fieldPriceMax.value)

    const payload: T_Task_Ad_Housing_FindNew_Insert = {
      _task_adEntityType: E_AD_ENTITY_TYPE.HOUSING,
      _task_schedule: fieldSchedule.value,
      _task_target: fieldTarget.value,
      _task_notes: fieldNotes.value,
      _price_min: priceRange.min,
      _price_max: priceRange.max,
      buildingTypes: fieldBuildingTypes.value,
      location: fieldLocation.value,
    }

    isCreating.value = true
    const created = await API.tasks.housing.findNew
      .create(payload)
      .catch(onApiError)
      .finally(() => isCreating.value = false)

    if (created) tasksStore.appendTask(created)
    return created || null
  }

  return {
    createTask,
    displayEquivalentTaskWarning,
    fieldBuildingTypesError,
    fieldBuildingTypes,
    fieldLocationError,
    fieldTargetError,
    fieldSchedule,
    fieldLocation,
    fieldPriceMin,
    fieldPriceMax,
    fieldTarget,
    isCreating,
    fieldNotes,
    isValid,
  }
}

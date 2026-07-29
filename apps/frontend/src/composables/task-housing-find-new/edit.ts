import { type MaybeRefOrGetter, computed, ref, toValue } from 'vue'
import { F_Task_ScheduleChanged } from '@scrapland/functions'
import {
  E_AD_ENTITY_TYPE,
  E_TASK_STATUS,
  type T_Task_Ad_Housing_FindNew_Patch,
  type T_Ad_Housing_BuildingType,
  type T_Task_Ad_Housing_FindNew,
  type T_Task_Schedule,
} from '@scrapland/data-model'
// App
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { useToastsStore } from '@/stores/toasts'
import { useTasksStore } from '@/stores/tasks'
import { API } from '@/api'

export function useTaskHousingFindNewEdit (task: MaybeRefOrGetter<T_Task_Ad_Housing_FindNew>) {
  const { onApiError } = useApiErrorHandling()
  const toastsStore = useToastsStore()
  const tasksStore = useTasksStore()
  const taskValue = toValue(task)

  const adEntityType = ref<E_AD_ENTITY_TYPE>(E_AD_ENTITY_TYPE.VEHICLE)
  const isSaving = ref(false)
  // EditableFields
  const editableBuildingTypes = ref<Array<T_Ad_Housing_BuildingType>>(taskValue.buildingTypes ?? [])
  const editableSchedule = ref(JSON.parse(JSON.stringify(taskValue._task_schedule)) as T_Task_Schedule)
  const editableStatus = ref(taskValue._task_status)
  const editableLocation = ref(taskValue.location)

  const locationError = computed(() => {
    if (editableLocation.value.trim() !== '') return null
    return 'You must provide a location value'
  })

  const buildingTypesError = computed(() => {
    if (editableBuildingTypes.value.length > 0) return null
    return 'You must select at least one building type'
  })

  const isValid = computed(() => {
    if (buildingTypesError.value) return false
    if (locationError.value) return false

    return true
  })

  const hasChanges = computed(() => {
    const compareTo = toValue(task)

    const buildingTypes = [...editableBuildingTypes.value].sort().join(',')
    const compareToBuildingTypes = [...compareTo.buildingTypes ?? []].sort().join(',')

    if (F_Task_ScheduleChanged(compareTo._task_schedule, editableSchedule.value)) return true
    if (compareToBuildingTypes !== buildingTypes) return true
    if (editableLocation.value !== compareTo.location) return true
  })

  const saveChanges = async (): Promise<null | T_Task_Ad_Housing_FindNew> => {
    const taskValue = toValue(task)
    isSaving.value = true

    const payload: T_Task_Ad_Housing_FindNew_Patch = {
      buildingTypes: editableBuildingTypes.value,
      _task_schedule: editableSchedule.value,
      location: editableLocation.value,
    }

    return await API.tasks.housing.findNew
      .patch(taskValue._id, payload)
      .then(result => {
        tasksStore.updateTask(result)
        return result
      })
      .catch(() => {
        toastsStore.launch({
          title: 'Failed to save changes',
          type: 'danger',
        })
        return null
      })
      .finally(() => isSaving.value = false)
  }

  const changeStatus = async (status: E_TASK_STATUS): Promise<void> => {
    const taskValue = toValue(task)
    await API.tasks.housing.findNew
      .patch(taskValue._id, { _task_status: status })
      .then(result => {
        editableStatus.value = result._task_status
        tasksStore.updateTask(result)
      })
      .catch(onApiError)
  }

  return {
    changeStatus,
    saveChanges,
    editableBuildingTypes,
    buildingTypesError,
    editableSchedule,
    editableLocation,
    editableStatus,
    locationError,
    adEntityType,
    hasChanges,
    isSaving,
    isValid,
  }
}
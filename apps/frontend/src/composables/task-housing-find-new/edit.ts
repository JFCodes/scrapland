import { F_Task_ScheduleChanged, F_GetTaskPriceRange } from '@scrapland/functions'
import { type MaybeRefOrGetter, computed, ref, toValue } from 'vue'
import {
  E_AD_ENTITY_TYPE,
  E_TASK_STATUS,
  type T_Task_Ad_Housing_FindNew_Patch,
  type T_Ad_Housing_BuildingType,
  type T_Task_Ad_Housing_FindNew,
  type T_Task_Schedule,
} from '@scrapland/data-model'
// App
import { useTaskScheduleValidation } from '@/composables/fields/task-schedule/validation'
import { useApiErrorHandling } from '@/composables/api-error-handling'
import { useAppI18n } from '@/composables/use-i18n'
import { useToastsStore } from '@/stores/toasts'
import { useModals } from '@/composables/modals'
import { useTasksStore } from '@/stores/tasks'
import { API } from '@/api'

export function useTaskHousingFindNewEdit (task: MaybeRefOrGetter<T_Task_Ad_Housing_FindNew>) {
  const { onApiError } = useApiErrorHandling()
  const { prompt } = useModals()
  const { t } = useAppI18n()
  const toastsStore = useToastsStore()
  const tasksStore = useTasksStore()
  const taskValue = toValue(task)

  const adEntityType = ref<E_AD_ENTITY_TYPE>(toValue(task)._task_adEntityType)
  const isChangingStatus = ref(false)
  const isSaving = ref(false)
  // EditableFields
  const editableBuildingTypes = ref<Array<T_Ad_Housing_BuildingType>>(taskValue.buildingTypes ?? [])
  const editableSchedule = ref(JSON.parse(JSON.stringify(taskValue._task_schedule)) as T_Task_Schedule)
  const editablePriceMax = ref(taskValue._price_max ?? Infinity)
  const editablePriceMin = ref(taskValue._price_min ?? 0)
  const editableStatus = ref(taskValue._task_status)
  const editableLocation = ref(taskValue.location)
  const editableNotes = ref(taskValue._task_notes)

  const { isValid: fieldScheduleIsValid } = useTaskScheduleValidation(editableSchedule)

  const locationError = computed(() => {
    if (editableLocation.value.trim() !== '') return null
    return 'You must provide a location value'
  })

  const buildingTypesError = computed(() => {
    if (editableBuildingTypes.value.length > 0) return null
    return 'You must select at least one building type'
  })

  const isValid = computed(() => {
    if (!fieldScheduleIsValid.value) return false
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
    if (editableNotes.value !== compareTo._task_notes) return true

    const nullablePriceMin = editablePriceMin.value === 0 ? null : editablePriceMin.value
    if (nullablePriceMin !== compareTo._price_min) return true

    const nullablePriceMax = isFinite(editablePriceMax.value) ? editablePriceMax.value : null
    if (nullablePriceMax !== compareTo._price_max) return true
  })

  const saveChanges = async (): Promise<null | T_Task_Ad_Housing_FindNew> => {
    const taskValue = toValue(task)
    isSaving.value = true

    const range = F_GetTaskPriceRange(editablePriceMin.value, editablePriceMax.value)

    const payload: T_Task_Ad_Housing_FindNew_Patch = {
      buildingTypes: editableBuildingTypes.value,
      _task_schedule: editableSchedule.value,
      _task_notes: editableNotes.value,
      location: editableLocation.value,
      _price_min: range.min,
      _price_max: range.max,
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
    if (status === E_TASK_STATUS.DELETED) {
      const proceed = await promptDelete()
      if (!proceed) return
    }

    const taskValue = toValue(task)
    isChangingStatus.value = true
    await API.tasks.housing.findNew
      .patch(taskValue._id, { _task_status: status })
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

  return {
    changeStatus,
    saveChanges,
    editableBuildingTypes,
    buildingTypesError,
    isChangingStatus,
    editableSchedule,
    editableLocation,
    editablePriceMin,
    editablePriceMax,
    editableStatus,
    locationError,
    editableNotes,
    adEntityType,
    hasChanges,
    isSaving,
    isValid,
  }
}
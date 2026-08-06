import { F_Task_ScheduleChanged, F_GetTaskPriceRange, F_NullableStringsAreEqual } from '@scrapland/functions'
import { type MaybeRefOrGetter, computed, ref, toValue } from 'vue'
import type {
  T_Task_Ad_Vehicle_FindNew_Patch,
  T_Task_Ad_Vehicle_FindNew,
  T_Task_Schedule,
} from '@scrapland/data-model'
// App
import { useTaskScheduleValidation } from '@/composables/fields/task-schedule/validation'
import { useToastsStore } from '@/stores/toasts'
import { useTasksStore } from '@/stores/tasks'
import { API } from '@/api'

export function useTaskVehicleFindNewEdit (task: MaybeRefOrGetter<T_Task_Ad_Vehicle_FindNew>) {
  const toastsStore = useToastsStore()
  const tasksStore = useTasksStore()
  const taskValue = toValue(task)

  const isSaving = ref(false)
  // EditableFields
  const editableSchedule = ref(JSON.parse(JSON.stringify(taskValue._task_schedule)) as T_Task_Schedule)
  const editablePriceMax = ref(taskValue._price_max ?? Infinity)
  const editablePriceMin = ref(taskValue._price_min ?? 0)
  const editableNotes = ref(taskValue._task_notes)
  const editableBrand = ref(taskValue.brand || '')
  const editableModel = ref(taskValue.model || '')

  const { isValid: fieldScheduleIsValid } = useTaskScheduleValidation(editableSchedule)

  const isValid = computed(() => {
    if (!fieldScheduleIsValid.value) return false

    return true
  })

  const hasChanges = computed(() => {
    const compareTo = toValue(task)

    if (F_Task_ScheduleChanged(compareTo._task_schedule, editableSchedule.value)) return true
    if (editableNotes.value !== compareTo._task_notes) return true

    const nullablePriceMin = editablePriceMin.value === 0 ? null : editablePriceMin.value
    if (nullablePriceMin !== compareTo._price_min) return true

    const nullablePriceMax = isFinite(editablePriceMax.value) ? editablePriceMax.value : null
    if (nullablePriceMax !== compareTo._price_max) return true

    if (!F_NullableStringsAreEqual(compareTo.brand, editableBrand.value)) return true
    if (!F_NullableStringsAreEqual(compareTo.model, editableModel.value)) return true
  })

  const saveChanges = async (): Promise<null | T_Task_Ad_Vehicle_FindNew> => {
    const taskValue = toValue(task)
    isSaving.value = true

    const range = F_GetTaskPriceRange(editablePriceMin.value, editablePriceMax.value)

    const payload: T_Task_Ad_Vehicle_FindNew_Patch = {
      _task_schedule: editableSchedule.value,
      _task_notes: editableNotes.value,
      _price_min: range.min,
      _price_max: range.max,
      brand: editableBrand.value || null,
      model: editableModel.value || null
    }

    return await API.tasks.vehicle.findNew
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

  return {
    saveChanges,
    editableSchedule,
    editablePriceMin,
    editablePriceMax,
    editableNotes,
    editableBrand,
    editableModel,
    hasChanges,
    isSaving,
    isValid,
  }
}
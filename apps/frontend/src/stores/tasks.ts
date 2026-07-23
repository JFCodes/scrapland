import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  type T_Task_Ad_Housing_FindNew,
  type T_Task,
  E_AD_ENTITY_TYPE,
  E_TASK_TYPE
} from '@scrapland/data-model'
// App
import { filterByAdEntityAndType } from '@/stores/tasks/filter-by-ad-and-type'
import { useApi } from '@/composables/api'

export const useTasksStore = defineStore('tasks', () => {
  const { tasks: apiTasks } = useApi()

  const tasks = ref<Array<T_Task>>([])

  const taskMap = computed<Map<string, T_Task>>(() => {
    return tasks.value.reduce<Map<string, T_Task>>((acc, task) => {
      acc.set(task._id, task)
      return acc
    }, new Map())
  })

  const housingFindNewTasks = computed(() => filterByAdEntityAndType<T_Task_Ad_Housing_FindNew>({
    adEntityType: E_AD_ENTITY_TYPE.HOUSING,
    taskType: E_TASK_TYPE.FIND_NEW_ADS,
    tasks: tasks.value,
  }))

  const load = async () => {
    // TODO: alert for errors
    await apiTasks
      .all()
      .then(result => tasks.value = result)
  }

  const updateTask = (updated: T_Task_Ad_Housing_FindNew): void => {
    console.log('replacing task in place', { updated })
    const index = tasks.value.findIndex(t => t._id === updated._id)
    if (index === -1) return

    tasks.value[index] = updated
  }

  return {
    updateTask,
    load,
    housingFindNewTasks,
    taskMap,
    tasks,
  }
})

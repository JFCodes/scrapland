import type { E_AD_ENTITY_TYPE, E_TASK_TYPE, T_Task } from "@scrapland/data-model"

type Options = {
  adEntityType: E_AD_ENTITY_TYPE,
  taskType: E_TASK_TYPE,
  tasks: Array<T_Task>,
}

export function filterByAdEntityAndType<T extends T_Task>(options: Options): Array<T> {
  const { adEntityType, taskType, tasks } = options

  return tasks.filter(t => {
    if (t._task_adEntityType !== adEntityType) return false
    if (t._task_type !== taskType) return false
    return true
  }) as Array<T>
}

import { E_AD_ENTITY_TYPE, E_TASK_TYPE } from '@scrapland/data-model'
// App
import { useModals } from '@/composables/modals'
import { usePanelStore } from '@/stores/panel'
// Components
import CompPanelHousingFindNewCreate from '@/components/panels/entities/task-housing/find-new-create.vue'
import CompPanelVehicleFindNewCreate from '@/components/panels/entities/task-vehicle/find-new-create.vue'

export function useCreateEntityTaskLaunch () {
  const { pickAdEntityType, pickTaskType } = useModals()
  const panelStore = usePanelStore()

  const launch = async (adEntityType?: E_AD_ENTITY_TYPE): Promise<void> => {
    const entityType = adEntityType || (await  promptEntityType())
    if (!entityType) return

    switch (entityType) {
      case E_AD_ENTITY_TYPE.HOUSING: return housingTasks()
      case E_AD_ENTITY_TYPE.VEHICLE: return vehiclesTasks()
    }
  }

  async function housingTasks (): Promise<void> {
    const taskType = await promptTaskType()
    if (!taskType) return

    switch (taskType) {
      case E_TASK_TYPE.FIND_NEW_ADS:
        panelStore.show(CompPanelHousingFindNewCreate, {})
        break
    }
  }

  async function vehiclesTasks (): Promise<void> {
    const taskType = await promptTaskType()
    if (!taskType) return

    switch (taskType) {
      case E_TASK_TYPE.FIND_NEW_ADS:
        panelStore.show(CompPanelVehicleFindNewCreate, {})
        break
    }
  }

  async function promptEntityType (): Promise<E_AD_ENTITY_TYPE | null> {
    const { resolution } = pickAdEntityType()
    return resolution
  }

  async function promptTaskType (): Promise<E_TASK_TYPE | null> {
    const { resolution } = pickTaskType()
    return resolution
  }

  return { launch }
}
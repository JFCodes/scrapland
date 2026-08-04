<script setup lang="ts">
import { E_AD_ENTITY_TYPE, type T_Task, type T_Task_Ad_Housing_FindNew, type T_Task_Ad_Vehicle_FindNew } from '@scrapland/data-model'
import { F_DateFormats } from '@scrapland/functions'
// App
import { useTaskDelete } from '@/composables/edit-entity/tasks/delete'
import { usePanelStore } from '@/stores/panel'
import type {
  PanelExecutionsTaskLatestExecutions,
  PanelTaskHousingEditCreateProps,
  PanelTaskVehicleEditCreateProps
} from '@/components/panels/types'
// Components
import CompEntityAdEntityBadge from '@/components/entity/ad/ad-entity-badge.vue'
import CompPanelExecutionTaskLatestsExecutions from '@/components/panels/entities/executions/task-latests-executions.vue'
import CompPanelTaskHousingFindNewEditCreate from '@/components/panels/entities/task-housing/find-new-edit.vue'
import CompPanelTaskVehicleFindNewEditCreate from '@/components/panels/entities/task-vehicle/find-new-edit.vue'
import CompEntityTaskScheduleExecution from '@/components/entity/tasks/schedule-execution-button.vue'
import CompEntityTaskScheduleBadge from '@/components/entity/tasks/schedule-badge.vue'
import CompEntityTaskStatusBadge from '@/components/entity/tasks/status-badge.vue'
import CompEntityTaskTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { FileClock, Delete, Edit } from '@lucide/vue'

const props = defineProps<{
  task: T_Task
  index: number
}>()

const { deleteTask } = useTaskDelete()
const panelStore = usePanelStore()

const editTask = () => {
  switch (props.task._task_adEntityType) {
    case E_AD_ENTITY_TYPE.HOUSING: {
      const task = props.task as T_Task_Ad_Housing_FindNew
      panelStore.show<PanelTaskHousingEditCreateProps>(CompPanelTaskHousingFindNewEditCreate, { task })
      break
    }

    case E_AD_ENTITY_TYPE.VEHICLE: {
      const task = props.task as T_Task_Ad_Vehicle_FindNew
      panelStore.show<PanelTaskVehicleEditCreateProps>(CompPanelTaskVehicleFindNewEditCreate, { task })
      break
    }
  }
}

const showLatestsExecutions = () => {
  panelStore.show<PanelExecutionsTaskLatestExecutions>(CompPanelExecutionTaskLatestsExecutions, { task: props.task })
}
</script>

<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      {{ F_DateFormats.dateAndHour(task._createdAt) }}
    </td>
    <td>
      <CompEntityAdEntityBadge :ad-entity="task._task_adEntityType" />
    </td>
    <td>
      <CompEntityTaskStatusBadge :task-status="task._task_status" />
    </td>
    <td>
      <CompEntityTaskTargetBadge :target="task._task_target" />
    </td>
    <td>
      <CompEntityTaskScheduleBadge :schedule="task._task_schedule" />
    </td>
    <td>
      <div class="--group">
        <CompUiIconButton type="light" :icon="FileClock" @click="showLatestsExecutions" />
        <CompUiIconButton filled type="info" :icon="Edit" @click="editTask" />
        <CompEntityTaskScheduleExecution :status="task._task_status" :task-id="task._id" />
        <CompUiIconButton type="danger" :icon="Delete" @click="deleteTask(E_AD_ENTITY_TYPE.HOUSING, task._id)" />
      </div>
    </td>
  </tr>
</template>

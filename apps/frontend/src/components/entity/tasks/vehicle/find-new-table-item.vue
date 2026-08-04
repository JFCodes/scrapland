<script setup lang="ts">
import { E_AD_ENTITY_TYPE, type T_Task_Ad_Vehicle_FindNew } from '@scrapland/data-model'
import { F_DateFormats } from '@scrapland/functions'
// App
import type { PanelExecutionsTaskLatestExecutions, PanelTaskVehicleEditCreateProps } from '@/components/panels/types'
import { useTaskDelete } from '@/composables/edit-entity/tasks/delete'
import { usePanelStore } from '@/stores/panel'
// Components
import CompPanelExecutionTaskLatestsExecutions from '@/components/panels/entities/executions/task-latests-executions.vue'
import CompPanelTaskVehicleFindNewEdit from '@/components/panels/entities/task-vehicle/find-new-edit.vue'
import CompEntityTaskScheduleExecution from '@/components/entity/tasks/schedule-execution-button.vue'
import CompEntityTaskScheduleBadge from '@/components/entity/tasks/schedule-badge.vue'
import CompEntityTaskStatusBadge from '@/components/entity/tasks/status-badge.vue'
import CompEntityTaskTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { FileClock, Delete, Edit } from '@lucide/vue'

const props = defineProps<{
  task: T_Task_Ad_Vehicle_FindNew
  index: number
}>()

const { deleteTask } = useTaskDelete()
const panelStore = usePanelStore()

const editTask = () => {
  panelStore.show<PanelTaskVehicleEditCreateProps>(CompPanelTaskVehicleFindNewEdit, { task: props.task })
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
        <CompUiIconButton type="danger" :icon="Delete" @click="deleteTask(E_AD_ENTITY_TYPE.VEHICLE, task._id)" />
      </div>
    </td>
  </tr>
</template>

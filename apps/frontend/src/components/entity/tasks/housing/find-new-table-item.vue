<script setup lang="ts">
import type { T_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
import { F_DateFormats } from '@scrapland/functions'
// App
import type { PanelTaskHousingEditCreateProps } from '@/components/panels/types'
import { usePanelStore } from '@/stores/panel'
// Components
import CompEntityAdHousingBuildingTypeBadges from '@/components/entity/ad/housing/ad-building-types-badges.vue'
import CompPanelTaskHousingFindNewEditCreate from '@/components/panels/entities/task-housing/find-new-edit.vue'
import CompEntityTaskScheduleExecution from '@/components/entity/tasks/schedule-execution-button.vue'
import CompEntityTaskScheduleBadge from '@/components/entity/tasks/schedule-badge.vue'
import CompEntityTaskStatusBadge from '@/components/entity/tasks/status-badge.vue'
import CompEntityTaskTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { Edit } from '@lucide/vue'

const props = defineProps<{
  task: T_Task_Ad_Housing_FindNew
  index: number
}>()

const panelStore = usePanelStore()

const editTask = () => {
  panelStore.show<PanelTaskHousingEditCreateProps>(CompPanelTaskHousingFindNewEditCreate, { task: props.task })
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
      <div class="--group">
        <CompEntityAdHousingBuildingTypeBadges :ad-building-types="task.buildingTypes ?? []" />
      </div>
    </td>
    <td>
      <CompEntityTaskScheduleBadge :schedule="task._task_schedule" />
    </td>
    <td>
      <div class="--group">
        <CompUiIconButton filled type="info" :icon="Edit" @click="editTask" />
        <CompEntityTaskScheduleExecution :task-id="task._id" />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { T_Execution, T_Task } from '@scrapland/data-model'
import { F_DateFormats } from '@scrapland/functions'
// Components
import CompEntityExecutionStatusBadge from '@/components/entity/executions/e-status-badge.vue'
import CompEntityTaskTargetBadge from '@/components/entity/tasks/target-badge.vue'

defineProps<{
  execution: T_Execution
  task: null | T_Task
  index: number
}>()
</script>

<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ F_DateFormats.dateAndHour(execution._createdAt) }}</td>
    <td>
      <CompEntityTaskTargetBadge v-if="task" :target="task._task_target" />
    </td>
    <td>
      <CompEntityExecutionStatusBadge :status="execution.status" />
    </td>
  </tr>
</template>

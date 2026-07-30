<script setup lang="ts">
import { computed } from 'vue'
// App
import { useExecutionsStore } from '@/stores/executions'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityExecutionCard from '@/components/entity/executions/execution-card.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import type { T_Execution, T_Task } from '@scrapland/data-model'

type ExecutionAndTask = { execution: T_Execution, task: T_Task }

const executionsStore = useExecutionsStore()
const tasksStore = useTasksStore()

const executionsAnsTask = computed<Array<ExecutionAndTask>>(() => {
  const pairs: Array<ExecutionAndTask> = []
  executionsStore.executions.forEach(execution => {
    const task = tasksStore.taskMap.get(execution.taskId)
    if (task) pairs.push({ execution, task })
  })

  return pairs
})

</script>

<template>
  <CompLayoutCenterContainer :width="800">
    <div class="layout">
      <h3 class="--text-white --text-lg --font-bold --mb-md">
        {{ $t('pages.executionHistory.title') }}
      </h3>

      <div class="layout__list --group-v">
        <CompEntityExecutionCard
          v-for="pair in executionsAnsTask"
          :execution="pair.execution"
          :key="pair.execution._id"
          :task="pair.task" />
      </div>
    </div>
  </CompLayoutCenterContainer>
</template>

<style lang="scss">
.layout {
  flex-direction: column;
  overflow: hidden;
  display: flex;
  height: 100%;

  &__list {
    padding-right: var(--s-lg);
    overflow-y: auto;
    flex: 1;
  }
}
</style>
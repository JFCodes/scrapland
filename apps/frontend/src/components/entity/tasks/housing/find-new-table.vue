<script setup lang="ts">
import type { T_Task_Ad_Housing_FindNew } from '@scrapland/data-model'
// App
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompEntityTasksHousingFindNewTableLine from '@/components/entity/tasks/housing/find-new-table-item.vue'

defineProps<{ tasks: Array<T_Task_Ad_Housing_FindNew> }>()

const { t } = useAppI18n()

</script>

<template>
  <table class="--base-table">
    <thead>
      <tr>
        <th>#</th>
        <th>{{ t('global.createdAt') }}</th>
        <th>{{ t('global.status') }}</th>
        <th>{{ t('global.target') }}</th>
        <th>{{ t('global.buildingTypes') }}</th>
        <th>{{ t('global.schedule') }}</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <CompEntityTasksHousingFindNewTableLine
        v-for="(task, index) in tasks"
        :key="task._id"
        :index="index"
        :task="task" />
    </tbody>
  </table>
</template>

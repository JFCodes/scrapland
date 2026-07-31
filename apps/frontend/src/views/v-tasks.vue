<script setup lang="ts">
import { E_ENTITY_TYPE } from '@scrapland/data-model'
// App
import { useCreateEntityTaskLaunch } from '@/composables/create-entity/tasks/launch'
import { useAppI18n } from '@/composables/use-i18n'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompEntityTasksTable from '@/components/entity/tasks/tasks-table.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const { launch } = useCreateEntityTaskLaunch()
const { t } = useAppI18n()
const tasksStore = useTasksStore()

</script>
<template>
  <CompLayoutCenterContainer>
    <CompLayoutVerticalScrollContent>

      <template #top>
        <div class="--group --group--spread">
          <CompUiTitleMain :title="$t(`enums.entityTypes.${E_ENTITY_TYPE.TASK}`)" />

          <CompUiButton
            type="info"
            :label="t('global.createTask')"
            @click="launch()" />
        </div>
      </template>

      <CompEntityTasksTable :tasks="tasksStore.tasks" />
    </CompLayoutVerticalScrollContent>
  </CompLayoutCenterContainer>
</template>

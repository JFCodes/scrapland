<script setup lang="ts">
// App
import { useModals } from '@/composables/modals'
import { usePanelStore } from '@/stores/panel'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompPanelHousingFindNewCreate from '@/components/panels/entities/task-housing/find-new-create.vue'
import CompEntityTaskHousingFindNewTable from '@/components/entity/tasks/housing/find-new-table.vue'
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'
import CompUiButton from '@/components/ui/ui-button.vue'
import { E_TASK_TYPE } from '@scrapland/data-model'

const { pickTaskType } = useModals()
const tasksStore = useTasksStore()
const panelStore = usePanelStore()

const newTask = async (): Promise<void> => {
  const { resolution } = pickTaskType()
  const result = await resolution

  if (!result) return
  switch (result) {
    case E_TASK_TYPE.FIND_NEW_ADS:
      panelStore.show(CompPanelHousingFindNewCreate, {})
      break
  }
}
</script>

<template>
  <CompLayoutCenterContainer>
    <CompLayoutVerticalScrollContent>

      <template #top>
        <div class="--group --group--spread">
          <CompUiTitleMain :title="$t('pages.adHousingTasks.title')" />
          <CompUiButton type="info" :label="$t('global.createTask')" @click="newTask" />
        </div>
      </template>

      <CompEntityTaskHousingFindNewTable :tasks="tasksStore.housingFindNewTasks" />

    </CompLayoutVerticalScrollContent>
  </CompLayoutCenterContainer>
</template>

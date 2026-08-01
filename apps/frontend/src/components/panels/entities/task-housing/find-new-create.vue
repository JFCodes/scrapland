<script setup lang="ts">
import { ref } from 'vue'
// App
import { useTaskHousingFindNewCreate } from '@/composables/task-housing-find-new/create'
import type { PanelTaskHousingEditCreateProps } from '@/components/panels/types'
import type { OverLayExposed } from '@/components/panels/types'
import { useAppI18n } from '@/composables/use-i18n'
import { useModals } from '@/composables/modals'
import { usePanelStore } from '@/stores/panel'
// Components
import CompPanelTaskHousingFindNewCreateHeader from '@/components/panels/entities/task-housing/find-new-create/panel-header.vue'
import CompEntityTaskHousingBuildingTypesField from '@/components/entity/tasks/housing/fields/field-building-type.vue'
import CompEntityTaskHousingLocationField from '@/components/entity/tasks/housing/fields/field-location.vue'
import CompPanelTaskHousingFindNewEdit from '@/components/panels/entities/task-housing/find-new-edit.vue'
import CompEntityTaskMinMaxPriceField from '@/components/entity/tasks/fields/field-min-max-price.vue'
import CompEntityTargetFieldsTarget from '@/components/entity/targets/fields/target-field.vue'
import CompEntityTaskScheduleField from '@/components/entity/tasks/fields/field-schedule.vue'
import CompEntityTaskFieldNotes from '@/components/entity/tasks/fields/field-notes.vue'
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'
import CompUiMessage from '@/components/ui/ui-message.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const panelStore = usePanelStore()
const { prompt } = useModals()
const { t } = useAppI18n()
const {
  createTask,
  displayEquivalentTaskWarning,
  fieldBuildingTypesError,
  fieldLocationError,
  fieldBuildingTypes,
  fieldTargetError,
  fieldLocation,
  fieldSchedule,
  fieldPriceMin,
  fieldPriceMax,
  fieldTarget,
  fieldNotes,
  isCreating,
  isValid,
} = useTaskHousingFindNewCreate()

const overlayRef = ref<null | OverLayExposed>(null)
let entityCreated = false

const create = async (): Promise<void> => {
  const created = await createTask()

  if (created) {
    entityCreated = true
    overlayRef.value?.closePanel()
    window.setTimeout(() => {
      panelStore.show<PanelTaskHousingEditCreateProps>(CompPanelTaskHousingFindNewEdit, { task: created })
    }, 500)
  }
}

const beforeClose = async (): Promise<boolean> => {
  if (entityCreated) return true

  const { resolution } = prompt({
    title: t('sentences.youHaveUnsavedChanges'),
    confirmText: t('global.discardChanges'),
    confirmButtonType: 'danger',
    messages: [
      t('entities.task.unsavedChanges'),
      t('sentences.doYouWishToDiscardThem')
    ]
  })

  const proceed = await resolution
  return proceed ?? false
}
</script>

<template>
  <CompPanelsOverlay
    close-on-overlay-click
    show-close-icon
    ref="overlayRef"
    :before-close-guard="beforeClose"
    :is-loading="isCreating"
    :width="720">

    <template #header>
      <CompPanelTaskHousingFindNewCreateHeader />
    </template>

    <CompEntityTargetFieldsTarget
      v-model="fieldTarget"
      class="--mb-sm"
      :error="fieldTargetError" />

    <template v-if="fieldTarget">
      <CompEntityTaskHousingBuildingTypesField
        v-model="fieldBuildingTypes"
        class="--mb-sm"
        :error="fieldBuildingTypesError" />

      <CompEntityTaskHousingLocationField
        v-model="fieldLocation"
        class="--mb-sm"
        :error="fieldLocationError" />

      <CompEntityTaskScheduleField
        v-model="fieldSchedule"
        class="--mb-sm" />

      <CompEntityTaskMinMaxPriceField
        v-model:price-min="fieldPriceMin"
        v-model:price-max="fieldPriceMax"
        class="--mb-sm" />

      <CompEntityTaskFieldNotes
        v-model="fieldNotes"
        class="--mb-sm" />

    </template>


    <template #footer="{ closePanel }">
      <div class="--group-v">
        <CompUiMessage v-if="displayEquivalentTaskWarning" type="info">
          <template #message>
            <p class="--font-bold">{{ t('panels.taskHousingFindNew.equivalentMessage.title') }}</p>
            <p>{{ t('panels.taskHousingFindNew.equivalentMessage.message') }}</p>
          </template>
        </CompUiMessage>

        <div class="--group --group--end">
          <CompUiButton type="link" :label="t('global.discardChanges')" @click="closePanel" />
          <CompUiButton
            filled
            type="success"
            :label="t('global.create')"
            :disabled="!isValid"
            @click="create" />
        </div>
      </div>
    </template>
  </CompPanelsOverlay>
</template>

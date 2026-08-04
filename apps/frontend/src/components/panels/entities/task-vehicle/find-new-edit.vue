<script setup lang="ts">
import { ref } from 'vue'
// App
import type { PanelTaskVehicleEditCreateProps, OverLayExposed } from '@/components/panels/types'
import { useTaskVehicleFindNewEdit } from '@/composables/task-vehicle-find-new/edit'
import { useTaskChangeStatus } from '@/composables/edit-entity/tasks/change-status'
import { useAppSettings } from '@/stores/app-settings'
import { useAppI18n } from '@/composables/use-i18n'
import { useModals } from '@/composables/modals'
// Components
import CompEntityTaskMinMaxPriceField from '@/components/entity/tasks/fields/field-min-max-price.vue'
import CompEntityTaskScheduleField from '@/components/entity/tasks/fields/field-schedule.vue'
import CompEntityTaskFieldNotes from '@/components/entity/tasks/fields/field-notes.vue'
import CompEntityTaskEditHeader from '@/components/entity/tasks/task-edit-header.vue'
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const props = defineProps<PanelTaskVehicleEditCreateProps>()

const { changeStatus, isChangingStatus, editableStatus } = useTaskChangeStatus(() => props.task)
const { prompt } = useModals()
const { t } = useAppI18n()
const {
  saveChanges,
  editableSchedule,
  editablePriceMin,
  editablePriceMax,
  editableNotes,
  hasChanges,
  isSaving,
  isValid
} = useTaskVehicleFindNewEdit(() => props.task)

const appSettings = useAppSettings()

const overlayRef = ref<null | OverLayExposed>(null)
let hasMadeChanges = false

const save = async (): Promise<void> => {
  const saved = await saveChanges()
  if (!saved) return

  hasMadeChanges = true
  overlayRef.value?.closePanel()
}

const beforeClose = async (): Promise<boolean> => {
  if (!hasChanges.value) return true
  if (hasMadeChanges) return true

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
    show-close-icon
    ref="overlayRef"
    :before-close-guard="beforeClose"
    :is-loading="isSaving"
    :width="720">

    <template #header>
      <CompEntityTaskEditHeader
        :ad-entity-type="task._task_adEntityType"
        :is-changing-status="isChangingStatus"
        :change-status="changeStatus"
        :target="task._task_target"
        :status="editableStatus" />
    </template>

    <CompEntityTaskScheduleField v-model="editableSchedule" class="--mb-sm" />

    <CompEntityTaskMinMaxPriceField
      v-model:price-min="editablePriceMin"
      v-model:price-max="editablePriceMax"
      :max-value="appSettings.settings.HOUSING_TASK_PRICE_MAX_VALUE"
      :step="appSettings.settings.HOUSING_TASK_PRICE_RANGE_STEP"
      class="--mb-sm" />

    <CompEntityTaskFieldNotes v-model="editableNotes" />

    <template #footer="{ closePanel }">
      <CompUiButton type="link" :label="t('global.discardChanges')" @click="closePanel" />
      <CompUiButton
        filled
        type="success"
        :disabled="!hasChanges || !isValid"
        :label="t('global.save')"
        @click="save" />
    </template>
  </CompPanelsOverlay>
</template>

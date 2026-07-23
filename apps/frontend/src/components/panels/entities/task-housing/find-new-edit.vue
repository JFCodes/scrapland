<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// App
import type { PanelTaskHousingEditCreateProps } from '@/components/panels/types'
import { useTaskHousingFindNewEdit } from '@/composables/task-housing-find-new/edit'
// Components
import CompEntityTaskHousingBuildingTypesField from '@/components/entity/tasks/housing/fields/field-building-type.vue'
import CompEntityTaskHousingLocationField from '@/components/entity/tasks/housing/fields/field-location.vue'
import CompEntityTaskScheduleField from '@/components/entity/tasks/fields/field-schedule.vue'
import CompEntityAdEntityBadge from '@/components/entity/ad/ad-entity-badge.vue'
import CompPanelsOverlay from '@/components/panels/p-overlay.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const props = defineProps<PanelTaskHousingEditCreateProps>()

const { t } = useI18n()
const {
  saveChanges,
  editableBuildingTypes,
  buildingTypesError,
  editableSchedule,
  editableLocation,
  locationError,
  adEntityType,
  hasChanges,
  isSaving,
  isValid
} = useTaskHousingFindNewEdit(() => props.task)

const overlayRef = ref<null | { closePanel: () => void }>(null)

const save = async (): Promise<void> => {
  const saved = await saveChanges()
  if (saved) overlayRef.value?.closePanel()
}
</script>

<template>
  <CompPanelsOverlay
    close-on-overlay-click
    show-close-icon
    ref="overlayRef"
    :is-loading="isSaving"
    :width="620">

    <template #header>
      <div class="--group">
        <CompEntityAdEntityBadge :ad-entity="adEntityType" />
        <p class="--text-xl --font-bold">{{ t('panels.task.editTitle') }}</p>
      </div>
    </template>

    <CompEntityTaskHousingLocationField
      v-model="editableLocation"
      class="--mb-sm"
      :error="locationError" />

    <CompEntityTaskHousingBuildingTypesField
      v-model="editableBuildingTypes"
      class="--mb-sm"
      :error="buildingTypesError" />

    <CompEntityTaskScheduleField v-model="editableSchedule" />

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

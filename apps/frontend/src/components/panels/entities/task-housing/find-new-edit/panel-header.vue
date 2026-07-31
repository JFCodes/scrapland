<script setup lang="ts">
import type { E_AD_ENTITY_TYPE, E_TARGET, E_TASK_STATUS } from '@scrapland/data-model'
// App
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompEntityTaskStatusPicker from '@/components/entity/tasks/status-picker.vue'
import CompEntityTasksTargetBadge from '@/components/entity/tasks/target-badge.vue'
import CompEntityAdEntityBadge from '@/components/entity/ad/ad-entity-badge.vue'

defineProps<{
  changeStatus: (status: E_TASK_STATUS) => Promise<void>
  adEntityType: E_AD_ENTITY_TYPE
  isChangingStatus: boolean
  status: E_TASK_STATUS
  target: E_TARGET
}>()

const { t } = useAppI18n()

</script>

<template>

  <div class="--group --group--spread --pr-3xl">
    <div>
      <p class="--text-xl --font-bold">{{ t('panels.task.editTitle') }}</p>
      <div class="--group">
        <CompEntityTasksTargetBadge :target="target" />
        <CompEntityAdEntityBadge :ad-entity="adEntityType" />
      </div>
    </div>

    <CompEntityTaskStatusPicker
      :is-options-loading="isChangingStatus"
      :change-status="changeStatus"
      :status="status" />
  </div>
</template>

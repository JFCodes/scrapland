<script setup lang="ts">
import type { E_EXECUTION_STATUS, T_Execution } from '@scrapland/data-model'
import { computed } from 'vue'
// App
import { useExecutionsStore } from '@/stores/executions'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompEntityExecutionsTable from '@/components/entity/executions/e-table.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'

const executionsStore = useExecutionsStore()
const { t } = useAppI18n()

const props = defineProps<{ status: E_EXECUTION_STATUS }>()

const title = computed<string>(() => {
  const status = t(`enums.executionStatus.${props.status}`)
  return t('pages.executionsByStatus.title', { status })
})

const filteredExecutions = computed<Array<T_Execution>>(() => {
  return executionsStore.executions.filter(e => e.status === props.status)
})

</script>

<template>
  <CompLayoutCenterContainer>
    <CompLayoutVerticalScrollContent>

      <template #top>
        <CompUiTitleMain :title="title" />
      </template>

      <CompEntityExecutionsTable :executions="filteredExecutions" />

    </CompLayoutVerticalScrollContent>
  </CompLayoutCenterContainer>
</template>

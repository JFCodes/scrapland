<script setup lang="ts">
// App
import { useExecutionsStore } from '@/stores/executions'
// Components
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompEntityExecutionsTable from '@/components/entity/executions/e-table.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'

const executionsStore = useExecutionsStore()

</script>

<template>
  <CompLayoutCenterContainer>
    <CompLayoutVerticalScrollContent>

      <template #top>
        <CompUiTitleMain :title="$t('global.allExecutions')" />
      </template>

      <CompEntityExecutionsTable :executions="executionsStore.executions" />
    </CompLayoutVerticalScrollContent>
  </CompLayoutCenterContainer>
</template>

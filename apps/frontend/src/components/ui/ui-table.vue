<script setup lang="ts" generic="I extends { _id: string }">
// App
import type { UiTableHeader } from '@/components/types'
// Components
import CompUiTableHead from '@/components/ui/ui-table/table-head.vue'
import CompUiTableBody from '@/components/ui/ui-table/table-body.vue'

defineSlots<{
  'table-row'(props: { index: number, item: I }): void
}>()

defineProps<{
  headers: Array<UiTableHeader>
  items: Array<I>
}>()
</script>
<template>
  <table ref="tableRef" class="--base-table">
    <CompUiTableHead :headers="headers" />

    <CompUiTableBody :items="items">
      <template #row="{ index, item }">
        <slot name="table-row" :index="index" :item="item"></slot>
      </template>
    </CompUiTableBody>
  </table>
</template>

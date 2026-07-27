<script setup lang="ts" generic="I extends { _id: string }">
// App
import { LIST_VIEW, type UiTableHeader } from '@/components/types'
// Components
import CompUiTable from '@/components/ui/ui-table.vue'

defineSlots<{
  'table-row'(props: { item: I, index: number }): void
  'grid-item'(props: { item: I, index: number }): void
}>()

defineProps<{
  gridItemWidth: number
  listView: LIST_VIEW
  items: Array<I>
  table: {
    headers: Array<UiTableHeader>
  }
}>()

</script>

<template>
  <CompUiTable
    v-if="listView === LIST_VIEW.TABLE"
    :items="items"
    :headers="table.headers">
    <template #table-row="{ index, item }">
      <slot name="table-row" :index="index" :item="item"></slot>
    </template>
  </CompUiTable>

  <div
    v-else-if="listView === LIST_VIEW.GRID"
    class="grid-view"
    :style="{ 'grid-template-columns': `repeat(auto-fit, minmax(${gridItemWidth}px, 1fr))` }">

    <slot v-for="(item, index) in items" name="grid-item" :item="item" :index="index"></slot>
  </div>
</template>

<style lang="scss" scoped>
.grid-view {
  display: grid;
  gap: var(--s-sm);
}
</style>
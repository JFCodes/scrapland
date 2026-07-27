<script setup lang="ts">
import { computed, markRaw, ref } from 'vue'
// App
import { LIST_VIEW, type UiIconToggleItem } from '@/components/types'
import { useOnScrollEnd } from '@/composables/on-scroll-end'
import { useRouterUtils } from '@/composables/router-utils'
import { E_ROUTER_QUERIES } from '@/router/enums'
// Components
import CompUiIconToggle from '@/components/ui/ui-icon-toggle.vue'
import { LayoutGrid, Rows3 } from '@lucide/vue'

const emits = defineEmits<{ 'on-content-scroll-end': [] }>()

defineSlots<{
  default(props: { listView: LIST_VIEW }): void
  'quick-filters'(): void
}>()

defineProps<{
  subTitle: string
  title: string
}>()

const contentRef = ref<null | HTMLElement>(null)

const { writableQuery } = useRouterUtils()
useOnScrollEnd(contentRef, () => emits('on-content-scroll-end'))

const listView = writableQuery(E_ROUTER_QUERIES.LIST_VIEW, LIST_VIEW.GRID)

const iconToggle = computed<Array<UiIconToggleItem<string>>>(() => {
  return [
    {
      isActive: listView.value === LIST_VIEW.GRID,
      icon: markRaw(LayoutGrid),
      key: LIST_VIEW.GRID
    },
    {
      isActive: listView.value === LIST_VIEW.TABLE,
      icon: markRaw(Rows3),
      key: LIST_VIEW.TABLE
    }
  ]
})

</script>

<template>
  <div class="list-view">
    <div class="--group --group--spread">
      <div>
        <p class="--text-white --text-lg --font-bold">
          {{ $t('pages.adsHousingAll.indexTitle') }}
        </p>
        <span>{{ subTitle }}</span>
      </div>

      <div class="--group">
        <slot name="quick-filters"></slot>
        <CompUiIconToggle v-model="listView" :items="iconToggle" />
      </div>
    </div>

    <div
      class="list-view__content"
      ref="contentRef"
      :class="{ 'list-view__content--grid': listView === LIST_VIEW.GRID }">
      <slot :list-view="(listView as LIST_VIEW)"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-view {
  grid-template-rows: auto 1fr;
  max-width: 1200px;
  max-height: 100%;
  overflow: hidden;
  gap: var(--s-md);
  margin: 0 auto;
  display: grid;

  &__content {
    overflow-y: auto;
    height: 100%;
  }
}
</style>
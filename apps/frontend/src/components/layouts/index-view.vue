<script setup lang="ts">
import { computed, markRaw } from 'vue'
// App
import { LIST_VIEW, type UiIconToggleItem } from '@/components/types'
import { useRouterUtils } from '@/composables/router-utils'
import { useAppI18n } from '@/composables/use-i18n'
import { E_ROUTER_QUERIES } from '@/router/enums'
// Components
import CompLayoutVerticalScrollContent from '@/components/layouts/vertical-scroll-content.vue'
import CompUiIconToggle from '@/components/ui/ui-icon-toggle.vue'
import CompUiTitleMain from '@/components/ui/ui-title-main.vue'
import { LayoutGrid, Rows3 } from '@lucide/vue'

const emits = defineEmits<{ 'on-content-scroll-end': [] }>()

defineSlots<{
  default(props: { listView: LIST_VIEW }): void
  'quick-filters'(): void
}>()

defineProps<{
  subTitle: string
  title: string
  maxWidth?: number
}>()

const { writableQuery } = useRouterUtils()
const { t } = useAppI18n()

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
  <CompLayoutVerticalScrollContent
    :max-width="maxWidth ?? 1200"
    @on-content-scroll-end="emits('on-content-scroll-end')">

    <template #top>
      <div class="--group --group--spread">
        <div>
          <CompUiTitleMain :title="t('pages.adsHousingAll.indexTitle')" />
          <span>{{ subTitle }}</span>
        </div>

        <div class="--group">
          <slot name="quick-filters"></slot>
          <CompUiIconToggle v-model="listView" :items="iconToggle" />
        </div>
      </div>
    </template>

    <slot :list-view="(listView as LIST_VIEW)"></slot>

  </CompLayoutVerticalScrollContent>
</template>

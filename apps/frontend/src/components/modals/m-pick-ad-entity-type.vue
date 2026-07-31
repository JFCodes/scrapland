<script setup lang="ts">
import { E_AD_ENTITY_TYPE } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import { AD_ENTITY_ICON } from '@/components/constants'
import type { InjectedProps } from '@/stores/modals'
import { useAppI18n } from '@/composables/use-i18n'
// Components
import CompModalBase from '@/components/modals/m-base.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const props = defineProps<InjectedProps<null | E_AD_ENTITY_TYPE>>()

const { t } = useAppI18n()

const selectedType = ref<E_AD_ENTITY_TYPE>(E_AD_ENTITY_TYPE.HOUSING)
const TASK_TYPES: Array<E_AD_ENTITY_TYPE> = [
  E_AD_ENTITY_TYPE.HOUSING,
  E_AD_ENTITY_TYPE.VEHICLE
]

</script>

<template>
  <CompModalBase
    :close-on-escape-press="true"
    :width="400" @close="closeModal(null)">
    <template #header>
      <p>{{ t('modals.pickTaskType.title') }}</p>
    </template>

    <template #content>
      <div class="pick">

        <button
          v-for="taskType in TASK_TYPES"
          class="pick__item --text-main --pointer"
          :class="{ 'pick__item--selected --text-orange-2': taskType === selectedType }"
          :key="taskType"
          @click="selectedType = taskType">

          <component :is="AD_ENTITY_ICON[taskType]" :size="32" />
          <p>{{ t(`enums.adEntityType.${taskType}`) }}</p>
        </button>

      </div>
    </template>

    <template #footer>
      <div class="--group --group--end">
        <CompUiButton :label="t('global.cancel')" @click="closeModal(null)" />
        <CompUiButton
          filled
          :label="t('global.select')"
          :type="'success'"
          @click="props.closeModal(selectedType)" />
      </div>
    </template>
  </CompModalBase>
</template>

<style lang="scss" scoped>
.pick {
  justify-content: center;
  gap: var(--s-sm);
  display: flex;

  &__item {
    border: solid 2px var(--c-border);
    border-radius: var(--radius-sm);
    background-color: transparent;
    flex-direction: column;
    padding: var(--s-sm);
    align-items: center;
    gap: var(--s-sm);
    min-width: 160px;
    display: flex;

    &--selected {
      border-color: var(--c-orange-2);
    }
  }
}
</style>
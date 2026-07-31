<script setup lang="ts">
import { E_TASK_TYPE } from '@scrapland/data-model'
import { ref } from 'vue'
// App
import type { InjectedProps } from '@/stores/modals'
// Components
import CompModalBase from '@/components/modals/m-base.vue'
import CompUiButton from '@/components/ui/ui-button.vue'
import { TASK_TYPE_ICONS } from '../constants'

const props = defineProps<InjectedProps<null | E_TASK_TYPE>>()

const selectedType = ref<E_TASK_TYPE>(E_TASK_TYPE.FIND_NEW_ADS)
const TASK_TYPES: Array<E_TASK_TYPE> = [E_TASK_TYPE.FIND_NEW_ADS]

</script>

<template>
  <CompModalBase
    :close-on-escape-press="true"
    :width="400" @close="closeModal(null)">
    <template #header>
      <p>{{ $t('modals.pickTaskType.title') }}</p>
    </template>

    <template #content>
      <div class="pick">

        <button
          v-for="taskType in TASK_TYPES"
          class="pick__item --text-main --pointer"
          :class="{ 'pick__item--selected --text-orange-2': taskType === selectedType }"
          :key="taskType"
          @click="selectedType = taskType">

          <component :is="TASK_TYPE_ICONS[taskType]" :size="32" />
          <p>{{ $t(`enums.taskType.${taskType}`) }}</p>
        </button>

      </div>
    </template>

    <template #footer>
      <div class="--group --group--end">
        <CompUiButton :label="$t('global.cancel')" @click="closeModal(null)" />
        <CompUiButton
          filled
          :label="$t('global.select')"
          :type="'success'"
          @click="props.closeModal(selectedType)" />
      </div>
    </template>
  </CompModalBase>
</template>

<style lang="scss" scoped>
.pick {
  display: flex;
  justify-content: center;

  &__item {
    border: solid 2px var(--c-border);
    border-radius: var(--radius-sm);
    background-color: transparent;
    padding: var(--s-sm);
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: var(--s-sm);

    &--selected {
      border-color: var(--c-orange-2);
    }
  }
}
</style>
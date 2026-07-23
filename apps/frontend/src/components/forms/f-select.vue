<script setup lang="ts">
import { watch, ref, type SelectHTMLAttributes, computed } from 'vue'
// App
import { useClickoutSide } from '@/composables/click-outside'
import type { UiSelectOption } from '@/components/types'
import { TELEPORTS } from '@/components/constants'
// Components
import CompFormsSelectOption from '@/components/forms/f-select-option.vue'
import CompFormsFormField from '@/components/forms/f-form-field.vue'
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

type BaseProps = {
  attributes?: SelectHTMLAttributes
  options: Array<UiSelectOption>
  label: string
  // Optional
  closeOnClickOutside?: boolean
  closeOnOptionClick?: boolean
  hasError?: boolean
  error?: null | string
}

type SingleProps = BaseProps & {
  modelValue: null | string
  clearable?: boolean
  multi?: false
}

type MultiProps = BaseProps & {
  modelValue: Array<string>
  multi: true
}

const emits = defineEmits<{ 'update:model-value': [value: null | string | Array<string>] }>()
defineSlots<{
  'before-label'(): void
  'after-label'(): void
}>()

const props = defineProps<SingleProps | MultiProps>()

const optionsRef = ref<null | HTMLDivElement>(null)
const selectRef = ref<null | HTMLDivElement>(null)
const optionsStyle = ref('')
const isOpen = ref(false)

useClickoutSide([selectRef, optionsRef], () => {
  if (!props.closeOnClickOutside) return
  if (isOpen.value) isOpen.value = false
})

const valueDisplay = computed(() => {
  return props.multi
    ? props.modelValue.join(', ')
    : props.modelValue ?? ''
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const onOptionClick = (option: UiSelectOption): void => {
  props.multi
    ? toggleMultiValue(option.value)
    : emits('update:model-value', option.value)

  if (props.closeOnOptionClick) isOpen.value = false
}

const toggleMultiValue = (value: null | string): void => {
  if (!props.multi) return
  if (value === null) return

  const cloneValues = [...props.modelValue]
  const index = cloneValues.findIndex(v => v === value)
  index === -1
    ? cloneValues.push(value)
    : cloneValues.splice(index, 1)

  emits('update:model-value', cloneValues)
}

const optionIsActive = (option: UiSelectOption): boolean => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.some(v => v === option.value)
  } else {
    return props.modelValue === option.value
  }
}

function positionDropdown(options: null | HTMLDivElement): void {
  if (!selectRef.value) return
  if (!options) return

  const selectRect = selectRef.value.getBoundingClientRect()

  const styles: Array<string> = []
  styles.push(`width:${selectRect.width}px`)
  styles.push(`top:${selectRect.y + selectRect.height}px`)
  styles.push(`left:${selectRect.x}px`)
  optionsStyle.value = styles.join(';')
}

watch(optionsRef, positionDropdown)
</script>

<template>
  <CompFormsFormField :label="label">
    <template #before-label>
      <slot name="before-label"></slot>
    </template>

    <template #after-label>
      <slot name="after-label"></slot>
    </template>

    <template #default="{ id }">
      <div
        class="--base-input select --pointer"
        ref="selectRef"
        tabindex="-1"
        :class="{
          '--base-input--error': hasError,
          'select--open': isOpen,
          'select--pills': multi,
        }"
        :id="id"
        @click="toggle">


        <template v-if="multi">
          <CompUiTypeBadge
            v-for="value in modelValue"
            :key="value"
            type="light"
            clearable
            @clear="toggleMultiValue(value)"
            @click.stop>
            {{ value }}
          </CompUiTypeBadge>
        </template>
        <p v-else class="select__display">{{ valueDisplay }}</p>

        <ChevronUp v-if="isOpen" class="select__toggle" />
        <ChevronDown v-else class="select__toggle" />
      </div>

      <p v-if="error" class="--mt-2xs --text-xs --text-error">{{ error }}</p>

      <template v-if="isOpen">
        <Teleport :to="`#${TELEPORTS.DROPDOWNS}`">
          <div ref="optionsRef" class="select__options" :style="optionsStyle">
            <CompFormsSelectOption
              v-for="(option, index) in options"
              :is-active="optionIsActive(option)"
              :clearable="multi || clearable"
              :key="`opt-${index}`"
              :option="option"
              @click="onOptionClick(option)" />
          </div>
        </Teleport>
      </template>
    </template>
  </CompFormsFormField>
</template>
<style lang="scss" scoped>
.select {
  position: relative;
  min-height: 40px;

  &__toggle {
    transform: translateY(-50%);
    right: var(--s-sm);
    pointer-events: none;
    position: absolute;
    top: 50%;
  }

  &__display {
    line-height: 36px;
  }

  &__options {
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.07), 0 6px 30px 5px rgba(0, 0, 0, 0.06), 0 8px 10px -5px rgba(0, 0, 0, 0.1);
    background-color: var(--c-input-options-background);
    border-bottom-right-radius: var(--radius-sm);
    border-bottom-left-radius: var(--radius-sm);
    border: solid 1px var(--c-border);
    z-index: var(--z-dropdown);
    position: fixed;
  }

  &--open {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  &--pills {
    align-items: center;
    gap: var(--s-2xs);
    flex-wrap: wrap;
    display: flex;
  }
}
</style>
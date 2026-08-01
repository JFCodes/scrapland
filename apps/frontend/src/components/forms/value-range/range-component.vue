<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useTemplateRef } from 'vue'
// App
import type { UiValueRange } from '@/components/types'

const props = withDefaults(
  defineProps<{
    modelValue: UiValueRange
    snapWidth?: number
    step?: number
    min: number
    max: number
  }>(),
  { snapWidth: 32 },
)

const emit = defineEmits<{
  'update:modelValue': [value: UiValueRange]
  change: [value: UiValueRange]
}>()

const draggingHandle = ref<'minimum' | 'maximum' | null>(null)
const rootRef = useTemplateRef<HTMLElement>('rootRef')

const minimumValue = computed(() => props.modelValue[0])
const maximumValue = computed(() => props.modelValue[1])
const rangeSize = computed(() => props.max - props.min)

const minimumPosition = computed(() =>
  valueToPercentage(minimumValue.value),
)

const maximumPosition = computed(() =>
  valueToPercentage(maximumValue.value),
)

const selectedRangeStyle = computed(() => ({
  left: `${minimumPosition.value}%`,
  width: `${maximumPosition.value - minimumPosition.value}%`,
}))

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum)
const roundValue = (value: number): number => Number.isFinite(value) ? Math.round(value) : value

const valueToPercentage = (value: number): number => {
  const element = rootRef.value
  if (!element) return 0

  const width = element.clientWidth
  const innerWidth = width - props.snapWidth * 2

  if (value === Infinity) return 100
  if (value === 0) return 0

  const relative = (value - props.min) / rangeSize.value
  const normalizedValue = clamp(relative, 0, 1)
  const position = props.snapWidth + normalizedValue * innerWidth

  return (position / width) * 100
}

const clientXToValue = (clientX: number): number => {
  const element = rootRef.value
  if (!element) return props.min

  const rect = element.getBoundingClientRect()
  const localX = clamp(clientX - rect.left, 0, rect.width)

  const leftSnapEnd = props.snapWidth
  const rightSnapStart = rect.width - props.snapWidth

  if (localX >= rightSnapStart) return Infinity
  if (localX <= leftSnapEnd) return 0

  const innerWidth = rect.width - props.snapWidth * 2
  const innerX = localX - props.snapWidth
  const ratio = innerX / innerWidth

  const value = props.min + ratio * rangeSize.value
  if (!props.step) return value

  const leftOver = value % props.step
  return leftOver > (props.step / 2)
    ? value + (props.step - leftOver)
    : value - leftOver
}

const updateHandle = (clientX: number) => {
  const handle = draggingHandle.value
  if (!handle) return

  let value = roundValue(clientXToValue(clientX))
  const [currentMinimum, currentMaximum] = props.modelValue

  if (handle === 'minimum') {
    if (value === Infinity) value = props.max
    if (currentMaximum !== Infinity) value = Math.min(value, currentMaximum)

    emit('update:modelValue', [value, currentMaximum])
    return
  } else {
    if (value === 0) value = props.min
    if (value !== Infinity) value = Math.max(value, currentMinimum)

    emit('update:modelValue', [currentMinimum, value])
  }
}

const startDragging = (handle: 'minimum' | 'maximum', event: PointerEvent) => {
  event.preventDefault()

  draggingHandle.value = handle
  updateHandle(event.clientX)

  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', stopDragging)
  window.addEventListener('pointercancel', stopDragging)
}

const onPointerMove = (event: PointerEvent) => updateHandle(event.clientX)

function stopDragging() {
  if (!draggingHandle.value) {
    return
  }

  draggingHandle.value = null

  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', stopDragging)
  window.removeEventListener('pointercancel', stopDragging)

  emit('change', props.modelValue)
}

const formatPrice = (value: number) => {
  if (value === Infinity) return '∞'
  return value.toLocaleString()
}

onBeforeUnmount(() => {
  window.removeEventListener('pointercancel', stopDragging)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', stopDragging)
})
</script>

<template>
  <div class="price-range">
    <div class="price-range__labels">
      <output>{{ formatPrice(minimumValue) }}</output>
      <output>{{ formatPrice(maximumValue) }}</output>
    </div>

    <div class="price-range__slider" ref="rootRef">

      <div
        class="price-range__snap-zone price-range__snap-zone--minimum"
        :style="{ width: `${snapWidth}px` }">
      </div>

      <div
        class="price-range__snap-zone price-range__snap-zone--maximum"
        :style="{ width: `${snapWidth}px` }">
      </div>

      <div class="price-range__track"></div>
      <div class="price-range__selected" :style="selectedRangeStyle"></div>

      <button
        class="price-range__handle"
        type="button"
        :class="{ 'price-range__handle--active': draggingHandle === 'minimum' }"
        :style="{ left: `${minimumPosition}%` }"
        aria-label="Minimum price"
        @pointerdown="startDragging('minimum', $event)">
      </button>

      <button
        class="price-range__handle"
        aria-label="Maximum price"
        type="button"
        :class="{ 'price-range__handle--active': draggingHandle === 'maximum' }"
        :style="{ left: `${maximumPosition}%` }"
        @pointerdown="startDragging('maximum', $event)">
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.price-range {
  --handle-radius: 10px;
  --handle-size: 20px;

  padding: 0 var(--handle-radius);
  user-select: none;
  width: 100%;

  &__labels {
    justify-content: space-between;
    margin-bottom: var(--s-xs);
    align-items: center;
    font-weight: 600;
    display: flex;
  }

  &__slider {
    position: relative;
    touch-action: none;
    height: 32px;
  }

  &__track,
  &__selected {
    transform: translateY(-50%);
    border-radius: 3px;
    position: absolute;
    height: 6px;
    top: 50%;
  }

  &__track {
    background: var(--c-gray-100);
    inset-inline: 0;
  }

  &__selected {
    background: var(--c-blue-2);
  }

  &__handle {
    box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
    border-radius: var(--handle-radius);
    border: 2px solid var(--c-blue-2);
    transform: translate(-50%, -50%);
    height: var(--handle-size);
    width: var(--handle-size);
    background: white;
    position: absolute;
    cursor: grab;
    z-index: 2;
    padding: 0;
    top: 50%;

    &:hover,
    &--active {
      box-shadow:
        0 0 0 4px rgb(37 99 235 / 15%),
        0 1px 4px rgb(0 0 0 / 20%);
    }

    &--active {
      cursor: grabbing;
    }
  }

  &__snap-zone {
    position: absolute;
    inset-block: 0;
    z-index: 1;

    &--minimum {
      border-right: 1px solid var(--c-gray-500);
      left: 0;
    }

    &--maximum {
      border-left: 1px solid var(--c-gray-500);
      right: 0;
    }
  }
}
</style>
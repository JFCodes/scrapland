<script setup lang="ts">
import { computed } from 'vue'
// App
import type { UiButtonType } from '@/components/types'
// Components
import { X } from '@lucide/vue'

const emits = defineEmits<{ 'clear': [] }>()
const props = withDefaults(
  defineProps<{
    type: UiButtonType
    // Optional
    width?: number | string
    clearable?: boolean
    filled?: boolean
    height?: number
  }>(),
  { type: 'link' }
)

const onXClick = (): void => {
  if (!props.clearable) return
  emits('clear')
}

const styleString = computed(() => {
  const styles: Array<string> = []

  if (props.width) {
    typeof props.width === 'number'
      ? styles.push(`width:${props.width}px`)
      : styles.push(`width:${props.width}`)
  }

  if (props.height) {
    styles.push(`line-height:${props.height}px`)
    styles.push(`height:${props.height}px`)
  }

  return styles.join(';')
})

</script>

<template>
  <span
    class="--base-badge --text-xs --font-light"
    :class="[
      { '--base-badge--filled': filled },
      `--base-badge--${type}`,
    ]"
    :style="styleString">
    <slot></slot>
    <X v-if="clearable" class="--pointer" :size="14" @click="onXClick" />
  </span>
</template>

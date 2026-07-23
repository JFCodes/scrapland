<script setup lang="ts">
import { computed, type Component } from 'vue'
// Components
import { CircleAlert, CircleCheck, CircleX, Info } from '@lucide/vue'

type MessageType = 'info' | 'success' | 'warning' | 'danger'

const ICON_COMPONENT: Record<MessageType, Component> = {
  'info': Info,
  'success': CircleCheck,
  'warning': CircleAlert,
  'danger': CircleX,
}

const props = withDefaults(
  defineProps<{
    type?: MessageType
    maxWidth?: number
    message?: string
    opaque?: boolean
  }>(),
  { type: 'info' },
)

const iconColor = computed<string>(() => {
  return props.opaque
    ? 'var(--c-white)'
    : 'var(--c-font-main)'
})

const styleString = computed<string>(() => {
  const styles: Array<string> = []

  if (props.maxWidth) styles.push(`max-width:${props.maxWidth}px`)

  return styles.join(';')
})
</script>

<template>
  <div
    class="message"
    :style="styleString"
    :class="[
      { 'message--opaque --text-white': opaque },
      `message--${type}`,
    ]">

    <slot name="icon">
      <component :is="ICON_COMPONENT[type]" :color="iconColor" :size="20" />
    </slot>

    <div>
      <slot name="message">
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  border-radius: var(--radius-md);
  border: solid 1px transparent;
  padding: var(--s-sm);
  gap: var(--s-sm);
  display: flex;
  width: 100%;

  &--opaque {
    &.message--info {
      background-color: var(--c-info);
      border-color: var(--c-info);
    }

    &.message--success {
      background-color: var(--c-success);
      border-color: var(--c-success);
    }

    &.message--warning {
      background-color: var(--c-warning);
      border-color: var(--c-warning);
    }

    &.message--danger {
      background-color: var(--c-danger);
      border-color: var(--c-danger);
    }
  }

  &:not(.message--opaque) {
    &.message--info {
      background-color: color-mix(in srgb, var(--c-info) 20%, transparent);
      border-color: color-mix(in srgb, var(--c-info) 20%, transparent);
    }

    &.message--success {
      background-color: color-mix(in srgb, var(--c-success) 20%, transparent);
      border-color: color-mix(in srgb, var(--c-success) 20%, transparent);
    }

    &.message--warning {
      background-color: color-mix(in srgb, var(--c-warning) 20%, transparent);
      border-color: color-mix(in srgb, var(--c-warning) 20%, transparent);
    }

    &.message--danger {
      background-color: color-mix(in srgb, var(--c-danger) 20%, transparent);
      border-color: color-mix(in srgb, var(--c-danger) 20%, transparent);
    }
  }
}
</style>
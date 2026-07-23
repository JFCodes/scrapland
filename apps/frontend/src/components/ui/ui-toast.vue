<script setup lang="ts">
import type { Component } from 'vue'
// Components
import type { UIToast } from '@/components/types'
import { OctagonAlert, CircleCheck, CircleX, Info, X } from '@lucide/vue'

const emits = defineEmits<{ 'dismiss': [] }>()
defineProps<{ toast: UIToast }>()

const ICONS: Record<UIToast['type'], Component> = {
  'warning': OctagonAlert,
  'success': CircleCheck,
  'danger': CircleX,
  'info': Info,
}

</script>

<template>
  <div
    class="toast"
    :class="`toast--${toast.type}`">

    <div class="toast__dismiss --pointer" @click="emits('dismiss')">
      <X :size="18" />
    </div>

    <div>
      <component :is="ICONS[toast.type]" :size="22" />
    </div>

    <div>
      <p>{{ toast.title }}</p>
      <p
        v-for="(message, index) in toast.messages"
        :key="index">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  padding: var(--s-2xs) var(--s-xs);
  border-radius: var(--radius-sm);
  grid-template-columns: auto 1fr;
  border: solid 1px transparent;
  padding-right: var(--s-lg);
  position: relative;
  gap: var(--s-sm);
  display: grid;
  width: 320px;

  &__dismiss {
    padding: var(--s-3xs);
    right: var(--s-3xs);
    position: absolute;
    top: var(--s-2xs);
  }

  &--info {
    background-color: color-mix(in srgb, var(--c-info) 20%, transparent);
    border-color: color-mix(in srgb, var(--c-info) 20%, transparent);
  }

  &--success {
    background-color: color-mix(in srgb, var(--c-success) 20%, transparent);
    border-color: color-mix(in srgb, var(--c-success) 20%, transparent);
  }

  &--warning {
    background-color: color-mix(in srgb, var(--c-warning) 20%, transparent);
    border-color: color-mix(in srgb, var(--c-warning) 20%, transparent);
  }

  &--danger {
    background-color: color-mix(in srgb, var(--c-danger) 20%, transparent);
    border-color: color-mix(in srgb, var(--c-danger) 20%, transparent);
  }
}
</style>

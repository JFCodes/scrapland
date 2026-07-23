<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'
// Components
import CompFormsFormField from '@/components/forms/f-form-field.vue'

const emits = defineEmits<{ 'on-blur': [] }>()

defineSlots<{
  'before-label'(): void
  'after-label'(): void
}>()

defineProps<{
  label: string,
  attributes?: InputHTMLAttributes,
  hasError?: boolean
  error?: null | string
}>()

const value = defineModel<string | number>({ default: '' })
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
      <input
        v-model="value"
        class="--base-input input"
        :class="{ '--base-input--error': hasError }"
        :id="id"
        @blur="emits('on-blur')" />

      <p v-if="error" class="--mt-2xs --text-xs --text-error">{{ error }}</p>
    </template>
  </CompFormsFormField>
</template>

<style lang="scss">
.input {
  height: 40px;
}
</style>

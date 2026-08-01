<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue'
// Components
import CompFormsFormField from '@/components/forms/f-form-field.vue'

defineProps<{
  attributes?: TextareaHTMLAttributes
  resizable?: boolean
  optional?: boolean
  label: string,
}>()

const value = defineModel<null | string>({ default: '' })

</script>

<template>
  <CompFormsFormField
    :optional="optional"
    :label="label">

    <textarea
      v-model="value"
      v-bind="attributes"
      class="textarea --base-input"
      :class="{ 'textarea--no-resize': !resizable }">
    </textarea>

  </CompFormsFormField>
</template>

<style lang="scss" scoped>
.textarea {
  &--no-resize {
    resize: none;
  }
}
</style>

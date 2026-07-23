<script setup lang="ts">
// Components
import CompFormInput from '@/components/forms/f-input.vue'

const emits = defineEmits<{ 'on-input-blur': [] }>()

defineProps<{ isInvalid: boolean, errors: Array<string> }>()

const expression = defineModel<string>({ default: '' })

</script>

<template>
  <CompFormInput
    v-model="expression"
    label="Cron expression"
    :has-error="isInvalid"
    @on-blur="emits('on-input-blur')" />
  <p v-if="isInvalid" class="--text-xs --mt-xs --text-error">
    {{ errors[0] }}
  </p>
</template>

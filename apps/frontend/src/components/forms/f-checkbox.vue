<script setup lang="ts">
// Components
import { SquareSlash, SquareCheck, Square } from '@lucide/vue'

defineProps<{ label?: string }>()

const ICON_SIZE = 26

const value = defineModel<boolean | 'intermediate'>({ default: true })
const internalId = crypto.randomUUID()

</script>

<template>
  <div class="--group --pointer" @click="() => value = !value">
    <label v-if="label" :for="internalId">{{ label }}</label>

    <SquareSlash v-if="value === 'intermediate'" :size="ICON_SIZE" />
    <SquareCheck v-else-if="value === true" :size="ICON_SIZE" />
    <Square v-else-if="value === false" :size="ICON_SIZE" />
  </div>
  <input
    class="--hidden"
    type="checkbox"
    :value="value === 'intermediate' ? true : value"
    :id="internalId" />
</template>

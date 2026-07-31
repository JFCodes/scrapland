<script setup lang="ts">
// App
import { useAppI18n } from '@/composables/use-i18n'

const { t } = useAppI18n()

</script>

<template>
  <p class="--text-xl --font-bold">{{ t('panels.task.createTitle') }}</p>
</template>

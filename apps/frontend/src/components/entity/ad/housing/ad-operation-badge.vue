<script setup lang="ts">
import type { T_Ad_Housing_Operation } from '@scrapland/data-model'
import { useAppI18n } from '@/composables/use-i18n'
// App
import { AD_HOUSING_OPERATION_ICON } from '@/components/constants'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

defineProps<{ operation: null | T_Ad_Housing_Operation }>()

const { t } = useAppI18n()
</script>

<template>
  <CompUiTypeBadge type="success">
    <component :is="AD_HOUSING_OPERATION_ICON[operation || 'all']" :size="14" />
    <p>
      {{
        operation !== null
          ? t(`enums.adHousingOperation.${operation}`)
          : t('global.all')
      }}
    </p>
  </CompUiTypeBadge>
</template>

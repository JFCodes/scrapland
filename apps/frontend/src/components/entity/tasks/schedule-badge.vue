<script setup lang="ts">
import { E_TASK_SCHEDULE_TYPE, type T_Task_Schedule } from '@scrapland/data-model'
// App
import { getCronDescription } from '@/composables/cron-validation/get-cron-description'
import { TASK_SCHEDULE_TYPE_ICONS } from '@/components/constants'
import { useTooltips } from '@/composables/tooltips'
import { useAppI18n } from '@/composables/use-i18n'
// Component
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

const props = defineProps<{ schedule: T_Task_Schedule }>()

const { scheduleTypeTooltip } = useTooltips()
const { t } = useAppI18n()

const onMouseEnter = (event: MouseEvent) => {
  const message = getScheduleTypeDescription(props.schedule)
  scheduleTypeTooltip(event, message)
}

const getScheduleTypeDescription = (schedule: T_Task_Schedule): string => {
  switch (schedule.type) {
    case E_TASK_SCHEDULE_TYPE.MANUAL: {
      return t('entities.task.schedule.manual')
    }

    case E_TASK_SCHEDULE_TYPE.CRON: {
      const cronDescription = getCronDescription(schedule).toLowerCase()
      return t('entities.task.schedule.cron', { cronDescription })
    }

    case E_TASK_SCHEDULE_TYPE.INTERVAL: {
      const aMinuteMillis = 60 * 1000
      const count = Math.round(schedule.everyMs / aMinuteMillis)
      return t('entities.task.schedule.interval', { count })
    }
  }
}
</script>

<template>
  <CompUiTypeBadge
    type="warning"
    @mouseenter="(event: MouseEvent) => onMouseEnter(event)">

    <component :is="TASK_SCHEDULE_TYPE_ICONS[schedule.type]" :size="14" />
    {{ $t(`enums.taskScheduleType.${schedule.type}`) }}

  </CompUiTypeBadge>
</template>
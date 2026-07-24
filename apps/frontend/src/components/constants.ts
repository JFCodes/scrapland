import {
  E_TASK_SCHEDULE_TYPE,
  E_EXECUTION_STATUS,
  E_AD_ENTITY_TYPE,
  E_TASK_STATUS,
} from '@scrapland/data-model'
import { type Component, markRaw } from 'vue'
// App
import type { UiButtonType } from '@/components/types'
// Components
import {
  LaptopMinimalCheck,
  OctagonMinus,
  ListOrdered,
  TimerReset,
  BookDashed,
  Building2,
  RefreshCw,
  CircleX,
  Clock2,
  Pause,
  Trash,
  Play,
  Hand,
  Car,
} from '@lucide/vue'

export enum TELEPORTS {
  DROPDOWNS = 'teleports-dropdowns',
}

export const AD_ENTITY_ICON: Record<E_AD_ENTITY_TYPE, Component> = {
  [E_AD_ENTITY_TYPE.HOUSING]: Building2,
  [E_AD_ENTITY_TYPE.VEHICLE]: Car,
}

export const TASK_STATUS_BADGE_TYPE: Record<E_TASK_STATUS, UiButtonType> = {
  [E_TASK_STATUS.DRAFT]: 'light',
  [E_TASK_STATUS.PUBLISHED]: 'success',
  [E_TASK_STATUS.PAUSED]: 'link',
  [E_TASK_STATUS.DELETED]: 'danger',
}

export const TASK_STATUS_BADGE_ICON: Record<E_TASK_STATUS, Component> = {
  [E_TASK_STATUS.DRAFT]:  markRaw(BookDashed),
  [E_TASK_STATUS.PUBLISHED]: markRaw(Play),
  [E_TASK_STATUS.PAUSED]: markRaw(Pause),
  [E_TASK_STATUS.DELETED]: markRaw(Trash),
}

export const TASK_SCHEDULE_TYPE_ICONS: Record<E_TASK_SCHEDULE_TYPE, Component> = {
  [E_TASK_SCHEDULE_TYPE.INTERVAL]: markRaw(TimerReset),
  [E_TASK_SCHEDULE_TYPE.MANUAL]: markRaw(Hand),
  [E_TASK_SCHEDULE_TYPE.CRON]: markRaw(Clock2),
}

export const EXECUTION_STATUS_BADGE_TYPE: Record<E_EXECUTION_STATUS, UiButtonType> = {
  [E_EXECUTION_STATUS.QUEUED]: 'light',
  [E_EXECUTION_STATUS.RUNNING]: 'info',
  [E_EXECUTION_STATUS.ABORTED]: 'warning',
  [E_EXECUTION_STATUS.FAILED]: 'danger',
  [E_EXECUTION_STATUS.COMPLETED]: 'success',
}

export const EXECUTION_STATUS_ICONS: Record<E_EXECUTION_STATUS, Component> = {
  [E_EXECUTION_STATUS.QUEUED]: markRaw(ListOrdered),
  [E_EXECUTION_STATUS.RUNNING]: markRaw(RefreshCw),
  [E_EXECUTION_STATUS.ABORTED]: markRaw(OctagonMinus),
  [E_EXECUTION_STATUS.FAILED]: markRaw(CircleX),
  [E_EXECUTION_STATUS.COMPLETED]: markRaw(LaptopMinimalCheck),
}

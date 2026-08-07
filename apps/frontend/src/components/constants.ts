import {
  type T_Ad_Vehicle_PricePosition,
  type T_Ad_Housing_Operation,
  E_TASK_SCHEDULE_TYPE,
  E_EXECUTION_STATUS,
  E_AD_ENTITY_TYPE,
  E_TASK_STATUS,
  E_TASK_TYPE,
  E_AD_STATUS,
} from '@scrapland/data-model'
import { type Component, markRaw } from 'vue'
// App
import type { UiButtonType } from '@/components/types'
// Components
import {
  LaptopMinimalCheck,
  CircleDollarSign,
  PhoneForwarded,
  BanknoteCheck,
  OctagonMinus,
  ChevronsDown,
  ListOrdered,
  TimerReset,
  BookDashed,
  DollarSign,
  ChevronsUp,
  Building2,
  RefreshCw,
  BanknoteX,
  Handshake,
  Bookmark,
  TagPlus,
  Receipt,
  CircleX,
  ZoomIn,
  BadgeX,
  Clock2,
  Pause,
  Trash,
  Equal,
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

export const TASK_TYPE_ICONS: Record<E_TASK_TYPE, Component> = {
  [E_TASK_TYPE.FIND_NEW_ADS]: markRaw(ZoomIn)
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

export const AD_STATUS_ORDERED: Array<E_AD_STATUS> = [
  E_AD_STATUS.NEW,
  E_AD_STATUS.INTERESTING,
  E_AD_STATUS.CONTACT_MADE,
  E_AD_STATUS.PROPOSAL_MADE,
  E_AD_STATUS.PROPOSAL_ACCEPTED,
  E_AD_STATUS.PROPOSAL_REJECTED,
  E_AD_STATUS.DELETED,
  E_AD_STATUS.COMPLETED,
]

export const AD_STATUS_BADGE_TYPE: Record<E_AD_STATUS, UiButtonType> = {
  [E_AD_STATUS.NEW]: 'info',
  [E_AD_STATUS.DELETED]: 'danger',
  [E_AD_STATUS.INTERESTING]: 'warning',
  [E_AD_STATUS.CONTACT_MADE]: 'light',
  [E_AD_STATUS.PROPOSAL_MADE]: 'light',
  [E_AD_STATUS.PROPOSAL_ACCEPTED]: 'success',
  [E_AD_STATUS.PROPOSAL_REJECTED]: 'danger',
  [E_AD_STATUS.COMPLETED]: 'success',
}

export const AD_STATUS_BADGE_ICON: Record<E_AD_STATUS, Component> = {
  [E_AD_STATUS.NEW]: markRaw(TagPlus),
  [E_AD_STATUS.DELETED]: markRaw(BadgeX),
  [E_AD_STATUS.INTERESTING]: markRaw(Bookmark),
  [E_AD_STATUS.CONTACT_MADE]: markRaw(PhoneForwarded),
  [E_AD_STATUS.PROPOSAL_MADE]: markRaw(CircleDollarSign),
  [E_AD_STATUS.PROPOSAL_ACCEPTED]: markRaw(BanknoteCheck),
  [E_AD_STATUS.PROPOSAL_REJECTED]: markRaw(BanknoteX),
  [E_AD_STATUS.COMPLETED]: markRaw(Handshake),
}

export const AD_HOUSING_OPERATION_ICON: Record<'all' | T_Ad_Housing_Operation, Component> = {
  buy: markRaw(DollarSign),
  all: markRaw(Handshake),
  rent: markRaw(Receipt),
}

export const AD_VEHICLE_PRICE_POSITION_ICON: Record<T_Ad_Vehicle_PricePosition, Component> = {
  below: markRaw(ChevronsDown),
  above: markRaw(ChevronsUp),
  average: markRaw(Equal),
}

export const AD_VEHICLE_PRICE_POSITION_BADGE_TYPE: Record<T_Ad_Vehicle_PricePosition, UiButtonType> = {
  below: 'success',
  above: 'warning',
  average: 'light',
}
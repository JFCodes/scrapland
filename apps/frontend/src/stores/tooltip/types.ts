import type { Component } from 'vue'

export enum TOOLTIP_POSITION {
  TOP = 'top',
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',

  RIGHT = 'right',
  RIGHT_DOWN = 'right-down',
  RIGHT_UP = 'right-top',

  BOTTOM = 'bottom',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',

  LEFT = 'left',
  LEFT_DOWN = 'left-down',
  LEFT_UP = 'left-up',
}

export type TooltipOptions = {
  closeOnTargetElementLeave?: boolean
}

export type Tooltip<Props extends object> = {
  component: Component
  position: TOOLTIP_POSITION
  options?: TooltipOptions
  props: Props
}

export const DEFAULT_TOOLTIP_OPTIONS: TooltipOptions = {
  closeOnTargetElementLeave: true
}

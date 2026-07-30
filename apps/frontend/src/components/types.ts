import type { RouteLocationRaw } from 'vue-router'
import type { Component } from "vue"
// App
import { E_ROUTER_PAGES } from '@/router/enums'

export enum LIST_VIEW {
  TABLE = 'table',
  GRID = 'grid'
}

export type UIToast = {
  type: 'info' | 'success' | 'warning' | 'danger'
  messages?: Array<string>
  title: string
  id: string
}

export type UiNavBarLink = {
  linkTo: RouteLocationRaw
  separatorLeft?: boolean
  name: E_ROUTER_PAGES
  icon: Component
  badge?: number
}

export type UiSelectOption<T extends string = string> = {
  value: null | T
  label: string
}

export type UiButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'dark'
  | 'light'
  | 'link'

export type UiPageTab = {
  icon?: Component
  badge?: string
  label: string
  key: string
}

export type UiPageTabRoute = UiPageTab & { to: RouteLocationRaw }

export type UiIconToggleItem<K extends string> = {
  isActive: boolean
  icon: Component
  key: K
}


export type UiTableHeader = {
  label: string
}
import type { RouteLocationRaw } from 'vue-router'
import type { Component } from "vue"
// App
import { E_ROUTER_PAGES } from '@/router/enums'

export type UIToast = {
  type: 'info' | 'success' | 'warning' | 'danger'
  messages?: Array<string>
  title: string
  id: string
}

export type UiNavBarLink = {
  linkTo: RouteLocationRaw
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

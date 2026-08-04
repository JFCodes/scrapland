import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-vehicles.vue'
// Sub routes
import { route as DashboardRoute } from '@/router/routes/vehicle/dashboard'
import { route as TasksRoute } from '@/router/routes/vehicle/tasks'
import { route as AdsRoute } from '@/router/routes/vehicle/ads'

const name = E_ROUTER_PAGES.VEHICLES

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.VEHICLES_DASHBOARD },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
  children: [
    DashboardRoute,
    TasksRoute,
    AdsRoute
  ],
}

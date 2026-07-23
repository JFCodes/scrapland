import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-housing.vue'
// Sub routes
import { route as DashboardRoute } from '@/router/routes/housing/dashboard'
import { route as TasksRoute } from '@/router/routes/housing/tasks'
import { route as AdsRoute } from '@/router/routes/housing/ads'

const name = E_ROUTER_PAGES.HOUSING

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.HOUSING_DASHBOARD },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
  children: [
    DashboardRoute,
    TasksRoute,
    AdsRoute
  ],
}

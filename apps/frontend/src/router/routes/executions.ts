import type { RouteRecordRaw } from 'vue-router'
// App
import { E_ROUTER_PAGES, CONST_ROUTER_PATHS } from '@/router/enums'
// Components
import DefaultView from '@/views/v-executions.vue'
// Sub routes
import { route as CompletedRoute } from '@/router/routes/executions/completed'
import { route as RunningRoute } from '@/router/routes/executions/running'
import { route as AbortedRoute } from '@/router/routes/executions/aborted'
import { route as FailedRoute } from '@/router/routes/executions/failed'
import { route as QueueRoute } from '@/router/routes/executions/queue'
import { route as AllRoute } from '@/router/routes/executions/all'

const name = E_ROUTER_PAGES.EXECUTIONS

export const route: RouteRecordRaw = {
  redirect: { name: E_ROUTER_PAGES.EXECUTIONS_ALL },
  path: CONST_ROUTER_PATHS[name],
  component: DefaultView,
  name,
  children: [
    CompletedRoute,
    RunningRoute,
    AbortedRoute,
    FailedRoute,
    QueueRoute,
    AllRoute,
  ],
}

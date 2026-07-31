import { createRouter, createWebHistory } from 'vue-router'
// Routes
import { route as NotificationsRoute } from '@/router/routes/notifications'
import { route as ExecutionsRoute } from '@/router/routes/executions'
import { route as SettingsRoute } from '@/router/routes/settings'
import { route as VehiclesRoute } from '@/router/routes/vehicles'
import { route as HousingRoute } from '@/router/routes/housing'
import { route as TasksRoute } from '@/router/routes/tasks'
import { route as HomeRoute } from '@/router/routes/home'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    NotificationsRoute,
    ExecutionsRoute,
    SettingsRoute,
    VehiclesRoute,
    HousingRoute,
    TasksRoute,
    HomeRoute,
  ],
})

export default router

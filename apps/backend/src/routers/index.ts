import { Router, type Router as RouterType } from 'express'
// Routes
import { router as ExecutionsRouter } from './routes/executions'
import { router as TasksRouter } from './routes/tasks'
import { router as AdsRouter } from './routes/ads'
// Controllers
import { controller as PingController } from '../controllers/ping'

export const router: RouterType = Router()

router.use('/executions', ExecutionsRouter)
router.use('/tasks', TasksRouter)
router.use('/ads', AdsRouter)

router.get('/ping', PingController)

import { Router, type Router as RouterType } from 'express'
// Routes
import { router as ExecutionsRouter } from './routes/executions'
import { router as TasksRouter } from './routes/tasks'
// Controllers
import { controller as PingController } from '../controllers/ping'

export const router: RouterType = Router()

router.use('/executions', ExecutionsRouter)
router.use('/tasks', TasksRouter)

router.get('/ping', PingController)

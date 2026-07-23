import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as PostExecuteController } from '../../controllers/tasks/post-execute'
import { controller as GetAllController } from '../../controllers/tasks/get-all'
// Routes
import { router as HousingRouter } from './tasks/housing'

export const router: RouterType = Router()

router.use('/housing', HousingRouter)

router.get('/all', GetAllController)

router.post('/:taskId/execute', PostExecuteController)

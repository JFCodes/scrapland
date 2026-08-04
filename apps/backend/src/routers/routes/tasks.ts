import { Router, type Router as RouterType } from 'express'
// Controller
import { controller as GetLatestExecutionsController } from '../../controllers/tasks/get-latest-executions'
import { controller as PostExecuteController } from '../../controllers/tasks/post-execute'
import { controller as GetAllController } from '../../controllers/tasks/get-all'
// Routes
import { router as HousingRouter } from './tasks/housing'
import { router as VehicleRouter } from './tasks/vehicle'

export const router: RouterType = Router()

router.use('/housing', HousingRouter)
router.use('/vehicle', VehicleRouter)

router.get('/latest-executions', GetLatestExecutionsController)
router.get('/all', GetAllController)

router.post('/:taskId/execute', PostExecuteController)
